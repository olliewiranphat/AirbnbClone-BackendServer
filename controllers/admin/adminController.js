const TryCatch = require("../../utils/TryCatch");
const prisma = require('../../models')

exports.getDashboard = TryCatch(async (req, res) => {
    /// allUsers-Reviews:
    const allUserReview = await prisma.user.findMany({
        include: {
            Reviews: true,
            Accommodations: true
        }
    })
    /// allUser-Bookings: 
    const allUserBooking = await prisma.user.findMany({
        include: {
            Bookings: {
                include: {
                    Payments: true
                }
            }
        }
    })

    const allAccom = await prisma.accommodation.findMany({
        include: {
            accomCate: true,
            Rooms: {
                include: {
                    ImgsRoom: true
                }
            },
            AccomAmen: {
                include: {
                    amenity: true
                }
            }
        }
    })



    res.status(200).json({ message: "SUCCESS, adminDashboard", results: allUserReview, allUserBooking, allAccom })
})

exports.getAllUsers = TryCatch(async (req, res) => {
    const AllUsers = await prisma.user.findMany()
    console.log('AllUsers', AllUsers);

    res.status(200).json({ message: "SUCCESS, AllUsers" })
})

exports.getAllHosts = TryCatch(async (req, res) => {
    const AllHosts = await prisma.user.findMany({
        where: { role: "HOST" }
    })
    console.log('AllHosts', AllHosts);

    res.status(200).json({ message: "SUCCESS, AllHosts" })
})

exports.getAllBookings = TryCatch(async (req, res) => {
    const AllBookings = await prisma.booking.findMany()
    console.log('AllBookings', AllBookings);

    res.status(200).json({ message: "SUCCESS, AllBookings" })
})

