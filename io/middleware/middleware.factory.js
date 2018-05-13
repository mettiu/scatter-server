const makeQueryTokenMiddleware = require('./query-token-middleware.factory');

// An object literal is returned. The object contains:
// * a middlewares property: it's an object literal containing single named middleware instances
// * a middlewaresOrderedList: it's an array containing the same object literals contained in the
//   previous object, but unamed (array), ordered and iterable. This array is suitable for cicling
//   with a for...of loop in order to setup middlewares in a cool and automated fashion.
const makeMiddlewares = (jwt, config) => {
  // define all the middlewares here
  const queryTokenMiddleware = makeQueryTokenMiddleware(jwt, config);
  // ...

  return {
    middlewares: {
      // insert all the defined (and named) middlewares here
      queryTokenMiddleware,
      queryTokenMiddleware1: queryTokenMiddleware,
      // ...
    },
    middlewaresOrderedList: [
      // insert here all the middlewares that shall be inserted automatically in the application
      queryTokenMiddleware,
      queryTokenMiddleware,
      // ...
    ],
  };
};

module.exports = makeMiddlewares;
