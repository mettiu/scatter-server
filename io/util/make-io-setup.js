const makeMiddelwares = require('../middleware/middleware.factory');

const makeIoSetup = (socketIo, jwt, config) =>
  (server) => {
    const { middlewaresOrderedList } = makeMiddelwares(jwt, config);
    const io = socketIo(server);
    for (const middleware of middlewaresOrderedList) {
      io.use(middleware);
    }
    return io;
  };

module.exports = makeIoSetup;
