const { Sequelize } = require('sequelize');
const session = require('express-session');
const bcrypt = require('bcrypt');

require('dotenv').config();

//Gettin access to db string
const db = new Sequelize(process.env.DB_STRING);

const User = db.define('user', {
  username: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
}, {
  hooks: {
    beforeCreate: async function(user) {
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(user.password, salt);
    }
  }
});

module.exports = User;