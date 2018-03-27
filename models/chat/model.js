const mongoose = require('mongoose')
const chatChema = require('./schema')
const chatModel = mongoose.model('chat', chatChema)

async function create(data) {
  const newOne = await chatModel.create({
    ...data,
    createAt: Date.now()
  })
  return newOne
}

async function find(_id) {
  const res = await chatModel.find({ $or: [{ from: _id }, { to: _id }] }).sort({
    createAt: 1
  }).limit(200)
  return res
}

async function update({ from, to }) {
  const res = await chatModel.updateMany({ from, to }, { unread: 0 }, {
    new: true
  })
  return res
}

module.exports = {
  create,
  find,
  update
}

/*
*   5ab13581017d73065ad97c7a 5aafdbbe7998f903bb956f6f
* db.users.find({ $or: [{ _id: ObjectId('5aafdbbe7998f903bb956f6f') }, { _id: ObjectId('5ab13581017d73065ad97c7a')}] })
* db.users.find({ _id: ObjectId('5ab13581017d73065ad97c7a') })
* */