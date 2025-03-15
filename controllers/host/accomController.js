const createError = require("../../utils/createError");
const TryCatch = require("../../utils/TryCatch");
const prisma = require('../../models')

// exports.addAccom = TryCatch(async (req, res) => {
//     console.log('req.user', req.user); //id (clerkID)
//     console.log('req.body', req.body); //informAccom, rooms

//     /// Validate Upadate ROLE in DB ??:
//     const haveInDB = await prisma.user.findFirst({
//         where: {
//             clerkID: req.user.id,
//             role: "HOST"
//         }
//     })
//     !haveInDB && createError(404, "No have this host yet!")

//     const accomData = await prisma.accommodation.create({
//         data: {
//             hostID: req.user.id,
//             ...req.body.informAccom
//         }
//     })
//     console.log('accomData', accomData);

//     // req.body.rooms = [{name: "text1", imageRoom: ["secure_urlA", "secure_urlB"]},
//     //                   {name: "text2", imageRoom: ["secure_urlA", "secure_urlB"]}]
//     const roomsData = await prisma.room.create({
//         data: req.body.rooms.map(room => ({ name: room.name })),
//     })
//     console.log('roomsData', roomsData);

//     //req.body.imagesAccom
//     const imageRooms = await prisma.imgsRoom.create({
//         data: roomsData.map(room => ({
//             roomID: room.roomID,
//             imageUrl: req.body.rooms.map(room => (room.imageRoom))
//         }))
//     })


//     res.status(200).json({ message: "SUCCESS, hostDashboard" })
// })

exports.addAccomTEST = TryCatch(async (req, res) => {
    const accommodation = await prisma.accommodation.create({
        data: {
            title: 'Luxury Beach Villa',
            description: 'A beautiful beachside villa with amazing views.',
            addressDetail: '123 Beach Ave, Miami, FL',
            city: 'Miami',
            country: 'USA',
            pricePerNight: 250,
            maxGuests: 6,
            numBedrooms: 3,
            numBathrooms: 2,
            availQTY: 3,
            latitude: 25.7617,
            longitude: -80.1918,
            typeOfAccom: 'ENTIREHOME',
            // สร้างข้อมูลที่เชื่อมโยงกับ accommodation category
            accomCate: 1,
            // สร้างห้องและเชื่อมโยงกับ roomID และ imageUrl
            rooms: {
                create: [
                    {
                        name: 'Master Bedroom',
                        imgsRoom: {
                            create: [
                                { imageUrl: 'https://example.com/master-room-1.jpg' },
                                { imageUrl: 'https://example.com/master-room-2.jpg' }
                            ]
                        }
                    },
                    {
                        name: 'Guest Bedroom',
                        imgsRoom: {
                            create: [
                                { imageUrl: 'https://example.com/guest-room-1.jpg' },
                                { imageUrl: 'https://example.com/guest-room-2.jpg' }
                            ]
                        }
                    }
                ]
            }
        }
    });
    console.log('accommodation', accommodation);

    res.send("ACCOM ROOM")
})

///// UPDATE ACCOM:

exports.deleteAccom = TryCatch(async (req, res) => {
    console.log('req.params', req.params);

    const deleteAccom = await prisma.accommodation.delete({
        where: { accommodationID: req.params.accommodationID },
    })
    console.log('deleteAccom', deleteAccom);
    !deleteAccom && createError(404, "No have Accommodation yet!")
    res.status(200).json({ message: "SUCCESS, deleteAccom" })
})


exports.getAllMyAccom = TryCatch(async (req, res) => {
    console.log('req.user', req.user);

    const allMyAccom = await prisma.accommodation.findMany({
        where: { hostID: req.user.id },
        include: {
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
    console.log('allMyAccom', allMyAccom);
    !allMyAccom && createError(404, "No have data yet!")
    res.status(200).json({ message: "SUCCESS, allMyAccom" })
})