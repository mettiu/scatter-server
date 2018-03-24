const mongoose = require('mongoose');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const folderSchema = new Schema(
  {
    name: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder' },
  },
  {
    timestamps: true,
  },
);

folderSchema.statics.createRoot = function (userId) {
  const rootFolder = new this({
    name: '', // root folder name shall be empty string!
    user: userId,
    // root folder shall NOT have parent property!
  });
  return rootFolder.save();
};

const Folder = mongoose.model('Folder', folderSchema);

module.exports = Folder;
