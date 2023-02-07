import express, { json } from 'express'
import { PrismaClient } from '@prisma/client' 

var router = express.Router();
const prisma = new PrismaClient(); 


router.get('/', async (req, res) => {
  const users = await prisma.user.findMany()
  res.render('index', { data: users});   
})



router.get('/id/:id', async (req, res) => {
  const userId = req.params.id;
  const user = await prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
  })
  res.render('index', { data: user}); 
})



router.post('/', async (req, res, next) => {
  const {name,email} = req.body;
  const user = await prisma.user.create({
    data: { 
      email: email,
      name: name,
    },
  });
  res.json(user);
});


export default router;
