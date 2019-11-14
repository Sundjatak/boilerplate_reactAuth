const mongoose = require('mongoose'),

Schema = mongoose.Schema;
const CaptionSchema = new Schema({
    title: String,
    subtitle: String,
    text: String,
    type: String,
  },
  { timestamps: true }
);

const CaptionModel = mongoose.model("caption", CaptionSchema);
module.exports = CaptionModel;
