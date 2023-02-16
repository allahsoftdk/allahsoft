import express, { json } from 'express'
import prisma from '../prismaClient.js'

var router = express.Router();

//GET /settings
router.get('/', async (req, res) => {
  try {
    const settings = await prisma.setting.findMany();
    res.status(200).json(settings);
  }
  catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});


//GET /settings/:id
router.get('/:id', async (req, res) => {
    try {
        const settingsId = req.params.id;
        const settings = await prisma.setting.findUnique({
          where: {
            id: Number(settingsId),
          },
        })
        res.status(200).json(settings);
    }
    catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  });


//POST /settings
router.post('/', async (req, res, next) => {
    try {
        const {setting_name, setting_value} = req.body;
        const setting = await prisma.setting.create({
            data: { 
                setting_name: setting_name,
                setting_value: setting_value
            },
        });
        res.status(201).json(setting);
    }
    catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    });

  // PUT /settings/:id
  router.put('/:id', async (req, res) => {
    try{
      const settings_id = req.params.id;
      const {setting_name, setting_value} = req.body;
        const setting = await prisma.setting.update({
            where: {
            id: Number(settings_id),
            },
            data: { 
                setting_name: setting_name,
                setting_value: setting_value
            },
      })
      res.status(200).json(setting);
    }
    catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  });


//DELETE /prayer_alarm/:id
router.delete('/:id', async (req, res) => {
    try{
      const settings_id = req.params.id;
      const alarm = await prisma.setting.delete({
        where: {
          id: Number(settings_id),
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