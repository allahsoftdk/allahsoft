import express, { json } from "express";
import prisma from "../prismaClient.js";
import { restrictAdmin, restrictUser } from "../middleware/auth.js";

var router = express.Router();

//GET /event
router.get("/", async (req, res) => {
    try {
        const event = await prisma.IslamicEvent.findMany({});
        res.status(200).json(event);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
});

// POST /event
router.post("/", restrictAdmin, async (req, res, next) => {
    try {
        const { name, eventDate, eventFrom, eventTo } = req.body;
        const newEvent = await prisma.IslamicEvent.create({
            data: {
                name: name,
                eventDate: eventDate,
                eventFrom: eventFrom,
                eventTo: eventTo
            },
        });
        res.status(201).json(newEvent);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
});


// DELETE /event/:id
router.delete("/:id", restrictAdmin, async (req, res) => {
    try {
        const eventId = req.params.id;
        const event = await prisma.islamicEvent.delete({
            where: {
                id: Number(eventId),
            },
        });
        res.sendStatus(204);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
});

export default router;
