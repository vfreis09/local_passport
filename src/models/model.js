const { Sequelize } = require('sequelize');
const session = require('express-session');
const bcrypt = require('bcrypt');

require('dotenv').config();

//Gettin access to db string
const db = new Sequelize(process.env.DB_STRING);


module.exports = db;