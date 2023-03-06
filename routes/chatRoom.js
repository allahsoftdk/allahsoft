import express, { json } from "express";
import prisma from "../prismaClient.js";
import { connect } from "http2";
import { restrictAdmin, restrictUser } from "../middleware/auth.js";

var router = express.Router();

//GET /chat_room
router.get("/", restrictUser, async (req, res) => {
  try {
    const chatRooms = await prisma.chat_room.findMany({
      include: {
        chatMessages: true,
        chatRoomParticipants: true,
      },
    });
    res.status(200).json(chatRooms);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

//GET /chat_room/
router.get("/loggedInUser", restrictUser, async (req, res) => {
  try {
    const loggedInUser = req.session.user;

    const chatRooms = await prisma.chat_room.findMany({
      where: {
        chatRoomParticipants: {
          some: {
            id: Number(loggedInUser.id),
          },
        },
      },
      include: {
        chatMessages: true,
        chatRoomParticipants: true,
      },
    });

    return res.status(200).json(chatRooms);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

//POST /chat_room/:userId
router.post("/:userId", restrictUser, async (req, res, next) => {
  try {
    const loggedInUser = req.session.user;

    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.userId),
      },
    });

    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.id === loggedInUser.id)
      return res.status(400).json({ message: "You can't chat with yourself" });

    const checkChatRoom = await prisma.chat_room.findFirst({
      where: {
        chatRoomParticipants: {
          every: {
            id: {
              in: [Number(loggedInUser.id), Number(req.params.userId)],
            },
          },
        },
      },
      include: {
        chatMessages: true,
        chatRoomParticipants: true,
      },
    });

    if (checkChatRoom) return res.status(200).json(checkChatRoom);

    const chatRoom = await prisma.chat_room.create({
      data: {
        name: `${loggedInUser.name} - ${user.name}`,
        chatRoomParticipants: {
          connect: [
            { id: Number(loggedInUser.id) },
            { id: Number(req.params.userId) },
          ],
        },
      },
      include: {
        chatMessages: true,
        chatRoomParticipants: true,
      },
    });
    return res.status(201).json(chatRoom);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

//DELETE /chat_room/:id
router.delete("/:id", restrictUser, async (req, res) => {
  try {
    const loggedInUser = req.session.user;

    const chatRoom = await prisma.chat_room.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!chatRoom)
      return res.status(404).json({ message: "Chat room not found" });

    const chatRoomParticipants = await prisma.chat_room
      .findUnique({
        where: {
          id: Number(req.params.id),
        },
      })
      .chatRoomParticipants();

    const checkChatRoomParticipants = chatRoomParticipants.some(
      (participant) => participant.id === loggedInUser.id
    );

    if (!checkChatRoomParticipants) {
      if (loggedInUser.role.role !== "admin")
        return res
          .status(403)
          .json({ message: "You are not allowed to delete this chat room" });
    }

    await prisma.chat_room.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

export default router;
