import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectMongo from './configs/connectMongo.js';
import authRoutes from './routes/auth.js'
import pageRoutes from './routes/webpage.js';
// import cors from 'cors';


dotenv.config();

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('./public'));

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()); //application/json

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
// app.use(cors());

connectMongo();
const port = process.env.PORT;
const host = process.env.HOST;

app.use(authRoutes);
app.use(pageRoutes);

app.listen(port, host, () => {
  console.log(`App is running on port ${port} of ${host}`);
})