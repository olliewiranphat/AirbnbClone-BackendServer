/*
  Warnings:

  - You are about to drop the column `paymentMethod` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `paymentStatus` on the `booking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `booking` DROP COLUMN `paymentMethod`,
    DROP COLUMN `paymentStatus`;

-- CreateTable
CREATE TABLE `Payment` (
    `paymentID` INTEGER NOT NULL AUTO_INCREMENT,
    `paymentMethod` ENUM('CREDITCARD', 'PROMPTPAY') NOT NULL DEFAULT 'CREDITCARD',
    `paymentStatus` ENUM('PENDING', 'PAID', 'FAILED') NOT NULL DEFAULT 'PENDING',
    `createAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `bookingID` INTEGER NOT NULL,

    PRIMARY KEY (`paymentID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_bookingID_fkey` FOREIGN KEY (`bookingID`) REFERENCES `Booking`(`bookingID`) ON DELETE CASCADE ON UPDATE CASCADE;
