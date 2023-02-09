/*
  Warnings:

  - You are about to alter the column `prayer_alarm` on the `Prayer_alarms` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `update_at` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `Prayer_alarms` MODIFY `prayer_alarm` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `created_at` DATETIME NOT NULL,
    MODIFY `update_at` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `Chat_rooms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Chat_messages` (
    `messages` VARCHAR(255) NOT NULL,
    `fk_chat_room` INTEGER NOT NULL,
    `fk_user` INTEGER NOT NULL,

    PRIMARY KEY (`fk_chat_room`, `fk_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Chat_room_participants` (
    `fk_chat_room` INTEGER NOT NULL,
    `fk_user` INTEGER NOT NULL,

    PRIMARY KEY (`fk_chat_room`, `fk_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Chat_messages` ADD CONSTRAINT `Chat_messages_fk_chat_room_fkey` FOREIGN KEY (`fk_chat_room`) REFERENCES `Chat_rooms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat_messages` ADD CONSTRAINT `Chat_messages_fk_user_fkey` FOREIGN KEY (`fk_user`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat_room_participants` ADD CONSTRAINT `Chat_room_participants_fk_chat_room_fkey` FOREIGN KEY (`fk_chat_room`) REFERENCES `Chat_rooms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat_room_participants` ADD CONSTRAINT `Chat_room_participants_fk_user_fkey` FOREIGN KEY (`fk_user`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
