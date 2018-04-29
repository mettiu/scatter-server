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

// manage folder removal
function rmdir(io) {
  io.on('connection', (socket) => {
    socket.on('rmdir', async (data, fn) => {
      console.log('data: ', data);

      // search if requested folder exists and get its id, otherwise return an error
      const folderId = await Folder.findInFolderByName(
        data.folderName,
        socket.sDecoded._id,
        socket.sCurrentFolder._id,
      );
      if (!folderId) {
        fn(JSON.stringify({
          created: false,
          message: `Folder '${data.folderName}' does not exist. Can't remove.`,
        }));
        return;
      }

      // look if requested folder is empty, otherwise return an error
      const sortFiles = { name: 1 };
      const contents =
          await Folder.listContents(socket.sDecoded._id, folderId, sortFiles);
      if (contents.files.length + contents.folders.length > 0) {
        fn(JSON.stringify({
          created: false,
          message: `Folder '${data.folderName}' is not empty. Can't remove.`,
        }));
      }

      // if we're here, we can safeley delete folder!
      const returnValue =
        await Folder.deleteFolder(socket.sDecoded._id, socket.sCurrentFolder._id, data.folderName);
      fn(JSON.stringify(returnValue));
    });
  });
}

module.exports = rmdir;
