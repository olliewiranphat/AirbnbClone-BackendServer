const TryCatch = require("../../utils/TryCatch");
const prisma = require('../../models')

exports.createUnlistWishlist = TryCatch(async (req, res) => {
    console.log('req.params', req.params); //acommodationID
    console.log('req.user', req.user); //id (clerkID) 

    const thisWishlist = await prisma.wishList.findUnique({
        where: { accommodationID: parseInt(req.params.accommodationID) }
    })
    if (thisWishlist) {
        const unList = await prisma.wishList.delete({
            where: { accommodationID: parseInt(req.params.accommodationID) }
        })
        res.status(200).json({ message: "Unlist already" })
    } else if (!thisWishlist) {
        const createWishlist = await prisma.wishList.create({
            data: {
                accommodationID: parseInt(req.params.accommodationID),
                customerID: req.user.id
            }
        })
        console.log('createWishlist', createWishlist);

        res.status(200).json({ message: "create Wishlist already" })

    }
})

exports.getWishlistHistory = TryCatch(async (req, res) => {
    console.log('req.user', req.user);
    // const myWishlists = await prisma.wishList.findMany({
    //     where: { customerID: req.user.id },
    //     include: { accommodation: true }
    // })
    res.status(200).json({ message: "Get My Wishlist already" })
})