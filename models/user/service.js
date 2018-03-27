const {
  register,
  findUserByUsername,
  findUserById,
  fillInfo,
  findByRole
} = require('./models')
const { hadRegister, resolved, pwdError, toFillInfo } = require('../code')

class User {
  static async register(data) {
    const find = await findUserByUsername(data)
    if (find) return hadRegister
    const result = await register(data)
    if (result) {
      return {
        ...resolved,
        msg: '注册成功'
      }
    }
  }

  static async login(data) {
    const res = await findUserByUsername(data)
    if (res) {
      if (data.password === res.password) {
        const { password, ...resData } = res._doc
        return {
          ...resolved,
          msg: '登陆成功',
          data: resData
        }
      } else {
        return pwdError
      }
    }
    return pwdError
  }

  static async findUserById(_id) {
    const res = await findUserById(_id)
    if (res.isFillInfo) {
      return {
        ...resolved,
        data: res
      }
    } else {
      return {
        ...toFillInfo,
        data: res
      }
    }
  }

  static async updateUserInfo(_id, data) {
    const d = new Date()
    const res = await fillInfo(_id, { ...data, isFillInfo: true, updateTime: d.toISOString() })
    return {
      ...resolved,
      data: {
        isFillInfo: res.isFillInfo
      }
    }
  }

  static async discoverUser(_id) {
    const find = await findUserById(_id)
    const role = find.role === 'boss' ? 'genius' : 'boss'
    const result = await findByRole({ role })
    return {
      ...resolved,
      data: result
    }
  }
}

module.exports = User
