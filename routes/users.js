import express, { json } from 'express'
import prisma from '../prismaClient.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import session from 'express-session'

var router = express.Router();

router.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

router.get('/', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users);
})


router.post('/register', async (req, res, next) => {
  const {name,email, password, confirmPassword} = req.body;
  const hashPasword = bcrypt.hashSync(password, 8);

  if (password !== confirmPassword) {
    return res.status(400).json({ msg: "Passwords do not match" });
  } else if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  const accessToken = jwt.sign({password},"token");
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashPasword,
      token: accessToken 
    },
  });
  
  req.session.token = accessToken;
  req.session.save(function (){
    res.sendStatus(200);
  }) //save the session ensure page load does not happen before session is saved
  res.json(req.session.token);  
});


router.post('/login', async (req, res, next) => {
  const {username, password} = req.body;

  const user = await prisma.user.findUnique({
    where: {
      name: username 
    },
  })

  if(req.session.token){
   res.json(req.session.token);
  }else{
    bcrypt.compare(password, user.password).then((match) => {
      console.log(match);
      if(match){
        const accessToken = jwt.sign({password},"token");
        req.session.token = accessToken;
        req.session.save(function (){
          res.json("aadasd");
        }) //save the session ensure page load does not happen before session is saved
      }
    });
  }
  res.json(user);
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
