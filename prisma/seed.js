const prisma = require('../models')


const accommodations = [
    {
        hostID: "1",
        accomCateID: 1,
        typeOfAccom: "PRIVATEROOM",
        pricePerNight: 50.00,
        availQTY: 5,
        title: "Cozy Private Room in City Center",
        description: "A comfortable private room in the heart of the city, close to major attractions.",
        addressDetail: "123 Main Street, Apt 4B",
        city: "New York",
        country: "USA",
        MaxGuests: 2,
        NumBedrooms: 1,
        NumBathrooms: 1,
        latitude: 40.712776,
        longitude: -74.005974,
        createAt: new Date(),
        updatedAt: new Date()
    },
    {
        hostID: "2",
        accomCateID: 2,
        typeOfAccom: "ENTIREHOME",
        pricePerNight: 120.00,
        availQTY: 3,
        title: "Modern Apartment with Ocean View",
        description: "A stunning apartment with breathtaking ocean views and all modern amenities.",
        addressDetail: "45 Seaside Avenue",
        city: "Los Angeles",
        country: "USA",
        MaxGuests: 4,
        NumBedrooms: 2,
        NumBathrooms: 2,
        latitude: 34.052235,
        longitude: -118.243683,
        createAt: new Date(),
        updatedAt: new Date()
    },
    {
        hostID: "3",
        accomCateID: 3,
        typeOfAccom: "SHAREDROOM",
        pricePerNight: 25.00,
        availQTY: 8,
        title: "Budget Shared Room in Downtown",
        description: "A shared room with bunk beds, perfect for budget travelers.",
        addressDetail: "12 Budget Street, Hostel Room 5",
        city: "Chicago",
        country: "USA",
        MaxGuests: 6,
        NumBedrooms: 1,
        NumBathrooms: 1,
        latitude: 41.878113,
        longitude: -87.629799,
        createAt: new Date(),
        updatedAt: new Date()
    },
    {
        hostID: "4",
        accomCateID: 4,
        typeOfAccom: "ENTIREHOME",
        pricePerNight: 200.00,
        availQTY: 2,
        title: "Luxury Villa with Private Pool",
        description: "Experience luxury in this private villa with a pool and breathtaking views.",
        addressDetail: "77 Palm Beach Road",
        city: "Miami",
        country: "USA",
        MaxGuests: 6,
        NumBedrooms: 3,
        NumBathrooms: 3,
        latitude: 25.761681,
        longitude: -80.191788,
        createAt: new Date(),
        updatedAt: new Date()
    },
    {
        hostID: "5",
        accomCateID: 5,
        typeOfAccom: "PRIVATEROOM",
        pricePerNight: 75.00,
        availQTY: 4,
        title: "Spacious Room near Central Park",
        description: "A large private room within walking distance of Central Park.",
        addressDetail: "89 West Street",
        city: "New York",
        country: "USA",
        MaxGuests: 3,
        NumBedrooms: 1,
        NumBathrooms: 1,
        latitude: 40.785091,
        longitude: -73.968285,
        createAt: new Date(),
        updatedAt: new Date()
    },
]






async function seedDB() {
    // await prisma.user.createMany({ data: userData })
    await prisma.accommodation.createMany({ data: accommodations })
    // await prisma.accomCate.createMany({ data: accomCategory })

}

seedDB() // npx prisma db seed