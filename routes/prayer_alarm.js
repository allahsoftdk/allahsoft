import express, { json } from "express";
import prisma from "../prismaClient.js";

var router = express.Router();

//GET /prayer_alarm
router.get("/", async (req, res) => {
  try {
    const prayer_alarm = await prisma.prayer_alarm.findMany();
    res.status(200).json(prayer_alarm);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

//GET /prayer_alarm/:id
router.get("/:id", async (req, res) => {
  try {
    const alarmId = req.params.id;

    if (!Number.isInteger(Number(alarmId))) {
      return res.status(400).json({ msg: "The passed parameter has to be a number" });
    }

    const prayer_alarm = await prisma.prayer_alarm.findUnique({
      where: {
        id: Number(alarmId),
      },
    });
    console.log(prayer_alarm);
    res.status(200).json(prayer_alarm);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

//POST /prayer_alarm
router.post("/", async (req, res, next) => {
  try {
    const { prayerAlarm } = req.body;
    const alarm = await prisma.prayer_alarm.create({
      data: {
        prayerAlarm: prayerAlarm,
      },
    });
    res.status(201).json(alarm);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

// PUT /prayer_alarm/:id
router.put("/:id", async (req, res) => {
  try {
    const prayerAlarmId = req.params.id;
    const prayerAlarm = req.body;

    console.log(prayerAlarm);

    if (!Number.isInteger(Number(prayerAlarmId))) {
      return res.status(400).json({ msg: "The passed parameter has to be a number" });
    }

    const alarm = await prisma.prayer_alarm.update({
      where: {
        id: Number(prayerAlarmId),
      },
      data: {
        prayerAlarm: prayerAlarm,
      },
    });
    res.status(200).json(alarm);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

//DELETE /prayer_alarm/:id
router.delete("/:id", async (req, res) => {
  try {
    const alarmId = req.params.id;
    const alarm = await prisma.prayer_alarm.delete({
      where: {
        id: Number(alarmId),
      },
    });
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

export default router;
