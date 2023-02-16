import express, { json } from 'express'
import prisma from '../prismaClient.js'

var router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  }
  catch (err) {
    return res.status(500).json({ error: err });
  }
})

router.get('/:id', async (req, res) => {
  try{
    const userId = req.params.id;
    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    })
    res.status(200).json(user);
  }
  catch (err) {
    return res.status(500).json({ error: err });
  }
})

router.get('/followers/:id', async (req, res) => {
  try {
      const followers = await prisma.user.findMany({
        where: {
          id: Number(req.params.id)
        },
        include: {
          following: true
        }
      })
      res.status(200).json(followers);
  }
  catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.post('/:id/follows/:followId', async (req, res) => {
  try{
    const userId = req.params.id;
    const followId = req.params.followId;
    const user = await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        following: {
          connect: {
            id: Number(followId),
          },
        },
      },
    })
    return res.status(201).json(user);
  }
  catch (err) {
    return res.status(500).json({ error: err });
  }
})



export default router
