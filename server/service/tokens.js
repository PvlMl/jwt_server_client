const jwt = require('jsonwebtoken');
const {accessKey, refreshKey} = require("../config");

module.exports = {
  generateAccessToken: (username, id) => {
    return jwt.sign({ username, id }, accessKey, { expiresIn: 15 });
  },
  generateRefreshToken: (username, id) => {
    return jwt.sign({ username, id }, refreshKey, { expiresIn: 60 * 60 * 3 });
  },
};
