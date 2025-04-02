const express = require('express')
const http = require("http"); // ✅ ใช้ HTTP Server
const app = express()
const server = http.createServer(app); // ✅ ใช้ HTTP Server

const { initSocket } = require('./socket'); // ✅ เรียก socket server ที่แยกไว้
// ✅ เชื่อมต่อ Socket.io
initSocket(server); // ✅ เริ่ม socket พร้อม HTTP server

const cors = require('cors')
const morgan = require('morgan')
const { clerkMiddleware } = require('@clerk/express')
require('dotenv').config()

const errorHandler = require('./middlewares/errorHandler')
const hostRouter = require('./router/hostRouter')
const adminRouter = require('./router/adminRouter')
const NotFound = require('./middlewares/NotFound')

///// Middlewares :
// app.use(cors({ origin: 'http://localhost:5173' })) // connect with Frontend
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json({ limit: "10mb" })) //Max Payload Size, Server can read
app.use(express.urlencoded({ extended: true })); // ✅ รองรับ form-data
app.use(morgan('dev')) //log API Req. path, method, time
app.use(clerkMiddleware()) //authentication : req.auth.userId (CLERK)





///// Router: 3 ROLES
app.use('/user', require('./router/userRouter'))
app.use('/host', hostRouter)
app.use('/admin', adminRouter)



//// Not Found Path: 
app.use(NotFound)

//// All Errors in Server :
app.use(errorHandler)

// ✅ Start Server
const PORT = process.env.PORT || 8081;
server.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
