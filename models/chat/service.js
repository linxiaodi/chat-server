const { create, find, update } = require('./model')
const { resolved } = require('../code')

class Chat {
  static async create(data) {
    const newOne = await create(data)
    return newOne
  }

  static async findDetails(_id) {
    const findRes = await find(_id)
    return {
      ...resolved,
      data: findRes || []
    }
  }

  static async markRead(query) {
    const find = await update(query)
    return {
      ...resolved,
      data: find
    }
  }
}

module.exports = Chat
