import express, { json } from "express";
import prisma from "../prismaClient.js";
import { connect } from "http2";

var router = express.Router();

router.get("/", async (req, res) => {
  try {
    const chatRooms = await prisma.chat_room.findMany({
      include: {
        chatMessages: true,
      },
    });
    res.status(200).json(chatRooms);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name } = req.body;
    const people = name.split(",");
    const io = req.app.get("io");
    // create a chat room and set the participants
    const chatRoom = await prisma.chat_room.create({
      data: {
        name: name,
        chatRoomParticipants: {
          connect: people.map((person) => {
            return {};
          }),
        },
      },
    });
    const chatRooms = await prisma.chat_room.findMany();
    io.emit("roomsList", chatRooms);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

export default router;
