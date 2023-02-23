import express, { json } from "express";
import prisma from "../prismaClient.js";
import auth from "../middleware/auth.js";

var router = express.Router();
router.use(auth);

//GET /post_comment
router.get("/", async (req, res) => {
    try {
        const post_comment = await prisma.post_comment.findMany();
        res.status(200).json(post_comment);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
});


//GET /post_comment/:id
router.get('/:id', async (req, res) => {
    try {
        const post_comment = await prisma.post_comment.findMany({
            where: {
                postId: Number(req.params.id)
            }
        })
        res.status(200).json(post_comment);
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
});


//POST /post_comment
router.post("/", async (req, res, next) => {
    try {
        const { comment, postId, userId } = req.body;
        const post_comment = await prisma.post_comment.create({
            data: {
                comment: comment,
                postId: Number(postId),
                userId: Number(userId)
            },
        });
        res.status(201).json(post_comment);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
});

// PUT /post_comment/:id
router.put("/:id", async (req, res) => {
    try {
        const commentId = req.params.id;
        const { comment } = req.body;

        const commentUpdate = await prisma.post_comment.update({
            where: {
                id: Number(commentId),
            },
            data: {
                comment: comment,
            },
        });
        res.status(200).json(commentUpdate);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
});

//DELETE /post_comment/:id
router.delete("/:id", async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await prisma.post_comment.delete({
            where: {
                id: Number(postId),
            },
        });
        res.sendStatus(204);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
});

export default router;
