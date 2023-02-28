import express, { json } from "express";
import prisma from "../prismaClient.js";
import { restrictAdmin, restrictUser } from "../middleware/auth.js";

var router = express.Router();

//GET /post_comment
router.get("/", restrictUser, async (req, res) => {
  try {
    const post_comment = await prisma.post_comment.findMany();
    res.status(200).json(post_comment);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

//GET /post_comment/:id
router.get("/:id", restrictUser, async (req, res) => {
  try {
    const post_comment = await prisma.post_comment.findMany({
      where: {
        postId: Number(req.params.id),
      },
    });
    res.status(200).json(post_comment);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

//POST /post_comment
router.post("/:postId", restrictUser, async (req, res, next) => {
  try {
    const loggedInUserId = req.session.user.id;
    const { comment } = req.body;
    const postId = req.params.postId;

    const post_comment = await prisma.post_comment.create({
      data: {
        comment: comment,
        postId: Number(postId),
        userId: Number(loggedInUserId),
      },
    });
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

// PUT /post_comment/:id
router.put("/:id", restrictUser, async (req, res) => {
  try {
    const commentId = req.params.id;
    const { comment } = req.body;

    const commentUser = await prisma.post_comment.findUnique({
      where: {
        id: Number(commentId),
      },
    });

    if (!comment) return res.status(400).json({ message: "Missing comment" });
    if (
      req.session.user.id !== commentUser.userId &&
      req.session.user.role.role != "admin"
    )
      return res
        .status(403)
        .json({ message: "You are not authorized to edit this comment" });

    const commentUpdate = await prisma.post_comment.update({
      where: {
        id: Number(commentId),
      },
      data: {
        comment: comment,
        updatedAt: new Date(),
      },
    });
    res.status(200).json(commentUpdate);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

//DELETE /post_comment/:id
router.delete("/:id", restrictUser, async (req, res) => {
  try {
    const commentId = req.params.id;

    const commentUser = await prisma.post_comment.findUnique({
      where: {
        id: Number(commentId),
      },
    });

    if (
      req.session.user.id !== commentUser.userId &&
      req.session.user.role.role != "admin"
    )
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this comment" });

    const commentDelete = await prisma.post_comment.delete({
      where: {
        id: Number(commentId),
      },
    });
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

export default router;
