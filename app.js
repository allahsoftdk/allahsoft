import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "./swagger.json" assert { type: "json" };
import session from "express-session";
dotenv.config();

import userRouter from "./routes/user.js";
import roleRouter from "./routes/role.js";
import prayer_alarm from "./routes/prayer_alarm.js";
import setting from "./routes/setting.js";
import chatRooms from "./routes/chatRoom.js";
import post from "./routes/post.js";
import post_comment from "./routes/post_comment.js";
import event from "./routes/events.js";

import authenticationRouter from "./routes/authentication.js";

var app = express();

app.use(
  session({
    secret: "keyboardcat1527",
    resave: false,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: false,
      httpOnly: false,
    },
  })
);

app.use(cors({ credentials: true, origin: true }));

// view engine setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/user", userRouter);
app.use("/api/role", roleRouter);
app.use("/api/prayer_alarm", prayer_alarm);
app.use("/api/setting", setting);
app.use("/api/chatRoom", chatRooms);
app.use("/api/post", post);
app.use("/api/post_comment", post_comment);
app.use("/api/event", event);

app.use("/api/auth", authenticationRouter);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

if (process.env.NODE_ENV === "production") {
  console.log("\x1b[36m%s\x1b[0m", "Server started in production mode");
} else {
  console.log("\x1b[36m%s\x1b[0m", "Server started in development mode");
}

export default app;
