/*
  Warnings:

  - Added the required column `avatar` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Api` MODIFY `preRequestScript` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `postResponseScript` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `User` ADD COLUMN `avatar` VARCHAR(191) NOT NULL;
