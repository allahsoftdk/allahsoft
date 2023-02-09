/*
  Warnings:

  - Added the required column `created_at` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_at` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `created_at` DATETIME NOT NULL,
    ADD COLUMN `password` TEXT NOT NULL,
    ADD COLUMN `token` TEXT NOT NULL,
    ADD COLUMN `update_at` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `Prayer_alarms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `prayer_alarm` DATETIME NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Settings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `setting_name` VARCHAR(255) NOT NULL,
    `setting_value` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` TINYTEXT NOT NULL,
    `resources` VARCHAR(255) NOT NULL,
    `fk_user` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User_followers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `follower_id` INTEGER NOT NULL,
    `fk_user` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post_comments` (
    `fk_post` INTEGER NOT NULL,
    `fk_user` INTEGER NOT NULL,

    PRIMARY KEY (`fk_post`, `fk_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_fk_user_fkey` FOREIGN KEY (`fk_user`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_followers` ADD CONSTRAINT `User_followers_fk_user_fkey` FOREIGN KEY (`fk_user`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post_comments` ADD CONSTRAINT `Post_comments_fk_post_fkey` FOREIGN KEY (`fk_post`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post_comments` ADD CONSTRAINT `Post_comments_fk_user_fkey` FOREIGN KEY (`fk_user`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
