const bcrypt = require('bcrypt');

const validPassword = (pw, password) => {
  return bcrypt.compare(pw, password);
};

module.exports = validPassword;