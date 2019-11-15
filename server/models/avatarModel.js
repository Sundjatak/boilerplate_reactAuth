const mongoose = require('mongoose'),

Schema = mongoose.Schema;
const AvatarSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  avatar: {
          type: String
      }
  }, {
      collection: 'users'
  })


const AvatarModel = mongoose.model("avatar", AvatarSchema);
module.exports = AvatarModel;
