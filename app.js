import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectMongo from './configs/connectMongo.js';
import authRoutes from './routes/auth.js'
import pageRoutes from './routes/webpage.js';
import mongoose from 'mongoose';
// import cors from 'cors';

import flash from 'express-flash';
import session from 'express-session';
import passport from 'passport';
import PassportUtilities from './configs/passport-config.js';
// import methodOverride from 'method-override';


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

// Authentication
import { default as connectMongoDBSession} from 'connect-mongodb-session';
const MongoDBStore = connectMongoDBSession(session);
const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: 'sessions'
});
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: { 
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 5
    }
}));
app.use(passport.initialize());
app.use(passport.session());
// app.use(methodOverride('_method'));

import User from './models/user.js';
PassportUtilities.initialize(
  passport,
  async function getUserName(username) {
      return await User.find({ username : username });
  },
  async function getId(id) {
      return await User.find({ _id : id });
  }
);


app.use(authRoutes);
app.use(pageRoutes);

app.listen(port, host, () => {
  console.log(`App is running on port ${port} of ${host}`);
})