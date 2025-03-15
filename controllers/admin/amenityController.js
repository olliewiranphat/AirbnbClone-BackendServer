const TryCatch = require("../../utils/TryCatch");
const prisma = require('../../models')

exports.createNewAmenity = TryCatch(async (req, res) => {
    console.log('req.body', req.body);//{name: "Wi-Fi"}

    const results = await prisma.amenity.create({
        data: { ...req.body }
    })
    console.log('results', results);

    res.status(200).json({ message: "SUCCESS, Create new amenity already!", results })
})

exports.getAllAmenities = TryCatch(async (req, res) => {

    const results = await prisma.amenity.findMany()
    console.log('results', results);

    res.status(200).json({ message: "SUCCESS, Get all amenities already!", results })
})

exports.updateAmenity = TryCatch(async (req, res) => {
    console.log('req.params', req.params); //amenityID
    console.log('req.body', req.body);//{name: "Wi-Fi"} 

    const results = await prisma.amenity.update({
        where: { amenityID: parseInt(req.params.amenityID) },
        data: { ...req.body }
    })
    console.log('results', results);

    res.status(200).json({ message: "SUCCESS, Update amenity already!", results })
})

exports.deleteAmenity = TryCatch(async (req, res) => {
    console.log('req.params', req.params); //amenityID

    const results = await prisma.amenity.delete({
        where: { amenityID: parseInt(req.params.amenityID) }
    })
    console.log('results', results);

    res.status(200).json({ message: "SUCCESS, Delete amenity already!", results })
})



