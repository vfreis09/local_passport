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

db.authenticate()
  .then(() => app.listen(3000))
  .catch(err => console.log(`Error: ${err}`));

//Something idk
const sessionStore = new SequelizeStore({
  db: db,
  tableName : 'sessions'
});

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

app.use(router);