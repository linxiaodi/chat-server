const resolved = {
  code: 2000,
  msg: '成功'
}

const hadRegister = {
  code: 4009,
  msg: '账号已被注册'
}

const noAuth = {
  code: 4006,
  msg: '未登录'
}

const pwdError = {
  code: 4009,
  msg: '账号或密码错误'
}

const toFillInfo = {
  code: 4007,
  msg: '请完善您的信息'
}

module.exports = {
  resolved,
  hadRegister,
  noAuth,
  toFillInfo,
  pwdError
}
