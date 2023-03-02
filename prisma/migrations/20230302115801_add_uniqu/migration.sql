/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `IslamicEvent` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `IslamicEvent_name_key` ON `IslamicEvent`(`name`);
