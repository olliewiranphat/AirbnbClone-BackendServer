//Real-Time Client-Server
//รับข้อความจากผู้ใช้และส่งให้คู่สนทนาแบบ Real-time
//อัปเดต isRead ทันทีเมื่อผู้ใช้เปิดแชท

const { Server } = require('socket.io');
const prisma = require('../Backend-Server/models')

let io;

function initSocket(server) {
    io = new Server(server, {
        cors: {
            origin: '*', // หรือใส่ origin frontend จริง
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        console.log('🟢 New socket connected:', socket.id);

        socket.on('joinRoom', (conversationID) => {
            socket.join(conversationID);
            console.log(`📦 Joined room ${conversationID}`);
        });

        socket.on('sendMessage', async (data) => {
            const newMessage = await prisma.message.create({
                data: {
                    conversationID: data.conversationID,
                    senderID: data.senderID,
                    receiverID: data.receiverID,
                    message: data.message,
                },
            });

            io.to(data.conversationID).emit('receiveMessage', {
                ...newMessage,
            });
        });

        socket.on('markAsRead', async ({ messageIDs }) => {
            if (!Array.isArray(messageIDs) || messageIDs.length === 0) return;

            await prisma.message.updateMany({
                where: { messageID: { in: messageIDs } },
                data: { isRead: true }
            });

            console.log(`✅ Marked messages as read:`, messageIDs);

            // Optionally ส่งกลับไปให้ sender รู้ว่า message ถูกอ่าน
            socket.emit('messagesReadConfirmed', messageIDs);
        });

        socket.on('disconnect', () => {
            console.log('🔴 Socket disconnected:', socket.id);
        });
    });
}

module.exports = { initSocket };


