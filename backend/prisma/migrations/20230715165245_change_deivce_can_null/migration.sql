-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_deviceId_fkey`;

-- AlterTable
ALTER TABLE `users` MODIFY `deviceId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_deviceId_fkey` FOREIGN KEY (`deviceId`) REFERENCES `devices`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
