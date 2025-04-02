const TryCatch = require("../../utils/TryCatch");
const prisma = require('../../models');
const createError = require("../../utils/createError");



exports.getMyAllChats = TryCatch(async (req, res) => {
    // console.log('req.user.id', req.user.id);

    /// FIND ALL CONVERSTION's this USER:
    const myAllChats = await prisma.conversation.findMany({
        where: {
            OR: [
                {
                    participant1ID: req.user.id, //CASE: This user is participant1ID
                },
                {
                    participant2ID: req.user.id  //CASE: This user is participant2ID
                },

            ]
        },
        include: { //GET USER DATA IN USER TABLE
            participant1: true,
            participant2: true,
            Message: true
        }
    })
    console.log('myAllChats', myAllChats);
    if (myAllChats.length === 0) {
        return res.status(404).json({ message: "NO HAVE DATA, Get myAllConversations Data already!" })
    }
    // myAllChats.length > 0
    res.status(200).json({ message: "SUCCESS, Get myAllConversations Data already!", results: myAllChats })
})


exports.getChatConversationID = TryCatch(async (req, res) => {
    console.log('req.params', req.params); //conversationID


    if (!req.params.conversationID) {
        return createError(400, "Please send all required data, Cannot create New Message!")
    }

    /// HAVE ALL REQUIRED DATA
    const chatHistory = await prisma.conversation.findUnique({
        where: {
            conversationID: parseInt(req.params.conversationID)
        },
        include: {
            participant1: true,  // ดึงข้อมูลของ participant1 จากตาราง User
            participant2: true,  // ดึงข้อมูลของ participant1 จากตาราง User
            Message: {
                include: {
                    receiver: true,
                    sender: true
                },
                orderBy: { sentAt: 'asc' }
            }   // ดึงข้อมูลของ Message ที่เกี่ยวข้อง
        }
    })

    console.log('chatHistory', chatHistory); //SEND TO FRONTED
    if (!chatHistory) {
        return res.status(404).json({ message: `NO HAVE DATA with conversationID ${req.params.conversationID}` })
    }

    res.status(200).json({ message: `SUCCESS, Get chatHistory with conversationID ${req.params.conversationID} already!`, results: chatHistory })
})