const express = require('express');
const User = require('../models/model');

const getHome = (req, res) => {
  res.send('Home Page');
};

const getLogin =  (req, res) => {
  res.send('Login Page');
};

const postLogin = (req, res) => {
  res.redirect('/');
};

const getRegister = (req, res) => {
  res.send('Register Page');
};

const postRegister = (req, res) => {
  const user = {
    username: req.body.uname,
    password: req.body.pw
  };

  User.create(user)
  .then(data => {
    console.log(data);
    res.send(user);
    res.redirect('/login');
  })
  .catch(err => console.log(err));
};
  
const getLogout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

const loginSuccess = (req, res) => {
  res.send('You successfully logged in');
};

const loginFailure = (req, res) => {
  res.send('You entered the wrong password');
};

const protectedRoute = (req, res) => {
  res.send('Protected route');
};

module.exports = {
  getHome,
  getLogin,
  postLogin,
  getRegister,
  postRegister,
  getLogout,
  loginSuccess,
  loginFailure,
  protectedRoute
};