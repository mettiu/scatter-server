const { ObjectId } = require('mongoose').Types;
const File = require('../../models/file');
const Folder = require('../../models/folder');
const mongoose = require('mongoose');

// configure mongoose promises
mongoose.Promise = global.Promise;

function ls(io) {
  io.on('connection', (socket) => {
    socket.on('file-list', async (data, fn) => {
      const sortFiles = { name: 1 };
      const sortFolders = { name: 1 };
      const files = await File
        .listFilesInFolder(socket.sDecoded._id, socket.sCurrentFolder._id, sortFiles);
      const folders = await Folder
        .listFoldersInFolder(socket.sDecoded._id, socket.sCurrentFolder._id, sortFolders);
      fn(JSON.stringify({ files, folders }));
      return files;
    });
  });
}

module.exports = ls;
