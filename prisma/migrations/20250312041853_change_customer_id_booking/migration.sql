-- DropForeignKey
ALTER TABLE `booking` DROP FOREIGN KEY `Booking_customerID_fkey`;

-- DropIndex
DROP INDEX `Booking_customerID_fkey` ON `booking`;

-- AlterTable
ALTER TABLE `booking` MODIFY `customerID` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_customerID_fkey` FOREIGN KEY (`customerID`) REFERENCES `User`(`clerkID`) ON DELETE CASCADE ON UPDATE CASCADE;
