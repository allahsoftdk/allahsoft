/*
  Warnings:

  - Added the required column `eventFrom` to the `IslamicEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventTo` to the `IslamicEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `IslamicEvent` ADD COLUMN `eventFrom` VARCHAR(255) NOT NULL,
    ADD COLUMN `eventTo` VARCHAR(255) NOT NULL;
