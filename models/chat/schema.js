const { Schema } = require('mongoose')
const chatSchema = new Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createAt: {
    type: Number,
  },
  chatid: {
    type: String
  },
  unread: {
    type: Number,
    required: true
  }
})

module.exports = chatSchema
