/*
  Warnings:

  - You are about to alter the column `created_at` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `update_at` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - The primary key for the `User_follower` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `fk_user` on the `User_follower` table. All the data in the column will be lost.
  - You are about to drop the column `follower_id` on the `User_follower` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `User_follower` table. All the data in the column will be lost.
  - Added the required column `followerId` to the `User_follower` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followingId` to the `User_follower` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `User_follower` DROP FOREIGN KEY `User_follower_fk_user_fkey`;

-- AlterTable
ALTER TABLE `User` MODIFY `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `update_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `User_follower` DROP PRIMARY KEY,
    DROP COLUMN `fk_user`,
    DROP COLUMN `follower_id`,
    DROP COLUMN `id`,
    ADD COLUMN `followerId` INTEGER NOT NULL,
    ADD COLUMN `followingId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`followerId`, `followingId`);

-- AddForeignKey
ALTER TABLE `User_follower` ADD CONSTRAINT `User_follower_followerId_fkey` FOREIGN KEY (`followerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_follower` ADD CONSTRAINT `User_follower_followingId_fkey` FOREIGN KEY (`followingId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
