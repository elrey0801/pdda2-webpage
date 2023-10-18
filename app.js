import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectMongo from './configs/connectMongo.js';
import authRoutes from './routes/auth.js'
import pageRoutes from './routes/webpage.js';
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
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
// app.use(methodOverride('_method'));

import User from './models/user.js';
PassportUtilities.initialize(
  passport,

  // have to modify to get data from DB
  async function getUserName(username) {
      return await User.find({ _id : username });
  },
  async function getId(id) {
      //return await pool.execute('SELECT * FROM `users` WHERE id = ?', [id]);
      return await User.find({ _id : id });
  }
);


app.use(authRoutes);
app.use(pageRoutes);

app.listen(port, host, () => {
  console.log(`App is running on port ${port} of ${host}`);
})