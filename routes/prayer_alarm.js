import express, { json } from "express";
import prisma from "../prismaClient.js";
import { restrictAdmin, restrictUser } from "../middleware/auth.js";
import prayTimes from "../utils/PrayTimes.js";
import isDST from "../utils/checkDST.js";

var router = express.Router();

//GET /prayer_alarm/next
router.get("/", async (req, res) => {
  try {
    // Method is MWL (Muslim World League)
    // copenhagen coordinates and timezone
    const dst = isDST(new Date());
    prayTimes.setMethod("MWL");
    // date, cords, timezone, dst, format
    const todayPrayerTimes = prayTimes.getTimes(
      new Date(),
      [55.676098, 12.568337],
      1,
      dst,
      "24h"
    );

    const tomorrowPrayerTimes = prayTimes.getTimes(
      new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      [55.676098, 12.568337],
      1,
      dst,
      "24h"
    );

    const prayerTimes = {
      today: todayPrayerTimes,
      tomorrow: tomorrowPrayerTimes,
    };

    return res.status(200).json(prayerTimes);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

// //GET /prayer_alarm
// router.get("/", restrictUser, async (req, res) => {
//   try {
//     const prayer_alarm = await prisma.prayer_alarm.findMany();
//     res.status(200).json(prayer_alarm);
//   } catch (err) {
//     console.log(err);
//     return res.sendStatus(500);
//   }
// });

// //GET /prayer_alarm/:id
// router.get("/:id", restrictUser, async (req, res) => {
//   try {
//     const alarmId = req.params.id;

//     if (!Number.isInteger(Number(alarmId))) {
//       return res.status(400).json({ msg: "The passed parameter has to be a number" });
//     }

//     const prayer_alarm = await prisma.prayer_alarm.findUnique({
//       where: {
//         id: Number(alarmId),
//       },
//     });
//     console.log(prayer_alarm);
//     res.status(200).json(prayer_alarm);
//   } catch (err) {
//     console.log(err);
//     return res.sendStatus(500);
//   }
// });

// //POST /prayer_alarm
// router.post("/", restrictAdmin, async (req, res, next) => {
//   try {
//     const { prayerAlarm } = req.body;

//     if(await prisma.prayer_alarm.findFirst({ where: { prayerAlarm: prayerAlarm } })){
//       return res.status(400).json({ msg: "Prayer alarm already exists" });
//     }

//     const alarm = await prisma.prayer_alarm.create({
//       data: {
//         prayerAlarm: prayerAlarm,
//       },
//     });
//     res.status(201).json(alarm);
//   } catch (err) {
//     console.log(err);
//     return res.sendStatus(500);
//   }
// });

// // PUT /prayer_alarm/:id
// router.put("/:id", restrictAdmin, async (req, res) => {
//   try {
//     const prayerAlarmId = req.params.id;
//     const setPrayerAlarm = req.body.setPrayerAlarm;

//     console.log(setPrayerAlarm);

//     if (!Number.isInteger(Number(prayerAlarmId))) {
//       return res.status(400).json({ msg: "The passed parameter has to be a number" });
//     }

//     const alarm = await prisma.prayer_alarm.update({
//       where: {
//         id: Number(prayerAlarmId),
//       },
//       data: {
//         prayerAlarm: setPrayerAlarm
//       },
//     });
//     res.status(200).json(alarm);
//   } catch (err) {
//     console.log(err);
//     return res.sendStatus(500);
//   }
// });

// //DELETE /prayer_alarm/:id
// router.delete("/:id", restrictAdmin, async (req, res) => {
//   try {
//     const alarmId = req.params.id;
//     const alarm = await prisma.prayer_alarm.delete({
//       where: {
//         id: Number(alarmId),
//       },
//     });
//     res.sendStatus(204);
//   } catch (err) {
//     console.log(err);
//     return res.sendStatus(500);
//   }
// });

export default router;
