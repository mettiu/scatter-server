const mongoose = require('mongoose');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const fileSchema = new Schema(
  {
    fileName: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    size: Number, // TODO: use a long for file size
    lastModified: Date,
    previousVersionFile: { type: mongoose.Schema.Types.ObjectId, ref: 'File' },
    nextVersionFile: { type: mongoose.Schema.Types.ObjectId, ref: 'File' },
  },
  {
    timestamps: true,
  },
);

fileSchema.index({
  fileName: 1, user: 1, createdAt: -1, size: 1,
}, { unique: true }); // schema level

// fileSchema.statics.getLastModifiedByFileNameAndUser = async function (fileName, user) {
//   const query = this.aggregate([
//     {
//       $match: {
//         fileName,
//         user: ObjectId(user),
//       },
//     },
//     {
//       $sort: {
//         lastModified: -1,
//       },
//     },
//     {
//       $group: {
//         _id: '$fileName',
//         lastModified: { $first: '$lastModified' },
//       },
//     },
//   ]);
//   const aggregateResult = await query.exec();
//   const { lastModified } = aggregateResult[0];
//   const result = await this.find({ fileName, user: ObjectId(user), lastModified });
//   return result[0];
// };

const File = mongoose.model('File', fileSchema);

module.exports = File;
