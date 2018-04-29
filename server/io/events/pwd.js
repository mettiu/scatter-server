const { ObjectId } = require('mongoose').Types;
const Folder = require('../../models/folder');

const mongoose = require('mongoose');
// configure mongoose promises
mongoose.Promise = global.Promise;

// manage folder creation
function pwd(io) {
  io.on('connection', (socket) => {
    socket.on('pwd', async (data, fn) => {
      console.log('data: ', data);

      // search if requested folder exists
      const searchValue = {
        _id: socket.sCurrentFolder._id,
      };
      if (!await Folder.exists(searchValue)) {
        socket.sCurrentFolder = socket.sRootFolder; // eslint-disable-line no-param-reassign
        fn(JSON.stringify({
          error: true,
          message: `Folder '${socket.sCurrentFolder.name}' does not exist any more. Moving to root folder.`,
          folder: socket.sRootFolder,
        }));
        return;
      }

      fn(JSON.stringify({
        error: false,
        message: `You are in folder '${socket.sCurrentFolder.name}'.`,
        folder: socket.sCurrentFolder,
      }));
    });
  });
}

module.exports = pwd;
