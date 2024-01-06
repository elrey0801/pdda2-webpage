import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectMongo from './configs/connectMongo.js';
import authRoutes from './routes/auth.js'
import pageRoutes from './routes/webpage.js';
import opDataRoutes from './routes/opData.js';
import ptvhRoutes from './routes/ptvh.js'
import User from './models/user.js';
import mongoose from 'mongoose';
// import cors from 'cors';
import flash from 'express-flash';
import session from 'express-session';
import passport from 'passport';
import PassportUtilities from './configs/passport-config.js';
import { default as connectMongoDBSession} from 'connect-mongodb-session';
import helmet from 'helmet';
import compression from 'compression';

// import methodOverride from 'method-override';


dotenv.config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.static('./src/public'));

// const cspOptions = {
//   directives: {
//     defaultSrc: ["'self'"],
//     scriptSrc: ["'self'", 'trusted-scripts.com'],
//     // Add other directives as needed
//   },
// };

// app.use(helmet({ contentSecurityPolicy: cspOptions }));

app.use(helmet({ contentSecurityPolicy: false }))
app.use(compression());


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


// Authentication
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
      maxAge: 1000 * 60 * 60 * 24
    }
}));
app.use(passport.initialize());
app.use(passport.session());
// app.use(methodOverride('_method'));

PassportUtilities.initialize(
  passport,
  async function getUserName(username) {
      return await User.find({ username : username });
  },
  async function getId(id) {
      return await User.find({ _id : id });
  }
);

// Routes
app.use(authRoutes);
app.use(pageRoutes);
app.use(opDataRoutes);
app.use('/api/ptvh/', ptvhRoutes);


export default app;