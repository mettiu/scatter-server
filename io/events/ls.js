const { ObjectId } = require('mongoose').Types;
const File = require('../../models/file');

const mongoose = require('mongoose');
// configure mongoose promises
mongoose.Promise = global.Promise;

// manage file announcement
function ls(io) {
  io.on('connection', (socket) => {
    socket.on('file-list', async (data, fn) => {
      console.log('data: ', data);
      console.log('suserId: ', socket.sUserId);

      const searchValue = {
        user: ObjectId('5a3507457db4e6110651379b'),
        nextVersionFile: { $exists: false },
      };
      console.log('search:', searchValue);
      const query = File.find(searchValue).sort({ fileName: 1 });
      const files = await query.exec();

      fn(JSON.stringify(files));
      return files;
    });
  });
}

module.exports = ls;
