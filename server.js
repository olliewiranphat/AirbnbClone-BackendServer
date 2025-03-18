const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const port = process.env.PORT || 8081
const morgan = require('morgan')
const { clerkMiddleware } = require('@clerk/express')

const errorHandler = require('./middlewares/errorHandler')
const hostRouter = require('./router/hostRouter')
const adminRouter = require('./router/adminRouter')
const NotFound = require('./middlewares/NotFound')

///// Middlewares :
// app.use(cors({ origin: 'http://localhost:5173' })) // connect with Frontend
app.use(cors()) // connect with Frontend
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

app.listen(port, () => console.log(`Server's running on PORT ${port}`))