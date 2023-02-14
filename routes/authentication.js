import express, { json } from "express";
import prisma from "../prismaClient.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import session from "express-session";

var router = express.Router();

router.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

router.use(function (req, res, next) {
  var err = req.session.error;
  var msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = "";
  if (err) res.locals.message = '<p class="msg error">' + err + "</p>";
  if (msg) res.locals.message = '<p class="msg success">' + msg + "</p>";
  next();
}); 

router.post("/register", async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  const hashPasword = bcrypt.hashSync(password, 8);

  if (password !== confirmPassword) {
    return res.status(400).json({ msg: "Passwords do not match" });
  } else if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  const accessToken = jwt.sign({ password }, "token");
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashPasword,
      token: accessToken,
    },
  });

  req.session.token = accessToken;
  req.session.save(function () {
    res.sendStatus(200);
  });
});

router.post("/login", async (req, res, next) => {
  const { name, password } = req.body;
  
  if (!name || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  const user = await prisma.user.findUnique({
    where: {
      name: name,
    },
  });

  if (!user) {
    return res.status(400).json({ msg: "User does not exist" });
  }
  if (bcrypt.compareSync(password, user.password)) {
    const accessToken = jwt.sign({ password }, "token"); 

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        token: accessToken,
      },
    });

    req.session.token = updatedUser.token;
    req.session.user = updatedUser;
    req.session.save(function () {
      res.sendStatus(200);
    });
  } else {
    return res.status(401).json({ msg: "Invalid credentials" });
  }
});

router.post("/logout", async (req, res, next) => {
  const user = req.session.user;
  
  if (!user) {
    return res.status(400).json({ msg: "This user does not have an active session" });
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      token: null,
    },
  });
  req.session.destroy();
  res.sendStatus(200);
});

function restrict(req, res, next) {
  if (req.session.token) {
    next();
  } else {
    req.session.error = "Access denied!";
    res.sendStatus(401);
  }
}

router.post("/restricted", restrict, async (req, res, next) => {
  res.sendStatus(200);
});

export default router;
