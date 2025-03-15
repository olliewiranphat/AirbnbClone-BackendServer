const TryCatch = require('../../utils/TryCatch')
const prisma = require('../../models');
const createError = require('../../utils/createError');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

///// Create Payment session STRIPE: PRESS Book 
exports.createPaymentSession = TryCatch(async (req, res) => {
    console.log('req.params', req.params); //bookingID

    ///// Validate bookingID:
    const thisBooking = await prisma.booking.findUnique({
        where: { bookingID: parseInt(req.params.booking) },
        include: { accommodation: true }
    })
    console.log('thisBooking', thisBooking);

    !thisBooking && createError(404, "No have this booking")
    if (isNaN(thisBooking.totalPrice) || thisBooking.totalPrice <= 0) {
        return createError(400, "Invalid price")
    }
    ///// Create Payment session :
    const sessionID = await stripe.checkout.sessions.create({
        payment_method_types: ["card", "promptpay"],
        line_items: [
            {
                price_data: {
                    currency: "thb",
                    product_data: { name: "Accommodation Booking" },
                    unit_amount: booking.totalPrice * 100
                },
                quantity: 1
            }
        ],
        mode: "payment",
        metadata: { bookingID: thisBooking.bookingID },
        success_url: `http://localhost:5173/payment-success`, //FRONTEND-WEB: เป็น URL ที่ Stripe จะทำการ redirect ผู้ใช้ไปยังเมื่อ ชำระเงินสำเร็จ, 
        // แสดงผลการชำระเงิน-page
        cancel_url: `http://localhost:5173/payment-cancel`//FRONTEND-WEB: เป็น URL ที่ Stripe จะทำการ redirect ผู้ใช้ไปยังเมื่อ ยกเลิกการชำระเงิน., 
        // ถ้าผู้ใช้ยกเลิกกระบวนการชำระเงิน (เช่น การกดปุ่ม "ยกเลิก" หรือปิดหน้า Stripe Checkout), 
        // Stripe จะพาผู้ใช้ไปยัง cancel_url., แสดงข้อความการยกเลิก-page

        //การตั้งค่า success_url และ cancel_url เป็นการกำหนด URL ที่ Stripe 
        // จะทำการ redirect ผู้ใช้ไปหลังจากที่ชำระเงินเสร็จสิ้นหรือยกเลิกการชำระเงิน.
    })
    console.log('sessionID', sessionID); // ✅ ส่ง session.id กลับไปให้ Frontend ใช้เปิด Stripe Checkout

    res.status(200).json({ message: "Success Create Payment" })
})
// createPaymentSession เป็น Controller ที่ใช้สร้าง Payment Session ใน Stripe

// ใช้เมื่อ User ทำการจองที่พักและต้องการจ่ายเงิน
// ส่งรายละเอียดการจองไปยัง Stripe เพื่อให้ลูกค้าชำระเงิน
// ส่ง session.id กลับไปให้ Frontend ใช้เรียก Stripe Checkout
// 1️ ตรวจสอบ bookingID และดึงข้อมูลการจองจากฐานข้อมูล
// 2️ สร้าง Payment Session กับ Stripe
// 3️ ส่ง session.id กลับไปให้ Frontend
// const session:
//  แจ้งให้ Stripe สร้าง Checkout Session
//  รองรับการจ่ายเงินด้วย "card" และ "promptpay"
//  ตั้งค่า unit_amount เป็น thisBooking.totalPrice * 100 (เพราะ Stripe ใช้หน่วยเป็น สตางค์ ไม่ใช่บาท)
//  ใช้ metadata เพื่อส่ง bookingID ไปกับ Payment Session
//  กำหนด success_url และ cancel_url ให้ Frontend ใช้
//  ส่ง session.id กลับไปให้ Frontend ใช้เปิด Stripe Checkout
//  Frontend จะใช้ session.id เพื่อ Redirect ไปที่ Stripe Payment Page
//  ภาพรวมของการทำงาน
// 1️ Backend (createPaymentSession) สร้าง Payment Session และส่ง session.id ไปให้ Frontend

// 2️ Frontend (React / Next.js) ใช้ session.id เพื่อเปิดหน้า Checkout ของ Stripe
// 3️ ลูกค้าชำระเงินใน Stripe Checkout Page
// 4️ Stripe ส่ง Webhook กลับมาแจ้ง Backend ว่า Payment สำเร็จ --> stripeWebhook Controller
// Webhook ของ Stripe จะส่งข้อมูลการชำระเงินสำเร็จ/ไม่สำเร็จไปที่ stripeWebhook Controller
//  ดังนั้น stripeWebhook มีหน้าที่รับข้อมูลจาก Stripe และอัปเดตฐานข้อมูล
////// NOTE: 
// 1️ createPaymentSession แค่สร้าง Session สำหรับการชำระเงินเท่านั้น
// ตอนนี้ยังไม่มีการชำระเงินจริง
// เราไม่สามารถเก็บ paymentMethod, paymentStatus ได้ เพราะลูกค้ายังไม่จ่าย
// 2️ stripeWebhook ได้รับ Event หลังลูกค้าชำระเงินเสร็จ
// ข้อมูลจาก Stripe จะบอกเราว่า ลูกค้าชำระเงินสำเร็จจริงหรือไม่
// stripeWebhook มีข้อมูล paymentMethod, amount_total, currency
// เราสามารถบันทึกลงตาราง Payment ได้อย่างถูกต้อง

