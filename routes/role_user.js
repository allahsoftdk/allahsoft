import express, { json } from 'express'
import prisma from '../prismaClient.js'

var router = express.Router();

// GET /role_user
router.get('/', async (req, res) => {
    const roleUsers = await prisma.role_user.findMany()
    res.status(200).json(roleUsers);
})

// GET /role_user/:id
router.get('/:id', async (req, res) => {
    const roleUser = await prisma.role_user.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })
    res.status(200).json(roleUser);
})

// POST /role_user
router.post('/', async (req, res) => {
    const roleUser = await prisma.role_user.create({
        data: {
            fk_role: req.body.role_id,
            fk_user: req.body.user_id
        }
    })
    res.status(201).json(roleUser);
})

// DELETE /role_user/
router.delete('/', async (req, res) => {
    await prisma.role_user.delete({
        where: {
            fk_role_fk_user: {
                fk_role: req.body.role_id,
                fk_user: req.body.user_id
            }
        }
    }).catch((err) => {
        res.status(500).json({ error: err })
    })
    res.sendStatus(204);
})

export default router
