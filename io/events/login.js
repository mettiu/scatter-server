const { ObjectId } = require('mongoose').Types;
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
// configure mongoose promises
mongoose.Promise = global.Promise;

// manage file announcement
function login(io) {
  io.on('connection', (socket) => {
    socket.on('login', async (data, fn) => {
      const sessionData = {
        userId: '5a3507457db4e6110651379b',
      };
      const sessionToken = {
        jwt: jwt.sign(sessionData, 'secreti'),
      };

      fn(JSON.stringify(sessionToken));
      return sessionToken;
    });
  });
}

module.exports = login;
