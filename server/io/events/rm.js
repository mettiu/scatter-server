const File = require('../../models/file');

const mongoose = require('mongoose');
// configure mongoose promises
mongoose.Promise = global.Promise;

// manage file remove
function rm(io) {
  io.on('connection', (socket) => {
    socket.on('rm', async (data, fn) => {
      console.log('data: ', data);
      console.log('user', socket.sDecoded._id, 'currentfolder', socket.sCurrentFolder);

      const result =
          await File.deleteFile(socket.sDecoded._id, socket.sCurrentFolder._id, data.filename);
      fn(JSON.stringify({
        error: false,
        deleted: result,
      }));
    });
  });
}

module.exports = rm;
