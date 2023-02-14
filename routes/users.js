import express, { json } from 'express'
import prisma from '../prismaClient.js'

var router = express.Router();

router.get('/', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users);
})

router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  const user = await prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
  })
  res.json(user);
})

export default router
