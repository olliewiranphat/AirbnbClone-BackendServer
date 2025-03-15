const createError = require("../../utils/createError");
const TryCatch = require("../../utils/TryCatch");
const prisma = require('../../models')


exports.addAccom = TryCatch(async (req, res) => {
    console.log('req.body', req.body); //accomInfrom, roomData, amenity
    //accomInfrom = {title: "", description:"", ...}
    //roomData = [{name: "Bedroom", imageRoom: ["A", "B", "C"]},
    //            {name: "Bathroom", imageRoom: ["A", "B", "C"]}, ...]
    //amenity = [{amenityID: 1, quantity: 2}, {amenityID: 2, quantity: 3}]

    const {
        accomInfrom,  // Accommodation information
        roomData,      // Room data
        amenity        // Amenity data (with amenityID and quantity)
    } = req.body;

    const {
        title,
        description,
        pricePerNight,
        availQTY,
        addressDetail,
        city,
        country,
        maxGuests,
        numBedrooms,
        numBathrooms,
        latitude,
        longitude,
        accomCateID,
        typeOfAccom,
    } = accomInfrom;

    // Step 1: Create accommodation
    const accommodation = await prisma.accommodation.create({
        data: {
            hostID: req.user.id,
            title,
            description,
            pricePerNight: parseFloat(pricePerNight),
            availQTY: parseInt(availQTY),
            addressDetail,
            city,
            country,
            MaxGuests: parseInt(maxGuests),
            NumBedrooms: parseInt(numBedrooms),
            NumBathrooms: parseInt(numBathrooms),
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            accomCateID: parseInt(accomCateID),
            typeOfAccom,
        }
    });
    console.log('accommodation', accommodation);


    // Step 2: Create rooms and images
    const createdRooms = await prisma.room.createMany({
        data: roomData.map(room => ({
            name: room.name,
            accommodationID: accommodation.accommodationID, //Step1
        })),
    });
    console.log('createdRooms', createdRooms);


    // Step 3: Create ImgsRoom for each room
    const createdImgsRooms = await prisma.imgsRoom.createMany({
        data: roomData.flatMap((room, index) => {
            console.log('room', room)

            // room.imageRoom.map(imageUrl => ({
            //     imageUrl,
            //     roomID: createdRooms[index].roomID, // Link to the created room
            // }))
        }),
    });

    // Step 4: Create amenities and link them to the accommodation
    const createdAccomAmen = await prisma.accomAmen.createMany({
        data: amenity.map(item => ({
            accommodationID: accommodation.accommodationID,
            amenityID: item.amenityID, // Using amenityID from frontend
            quantity: item.quantity, // Quantity of amenity
        })),
    });

    const findAmenities = await prisma.amenity.findMany({
        where: amenity.map(el => ({ amenityID: el.amenityID }))
    })
    console.log('findAmenities', findAmenities);


    // Send response with the created accommodation, rooms, and amenities
    res.status(201).json({
        accommodation,
        rooms: createdRooms,
        imgsRooms: createdImgsRooms,
        amenities: findAmenities
    });

    res.send("ACCOM ROOM")
})

