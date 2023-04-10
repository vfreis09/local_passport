const express = require('express');
const app = express();
const { Sequelize } = require('sequelize');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const router = require('./src/routers/router');

require('./src/config/passport');
require('dotenv').config();

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//Connect to database
const db = require('./src/config/database');
const passport = require('passport');

db.authenticate()
  .then(() => app.listen(3000))
  .catch(err => console.log(`Error: ${err}`));

//Setting session store
const sessionStore = new SequelizeStore({
  db: db,
  tableName : 'sessions'
});

//Setting express session
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
    }
  })
);

sessionStore.sync();

//Setting passport.js and express session
app.use(passport.initialize());
app.use(passport.session());

//Setting express router
app.use(router);