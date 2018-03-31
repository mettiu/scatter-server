const connect = require('./events/connect');
const disconnect = require('./events/disconnect');
const fileAnnouncement = require('./events/fileAnnouncement');
const fileChunkUpload = require('./events/fileChunkUpload');
const getRoot = require('./events/getRoot');
const login = require('./events/login');
const ls = require('./events/ls');
const mkdir = require('./events/mkdir');
const cd = require('./events/cd');


function setupIO(io) {
  cd(io);
  connect(io);
  disconnect(io);
  fileAnnouncement(io);
  fileChunkUpload(io);
  getRoot(io);
  login(io);
  ls(io);
  mkdir(io);
}

module.exports = setupIO;
