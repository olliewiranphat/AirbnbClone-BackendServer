/*
  Warnings:

  - The primary key for the `imgsroom` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `imgsRoom` on the `imgsroom` table. All the data in the column will be lost.
  - Added the required column `imgsRoomID` to the `ImgsRoom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `imgsroom` DROP PRIMARY KEY,
    DROP COLUMN `imgsRoom`,
    ADD COLUMN `imgsRoomID` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`imgsRoomID`);
