const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');

const { Schema } = mongoose;

const Chunk = new Schema(
  {
    uuid: { type: String, default: uuidv4() },
    file: { type: mongoose.Schema.Types.ObjectId, ref: 'File' },
    chunkSize: Number,
    seq: Number,
    data: Buffer,
    hash: String,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Chunk', Chunk);
