const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
const passport = require('passport');
const isAuth = require('../middleware/middleware');

router.get('/', controller.getHome);

router.get('/login', controller.getLogin);

router.get('/register', controller.getRegister);

router.post('/login', passport.authenticate('local', { failureRedirect: '/login-failure', successRedirect: '/login-success' } ), controller.postLogin);

router.post('/register', controller.postRegister);

router.get('/logout', controller.getLogout);

router.get('/login-failure', controller.loginFailure);

router.get('/login-success', controller.loginSuccess);

router.get('/protected-route', isAuth, controller.protectedRoute);

module.exports = router;