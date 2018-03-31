const { ObjectId } = require('mongoose').Types;
const File = require('../../models/file');
const Folder = require('../../models/folder');

const mongoose = require('mongoose');
// configure mongoose promises
mongoose.Promise = global.Promise;

// manage file announcement
function ls(io) {
  io.on('connection', (socket) => {
    socket.on('file-list', async (data, fn) => {
      console.log('data: ', data);
      console.log('suserId: ', socket.sUserId);

      const fileSearchValue = {
        user: ObjectId('5a3507457db4e6110651379b'),
        nextVersionFile: { $exists: false },
        folder: socket.sCurrentFolder._id,
      };
      console.log('search:', fileSearchValue);
      const fileQuery = File.find(fileSearchValue).sort({ fileName: 1 });
      const files = await fileQuery.exec();

      const folderSearchValue = {
        user: ObjectId('5a3507457db4e6110651379b'),
        parent: socket.sCurrentFolder._id,
      };
      console.log('search:', folderSearchValue);
      const folderQuery = Folder.find(folderSearchValue).sort({ name: 1 });
      const folders = await folderQuery.exec();

      fn(JSON.stringify({ files, folders }));
      return files;
    });
  });
}

module.exports = ls;
