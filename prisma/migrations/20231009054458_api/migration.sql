/*
  Warnings:

  - You are about to drop the column `creatorId` on the `Project` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,projectId]` on the table `ProjectMember` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Project` DROP FOREIGN KEY `Project_creatorId_fkey`;

-- AlterTable
ALTER TABLE `Project` DROP COLUMN `creatorId`;

-- CreateTable
CREATE TABLE `Api` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL DEFAULT '',
    `description` VARCHAR(255) NOT NULL DEFAULT '',
    `endpoint` VARCHAR(255) NOT NULL,
    `method` ENUM('GET', 'PUT', 'DELETE', 'POST', 'HEAD', 'CONNECT', 'OPTIONS', 'TRACE', 'PATCH', 'CUSTOM') NOT NULL,
    `params` JSON NOT NULL,
    `body` JSON NOT NULL,
    `headers` JSON NOT NULL,
    `authorization` JSON NOT NULL,
    `preRequestScript` VARCHAR(191) NOT NULL,
    `postResponseScript` VARCHAR(191) NOT NULL,
    `tags` JSON NOT NULL,
    `versions` JSON NOT NULL,
    `order` INTEGER NOT NULL,
    `status` ENUM('DRAFT', 'PUBLISHED') NOT NULL DEFAULT 'DRAFT',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `projectId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `ProjectMember_userId_projectId_key` ON `ProjectMember`(`userId`, `projectId`);

-- AddForeignKey
ALTER TABLE `Api` ADD CONSTRAINT `Api_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
