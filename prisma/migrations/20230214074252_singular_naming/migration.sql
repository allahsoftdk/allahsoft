/*
  Warnings:

  - You are about to alter the column `created_at` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `update_at` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the `Chat_messages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Chat_room_participants` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Chat_rooms` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post_comments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post_likes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Prayer_alarms` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Roles_users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Settings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User_followers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Chat_messages` DROP FOREIGN KEY `Chat_messages_fk_chat_room_fkey`;

-- DropForeignKey
ALTER TABLE `Chat_messages` DROP FOREIGN KEY `Chat_messages_fk_user_fkey`;

-- DropForeignKey
ALTER TABLE `Chat_room_participants` DROP FOREIGN KEY `Chat_room_participants_fk_chat_room_fkey`;

-- DropForeignKey
ALTER TABLE `Chat_room_participants` DROP FOREIGN KEY `Chat_room_participants_fk_user_fkey`;

-- DropForeignKey
ALTER TABLE `Post_comments` DROP FOREIGN KEY `Post_comments_fk_post_fkey`;

-- DropForeignKey
ALTER TABLE `Post_comments` DROP FOREIGN KEY `Post_comments_fk_user_fkey`;

-- DropForeignKey
ALTER TABLE `Post_likes` DROP FOREIGN KEY `Post_likes_fk_post_fkey`;

-- DropForeignKey
ALTER TABLE `Post_likes` DROP FOREIGN KEY `Post_likes_fk_user_fkey`;

-- DropForeignKey
ALTER TABLE `Roles_users` DROP FOREIGN KEY `Roles_users_fk_roles_fkey`;

-- DropForeignKey
ALTER TABLE `Roles_users` DROP FOREIGN KEY `Roles_users_fk_user_fkey`;

-- DropForeignKey
ALTER TABLE `User_followers` DROP FOREIGN KEY `User_followers_fk_user_fkey`;

-- AlterTable
ALTER TABLE `User` MODIFY `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `update_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- DropTable
DROP TABLE `Chat_messages`;

-- DropTable
DROP TABLE `Chat_room_participants`;

-- DropTable
DROP TABLE `Chat_rooms`;

-- DropTable
DROP TABLE `Post_comments`;

-- DropTable
DROP TABLE `Post_likes`;

-- DropTable
DROP TABLE `Prayer_alarms`;

-- DropTable
DROP TABLE `Roles`;

-- DropTable
DROP TABLE `Roles_users`;

-- DropTable
DROP TABLE `Settings`;

-- DropTable
DROP TABLE `User_followers`;

-- CreateTable
CREATE TABLE `Prayer_alarm` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `prayer_alarm` DATETIME NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Setting` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `setting_name` VARCHAR(255) NOT NULL,
    `setting_value` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User_follower` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `follower_id` INTEGER NOT NULL,
    `fk_user` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post_comment` (
    `comment` TINYTEXT NOT NULL,
    `fk_post` INTEGER NOT NULL,
    `fk_user` INTEGER NOT NULL,

    PRIMARY KEY (`fk_post`, `fk_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post_like` (
    `fk_post` INTEGER NOT NULL,
    `fk_user` INTEGER NOT NULL,

    PRIMARY KEY (`fk_post`, `fk_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Chat_room` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Chat_message` (
    `messages` VARCHAR(255) NOT NULL,
    `fk_chat_room` INTEGER NOT NULL,
    `fk_user` INTEGER NOT NULL,

    PRIMARY KEY (`fk_chat_room`, `fk_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Chat_room_participant` (
    `fk_chat_room` INTEGER NOT NULL,
    `fk_user` INTEGER NOT NULL,

    PRIMARY KEY (`fk_chat_room`, `fk_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role_user` (
    `fk_roles` INTEGER NOT NULL,
    `fk_user` INTEGER NOT NULL,

    PRIMARY KEY (`fk_roles`, `fk_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User_follower` ADD CONSTRAINT `User_follower_fk_user_fkey` FOREIGN KEY (`fk_user`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post_comment` ADD CONSTRAINT `Post_comment_fk_post_fkey` FOREIGN KEY (`fk_post`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post_comment` ADD CONSTRAINT `Post_comment_fk_user_fkey` FOREIGN KEY (`fk_user`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post_like` ADD CONSTRAINT `Post_like_fk_post_fkey` FOREIGN KEY (`fk_post`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post_like` ADD CONSTRAINT `Post_like_fk_user_fkey` FOREIGN KEY (`fk_user`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat_message` ADD CONSTRAINT `Chat_message_fk_chat_room_fkey` FOREIGN KEY (`fk_chat_room`) REFERENCES `Chat_room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat_message` ADD CONSTRAINT `Chat_message_fk_user_fkey` FOREIGN KEY (`fk_user`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat_room_participant` ADD CONSTRAINT `Chat_room_participant_fk_chat_room_fkey` FOREIGN KEY (`fk_chat_room`) REFERENCES `Chat_room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat_room_participant` ADD CONSTRAINT `Chat_room_participant_fk_user_fkey` FOREIGN KEY (`fk_user`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Role_user` ADD CONSTRAINT `Role_user_fk_roles_fkey` FOREIGN KEY (`fk_roles`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Role_user` ADD CONSTRAINT `Role_user_fk_user_fkey` FOREIGN KEY (`fk_user`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
