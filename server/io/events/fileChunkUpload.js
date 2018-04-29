const File = require('../../models/file');
const Chunk = require('../../models/chunk');
const uuidv4 = require('uuid/v4');
const crypto = require('crypto');

const mongoose = require('mongoose');
// configure mongoose promises
mongoose.Promise = global.Promise;

function getFileId(token) {
  return new Promise(resolve => resolve(token));
}

function fileChunkUpload(io) {
  io.on('connection', (socket) => {
    socket.on('chunk-upload', async (data, fn) => {
      // TODO: extracu userId from session (or wherever it is!)

      const file = await File.findOne({ _id: await getFileId(data.token) });

      const dataBuffer = Buffer.from(data.buffer, 'base64');
      const hash = crypto.createHash('sha512').update(dataBuffer).digest('base64');

      const newChunk = new Chunk({
        uuid: uuidv4(),
        file: file._id,
        chunkSize: data.chunkSize,
        seq: data.seq,
        data: dataBuffer,
        hash,
      });
      await newChunk.save((error, saved) => {
        if (error) console.log('error! ', error);
        console.log('saved: ', saved);
        fn(JSON.stringify({
          saved: true,
          uuid: newChunk.uuid,
        }));
        return saved;
      });
    });
  });
}

module.exports = fileChunkUpload;
