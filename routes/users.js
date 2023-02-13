import express, { json } from 'express'
import prisma from '../prismaClient.js'
import bcrypt from 'bcryptjs'

var router = express.Router();

router.get('/', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users);
})

router.post('/register', async (req, res, next) => {
  const {name,email, password, confirmPassword} = req.body;
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);

  if (password !== confirmPassword) {
    return res.status(400).json({msg: 'Passwords do not match'});
  } else {
    return res.json({msg: 'Passwords match'});
  }
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
