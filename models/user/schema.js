const { Schema } = require('mongoose')
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isFillInfo: {
    type: Boolean
  },
  role: {
    type: String,
    default: 'boss'
  },
  avatar: {
    type: String
  },
  nickname: {
    type: String
  },
  job: {
    type: String
  },
  salary: {
    type: String
  },
  selfDescription: {
    type: String
  },
  jobDescription: {
    type: String
  },
  updateTime: {
    type: String
  },
  company: {
    type: String
  }
})

module.exports = userSchema
