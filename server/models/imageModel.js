'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
})

module.exports = mongoose.model('Image', ImageSchema)
