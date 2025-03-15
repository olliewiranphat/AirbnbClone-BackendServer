const cloudinary = require('../../config/cloudinary')
const TryCatch = require('../../utils/TryCatch')


exports.addImageCloud = TryCatch(async (req, res) => {
    console.log('req.body', req.body);

    const ImagesCloud = await cloudinary.uploader.upload(req.body.image, {
        folder: "AccommodationRooms",
        public_id: Date.now(),
        resource_type: 'auto'
    })
    res.status(200).json({ message: "SUCCESS, Add Images at Cloudinary!", results: ImagesCloud }) //send to Frontend, get secure_url to keep in DB
})

exports.delImageCloud = TryCatch(async (req, res) => {
    console.log('req.body', req.body); // public_id 

    await cloudinary.uploader.destroy(req.body.public_id)
    res.status(200).json({ message: "SUCCESS, Add Images at Cloudinary!" })
})