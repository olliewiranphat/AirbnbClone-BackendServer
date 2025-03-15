const express = require('express')
const authorHost = require('../middlewares/authorHost')
const authenticaion = require('../middlewares/authenticaion')
const { addImageCloud, delImageCloud } = require('../controllers/host/imagesController')
const { getDashboard } = require('../controllers/host/hostController')
const { addAccomTEST, deleteAccom, getAllMyAccom } = require('../controllers/host/accomController')
const hostRouter = express.Router()

///// Images Product by Cloudinary : 
hostRouter.post('/accommodation/add-image-cloud', authenticaion, authorHost, addImageCloud) //Cloudinary Storage : Keep Images
hostRouter.post('/accommodation/delete-image-cloud', authenticaion, authorHost, delImageCloud) //Cloudinary Storage : delete Old Images

///// ADD Accom :
hostRouter.post('/accommodation/add-new', addAccomTEST)
///// UPDATE Accom :
hostRouter.put('/accommodation/update-data/:accommodationID', authenticaion, authorHost)
///// DELETE Accom :
hostRouter.delete('/accommodation/delete/:accommodationID', authenticaion, authorHost, deleteAccom)
///// GET ALL My Accom:
hostRouter.get('/accommodation/get-all', authenticaion, authorHost, getAllMyAccom)

///// GET HOST Dashboard:
hostRouter.get('/dashboard', authenticaion, authorHost, getDashboard)

module.exports = hostRouter