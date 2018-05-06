// All the maker fanctions are imported. Then they are
// wrapped into an object that returns all the util functions
// that can be created with the makers.
// for testing purposes, you can inject from here any
// mock dependency and/or parameter.

const makeLogin = require('./login.factory');
const makeCd = require('./cd.factory');
const makeLs = require('./ls.factory');

const makeCommandUtils = (request, socket, config) => ({
  login: makeLogin(request, config.http.login.uri),
  cd: makeCd(socket),
  ls: makeLs(socket),
});

module.exports = makeCommandUtils;
