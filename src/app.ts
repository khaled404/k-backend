/* eslint-disable @typescript-eslint/no-unused-vars */
import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import { IError } from './models/error';
import AppRouter from './routes';

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use((req, res, next) => {
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
  const status = errors.statusCode || 500;
  const message = errors.message;
  const data = errors.data;
  res.status(status).json({ message, data });
});

mongoose
  .connect(
    'mongodb+srv://khaled:XM8.Gff5tqTt8*m@cluster0.gzzx2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  )
  .then(() => {
    app.listen(port);
  })
  .catch((err) => console.log(err));
