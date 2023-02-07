/*
  Warnings:

  - Added the required column `te` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `te` VARCHAR(255) NOT NULL;
