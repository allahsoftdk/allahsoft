/*
  Warnings:

  - A unique constraint covering the columns `[prayerAlarm]` on the table `Prayer_alarm` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Prayer_alarm_prayerAlarm_key` ON `Prayer_alarm`(`prayerAlarm`);