///// WEBHOOK //UPDATE Status
// เมื่อ Stripe ส่ง webhook event มาที่เซิร์ฟเวอร์ของคุณ (เช่นการแจ้งเตือนเมื่อมีการชำระเงินสำเร็จ), 
// มันจะรวมข้อมูลต่าง ๆ (เช่น event type, payment status, และ metadata) ใน HTTP request body ที่ส่งไปยัง 
// URL ที่คุณกำหนดไว้ใน Stripe Dashboard.
// แต่เพื่อป้องกันไม่ให้ใครสามารถปลอมแปลงข้อมูลหรือเรียกใช้งาน webhook API ของคุณได้, 
// Stripe จะเซ็นชื่อข้อมูลเหล่านั้น (โดยใช้ HMAC signature) และใส่ลายเซ็น (signature) นี้ใน HTTP headers 
// ที่มีชื่อว่า stripe-signature. (ค่าที่ดึงออกมาใน sig คือ Stripe signature)

//การสร้าง payment record ในฐานข้อมูลของคุณ (เช่น payment table ในฐานข้อมูล) ควรทำใน stripeWebhook 
// หลังจากที่ Frontend เปิด Stripe Checkout form และการชำระเงินเสร็จสิ้น.
exports.stripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
        // req.rawBody คือ body ของ request ที่รับมาจาก Stripe (ข้อมูล webhook event).
        // สร้าง event จากข้อมูลที่รับมาใน request body (ที่มีลายเซ็นต์นี้) และตรวจสอบว่า signature ที่แนบมาใน headers ตรงกับข้อมูลที่ Stripe เซ็นชื่อให้.
        //process.env.STRIPE_WEBHOOK_SECRET คือ secret key ของ webhook ที่คุณได้รับจาก Stripe Dashboard, ซึ่งใช้ในการตรวจสอบความถูกต้องของลายเซ็นต์
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // เมื่อจ่ายเงินสำเร็จ: อัปเดต Booking เป็น "CONFIRMED", Payment "PAID" 
    if (event.type === 'checkout.session.completed') {
        const bookingID = event.data.object.metadata.bookingID;
        const paymentMethod = event.data.object.payment_method_types[0]; // เช่น "card", "promptpay"
        const paymentIntentId = event.data.object.payment_intent; // Stripe Payment ID

        await prisma.booking.update({
            where: { id: parseInt(bookingID) },
            data: { bookingStatus: "CONFIRMED" }
        });

        await prisma.payment.create({ /// Create Payment data after Checkouted
            data: {
                bookingId: parseInt(bookingID),
                paymentIntentId: paymentIntentId, //happens when checkouted
                paymentMethod: paymentMethod,
                paymentStatus: "PAID"
            }
        });
        console.log(`Booking ${bookingID} updated to CONFIRMED & Payment recorded`);
    }

    // เมื่อยกเลิกการจ่ายเงิน: อัปเดต Payment "FAILED" 
    if (event.type === 'checkout.session.canceled') {
        const bookingID = event.data.object.metadata.bookingID;
        const paymentMethod = event.data.object.payment_method_types[0]; // เช่น "card", "promptpay"
        const paymentIntentId = event.data.object.payment_intent; // Stripe Payment ID

        await prisma.payment.create({ /// Create Payment data after Checkouted
            data: {
                bookingId: parseInt(bookingID),
                paymentIntentId: paymentIntentId, //happens when checkouted
                paymentMethod: paymentMethod,
                paymentStatus: "FAILED"
            }
        });
        console.log(`Booking ${bookingID} updated to Payment "FAILED"`);
    }

    // ถ้ามีการคืนเงินแล้ว: อัปเดต Payment เป็น "FAILED" --> from cancelBooking
    if (event.type === 'charge.refunded') { //from stripe

        const paymentIntentId = event.data.object.payment_intent;

        // 🔹 อัปเดต Payment Status เป็น FAILED
        await prisma.payment.update({
            where: { paymentIntentId: paymentIntentId },
            data: { paymentStatus: "FAILED" }
        });

        console.log("Update PaymentStatus FAILED");
    }

    res.json({ received: true }); //res. to Stripe (Dont send webhook again)
    res.send("WEBHOOK")
};


//  โครงสร้างหลักของ stripeWebhook :
//  รับ Event จาก Stripe และตรวจสอบความถูกต้อง
//  อัปเดต Booking เป็น "CONFIRMED" เมื่อชำระเงินสำเร็จ
//  บันทึกข้อมูลการชำระเงิน ลงในตาราง payment
//  อัปเดต Booking เป็น "CANCELLED" และ Payment เป็น "FAILED" เมื่อมีการขอ Refund --> cancelBooking

//  รับข้อมูล Event จาก Stripe
//  ใช้ stripe.webhooks.constructEvent() เพื่อตรวจสอบว่า Event มาจาก Stripe จริงหรือไม่
// ถ้าลายเซ็นไม่ถูกต้อง(เช่น มีคนพยายามแฮ็ก Webhook) จะ ส่ง Error 400 และปิดการทำงาน
