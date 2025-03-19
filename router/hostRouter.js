const express = require('express')
const authorHost = require('../middlewares/authorHost')
const authenticaion = require('../middlewares/authenticaion')
const { addImageCloud, delImageCloud } = require('../controllers/host/imagesController')
const { getDashboard } = require('../controllers/host/hostController')
const { deleteAccom, getAllMyAccom, addAccom, updateRoomImgs, updateAccomAmen } = require('../controllers/host/accomController')
const hostRouter = express.Router()
// const upload = require('../config/multerImage')
const upload2 = require('../config/upload')
///// Images Product by Cloudinary : 
hostRouter.post('/accommodation/add-image-cloud', authenticaion,upload2.single("file"), authorHost, addImageCloud) //Cloudinary Storage : Keep Images
hostRouter.post('/accommodation/delete-image-cloud', authenticaion, authorHost, delImageCloud) //Cloudinary Storage : delete Old Images

///// ADD Accom :
hostRouter.post('/accommodation/add-new', authenticaion, authorHost, addAccom)

///// UPDATE Accom :
hostRouter.put('/accommodation/room/update/:roomID', authenticaion, authorHost, updateRoomImgs) //Delete-Create New
hostRouter.put('/accommodation/amenity/update/:accommodationID', authenticaion, authorHost, updateAccomAmen) //Delete-Create New
hostRouter.put('/accommodation/update-data/:accommodationID', authenticaion, authorHost)

///// DELETE Accom :
hostRouter.delete('/accommodation/delete/:accommodationID', authenticaion, authorHost, deleteAccom)

///// GET ALL My Accom:
hostRouter.get('/accommodation/get-all', authenticaion, authorHost, getAllMyAccom)

///// GET HOST Dashboard:
hostRouter.get('/dashboard', authenticaion, authorHost, getDashboard)

module.exports = hostRouter