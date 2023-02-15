/*
  Warnings:

  - You are about to alter the column `prayer_alarm` on the `Prayer_alarm` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `update_at` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the `Role_user` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `fk_role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Role_user` DROP FOREIGN KEY `Role_user_fk_role_fkey`;

-- DropForeignKey
ALTER TABLE `Role_user` DROP FOREIGN KEY `Role_user_fk_user_fkey`;

-- AlterTable
ALTER TABLE `Prayer_alarm` MODIFY `prayer_alarm` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `fk_role` INTEGER NOT NULL,
    MODIFY `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `update_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- DropTable
DROP TABLE `Role_user`;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_fk_role_fkey` FOREIGN KEY (`fk_role`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
