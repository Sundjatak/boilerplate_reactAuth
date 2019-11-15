'use strict'
'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const LogEntry = new Schema({
  no: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
})

module.exports = mongoose.model('logEntry', LogEntry)
