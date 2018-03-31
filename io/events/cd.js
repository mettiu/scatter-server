const { ObjectId } = require('mongoose').Types;
const Folder = require('../../models/folder');

const mongoose = require('mongoose');
// configure mongoose promises
mongoose.Promise = global.Promise;

// manage folder creation
function cd(io) {
  io.on('connection', (socket) => {
    socket.on('cd', async (data, fn) => {
      console.log('data: ', data);

      // search if requested folder exists
      const searchValue = {
        parent: socket.sCurrentFolder._id,
        name: data.name,
      };
      const destinationFolder = await Folder.findOne(searchValue);
      if (!destinationFolder) {
        fn(JSON.stringify({
          error: true,
          message: `Folder ${data.name} does not exist.`,
        }));
        return;
      }

      socket.sCurrentFolder = destinationFolder; // eslint-disable-line no-param-reassign
      fn(JSON.stringify(destinationFolder));
    });
  });
}

module.exports = cd;
