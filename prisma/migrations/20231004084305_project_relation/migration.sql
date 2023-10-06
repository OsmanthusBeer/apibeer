/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `Project` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(50)`.

*/
-- DropForeignKey
ALTER TABLE `ProjectMember` DROP FOREIGN KEY `ProjectMember_projectId_fkey`;

-- DropForeignKey
ALTER TABLE `ProjectMember` DROP FOREIGN KEY `ProjectMember_userId_fkey`;

-- AlterTable
ALTER TABLE `Project` DROP COLUMN `deletedAt`,
    MODIFY `name` VARCHAR(50) NOT NULL;

-- AddForeignKey
ALTER TABLE `ProjectMember` ADD CONSTRAINT `ProjectMember_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectMember` ADD CONSTRAINT `ProjectMember_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
