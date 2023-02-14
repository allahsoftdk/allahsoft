import express, { json } from "express";
import prisma from "../prismaClient.js";

var router = express.Router();

// GET /role_user
router.get("/", async (req, res) => {
    try {
        const roleUsers = await prisma.role_user.findMany();
        res.status(200).json(roleUsers);
    } catch (err) {
        return res.status(500).json({ error: err });
    }
});

// GET /role_user/:id
router.get("/:id", async (req, res) => {
  try {
    const roleUser = await prisma.role_user.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.status(200).json(roleUser);
  } catch (err) {
    return res.status(500).json({ error: err });
  }

});

// POST /role_user
router.post("/", async (req, res) => {
  try {
    const roleUser = await prisma.role_user.create({
      data: {
        fk_role: req.body.role_id,
        fk_user: req.body.user_id,
      },
    });
    res.status(201).json(roleUser);
  } catch (error) {
    return res.status(500).json({ error: err });
  }
});

// DELETE /role_user/
router.delete("/", async (req, res) => {
  try {
    await prisma.role_user.delete({
      where: {
        fk_role_fk_user: {
          fk_role: req.body.role_id,
          fk_user: req.body.user_id,
        },
      },
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }

  res.sendStatus(204);
});

export default router;
