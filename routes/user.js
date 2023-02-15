import express, { json } from "express";
import prisma from "../prismaClient.js";

var router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
});

router.get("/id/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
});

export default router;
