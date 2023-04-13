const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/model');
const bcrypt = require('bcrypt');

const customFields = {
  usernameField: 'uname',
  passwordField: 'pw'
};

const verifyCallback = (username, password, done) => {
  User.findOne({ where: { username: username } })
  .then(async (user) => {
    if(!user) {
      return done(null, false)
    }
    
    const isValid = await bcrypt.compare(password, user.password);
    
    if(isValid) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  })
  .catch((err) => {
    console.log(err);
  })
};

const strategy = new localStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findByPk(id)
  .then((user) => {
    done(null, user)
  })
  .catch((err) => {
    console.log(err);
  });
});