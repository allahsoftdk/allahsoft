import express, { json } from 'express'
import prisma from '../../prismaClient.js'

var router = express.Router();

router.get('/', async (req, res) => {
  const users = await prisma.user.findMany()
  res.render('index.html');   
})


export default router;
