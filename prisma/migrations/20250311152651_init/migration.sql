-- CreateTable
CREATE TABLE `User` (
    `userID` INTEGER NOT NULL AUTO_INCREMENT,
    `clerkID` VARCHAR(255) NOT NULL,
    `role` ENUM('CUSTOMER', 'HOST', 'ADMIN') NOT NULL DEFAULT 'CUSTOMER',
    `fullName` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NULL,
    `phoneNumber` VARCHAR(255) NULL,
    `address` VARCHAR(255) NULL,
    `imageUrl` VARCHAR(255) NULL,
    `createAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL,

    UNIQUE INDEX `User_clerkID_key`(`clerkID`),
    PRIMARY KEY (`userID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Accommodation` (
    `accommodationID` INTEGER NOT NULL AUTO_INCREMENT,
    `typeOfAccom` ENUM('ENTIREHOME', 'PRIVATEROOM', 'SHAREDROOM') NOT NULL DEFAULT 'PRIVATEROOM',
    `pricePerNight` DECIMAL(10, 2) NOT NULL,
    `availQTY` INTEGER NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `addressDetail` VARCHAR(500) NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    `country` VARCHAR(255) NOT NULL,
    `MaxGuests` INTEGER NOT NULL,
    `NumBedrooms` INTEGER NOT NULL,
    `NumBathrooms` INTEGER NOT NULL,
    `latitude` DECIMAL(9, 6) NOT NULL,
    `longitude` DECIMAL(9, 6) NOT NULL,
    `createAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL,
    `hostID` INTEGER NOT NULL,

    PRIMARY KEY (`accommodationID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Booking` (
    `bookingID` INTEGER NOT NULL AUTO_INCREMENT,
    `checkInDate` DATETIME(3) NOT NULL,
    `checkOutDate` DATETIME(3) NOT NULL,
    `accomQTY` INTEGER NOT NULL,
    `totalPrice` DECIMAL(10, 2) NOT NULL,
    `bookingStatus` ENUM('PENDING', 'CONFIRMED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    `paymentMethod` ENUM('CREDITCARD', 'PROMPTPAY') NOT NULL DEFAULT 'CREDITCARD',
    `paymentStatus` ENUM('PENDING', 'PAID', 'FAILED') NOT NULL DEFAULT 'PENDING',
    `createAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `customerID` INTEGER NOT NULL,
    `accomodationID` INTEGER NOT NULL,

    PRIMARY KEY (`bookingID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WishList` (
    `wishlistID` INTEGER NOT NULL AUTO_INCREMENT,
    `createAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `customerID` INTEGER NOT NULL,
    `accommodationID` INTEGER NOT NULL,

    PRIMARY KEY (`wishlistID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Message` (
    `messageID` INTEGER NOT NULL AUTO_INCREMENT,
    `message` TEXT NOT NULL,
    `sentAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `senderID` INTEGER NOT NULL,
    `receiverID` INTEGER NOT NULL,

    PRIMARY KEY (`messageID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review` (
    `reviewID` INTEGER NOT NULL AUTO_INCREMENT,
    `content` TEXT NOT NULL,
    `rating` DECIMAL(2, 1) NOT NULL,
    `createAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `customerID` INTEGER NOT NULL,
    `accommodationID` INTEGER NOT NULL,

    PRIMARY KEY (`reviewID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Room` (
    `roomID` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `accommmodationID` INTEGER NOT NULL,

    PRIMARY KEY (`roomID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ImgsRoom` (
    `imgsRoom` INTEGER NOT NULL AUTO_INCREMENT,
    `imageUrl` VARCHAR(191) NOT NULL,
    `roomID` INTEGER NOT NULL,

    PRIMARY KEY (`imgsRoom`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Amenity` (
    `amenityID` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`amenityID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AccomAmen` (
    `accommodationID` INTEGER NOT NULL,
    `amenityID` INTEGER NOT NULL,

    PRIMARY KEY (`accommodationID`, `amenityID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Accommodation` ADD CONSTRAINT `Accommodation_hostID_fkey` FOREIGN KEY (`hostID`) REFERENCES `User`(`userID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_customerID_fkey` FOREIGN KEY (`customerID`) REFERENCES `User`(`userID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_accomodationID_fkey` FOREIGN KEY (`accomodationID`) REFERENCES `Accommodation`(`accommodationID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WishList` ADD CONSTRAINT `WishList_customerID_fkey` FOREIGN KEY (`customerID`) REFERENCES `User`(`userID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WishList` ADD CONSTRAINT `WishList_accommodationID_fkey` FOREIGN KEY (`accommodationID`) REFERENCES `Accommodation`(`accommodationID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_senderID_fkey` FOREIGN KEY (`senderID`) REFERENCES `User`(`userID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_receiverID_fkey` FOREIGN KEY (`receiverID`) REFERENCES `User`(`userID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_customerID_fkey` FOREIGN KEY (`customerID`) REFERENCES `User`(`userID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_accommodationID_fkey` FOREIGN KEY (`accommodationID`) REFERENCES `Accommodation`(`accommodationID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Room` ADD CONSTRAINT `Room_accommmodationID_fkey` FOREIGN KEY (`accommmodationID`) REFERENCES `Accommodation`(`accommodationID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ImgsRoom` ADD CONSTRAINT `ImgsRoom_roomID_fkey` FOREIGN KEY (`roomID`) REFERENCES `Room`(`roomID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AccomAmen` ADD CONSTRAINT `AccomAmen_accommodationID_fkey` FOREIGN KEY (`accommodationID`) REFERENCES `Accommodation`(`accommodationID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AccomAmen` ADD CONSTRAINT `AccomAmen_amenityID_fkey` FOREIGN KEY (`amenityID`) REFERENCES `Amenity`(`amenityID`) ON DELETE CASCADE ON UPDATE CASCADE;
