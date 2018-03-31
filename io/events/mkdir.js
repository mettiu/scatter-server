const { ObjectId } = require('mongoose').Types;
const Folder = require('../../models/folder');

const mongoose = require('mongoose');
// configure mongoose promises
mongoose.Promise = global.Promise;

// Save folder
async function saveFolder(folderToSave) {
  const newFolder = new Folder(folderToSave);
  const savedFolder = await newFolder.save();
  console.log('savedFolder: ', savedFolder);
  return savedFolder;
}

// manage folder creation
function mkdir(io) {
  io.on('connection', (socket) => {
    socket.on('mkdir', async (data, fn) => {
      console.log('data: ', data);

      // search if requested folder already exists
      const searchValue = {
        parent: socket.sCurrentFolder._id,
        name: data.name,
      };
      if (await Folder.exists(searchValue)) {
        fn(JSON.stringify({
          created: false,
          message: `Folder '${data.name}' already exists. Can't create.`,
        }));
        return;
      }

      // requested folder does not exist yet, so create it!
      const folderToSave = {
        user: ObjectId(socket.sDecoded._id),
        parent: socket.sCurrentFolder._id,
        name: data.name,
      };
      const savedFolder = await saveFolder(folderToSave);
      fn(JSON.stringify(savedFolder));
    });
  });
}

module.exports = mkdir;
