/*
  Warnings:

  - You are about to alter the column `prayer_alarm` on the `Prayer_alarms` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `update_at` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `comment` to the `Post_comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Post_comments` ADD COLUMN `comment` TINYTEXT NOT NULL;

-- AlterTable
ALTER TABLE `Prayer_alarms` MODIFY `prayer_alarm` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `created_at` DATETIME NOT NULL,
    MODIFY `update_at` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `Post_likes` (
    `fk_post` INTEGER NOT NULL,
    `fk_user` INTEGER NOT NULL,

    PRIMARY KEY (`fk_post`, `fk_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Post_likes` ADD CONSTRAINT `Post_likes_fk_post_fkey` FOREIGN KEY (`fk_post`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post_likes` ADD CONSTRAINT `Post_likes_fk_user_fkey` FOREIGN KEY (`fk_user`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
