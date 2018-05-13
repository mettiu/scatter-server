
const makeQueryTokenMiddleware = (jwt, config) =>
  async (socket, next) => {
    if (socket.handshake.query && socket.handshake.query.token) {
      let decoded;
      try {
        decoded = await jwt.verify(socket.handshake.query.token, config.jwt.secret);
      } catch (e) {
        return next(new Error('Authentication error'));
      }
      socket.decodedToken = decoded; // eslint-disable-line no-param-reassign
      return next();
    }
    return next(new Error('Authentication error'));
  };

module.exports = makeQueryTokenMiddleware;
