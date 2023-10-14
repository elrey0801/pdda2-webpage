import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import e from 'express';
import dotenv from 'dotenv';
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

import User from './models/user.js';
mongoose.connect('mongodb://127.0.0.1:27017/pdda2')
    .then(() => {
        console.log("Connected to mongodb server");
        const user = new User({ _id: 'root', password:'root' });
        user.save();
    })
    .catch(err => console.log(err));

const port = process.env.PORT;
const host = process.env.HOST;
app.listen(port, host, () => {
    console.log(`App is running on port ${port} of ${host}`);
})