import express, { json } from 'express'
import prisma from '../prismaClient.js'

var router = express.Router();

router.get('/', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users);
})

router.post('/', async (req, res, next) => {
  const {name,email} = req.body;
  const user = await prisma.user.create({
    data: { 
      email: email,
      name: name,
    },
  });
  res.status(200).json(user);
});

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
