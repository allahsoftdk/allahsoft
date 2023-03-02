import express, { json } from "express";
import prisma from "../prismaClient.js";
import { restrictAdmin, restrictUser } from "../middleware/auth.js";

var router = express.Router();

router.get("/", restrictUser, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        role: true,
      }
    });
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
});

router.get("/id/:id", restrictUser, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      }, include: {
        role: true,
      }
    });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
});

router.get("/followers/:id", restrictUser, async (req, res) => {
  try {
    const followers = await prisma.user.findMany({
      where: {
        id: Number(req.params.id),
      },
      include: {
        following: true,
      },
    });
    res.status(200).json(followers);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.post("/follow/:id", restrictUser, async (req, res) => {
  try {
    const loggedInUserId = req.session.user.id;
    const user = await prisma.user.update({
      where: {
        id: Number(loggedInUserId),
      },
      data: {
        following: {
          connect: {
            id: Number(req.params.id),
          },
        },
      },
    });
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

//In the database "A" is unfollowUserId and currentUser is "B"
router.put("/unfollow/:id", restrictUser, async (req, res) => {
  try {
    const loggedInUserId = req.session.user.id;
    const user = await prisma.user.update({
      where: {
        id: Number(loggedInUserId),
      },
      data: {
        following: {
          disconnect: {
            id: Number(req.params.id),
          },
        },
      },
    });
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

//DELETE /user/:id
router.delete("/:id", restrictUser, async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const post = await prisma.post.delete({
      where: {
        id: Number(id),
      },
    });
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

export default router;
