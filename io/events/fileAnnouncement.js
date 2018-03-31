const { ObjectId } = require('mongoose').Types;
const File = require('../../models/file');

const mongoose = require('mongoose');
// configure mongoose promises
mongoose.Promise = global.Promise;

// This function creates the token that will be returned to client
// for the subsequent chunk upload
function getToken(file) {
  return new Promise(resolve => resolve(file._id));
}

// Save file
async function saveFile(fileToSave) {
  const newFile = new File(fileToSave);
  const savedFile = await newFile.save();
  console.log('savedFile: ', savedFile);
  return savedFile;
}

// manage file announcement
function fileAnnouncement(io) {
  io.on('connection', (socket) => {
    socket.on('file-upload', async (data, fn) => {
      console.log('data: ', data);

      const searchValue = {
        fileName: data.fileName,
        user: socket.sDecoded._id, // ObjectId('5a3507457db4e6110651379b'),
        folder: socket.sCurrentFolder._id,
      };
      console.log('search:', searchValue);
      const query = File.find(searchValue).sort({ createdAt: -1 });
      const files = await query.exec();

      const fileToSave = Object.assign({
        user: socket.sDecoded._id, // ObjectId('5a3507457db4e6110651379b'),
        folder: socket.sCurrentFolder._id,
      }, data);

      // if this is a NEW file
      if (files.length === 0) {
        const savedFile = await saveFile(fileToSave);
        fn(JSON.stringify({
          token: await getToken(savedFile),
          saved: true,
          versioned: false,
        }));
        return savedFile;
      }

      // if this is a new file VERSION
      if (files[0].size !== data.size || files[0].lastModified.getTime() !== data.lastModified) {
        fileToSave.previousVersionFile = files[0]._id;
        const savedFile = await saveFile(fileToSave);
        files[0].set({ nextVersionFile: savedFile.id });
        await files[0].save();
        fn(JSON.stringify({
          token: await getToken(savedFile),
          saved: true,
          versioned: true,
        }));
        return savedFile;
      }

      // if the file already exists and there is NO CHANGE
      fn(JSON.stringify({
        token: null,
        saved: false,
        versioned: false,
      }));
      return null;
    });
  });
}


module.exports = fileAnnouncement;
