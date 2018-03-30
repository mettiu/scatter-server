const sessions = require('../util/sessions');

function connection(io) {
  io.on('connection', (socket) => {
    socket.on('disconnect', (reason) => {
      console.log('Disconnect Event ', reason);
    });
  });
}

module.exports = connection;
