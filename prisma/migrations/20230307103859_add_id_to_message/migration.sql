/*
  Warnings:

  - The primary key for the `Chat_message` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `Chat_message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Chat_message` DROP FOREIGN KEY `Chat_message_chatRoomId_fkey`;

-- DropForeignKey
ALTER TABLE `Chat_message` DROP FOREIGN KEY `Chat_message_userId_fkey`;

-- AlterTable
ALTER TABLE `Chat_message` DROP PRIMARY KEY,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE INDEX `Chat_message_chatRoomId_userId_idx` ON `Chat_message`(`chatRoomId`, `userId`);

-- AddForeignKey
ALTER TABLE `Chat_message` ADD CONSTRAINT `Chat_message_chatRoomId_fkey` FOREIGN KEY (`chatRoomId`) REFERENCES `Chat_room`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat_message` ADD CONSTRAINT `Chat_message_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
