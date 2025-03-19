const createError = require("../utils/createError");
const TryCatch = require("../utils/TryCatch");

module.exports = TryCatch(async (req, res, next) => {
    console.log('req.user', req.user);
    const { publicMetadata: { role } } = req.user
    role !== "HOST" && createError(401, "Access Denied Only HOST!")

    next()
})