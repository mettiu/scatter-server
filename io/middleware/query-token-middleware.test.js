const makeMiddlewares = require('./middleware.factory');

const mockNext = jest.fn()
  .mockReturnValue(true);

const decodedTokenValue = { fakeToken: 'Fake Token Value' };

const mockJwt = {
  // Just two mocks for returned values because the first test doesn't trigger this function
  verify: jest.fn()
    .mockReturnValueOnce(new Promise((resolve, reject) => {
      reject(new Error('Token not valid.'));
    }))
    .mockReturnValueOnce(new Promise((resolve) => {
      resolve(decodedTokenValue);
    })),

};

const mockConfig = {
  jwt: {
    secret: 'secret',
  },
};

const baseMockSocket = {
  handshake: {
    query: {
      token: 'token',
    },
  },
};

let mockSocket = null;

describe('Testing query token middleware', () => {
  const { queryTokenMiddleware } = makeMiddlewares(mockJwt, mockConfig).middlewares;

  beforeEach(() => {
    mockSocket = null;
    mockSocket = Object.assign({}, baseMockSocket);
  });

  it.only('should NOT verify token (config error)', async () => {
    // remove query value, in order to see if the function skips
    // everitung and throws an error.
    // No mockJwt call here!
    mockSocket = {
      handshake: {
        query: null,
      },
    };
    const result = await queryTokenMiddleware(mockSocket, mockNext);
    expect(result).toBe(true);
    expect(mockSocket).not.toHaveProperty('decodedToken');
    expect(mockJwt.verify).not.toBeCalled();
    expect(mockNext).toBeCalledWith(new Error('Authentication error'));
  });

  it.only('should NOT verify token (jwt verification failure)', async () => {
    const result = await queryTokenMiddleware(mockSocket, mockNext);
    expect(result).toBe(true);
    expect(mockSocket).not.toHaveProperty('decodedToken');
    expect(mockJwt.verify).toBeCalledWith(baseMockSocket.handshake.query.token, mockConfig.jwt.secret);
    expect(mockNext).toBeCalledWith(new Error('Authentication error'));
  });

  it.only('should verify token', async () => {
    const result = await queryTokenMiddleware(mockSocket, mockNext);
    expect(result).toBe(true);
    expect(mockSocket).toHaveProperty('decodedToken');
    expect(mockSocket.decodedToken).toBe(decodedTokenValue);
    expect(mockJwt.verify).toBeCalledWith(baseMockSocket.handshake.query.token, mockConfig.jwt.secret);
    expect(mockNext).toBeCalledWith();
  });
});
