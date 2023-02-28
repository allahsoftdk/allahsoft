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
router.get("/following", restrictUser, async (req, res) => {
  const loggedInUserId = req.session.user.id;

  try {
    const following = await prisma.user.findUnique({
      where: {
        id: loggedInUserId,
      },
      include: {
        following: true,
      },
    });

    const posts = await prisma.post.findMany({
      where: {
        userId: {
          in: following.following.map((user) => user.id),
        },
      },
      include: {
        postComments: {
          include: {
            user: {
              include: {
                role: true,
              },
            },
          },
        },
        likedBy: {
          include: {
            role: true,
          },
        },
        user: {
          include: {
            role: true,
          },
        },
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
    const { description } = req.body;
    const post = await prisma.post.create({
      data: {
        description: description,
        resources: "",
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
router.post("/like/:postId", restrictUser, async (req, res, next) => {
  try {
    const loggedInUserId = req.session.user.id;
    const postId = req.params.postId;
    const user = await prisma.user.update({
      where: {
        id: Number(loggedInUserId),
      },
      data: {
        likes: {
          connect: {
            id: Number(postId),
          },
        },
      },
    });
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

//In the database "A" is userId and "B" is PostId
router.put("/unlike/:postId", restrictUser, async (req, res) => {
  try {
    const loggedInUserId = req.session.user.id;
    const postId = req.params.postId;
    const user = await prisma.user.update({
      where: {
        id: Number(loggedInUserId),
      },
      data: {
        likes: {
          disconnect: {
            id: Number(postId),
          },
        },
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
