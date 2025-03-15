const prisma = require('../models')
require('dotenv').config()

async function resetDB() {
    try {
        // Drop and recreate the database
        await prisma.$executeRawUnsafe('DROP DATABASE `airbnbclone`');
        await prisma.$executeRawUnsafe('CREATE DATABASE `airbnbclone`');
        console.log("Database reset successfully!");
    } catch (error) {
        console.error("Error resetting the database:", error);
    } finally {
        // Disconnect Prisma client
        await prisma.$disconnect();
    }
}

console.log("Resetting DB...");
resetDB(); //npm prisma resetDB

// "scripts": {
//     "dev": "nodemon server.js",
//     "start": "nodemon server.js",
//     "resetDB": "node prisma/resetDB.js"
//   }