import express, { json } from 'express'
import { PrismaClient } from '@prisma/client' 

var router = express.Router();
const prisma = new PrismaClient(); 

router.get('/', async (req, res) => {
  const users = await prisma.user.findMany()
  res.render('index', { data: users});   
})


export default router;
