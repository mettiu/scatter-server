// Use this to inject dependencies into our functions.
// For testing purposes, don't use this file. You may import
// directely command utils factory, in order to be able to mock
// test dipendencies.

const request = require('request-promise-native');
const config = require('../config');
const makeCommandUtils = require('./command-utils.factory');

module.exports = socket => makeCommandUtils(request, socket, config);
