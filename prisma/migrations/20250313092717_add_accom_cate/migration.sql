/*
  Warnings:

  - Added the required column `accomCateID` to the `Accommodation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `accommodation` ADD COLUMN `accomCateID` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `AccomCate` (
    `accomcateID` INTEGER NOT NULL AUTO_INCREMENT,
    `cateName` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`accomcateID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Accommodation` ADD CONSTRAINT `Accommodation_accomCateID_fkey` FOREIGN KEY (`accomCateID`) REFERENCES `AccomCate`(`accomcateID`) ON DELETE CASCADE ON UPDATE CASCADE;
