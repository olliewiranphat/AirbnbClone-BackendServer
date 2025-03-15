const express = require('express')
const authenticaion = require('../middlewares/authenticaion')
const authorAdmin = require('../middlewares/authorAdmin')
const { getDashboard, getAllUsers, getAllHosts, getAllBookings, getAllAccomAmen } = require('../controllers/admin/adminController')
const { createAccomCate, getAllAccomCate, updateCateName, deleteAccomCate } = require('../controllers/admin/accomCateController')
const { createNewAmenity, getAllAmenities, updateAmenity, deleteAmenity } = require('../controllers/admin/amenityController')
const adminRouter = express.Router()

/// adminController.js
adminRouter.get('/dashboard', authenticaion, authorAdmin, getDashboard) //allAccommodations also HERE!
adminRouter.get('/all-users', authenticaion, authorAdmin, getAllUsers)
adminRouter.get('/all-hosts', authenticaion, authorAdmin, getAllHosts)
adminRouter.get('/all-bookings', authenticaion, authorAdmin, getAllBookings)
adminRouter.get('/all-accommodations/amenities', authenticaion, authorAdmin, getAllAccomAmen)

/// accomCateController.js 
adminRouter.post('accomcate/create', authenticaion, authorAdmin, createAccomCate)
adminRouter.get('accomcate/get-all', authenticaion, authorAdmin, getAllAccomCate)
adminRouter.patch('accomcate/update-newname', authenticaion, authorAdmin, updateCateName)
adminRouter.delete('accomcate/delete', authenticaion, authorAdmin, deleteAccomCate)

/// amenityController.js 
adminRouter.post('amenity/create', authenticaion, authorAdmin, createNewAmenity)
adminRouter.get('amenity/get-all', authenticaion, authorAdmin, getAllAmenities)
adminRouter.patch('amenity/update-newname', authenticaion, authorAdmin, updateAmenity)
adminRouter.delete('amenity/delete', authenticaion, authorAdmin, deleteAmenity)

module.exports = adminRouter