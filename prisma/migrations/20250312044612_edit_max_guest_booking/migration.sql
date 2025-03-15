/*
  Warnings:

  - You are about to drop the column `accomQTY` on the `booking` table. All the data in the column will be lost.
  - Added the required column `guestQTY` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `booking` DROP COLUMN `accomQTY`,
    ADD COLUMN `guestQTY` INTEGER NOT NULL;
