const { clerkClient } = require('@clerk/express');
const prisma = require('../../models')
const TryCatch = require('../../utils/TryCatch');
const createError = require('../../utils/createError');
const sharp = require('sharp')


///// UserAccount : Create or Update userData (after login with CLERK)
exports.createUpdateAccount = TryCatch(async (req, res) => {
    console.log('req.body >>>', req.body); //ITEMvalue
    console.log('req.user.publicMetadata.role', req.user.publicMetadata.role); //id (clerkID)

    const { id } = req.user
    // console.log('id', id);
    console.log(req.user.fullName)

    /// Add ROLE (from Frontend) to Clerk database:
    if (req.body.role) { //HOST
        if (req.user.publicMetadata.role !== req.body.role) {
            await clerkClient.users.updateUserMetadata(id, {
                publicMetadata: { role: req.body.role }
            })
        }
    }

    ///// Update PhoneNumber??:
    if (req.body.phoneNumber) {
        //1. Check user data from Clerk 
        const user = await clerkClient.users.getUser(req.user.id)
        if (!user) {
            return createError(404, "Not found user's phoneNumber Clerk!")
        }
        console.log(user.phoneNumbers);
        console.log(user.primaryPhoneNumber);

        // req.body.phoneNumber Have at Clerk??:
        const havePhoneClerk = user.phoneNumbers.find(phone => phone.phoneNumber === req.body.phoneNumber)
        console.log('havePhoneClerk', havePhoneClerk);
        if (havePhoneClerk) {
            // SET req.body.phoneNumber == Primary
            const updatePhoneClerk = await clerkClient.users.updateUser(req.user.id, {
                primaryPhoneNumberId: updatePhoneClerk.id  // ✅ ใช้ phoneNumberId ตั้งเป็น Primary
            });
            console.log('updatePhoneClerk', updatePhoneClerk);

            const updatePhoneDB = await prisma.user.update({
                where: { clerkID: id },
                data: { phoneNumber: req.body.phoneNumber }
            })
            console.log('updatePhoneDB', updatePhoneDB);
        } else {
            const newPhoneClerk = await clerkClient.phoneNumbers.createPhoneNumber({
                userId: req.user.id,
                phoneNumber: req.body.phoneNumber
            })
            console.log('newPhoneClerk', newPhoneClerk);
            const updateNewPhoneDB = await prisma.user.update({
                where: { clerkID: id },
                data: { phoneNumber: req.body.phoneNumber }
            })
            console.log('updateNewPhoneDB', updateNewPhoneDB);
        }
    }

    ///// Create or Update userData in DB:
    const haveUser = await prisma.user.findUnique({
        where: { clerkID: id },
    })
    if (!haveUser) {
        const createUser = await prisma.user.create({
            data: {
                clerkID: id,
                fullName: req.user.fullName,
                ...req.body
            }
        })
        res.status(200).json({ message: "SUCCESS, Create already!", createUser })

    } else if (haveUser) {
        const updateUser = await prisma.user.update({
            where: { clerkID: id },
            data: req.body
        })
        res.status(200).json({ message: "SUCCESS, update already!", updateUser })
    }
})


///// UserAccount : Get My account
exports.getMyAccount = TryCatch(async (req, res) => {
    // console.log('req.user', req.user);
    const { role } = req.user.publicMetadata //ADMIN
    // console.log("role", role);
    const { id } = req.user
    // console.log('id', id);

    ///// Find user by id (clerkID) :
    const findUserDB = await prisma.user.findUnique({ where: { clerkID: id } })
    // console.log('findUserDB', findUserDB);
    /// Check ROLE in DB == Clerk??:
    if (!findUserDB) {
        const createRole = await prisma.user.create({
            data: {
                clerkID: id,
                role
            }
        })
        res.status(200).json({ status: "SUCCESS", message: "Get My Account already!", results: createRole })
    }
    if (role === findUserDB.role) {
        res.status(200).json({ status: "SUCCESS", message: "Get My Account already!", results: findUserDB })
    } else {
        const updateRoleDB = await prisma.user.update({
            where: { clerkID: id },
            data: { role }
        })
        // console.log("updateRoleDB", updateRoleDB);
        res.status(200).json({ status: "SUCCESS", message: "Get-UPDATE ROLE My Account already!", results: updateRoleDB })
    }
})


///// UserAccount : Delete Account
exports.inactiveAccount = TryCatch(async (req, res) => {
    // console.log('req.user', req.user);
    const { id } = req.user

    // //// Delete user at Clerk database:
    // await clerkClient.users.deleteUser(id)

    /// Find user in DB first:
    const findUserDB = await prisma.user.update({
        where: { clerkID: id },
        data: { status: "INACTIVE" }
    })
    !findUserDB && createError(404, "No have this user in DB")

    res.status(200).json({ status: "SUCCESS", message: "Inactive already!" })
})


exports.updateImageUrl = TryCatch(async (req, res) => {
    // console.log("req.file", req.file); // ✅ ตรวจสอบไฟล์ที่อัปโหลด

    if (!req.file) {
        return createError(400, "No file uploaded!");
    }

    // ✅ ตรวจสอบประเภทไฟล์
    if (!["image/jpeg", "image/png", "image/webp"].includes(req.file.mimetype)) {
        return createError(400, "Invalid file type! Only image/jpeg, image/png, and image/webp are allowed.");
    }

    // Resize Image <= 10MB to CLERK:
    const resizedBuffer = await sharp(req.file.buffer)
        .resize({ width: 1000 })//adapt image size max-witdh 1000px
        .jpeg({ quality: 80 }) //reduce quality 80% >> decrease image size
        .toBuffer()

    // ✅ แปลง Buffer → File ตามที่ Clerk Docs ต้องการ:
    const file = new File([resizedBuffer], req.file.originalname, { type: req.file.mimetype }); //ตาม DOC

    // ✅ ส่งไฟล์ไป Clerk API
    const updateImageUrl = await clerkClient.users.updateUserProfileImage(req.user.id, { file }); //ตาม DOC
    // console.log(" SUCCESS! Updated imageUrl at Clerk., updateImageUrl >>>", updateImageUrl);
    if (!updateImageUrl) {
        return createError(500, "Failed to update image at Clerk")
    }
    console.log('updateImageUrl.imageUrl', updateImageUrl.imageUrl);
    /// UPDATE into DB:
    const updateImageUrlDB = await prisma.user.update({
        where: { clerkID: req.user.id },
        data: { imageUrl: updateImageUrl.imageUrl }
    })
    console.log('updateImageUrlDB', updateImageUrlDB);
    res.status(200).json({ message: "SUCCESS, Update imageUrl Clerk and Database already" })
});


