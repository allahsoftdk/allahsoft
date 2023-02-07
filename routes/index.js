import express, { json } from 'express'
import { PrismaClient } from '@prisma/client' 

var router = express.Router();
const prisma = new PrismaClient(); 



router.post('/test', async function(req, res, next) {
  const email = req.body; 
  const name = req.body; 
  const te = req.body;  
  const user = await prisma.user.create({
    data: { 
      email: email,
      name: name,
      te: te
    }
  });
  res.status(200).send(user);
});


export default router;
