const express = require('express')
const authenticaion = require('../middlewares/authenticaion')
const authorAdmin = require('../middlewares/authorAdmin')
const { getDashboard, getAllUsers, getAllHosts, getAllBookings } = require('../controllers/admin/adminController')
const { createAccomCate, getAllAccomCate, updateCateName, deleteAccomCate } = require('../controllers/admin/accomCateController')
const adminRouter = express.Router()

/// adminController.js
adminRouter.get('/dashboard', authenticaion, authorAdmin, getDashboard) //allAccommodations HERE!
adminRouter.get('/all-users', authenticaion, authorAdmin, getAllUsers)
adminRouter.get('/all-hosts', authenticaion, authorAdmin, getAllHosts)
adminRouter.get('/all-bookings', authenticaion, authorAdmin, getAllBookings)

/// accomCateController.js 
adminRouter.post('accomcate/create', authenticaion, authorAdmin, createAccomCate)
adminRouter.get('accomcate/get-all', authenticaion, authorAdmin, getAllAccomCate)
adminRouter.patch('accomcate/update-newname', authenticaion, authorAdmin, updateCateName)
adminRouter.delete('accomcate/delete-accomcate', authenticaion, authorAdmin, deleteAccomCate)

module.exports = adminRouter