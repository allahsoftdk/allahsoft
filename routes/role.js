import express, { json } from 'express'
import prisma from '../prismaClient.js'

var router = express.Router();

// GET /roles
router.get('/', async (req, res) => {
  const roles = await prisma.role.findMany()
  res.status(200).json(roles);
})

// GET /roles/:id
router.get('/:id', async (req, res) => {
  const roleId = req.params.id;
  const role = await prisma.role.findUnique({
    where: {
      id: Number(roleId),
    },
  })
  res.status(200).json(role);
})

// POST /roles
router.post('/', async (req, res, next) => {
  const {name} = req.body;
  const role = await prisma.role.create({
    data: { 
      name: name,
    },
  });
  res.status(201).json(role);
});

// PUT /roles/:id
router.put('/:id', async (req, res) => {
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
})

// DELETE /roles/:id
router.delete('/:id', async (req, res) => {
  const roleId = req.params.id;
  const role = await prisma.role.delete({
    where: {
      id: Number(roleId),
    },
  })
  res.sendStatus(204);
})

export default router
