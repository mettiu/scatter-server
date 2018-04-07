const mongoose = require('mongoose');
const File = require('./file');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const folderSchema = new Schema(
  {
    name: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder' },
    deleted: Boolean,
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

folderSchema.statics.exists = async function (searchValue) {
  const query = this.findOne(searchValue).where({
    $or: [
      { deleted: false },
      { deleted: { $not: { $exists: true } } },
    ],
  });
  const found = await query.exec();
  return !!found; // return found ? true : false;
};

folderSchema.statics.findInFolderByName = async function (foldername, userId, parentId) {
  const where = {
    name: foldername,
    user: userId,
    parent: parentId,
    $or: [
      { deleted: false },
      { deleted: { $not: { $exists: true } } },
    ],
  };
  console.log(where);
  const query = this.findOne(where);
  const found = await query.exec();
  return found;
};

folderSchema.statics.deleteFolder = async function (userId, folderId, folderName) {
  const where = {
    user: userId,
    parent: folderId,
    name: folderName,
    $or: [
      { deleted: false },
      { deleted: { $not: { $exists: true } } },
    ],
  };
  const query = this
    .where(where)
    .updateMany({ deleted: true });
  const deleted = await query.exec();
  console.log('deleted', deleted, where);
  return deleted;
};

folderSchema.statics.listFoldersInFolder = async function (userId, folderId, sort) {
  const where = {
    user: userId,
    parent: folderId,
    $or: [
      { deleted: false },
      { deleted: { $not: { $exists: true } } },
    ],
  };
  const query = this.find(where).sort(sort);
  const found = await query.exec();
  return found;
};

folderSchema.statics.listFilesInFolder = async function (userId, folderId, sort) {
  const where = {
    user: userId,
    folder: folderId,
    nextVersionFile: { $exists: false },
    $or: [
      { deleted: false },
      { deleted: { $not: { $exists: true } } },
    ],
  };
  const query = File.find(where).sort(sort);
  const found = await query.exec();
  return found;
};

folderSchema.statics.listContents = async function (userId, folderId, sort) {
  const found = {};
  found.folders = await this.listFoldersInFolder(userId, folderId, sort);
  found.files = await this.listFilesInFolder(userId, folderId, sort);
  return found;
};

const Folder = mongoose.model('Folder', folderSchema);

module.exports = Folder;