// Controller to handle adding accommodation
exports.addAccomTEST = async (req, res) => {
    try {
        const {
            accomInfrom,  // Accommodation information
            roomData,      // Room data
            amenity        // Amenity data (with amenityID and quantity)
        } = req.body;

        const {
            hostID,
            title,
            description,
            pricePerNight,
            availQTY,
            addressDetail,
            city,
            country,
            maxGuests,
            numBedrooms,
            numBathrooms,
            latitude,
            longitude,
            accomCateID,
            typeOfAccom,
        } = accomInfrom;

        // Step 1: Create accommodation with nested rooms, images and amenities
        const accommodation = await prisma.accommodation.create({
            data: {
                hostID,
                title,
                description,
                pricePerNight: parseFloat(pricePerNight),
                availQTY: parseInt(availQTY),
                addressDetail,
                city,
                country,
                MaxGuests: parseInt(maxGuests),
                NumBedrooms: parseInt(numBedrooms),
                NumBathrooms: parseInt(numBathrooms),
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                accomCateID,
                typeOfAccom,

                // Nested rooms and images
                Rooms: {
                    create: roomData.map(room => ({
                        name: room.name,
                        ImgsRoom: {
                            create: room.imageRoom.map(imageUrl => ({
                                imageUrl,
                            }))
                        }
                    }))
                },

                // Nested amenities and quantity
                AccomAmen: {
                    create: amenity.map(item => ({
                        amenityID: item.amenityID, // amenityID from frontend
                        quantity: item.quantity,   // quantity of the amenity
                    }))
                },
            }
        });

        // Step 2: Send response back with created accommodation data
        res.status(201).json({
            accommodation,
            message: "Accommodation created successfully with rooms and amenities"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error creating accommodation" });
    }
};

exports.updateRoomImgs = TryCatch(async (req, res) => {
    console.log('req.body', req.body); //{newName: "", imageRoom : ["","",""]}
    console.log('req.params', req.params); //roomID

    if (req.body.newName) {
        const newName = await prisma.room.update({
            where: { roomID: req.params.roomID },
            data: { name: req.body.newName }
        })
        console.log('newName', newName);
    }

    if (req.body.imageRoom) {
        /// Delete OLD Images RoomID
        await prisma.imgsRoom.deleteMany({
            where: { roomID: parseInt(req.params.roomID) }
        })

        const updateNewImgs = await prisma.imgsRoom.createMany({
            data: imageRoom.map(image => ({
                roomID: parseInt(req.params.roomID),
                imageUrl: image
            }))
        })
        console.log('updateRoomImgs', updateRoomImgs);
    }

    res.status(200).json({ message: "SUCCESS, updateRoomImgs" })
})

exports.updateAccomAmen = TryCatch(async (req, res) => {
    console.log('req.body', req.body); //amenity = [{amenityID: 2, quantity: 3}, {amenityID: 3, quantity: 4}]
    console.log('req.params', req.params); //accommodationID

    const haveAccomAmen = await prisma.accomAmen.findMany()
    if (!haveAccomAmen) {
        return createError(404, "No have AccomAmen yet!")
    }

    await prisma.accomAmen.deleteMany({
        where: { accommodationID: parseInt(req.params.accommodationID) }
    })

    const newAccomAmen = await prisma.accomAmen.createMany({
        data: req.body.amenity.map(el => ({
            accommodationID: parseInt(req.params.accommodationID),
            amenityID: parseInt(el.amenityID),
            quantity: parseInt(el.quantity)
        }))
    })
    console.log('newAccomAmen', newAccomAmen);

    res.status(200).json({ message: "SUCCESS, updateAccomAmen" })
})

///// UPDATE ACCOM:
exports.updateAccom = TryCatch(async (req, res) => {
    console.log('req.body', req.body); //accomInfrom, amenity
    //accomInfrom = {title: "", description:"", ...}
    //amenity = [{amenityID: 2, quantity: 3}, {amenityID: 3, quantity: 4}]

    const {
        accomInfrom,  // Accommodation information
        roomData,      // Room data
        amenity        // Amenity data (with amenityID and quantity)
    } = req.body;

    const {
        title,
        description,
        pricePerNight,
        availQTY,
        addressDetail,
        city,
        country,
        maxGuests,
        numBedrooms,
        numBathrooms,
        latitude,
        longitude,
        accomCateID,
        typeOfAccom,
    } = accomInfrom;

    // Step 1: update accommodation
    const newAccomInform = await prisma.accommodation.update({
        where: { accommodationID: req.params.accommodationID },
        data: {
            hostID: req.user.id,
            title,
            description,
            pricePerNight: parseFloat(pricePerNight),
            availQTY: parseInt(availQTY),
            addressDetail,
            city,
            country,
            MaxGuests: parseInt(maxGuests),
            NumBedrooms: parseInt(numBedrooms),
            NumBathrooms: parseInt(numBathrooms),
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            accomCateID: parseInt(accomCateID),
            typeOfAccom,
        }
    });
    console.log('newAccommodation', newAccommodation);


    // Send response with the created accommodation, rooms, and amenities
    res.status(201).json({
        newAccomInform
    });
})

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