const TryCatch = require("../../utils/TryCatch");

exports.getMessageHistory = TryCatch(async (req, res) => {
    res.status(200).json({ message: "SUCCESS, Get Message History already!" })
})


exports.createNewMessage = TryCatch(async (req, res) => {
    res.status(200).json({ message: "SUCCESS, Create New Message already!" })
})