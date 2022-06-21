/* eslint-disable @typescript-eslint/no-unused-vars */
import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import { IError } from './models/error';
import AppRouter from './routes';
import { config } from 'dotenv';
import path from 'path';

config({ path: path.resolve(__dirname, '../.env') });

const app = express();

app.use(bodyParser.json());
app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE',
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

AppRouter.map((item) => {
  app.use(item.routeName, item.routes);
});

app.use((error: never, _req, res, _next) => {
  const errors: IError = error;
  res
    .status(errors.statusCode || 500)
    .json({ message: errors.message, errors: errors.errors });
});

mongoose
  .connect(process.env.mongooseConnect)
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch((err) => console.log(err));
