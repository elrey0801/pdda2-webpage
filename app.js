import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectMongo from './configs/connectMongo.js';
dotenv.config();

const app = express();


app.use(bodyParser.json()); //application/json
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

connectMongo();
const port = process.env.PORT;
const host = process.env.HOST;
app.listen(port, host, () => {
  console.log(`App is running on port ${port} of ${host}`);
})