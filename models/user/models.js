const mongoose = require('mongoose')
const userSchema = require('./schema')
const userModel = mongoose.model('user', userSchema)
const { resolved } = require('../code')
const options = {
  new: true,
  upsert: true,
}

async function register({ username, password, role }) {
  const res = await userModel.create({
    username,
    password,
    role,
    isFillInfo: false,
  })
  return res
}

async function findUserByUsername({ username }) {
  const res = await userModel.findOne({ username })
  // filter原型链上的信息
  return res
}

async function findUserById(_id) {
  const res = await userModel.findById(_id, {
    __v: 0,
    password: 0,
    username: 0
  })
  return res
}

async function fillInfo(_id, data) {
  const res = await userModel.findOneAndUpdate({ _id }, data, {
    ...options,
  })
  return res
}

async function findByRole({ role }) {
  const res = await userModel.find({ role, isFillInfo: true }, {
    __v: 0,
    password: 0,
    username: 0,
  }, { new: true }).sort({ _id: -1 })
  return res
}

async function findByManyId(idMap) {
  // const query = { $or: [] }
  // query.$or = idMap.map(v => ({
  //   _id: v
  // }))
  // console.log(query)
  const find = await userModel.find({
    _id: {
      $in: idMap
    }
  }, { __v: 0, password: 0, username: 0 }, { new: true })
  return find
}

module.exports = {
  register,
  findUserByUsername,
  findUserById,
  fillInfo,
  findByRole,
  findByManyId
}

