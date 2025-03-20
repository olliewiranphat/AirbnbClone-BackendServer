const prisma = require('../models')


const products = [
    {
        productName: "Wireless Bluetooth Headphones",
        description: "High-quality over-ear headphones with noise cancellation.",
        price: 79.99,
        stockQuantity: 50,
    },
    {
        productName: "Smartphone Stand",
        description: "Adjustable aluminum stand for smartphones and tablets.",
        price: 19.99,
        stockQuantity: 200,
    },
    {
        productName: "Gaming Mouse",
        description: "Ergonomic wireless gaming mouse with customizable buttons.",
        price: 49.99,
        stockQuantity: 100,
    },
    {
        productName: "Mechanical Keyboard",
        description: "RGB backlit mechanical keyboard with blue switches.",
        price: 89.99,
        stockQuantity: 75,
    },
    {
        productName: "USB-C Hub",
        description: "Multi-port USB-C hub with HDMI, USB 3.0, and SD card slots.",
        price: 34.99,
        stockQuantity: 150,
    },
    {
        productName: "Portable Power Bank",
        description: "10,000mAh fast-charging power bank with dual USB ports.",
        price: 29.99,
        stockQuantity: 120,
    },
    {
        productName: "Smartwatch",
        description: "Waterproof smartwatch with heart rate and sleep tracking.",
        price: 99.99,
        stockQuantity: 60,
    },
    {
        productName: "Noise-Canceling Earbuds",
        description: "True wireless earbuds with active noise cancellation.",
        price: 69.99,
        stockQuantity: 90,
    },
    {
        productName: "4K Ultra HD Webcam",
        description: "High-resolution webcam with built-in microphone and autofocus.",
        price: 59.99,
        stockQuantity: 80,
    },
    {
        productName: "LED Desk Lamp",
        description: "Dimmable LED desk lamp with adjustable brightness levels.",
        price: 24.99,
        stockQuantity: 110,
    },
];


const userData = [
    {
        clerkID: "1",
        fullName: "John",
        email: "johndoe@example.com",
        phoneNumber: "+1 555-123-4567",
        address: "123 Main St, New York, NY, USA",
    },
    {
        clerkID: "2",
        fullName: "Jane",
        email: "janesmith@example.com",
        phoneNumber: "+1 555-234-5678",
        address: "456 Oak St, Los Angeles, CA, USA",
    },
    {
        clerkID: "3",
        fullName: "Michael",
        email: "michaelj@example.com",
        phoneNumber: "+1 555-345-6789",
        address: "789 Pine St, Chicago, IL, USA",
    },
    {
        clerkID: "4",
        fullName: "Emily",
        email: "emilyd@example.com",
        phoneNumber: "+1 555-456-7890",
        address: "321 Elm St, Houston, TX, USA",
    },
    {
        clerkID: "5",
        fullName: "Robert",
        email: "robertw@example.com",
        phoneNumber: "+1 555-567-8901",
        address: "654 Cedar St, Phoenix, AZ, USA",
    },
    {
        clerkID: "6",
        fullName: "Sophia",
        email: "sophiam@example.com",
        phoneNumber: "+1 555-678-9012",
        address: "987 Birch St, Philadelphia, PA, USA",
    },
    {
        clerkID: "7",
        fullName: "David",
        email: "david.a@example.com",
        phoneNumber: "+1 555-789-0123",
        address: "741 Maple St, San Antonio, TX, USA",
    },
    {
        clerkID: "8",
        fullName: "Olivia",
        email: "oliviab@example.com",
        phoneNumber: "+1 555-890-1234",
        address: "852 Walnut St, San Diego, CA, USA",
    },
    {
        clerkID: "9",
        fullName: "William",
        email: "willh@example.com",
        phoneNumber: "+1 555-901-2345",
        address: "369 Spruce St, Dallas, TX, USA",
    },
    {
        clerkID: "10",
        fullName: "Ava",
        email: "avac@example.com",
        phoneNumber: "+1 555-012-3456",
        address: "258 Aspen St, San Jose, CA, USA",
    }
];

const accommodations = [
    {
        hostID: "1",
        accomCateID : 1,
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
        accomCateID : 2,
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
        accomCateID : 3,
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
        accomCateID : 4,
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
        accomCateID : 5,
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
  
const accomCategory = [
    {
        cateName : "Pool"
    },
    {
        cateName : "Hot tube"
    },
    {
        cateName : "Free Parking"
    },
    {
        cateName : "EV Charging"
    },
    {
        cateName : "Crib"
    },
    {
        cateName : "King bed"
    },
    {
        cateName : "Gym"
    },
    {
        cateName : "BBQ grill"
    },
    {
        cateName : "Breakfast"
    },
    {
        cateName : "Indoor fireplace"
    },
    {
        cateName : "Smoking allowed"
    },
]

console.log(accommodations);




async function seedDB() {
    // await prisma.user.createMany({ data: userData })
    await prisma.accommodation.createMany({ data: accommodations })
    // await prisma.accomCate.createMany({ data: accomCategory })

}

seedDB() // npx prisma db seed