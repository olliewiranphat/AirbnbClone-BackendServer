const TryCatch = require("../../utils/TryCatch");
const prisma = require('../../models');
const createError = require("../../utils/createError");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

///// Create Booking : 
exports.createBooking = TryCatch(async (req, res) => {
    console.log('req.user', req.user); //id (clerkID)
    console.log('req.body', req.body); // checkInDate, checkOutDate, totalPrice, guestQTY
    console.log('req.params', req.params); //accommodationID

    ///// Create Booking:
    const newBooking = await prisma.booking.create({
        data: {
            customerID: req.user.id,
            accomodationID: req.params.accomodationID,
            guestQTY: parseInt(req.body.guestQTY),
            checkInDate: new Date(req.body.checkInDate),
            checkOutDate: new Date(req.body.checkOutDate),
            totalPrice: req.body.totalPrice
        }
    })

    res.status(200).json({ message: "Success Create userBooking" })
})


/// Get userBooking History:
exports.getBookingHistory = TryCatch(async (req, res) => {
    console.log('req.user', req.user); //id (clerkID)

    ///// Get userBookings :
    const myBookings = await prisma.booking.findMany({
        where: { customerID: req.user.id },
        include: { accommodation: true, user: true, payment: true },
        orderBy: { createAt: "desc" }
    })
    res.status(200).json({ message: "Success Get UserBookings" })
})

exports.getBookings = async (req, res, next) => {
    try {
        const bookings = await prisma.booking.findMany({
            include: {
                customer: true,
                accommodation: true,
                Payment: true,
            },
        });

        res.status(200).json({ success: true, data: bookings });
    } catch (error) {
        next(error);
    }
};

// exports.getBookingHistory = TryCatch(async (req, res) => {
//     console.log('req.user', req.user); //id (clerkID)

//     ///// Get userBookings :
//     const myBookings = await prisma.booking.findMany({
//         where: { customerID: req.user.id },
//         include: { accommodation: true, user: true, payment: true },
//         orderBy: { createAt: "desc" }
//     });

//     // ส่งข้อมูล myBookings กลับไปให้ frontend
//     res.status(200).json({
//         message: "Success Get UserBookings",
//         myBookings: myBookings
//     });
// });

exports.updateBooking = TryCatch(async (req, res) => {
    console.log('req.params', req.params);
    console.log('req.body', req.body);

    // ///// Update Booking:
    // const updateBooking = await prisma.booking.update({
    //     where: { bookingID: parseInt(req.params.bookingID) },
    //     data: {
    //         guestQTY: parseInt(req.body.guestQTY),
    //         checkInDate: new Date(req.body.checkInDate),
    //         checkOutDate: new Date(req.body.checkOutDate),
    //         totalPrice: req.body.totalPrice
    //     }
    // })
    // console.log('updateBooking', updateBooking);

    res.status(200).json({ message: "Success Update UserBookings" })
})

exports.cancelBooking = TryCatch(async (req, res) => {
    console.log('req.params', req.params); //bookingID
    // 🔹 อัปเดต Booking เป็น CANCELLED
    await prisma.booking.update({
        where: { bookingID: parseInt(req.params.bookingID) },
        data: { bookingStatus: "CANCELLED" }
    });

    // 🔹 ทำ Refund บน Stripe
    const paymentIntentId = await prisma.payment.findUnique({
        where: { bookingID: parseInt(req.params.bookingID) }
    })
    if (!paymentIntentId) {
        return createError(404, "Not checkeout yet!")
    }
    const resRefunding = await stripe.refunds.create({ //คำสั่งนี้จะถูกเรียกเพื่อทำการ refund หรือ คืนเงิน สำหรับการชำระเงินที่ได้ทำไปก่อนหน้านี้.
        payment_intent: paymentIntentId //ที่ได้รับจาก Stripe เมื่อทำการชำระเงินก่อหน้านี้
    });
    console.log('resRefunding', resRefunding); //การคืนเงินจะถูกดำเนินการผ่าน Stripe API 
    // และคุณจะได้รับข้อมูลเกี่ยวกับการคืนเงินผ่าน Webhook หรือ Response ที่ส่งกลับจาก Stripe.

    /// stripeWebhook.js (PaymentController) : ทำการอัปเดตสถานะการชำระเงินและการคืนเงิน (refund) ตามข้อมูลที่ Stripe ส่งมา.
    //  เมื่อมีการคืนเงิน (charge.refunded):
    // event.type === 'charge.refunded': เมื่อ Stripe แจ้งว่ามีการคืนเงิน (Refund).
    // คุณใช้ paymentIntentId เพื่ออัปเดตสถานะการชำระเงินในฐานข้อมูลเป็น FAILED เนื่องจากการคืนเงินเกิดขึ้น.
    res.status(200).json({ message: "Success Cancel UserBookings" })
})


exports.deleteBooking = async (req, res, next) => {
    try {
      const { bookingID } = req.params;
  
      await prisma.booking.delete({
        where: { bookingID: parseInt(bookingID) },
      });
  
      res.status(200).json({
        success: true,
        message: 'Booking cancelled successfully',
        redirect: '/booking/payment-cancel', // เปลี่ยนเป็นหน้าที่ต้องการให้ไปหลังจากลบเสร็จ
      });
    } catch (error) {
      next(error);
    }
  };