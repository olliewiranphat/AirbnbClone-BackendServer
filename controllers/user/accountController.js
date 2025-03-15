const { clerkClient } = require('@clerk/express');
const prisma = require('../../models')
const TryCatch = require('../../utils/TryCatch');
const createError = require('../../utils/createError');


///// UserAccount : Create or Update userData (after login with CLERK)
exports.createUpdateAccount = TryCatch(async (req, res) => {
    console.log('req.body', req.body); //data form
    console.log('req.user', req.user); //id (clerkID)

    // const { id } = req.user
    // // ///// Add ROLE (from Frontend) to Clerk database:
    // // await clerkClient.users.updateUserMetadata(id, {
    // //     publicMetadata: {role}
    // // })

    ///// Update PhoneNumber??:
    if (req.body.phoneNumber) {
        // อัปเดตหมายเลขโทรศัพท์ของผู้ใช้ใน Clerk
        const updatedPhoneNumber = await clerkClient.users.updateUser(req.user.id, {
            phoneNumbers: [{
                phoneNumber: phoneNumber,  // อัปเดตหมายเลขโทรศัพท์ที่ได้รับ
                verified: false,  // กำหนดสถานะเป็น false (หมายเลขโทรศัพท์ยังไม่ได้ยืนยัน)
            }]
        });
        console.log('updatedPhoneNumber', updatedPhoneNumber);

    }

    // ///// Create or Update userData in DB:
    // const results = await prisma.user.upsert({
    //     where: { clerkID: id },
    //     create: {
    //         clerkID: id, role, fullName: firstName.concat(" ", lastName), email, phoneNumber, address, imageUrl
    //     },
    //     update: {
    //         role, fullName: firstName.concat(" ", lastName), email, phoneNumber, address, imageUrl
    //     }
    // })
    // console.log('results', results);

    res.status(200).json({ status: "SUCCESS", message: "Create or Updated already!" })
})

///// UserAccount : Get My account
exports.getMyAccount = TryCatch(async (req, res) => {
    // console.log('req.user', req.user);

    // const { id } = req.user
    // console.log('id', id);
    // ///// Find user by id (clerkID) :
    // const results = await prisma.user.findUnique({ where: { clerkID: id } })
    // console.log('results', results);

    res.status(200).json({ status: "SUCCESS", message: "Get My Account already!" })
})

///// UserAccount : Update User Image
exports.updateImageUrl = TryCatch(async (req, res) => {
    console.log('req.user', req.user); //id (clerk)
    console.log('req.body', req.body); //file
    // const file = new File({ type: 'image/png' })

    ///// Update imageUrl at Clerk:
    const updateImageUrl = await clerkClient.users.updateUserProfileImage(req.user.id, { file: req.body.imageUrl })
    console.log('updateImageUrl', updateImageUrl);

    ///// Update imageUrl in DB:
    const userImageUrlDB = await prisma.user.update({
        where: { clerkID: req.user.id },
        data: { imageUrl: req.user.imageUrl }
    })
    !userImageUrlDB && createError(404, "No have this user's data yet!")

    res.status(200).json({ message: "SUCCESS, updated imageUrl at DB!" }) //send to Frontend
})

///// UserAccount : Delete Account
exports.inactiveAccount = TryCatch(async (req, res) => {
    // console.log('req.user', req.user);
    // const { id } = req.user

    // //// Delete user at Clerk database:
    // await clerkClient.users.deleteUser(id)

    // ///// Find user in DB first:
    // const findUserDB = await prisma.user.update({
    //     where: { clerkID: id },
    //     data: { status: "INACTIVE" }
    // })
    // // !findUserDB && createError(404, "No have this user in DB")

    res.status(200).json({ status: "SUCCESS", message: "Inactive already!" })
})

