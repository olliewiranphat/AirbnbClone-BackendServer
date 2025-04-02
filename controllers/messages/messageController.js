const TryCatch = require("../../utils/TryCatch");
const prisma = require('../../models')



exports.sendCreateMessage = TryCatch(async (req, res) => {
    const newMessage = await prisma.message.create({
        data: {
            conversationID: parseInt(req.params.conversationID),
            senderID: req.body.senderID,
            receiverID: req.body.receiverID,
            message: req.body.message
        }
    })
    console.log('newMessage', newMessage); //messageID

    res.status(200).json({ message: "SUCCESS, Create New Message already!", results: newMessage })
})


exports.updateIsReadMessage = TryCatch(async (req, res) => {

    const updateIsRead = await prisma.message.update({
        where: { messageID: parseInt(req.params.messageID) },
        data: { isRead: true }
    })


    res.status(200).json({ message: "SUCCESS, Message marked as read", results: updateIsRead })
})