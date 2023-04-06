const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const model = require('../models/model');

const customFields = {
  usernameField: 'uname',
  passwordField: 'pw'
};

const verifyCallback = (username, password, done) => {
  User.findOne({ where: { username: username } })
  .then((user) => {
    if(!user) {
      return done(null, false)
    }
    
    //const isValid = validPassword(password, user.hash, user.salt);

    /* 
    if(isValid) {
      return done(null, user);
    } else {
      return done(null, false);
    }
    */
  })
  .catch((err) => {
    done(err);
  });
};

const strategy = new localStrategy(verifyCallback);