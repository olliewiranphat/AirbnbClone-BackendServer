const { clerkClient } = require('@clerk/express')
const TryCatch = require('../utils/TryCatch');
const createError = require('../utils/createError');

///// Login?? -- getToken to verity by Clerk :
module.exports = TryCatch(async (req, res, next) => {
    console.log('req.auth >>>', req.auth);
    // const clerkID = req.auth.userId
    !req.auth.userId && createError(401, "Unauthorized!")
    ///// Have userId at Clerk:
    req.user = await clerkClient.users.getUser(req.auth.userId)
    next() //next to do next MW/Controller
})