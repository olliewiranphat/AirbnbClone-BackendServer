const prisma = require('../models')



async function seedDB() {
    await prisma.category.createMany({ data: categoryData })
}

seedDB() // npx prisma db seed