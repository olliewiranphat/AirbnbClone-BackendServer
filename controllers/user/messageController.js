const createError = require("../../utils/createError");
const TryCatch = require("../../utils/TryCatch");
const prisma = require('../../models')

exports.sendMessage = TryCatch(async (req, res) => {
    console.log('req.user', req.user); //id (clerk)
    console.log('req.params', req.params); //receiverID
    console.log('req.body', req.body); //message

    !req.body.message && createError("Message and receiverID are required")

    const newMessage = await prisma.message.create({
        data: {
            senderID: req.user.id,
            receiverID: req.params.receiverID,
            message: req.body.message
        }
    })
    console.log('newMessage', newMessage);
    res.status(200).json({ message: "Create new message already!" })
})

exports.getMessage = TryCatch(async (req, res) => {
    console.log('req.user', req.user); //id (clerk)
    console.log('req.params', req.params); //receiverID


    const getMessage = await prisma.message.findMany({
        where: {
            OR: [
                { senderID, receiverID },
                { senderID: receiverID, receiverID: senderID }
            ]
        },
        orderBy: {
            sentAt: 'asc'
        }
    })
    console.log('getMessage', getMessage);
    res.status(200).json({ message: "Create new message already!" })
})