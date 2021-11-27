import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
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

app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!');
});
mongoose
  .connect(
    'mongodb+srv://khaled:XM8.Gff5tqTt8*m@cluster0.gzzx2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  )
  .then((result) => {
    app.listen(port);
  })
  .catch((err) => console.log(err));
