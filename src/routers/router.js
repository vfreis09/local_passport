const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
const passport = require('passport');
const localStrategy = require('passport-local');

router.get('/', controller.getHome);

router.get('/login', passport.authenticate('local'), controller.getLogin);

router.get('/register', passport.authenticate('local'), controller.getRegister);

router.post('/login', passport.authenticate('local'), controller.postLogin);

router.post('/register', passport.authenticate('local'), controller.postRegister);

router.get('/logout', passport.authenticate('local'), controller.getLogout);

module.exports = router;