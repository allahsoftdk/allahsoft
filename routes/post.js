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

//GET /post/user/:userId
router.get("/user/:userId", restrictUser, async (req, res) => {
  const userId = req.params.userId;
  try {
    const userPost = await prisma.post.findMany({
      where: {
        userId: Number(userId),
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

    following.following.push({ id: loggedInUserId });

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
    const loggedInUserId = req.session.user.id;
    const postId = req.params.id;
    const { description, userId } = req.body;

    const postUser = await prisma.post.findUnique({
      where: {
        id: Number(postId),
      },
      select: {
        userId: true,
      },
    });

    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }
    if (
      postUser.userId !== loggedInUserId &&
      req.session.user.role.role != "admin"
    ) {
      return res
        .status(403)
        .json({ message: "You are not authorized to edit this post" });
    }

    let post;

    if (!userId) {
      post = await prisma.post.update({
        where: {
          id: Number(postId),
        },
        data: {
          description: description,
          updatedAt: new Date(),
        },
      });
    } else {
      post = await prisma.post.update({
        where: {
          id: Number(postId),
        },
        data: {
          description: description,
          userId: userId,
          updatedAt: new Date(),
        },
      });
    }
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

//DELETE /post/:id
router.delete("/:id", restrictUser, async (req, res) => {
  try {
    const loggedInUserId = req.session.user.id;
    const postId = req.params.id;

    const postUser = await prisma.post.findUnique({
      where: {
        id: Number(postId),
      },
      select: {
        userId: true,
      },
    });

    if (
      postUser.userId !== loggedInUserId &&
      req.session.user.role.role != "admin"
    ) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this post" });
    }

    const post = await prisma.post.delete({
      where: {
        id: Number(postId),
      },
    });
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

export default router;
