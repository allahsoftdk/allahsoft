/*
  Warnings:

  - You are about to alter the column `prayer_alarm` on the `Prayer_alarm` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - The primary key for the `Role_user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `fk_roles` on the `Role_user` table. All the data in the column will be lost.
  - You are about to alter the column `created_at` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `update_at` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `fk_role` to the `Role_user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Role_user` DROP FOREIGN KEY `Role_user_fk_roles_fkey`;

-- AlterTable
ALTER TABLE `Prayer_alarm` MODIFY `prayer_alarm` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `Role_user` DROP PRIMARY KEY,
    DROP COLUMN `fk_roles`,
    ADD COLUMN `fk_role` INTEGER NOT NULL,
    ADD PRIMARY KEY (`fk_role`, `fk_user`);

-- AlterTable
ALTER TABLE `User` MODIFY `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `update_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE `Role_user` ADD CONSTRAINT `Role_user_fk_role_fkey` FOREIGN KEY (`fk_role`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
