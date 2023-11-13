-- AlterTable
ALTER TABLE `TeamMember` ADD COLUMN `status` ENUM('Pending', 'Success', 'Reject') NOT NULL DEFAULT 'Success';
