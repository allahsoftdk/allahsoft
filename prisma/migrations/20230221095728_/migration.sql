/*
  Warnings:

  - You are about to drop the column `messages` on the `Chat_message` table. All the data in the column will be lost.
  - You are about to alter the column `created_at` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `update_at` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `message` to the `Chat_message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Chat_message` DROP COLUMN `messages`,
    ADD COLUMN `message` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `update_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
