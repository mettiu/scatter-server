const Folder = require('../../models/folder');
const { ObjectId } = require('mongoose').Types;

const mongoose = require('mongoose');
// configure mongoose promises
mongoose.Promise = global.Promise;

function getRoot(io) {
  io.on('connection', (socket) => {
    socket.on('get-root', async (data, fn) => {
      // TODO: extract userId from session (or wherever it is!)
      const userId = socket.sDecoded._id; // '5a3507457db4e6110651379b';

      let rootFolder;
      try {
        const query = Folder.findOne({ user: ObjectId(userId), name: '', parent: { $exists: false } });
        query.select('_id name');
        rootFolder = await query.exec();
      } catch (e) {
        console.log(e);
      }

      if (rootFolder === null) {
        try {
          rootFolder = await Folder.createRoot(userId);
        } catch (e) {
          console.log(e);
        }
        console.log('rootfolder created!');
      }

      fn(JSON.stringify(rootFolder));
    });
  });
}

module.exports = getRoot;
