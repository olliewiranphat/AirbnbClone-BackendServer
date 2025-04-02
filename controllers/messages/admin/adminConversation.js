const prisma = require('../../../models')
const createError = require("../../../utils/createError");
const TryCatch = require("../../../utils/TryCatch");


exports.getChatWithAdmin = TryCatch(async (req, res) => {
    // SELECT ADMIN FOR USER:
    const adminData = await prisma.user.findFirst({
        where: {
            role: "ADMIN"
        },
        select: {
            clerkID: true,
            fullName: true,
            imageUrl: true,
            status: true,
            role: true
        }
    })
    console.log('adminData', adminData);
    !adminData && createError(404, "No have admin support yet!")

    /// HAVE ADMIN SUPPORT in DB:
    /// CHECK EVER TALKED??
    let conversation = await prisma.conversation.findFirst({
        where: {
            OR: [
                { participant1ID: req.user.id, participant2ID: adminData.clerkID },
                { participant1ID: adminData.clerkID, participant2ID: req.user.id },

            ]
        },
        include: {
            Message: true, //CHAT HISTORY
            participant1: true,
            participant2: true
        }
    })

    if (!conversation) {
        conversation = await prisma.conversation.create({
            data: {
                participant1ID: req.user.id,
                participant2ID: adminData.clerkID
            },
            include: {
                participant1: true,
                participant2: true
            }
        })
    }
    console.log('conversation', conversation);


    res.status(200).json({ message: "SUCCESS, Create Conversation USER-ADMIN already!", results: conversation })
})



// User --> CHAT WITH ADMIN :
exports.createNewMessageAdmin = TryCatch(async (req, res) => {
    console.log('req.params', req.params); //conversationID, adminClerkID
    console.log('req.body', req.body); //message

    if (!req.params.conversationID || !req.params.adminClerkID || !req.body.message) {
        createError(400, "Please send all required data, Cannot create New Message!")
    }

    /// HAVE ALL REQUIRED DATA
    const newMessage = await prisma.message.create({
        data: {
            message: req.body.message,
            senderID: req.user.id,
            receiverID: req.params.adminClerkID,
            conversationID: parseInt(req.params.conversationID)
        }
    })

    console.log('newMessage', newMessage); //SEND TO FRONTED

    res.status(200).json({ message: "SUCCESS, Create New Message Chat with ADMIN already!" })
})