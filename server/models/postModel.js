const mongoose = require('mongoose'),

Schema = mongoose.Schema;
const PostSchema = new Schema({
    title: {
      type: String,
      required: '{PATH} is required!'
    },
    subtitle: {
      type: String
    },
    text: {
      type: String
    },
    tags: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'category'
    },
    vip: {
      type: Boolean,
    },
    image: {
      type: String
    },
    commentIDs: [{
     type: Schema.Types.ObjectId,
     ref: 'Comment'
   }],
  },
  { timestamps: true }
);



const PostModel = mongoose.model("Post", PostSchema);

module.exports = PostModel;
