import express, { json } from 'express'
import prisma from '../prismaClient.js'

var router = express.Router();

// GET /roles
router.get('/', async (req, res) => {
  try {
    const roles = await prisma.role.findMany();
    res.status(200).json(roles);
  }
  catch (err) {
    return res.status(500).json({ error: err });
  }
})

// GET /roles/:id
router.get('/:id', async (req, res) => {
  try{
    const roleId = req.params.id;
    const role = await prisma.role.findUnique({
      where: {
        id: Number(roleId),
      },
    })
    res.status(200).json(role);
  }
  catch (err) {
    return res.status(500).json({ error: err });
  }

})

// POST /roles
router.post('/', async (req, res, next) => {
  try {
    const {name} = req.body;
    const role = await prisma.role.create({
      data: { 
        name: name,
      },
    });
    res.status(201).json(role);
  }
  catch (err) {
    return res.status(500).json({ error: err });
  }
});

// PUT /roles/:id
router.put('/:id', async (req, res) => {
  try{
    const roleId = req.params.id;
    const {name} = req.body;
    const role = await prisma.role.update({
      where: {
        id: Number(roleId),
      },
      data: {
        name: name,
      },
    })
    res.status(200).json(role);
  }
  catch (err) {
    return res.status(500).json({ error: err });
  }
})

// DELETE /roles/:id
router.delete('/:id', async (req, res) => {
  try{
    const roleId = req.params.id;
    const role = await prisma.role.delete({
      where: {
        id: Number(roleId),
      },
    })
    res.sendStatus(204);
  }
  catch (err) {
    return res.status(500).json({ error: err });
  }
})

export default router
