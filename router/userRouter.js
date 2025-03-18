const express = require('express')
const userRouter = express.Router()
const authenticaion = require('../middlewares/authenticaion')

const { getMyAccount, inactiveAccount, createUpdateAccount, updateImageUrl, } = require('../controllers/user/accountController')
const { cancelBooking, createBooking, updateBooking, getBookingHistory } = require('../controllers/user/bookingController')
const { createPaymentSession, stripeWebhook } = require('../controllers/user/paymentController')
const { createUnlistWishlist, getWishlistHistory } = require('../controllers/user/wishlistController')
const { postReview } = require('../controllers/user/reviewController')
const { getMessage, sendMessage } = require('../controllers/user/messageController')
const upload = require('../config/multerImage')


///// ACCOUNT:
userRouter.put('/my-account/create-update', authenticaion, createUpdateAccount)
userRouter.get('/my-account/get', authenticaion, getMyAccount)
userRouter.patch('/my-account/inactive', authenticaion, inactiveAccount)
userRouter.patch('/my-account/update-imageurl', authenticaion, upload.single("file"), updateImageUrl)
//NOTE: upload.single("file") ทำงานเป็น Middleware ก่อนถึง updateImageUrl
//ค่า "file" ที่ใช้ใน upload.single("file") ต้องตรงกับชื่อของ FormData.append("file", imageFile)
// Express และ Multer จะใช้ชื่อนี้ในการ ดึงไฟล์ที่ถูกอัปโหลดจาก req.file

// ///// BOOKING :
userRouter.post('/booking/create/:accommodationID', createBooking) //Create Booking
userRouter.get('/booking/history', getBookingHistory) //Get userBooking
userRouter.post('/booking/update/:bookingID', updateBooking) //Create Booking
userRouter.post('/booking/cancel/:bookingID', cancelBooking) //Create Booking


///// Payment :
userRouter.post('/payment/create-session/:bookingID', createPaymentSession) //link to Checkout Form
userRouter.post("/payment/webhook", express.raw({ type: 'application/json' }), stripeWebhook);
///// WEBHOOK :
// https://9783-124-120-76-215.ngrok-free.app/user/payment/webhook
// การส่งข้อมูลนี้คือ HTTP POST request โดยที่ Stripe จะเป็นตัวที่ส่งข้อมูลไปยัง server ของคุณ.
// Webhook จะส่งข้อมูลที่เกี่ยวข้องกับเหตุการณ์ (event) เช่น การชำระเงินที่เสร็จสมบูรณ์, การคืนเงิน, หรือสถานะอื่นๆ มายัง URL ที่คุณตั้งค่าไว้.
// การใช้ POST สำหรับการรับ Webhook เป็นมาตรฐานที่ถูกต้องตามหลักของ HTTP เนื่องจาก Webhook คือ การส่งข้อมูลจากแหล่งภายนอก (เช่น Stripe) ไปยัง server ของคุณ.

///// WISHLIST :
userRouter.post('/wishlist/create-unlist', authenticaion, createUnlistWishlist)
userRouter.get('/wishlist/history', authenticaion, getWishlistHistory)

////// REVIEW :
userRouter.post('/review/:accommodationID', authenticaion, postReview)

////// Message:
userRouter.post('/message/send/:receiverID', sendMessage)
userRouter.get('/message/get-data/:receiverID', getMessage)



module.exports = userRouter