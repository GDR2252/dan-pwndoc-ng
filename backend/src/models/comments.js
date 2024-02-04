var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CommentType = {
  author: String,
  commentId: String,
  content: String,
  replies: [],
  createdAt: String,
};

var CommentSchema = new Schema({
  editorId: String,
  comments: [CommentType],
});

/*
 *** Statics ***
 */

// Get all companies
CommentSchema.statics.get = (editorId) => {
  return new Promise((resolve, reject) => {
    var query = Comments.findOne({ editorId });
    query
      .exec()
      .then((rows) => {
        resolve(rows);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// Update company
CommentSchema.statics.update = (editorId, comments) => {
  const result = new Promise((resolve, reject) => {
    var query = Comments.findOneAndUpdate(
      { editorId },
      comments,
      { upsert: true, new: true } // upsert will create the document if it doesn't exist
    );

    query
      .exec()
      .then((updatedComments) => {
        resolve(updatedComments);
      })
      .catch((err) => {
        if (err.code === 11000) {
          reject({
            fn: "BadParameters",
            message: "Company name already exists",
          });
        } else {
          reject(err);
        }
      });
  });
  console.log(result);
  return result;
};

var Comments = mongoose.model("Comment", CommentSchema);
module.exports = Comments;
