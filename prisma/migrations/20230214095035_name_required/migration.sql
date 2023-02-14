/*
  Warnings:

  - You are about to alter the column `prayer_alarm` on the `Prayer_alarm` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `update_at` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Prayer_alarm` MODIFY `prayer_alarm` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `name` VARCHAR(255) NOT NULL,
    MODIFY `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `update_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
