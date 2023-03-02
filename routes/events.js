import express, { json } from "express";
import prisma from "../prismaClient.js";
import { restrictAdmin, restrictUser } from "../middleware/auth.js";

var router = express.Router();

//GET /post
router.get("/", restrictUser, async (req, res) => {
    try {
        const event = await prisma.IslamicEvent.findMany({});
        res.status(200).json(event);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
});

export default router;
