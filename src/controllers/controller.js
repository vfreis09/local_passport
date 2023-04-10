const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const getHome = (req, res) => {
  res.send('Hello World!');
}

const getLogin =  (req, res) => {

};

const postLogin = (req, res) => {

};

const getRegister = (req, res) => {

};

const postRegister = (req, res) => {

};
  
const getLogout = (req, res) => {

};

module.exports = {
  getHome,
  getLogin,
  postLogin,
  getRegister,
  postRegister,
  getLogout
};