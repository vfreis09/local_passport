const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const model = require('../models/model');
const validPassword = require('../middleware/middleware');

const customFields = {
  usernameField: 'uname',
  passwordField: 'pw'
};

const verifyCallback = (username, password, done) => {
  model.User.findOne({ where: { username: username } })
  .then((user) => {
    if(!user) {
      return done(null, false)
    }
    
    const isValid = validPassword(username, password);
 
    if(isValid) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  })
  .catch((err) => {
    done(err);
  });
};

const strategy = new localStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((userId, done) => {
  model.User.findByPk(userId)
  .then((user) => {
    done(null, user)
  })
  .catch((err) => {
    done(err);
  });
});