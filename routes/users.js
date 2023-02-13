import express, { json } from 'express'
import prisma from '../prismaClient.js'
import bcrypt from 'bcrypt'


var router = express.Router();

router.get('/', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users);
})

router.post('/register', async (req, res, next) => {
  const {name,email, password1, confirmPassword} = req.body;
  const hashPassword = await bcrypt.hash(password1, 10);

  if(password1 === confirmPassword){
    res.sendStatus(200)
  }
  res.sendStatus(404)
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
