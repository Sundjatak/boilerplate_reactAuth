const mongoose = require('mongoose'),

Schema = mongoose.Schema;
const CategorySchema = new Schema({
    title: String,
    subtitle: String,
  },
  { timestamps: true }
);

const CategoryModel = mongoose.model("category", CategorySchema);
module.exports = CategoryModel;
