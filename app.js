import createError  from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import {fileURLToPath} from 'url'; 
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from './swagger.json' assert { type: 'json' };
dotenv.config();

import userRouter from './routes/user.js';
import roleRouter from './routes/role.js';
import { assert } from 'console';

var app = express();

// view engine setup
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename)    

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); 
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/user', userRouter);
app.use('/api/role', roleRouter);

app.use(
  '/docs',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDoc)
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err })
});

if (process.env.NODE_ENV === 'production') {
  console.log('Server started in production mode');
} else {
  console.log('Server started in development mode');
}

export default app;
