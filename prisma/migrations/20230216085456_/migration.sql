/*
  Warnings:

  - You are about to alter the column `created_at` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `update_at` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the `Chat_room_participant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post_like` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role_user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Chat_room_participant` DROP FOREIGN KEY `Chat_room_participant_fk_chat_room_fkey`;

-- DropForeignKey
ALTER TABLE `Chat_room_participant` DROP FOREIGN KEY `Chat_room_participant_fk_user_fkey`;

-- DropForeignKey
ALTER TABLE `Post_like` DROP FOREIGN KEY `Post_like_fk_post_fkey`;

-- DropForeignKey
ALTER TABLE `Post_like` DROP FOREIGN KEY `Post_like_fk_user_fkey`;

-- DropForeignKey
ALTER TABLE `Role_user` DROP FOREIGN KEY `Role_user_fk_role_fkey`;

-- DropForeignKey
ALTER TABLE `Role_user` DROP FOREIGN KEY `Role_user_fk_user_fkey`;

-- AlterTable
ALTER TABLE `User` MODIFY `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `update_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- DropTable
DROP TABLE `Chat_room_participant`;

-- DropTable
DROP TABLE `Post_like`;

-- DropTable
DROP TABLE `Role_user`;

-- CreateTable
CREATE TABLE `_PostLike` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PostLike_AB_unique`(`A`, `B`),
    INDEX `_PostLike_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ChatRoomParticipants` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ChatRoomParticipants_AB_unique`(`A`, `B`),
    INDEX `_ChatRoomParticipants_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_PostLike` ADD CONSTRAINT `_PostLike_A_fkey` FOREIGN KEY (`A`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PostLike` ADD CONSTRAINT `_PostLike_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ChatRoomParticipants` ADD CONSTRAINT `_ChatRoomParticipants_A_fkey` FOREIGN KEY (`A`) REFERENCES `Chat_room`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ChatRoomParticipants` ADD CONSTRAINT `_ChatRoomParticipants_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
