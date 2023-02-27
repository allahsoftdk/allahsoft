import express, { json } from "express";
import prisma from "../prismaClient.js";
import { restrictAdmin, restrictUser } from "../middleware/auth.js";

var router = express.Router();

//GET /post
router.get("/", restrictUser, async (req, res) => {
  try {
    const userPost = await prisma.post.findMany();
    res.status(200).json(userPost);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

//GET /post/followerPost
router.get("/followerPost", restrictUser, async (req, res) => {
  const { getUsersFollowerPost } = req.body;
  try {
    const posts = await prisma.post.findMany({
      where: {
        userId: { in: getUsersFollowerPost },
      },
      include: {
        likedBy: true,
        postComments: true,
      },
    });
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

//POST /post
router.post("/", restrictUser, async (req, res, next) => {
  try {
    const { description, resources } = req.body;
    const post = await prisma.post.create({
      data: {
        description: description,
        resources: resources,
        userId: req.session.user.id,
      },
    });
    res.status(201).json(post);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

//In the database "A" is postId and "B" is userId
//POST post/like/
router.post("/like", restrictUser, async (req, res, next) => {
  try {
    const { userId, postId } = req.body;
    console.log(userId, postId);
    const user = await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        likes: {
          connect: {
            id: Number(postId),
          },
        },
      },
    });
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

//In the database "A" is userId and "B" is PostId
router.put("/unlike", restrictUser, async (req, res) => {
  try {
    const { postId, userId } = req.body;
    const result = await prisma.user.update({
      where: {
        id: Number(postId),
      },
      data: {
        likes: { disconnect: [{ id: Number(userId) }] },
      },
    });
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

// PUT /post/:id
router.put("/:id", restrictUser, async (req, res) => {
  try {
    const postId = req.params.id;
    const { description, resources, userId } = req.body;

    const post = await prisma.post.update({
      where: {
        id: Number(postId),
      },
      data: {
        description: description,
        resources: resources,
        userId: Number(userId),
      },
    });
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

//DELETE /post/:id
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
