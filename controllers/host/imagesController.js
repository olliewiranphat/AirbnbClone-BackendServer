const cloudinary = require('../../config/cloudinary')
const TryCatch = require('../../utils/TryCatch')


exports.addImageCloud = TryCatch(async (req, res) => {
    console.log('req.body', req.file);
    if (!req.file) {
        return res.status(400).json({ error: "No files uploaded" });
    }
    try {
       const ImageUpload =  await cloudinary.uploader.upload(req.file.path, {
        folder: "Stayzy",
        resource_type: 'auto'
    })
    console.log(ImageUpload);
        res.status(200).json({
            message: "SUCCESS, Add Images at Cloudinary!",
            secure_url: ImageUpload.secure_url
        });
    } catch (error) {
        res.status(500).json({ error: "Upload failed", details: error.message });
    }
})

exports.delImageCloud = TryCatch(async (req, res) => {
    console.log('req.body', req.body); // public_id 

    await cloudinary.uploader.destroy(req.body.public_id)
    res.status(200).json({ message: "SUCCESS, Add Images at Cloudinary!" })
})