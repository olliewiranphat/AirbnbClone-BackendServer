const TryCatch = require("../../utils/TryCatch");
const prisma = require('../../models');
const createError = require("../../utils/createError");

exports.getDashboard = TryCatch(async (req, res) => {
    /// allUsers-Reviews:
    const allUserReview = await prisma.user.findMany({
        include: {
            Review: true,
            Accommodation: true
        }
    })
    console.log('allUserReview', allUserReview);

    /// allUser-Bookings: 
    const allUserBooking = await prisma.user.findMany({
        include: {
            Booking: {
                include: {
                    Payment: true
                }
            },
            Accommodation: true
        }
    })
    console.log('allUserBooking', allUserBooking);

    const allAccom = await prisma.accommodation.findMany({
        include: {
            accomCate: true,
            Room: {
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
    console.log('allAccom', allAccom);

    res.status(200).json({ message: "SUCCESS, adminDashboard", results: { allUserReview, allUserBooking, allAccom } })
})

exports.getAllUsers = TryCatch(async (req, res) => {
    const AllUsers = await prisma.user.findMany()
    console.log('AllUsers', AllUsers);

    res.status(200).json({ message: "SUCCESS, AllUsers", results: AllUsers })
})

exports.getAllHosts = TryCatch(async (req, res) => {
    const AllHosts = await prisma.user.findMany({
        where: { role: "HOST" }
    })
    console.log('AllHosts', AllHosts);

    res.status(200).json({ message: "SUCCESS, AllHosts", results: AllHosts })
})

exports.getAllBookings = TryCatch(async (req, res) => {
    const AllBookings = await prisma.booking.findMany()
    console.log('AllBookings', AllBookings);

    res.status(200).json({ message: "SUCCESS, AllBookings!" })
})


exports.getAllAccommodations = TryCatch(async (req, res) => {
    const allAccommodations = await prisma.accommodation.findMany({
        include: {
            Room: {
                include: {
                    ImgsRoom: true
                }
            },
            AccomAmen: {
                include: {
                    amenity: true
                }
            },
            Review: {
                include: {
                    customer: true
                }
            }
        }
    })
    // console.log('allAccommodations', allAccommodations);

    res.status(200).json({ message: "SUCCESS, AllBookings!", results: allAccommodations })
})
