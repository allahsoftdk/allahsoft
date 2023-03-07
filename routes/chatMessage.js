import express, { json } from "express";
import prisma from "../prismaClient.js";
import { connect } from "http2";
import { restrictAdmin, restrictUser } from "../middleware/auth.js";

var router = express.Router();

//GET /chatRoom/:id/messages
router.get("/chatRoom/:id/messages", restrictUser, async (req, res) => {});

//POST /chatRoom/:id/message
router.post("/chatRoom/:id/message", restrictUser, async (req, res) => {
  try {
    const loggedInUser = req.session.user;
    const { message } = req.body;
    const io = req.app.get("io");

    const chatRoom = await prisma.chat_room.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        chatRoomParticipants: true,
      },
    });

    const userInChatRoom = chatRoom.chatRoomParticipants.find(
      (participant) => participant.id === Number(loggedInUser.id)
    );

    if (!userInChatRoom) {
      return res.status(403).json({ msg: "User is not in chat room" });
    }

    const chatMessage = await prisma.chat_message.create({
      data: {
        message: message,
        userId: Number(loggedInUser.id),
        chatRoomId: Number(chatRoom.id),
      },
    });

    io.emit("chatMessage", {
      chatRoomId: chatRoom.id,
      message: message,
      userId: loggedInUser,
      createdAt: chatMessage.createdAt,
      updatedAt: chatMessage.updatedAt,
    });

    return res.status(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

export default router;
