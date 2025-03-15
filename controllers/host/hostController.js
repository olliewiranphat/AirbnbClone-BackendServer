const prisma = require('../../models')
const TryCatch = require('../../utils/TryCatch')
const createError = require('../../utils/createError')

exports.getDashboard = TryCatch(async (req, res) => {
    console.log('req.user', req.user);//id (clerkID) 

    /// allAccom-Bookings 
    const allAccomBooking = await prisma.accommodation.findMany({
        where: { hostID: req.user.id },
        include: {
            Rooms: {
                include: {
                    ImgsRoom: true
                }
            },
            Bookings: {
                include: {
                    Payments: true
                }
            }
        }
    })
    console.log('allAccomBooking', allAccomBooking);


    /// allAccom-Reviews
    const allAccomReview = await prisma.accommodation.findMany({
        where: { hostID: req.user.id },
        include: {
            Rooms: {
                include: {
                    ImgsRoom: true
                }
            },
            Reviews: {
                include: {
                    customer: true
                }
            }
        }
    })
    console.log('allAccomReview', allAccomReview);

    ///allAccom-Wishlist
    const allAccomWishlist = await prisma.accommodation.findMany({
        where: { hostID: req.user.id },
        include: {
            WishLists: {
                include: {
                    customer: true
                }
            }
        }
    })
    console.log('allAccomWishlist', allAccomWishlist);

    res.status(200).json({ message: "SUCCESS, hostDashboard" })
})

