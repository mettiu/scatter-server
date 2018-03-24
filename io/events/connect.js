const jwt = require('jsonwebtoken');
const sessions = require('../util/sessions');

function connect(io) {
  io.use(async (socket, next) => {
    console.log('USE');
    if (socket.handshake.query && socket.handshake.query.token) {
      let decoded;
      try {
        decoded = await jwt.verify(socket.handshake.query.token, 'secret');
      } catch (e) {
        console.log('ERROR, token is not valid');
        return next(new Error('Authentication error'));
      }
      socket.decoded = decoded; // eslint-disable-line no-param-reassign
      return next();
    }
    console.log('ERROR, no token found!');
    return next(new Error('Authentication error'));
  });

  io.on('connection', (socket) => {
    console.log(socket.id, socket.decoded);
    // console.log(io.sockets.connected);

    // TODO: match and join userId with https session
    const userId = 'mettiu@gmail.com';
    sessions.add(userId, socket.id);

    socket.emit('wellcome', 'Zot at your service!');
  });
}

module.exports = connect;
