import express, { json } from 'express'
import prisma from '../prismaClient.js'

var router = express.Router();


//GET /user_follower/:id
router.get('/:id', async (req, res) => {
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

  
  //POST /user_follower
  router.post('/', async (req, res, next) => {
    try {
      const {followedBy,following} = req.body;
      const userFollow = await prisma.user.create({
        data: { 
          a: followedBy,
          b: following
        },
      });
      res.status(201).json(userFollow);
    }
    catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  });


  // PUT /prayer_alarm/:id
  router.put('/:id', async (req, res) => {
    try{
      const prayer_alarm_id = req.params.id;
      const {prayer_alarm} = req.body;
      const alarm = await prisma.prayer_alarm.update({
        where: {
          id: Number(prayer_alarm_id),
        },
        data: {
          prayer_alarm: prayer_alarm,
        },
      })
      res.status(200).json(alarm);
    }
    catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  });


//DELETE /prayer_alarm/:id
router.delete('/:id', async (req, res) => {
    try{
      const alarmId = req.params.id;
      const alarm = await prisma.prayer_alarm.delete({
        where: {
          id: Number(alarmId),
        },
      })
      res.sendStatus(204);
    }
    catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  })
  
  export default router
  