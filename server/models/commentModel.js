const mongoose = require('mongoose'),

Schema = mongoose.Schema;
const CommentSchema = new Schema({
    comment: {
      type: String
    },
    author: {
      type: String,
      required: '{PATH} is required!'
    },
  },
  { timestamps: true }
);



const CommentModel = mongoose.model("Comment", CommentSchema);

module.exports = CommentModel;
