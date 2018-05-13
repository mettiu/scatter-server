const makeIoSetup = require('./make-io-setup');
const makeMiddelwares = require('../middleware/middleware.factory');

const finalMiddlewareList = [];

const applicationMiddlewares = makeMiddelwares(null, null).middlewaresOrderedList;

const mockSocketIo = jest.fn()
  .mockReturnValue({
    use: middleware => finalMiddlewareList.push(middleware),
  });

const ioSetup = makeIoSetup(mockSocketIo, null, null);

const mockServer = 'Server';

describe('Testing Socket IO middleware setup', () => {
  it('should add middlewares to io with a "use" statement', () => {
    // const io = ioSetup(mockServer);
    ioSetup(mockServer);
    expect(mockSocketIo).toBeCalledWith(mockServer);
    expect(finalMiddlewareList.length).toBe(applicationMiddlewares.length);
  });
});
