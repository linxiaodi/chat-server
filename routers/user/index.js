const Router = require('express')()
const auth = require('../../middlewares/auth')
const UserModel = require('../../models/user/')
const { register, login, findUserById } = UserModel.service

Router.post('/register', function (req, res) {
  (async () => {
    const result = await register(req.body)
    if (result.data) {
      const { _id } = result.data
      req.session._id = _id
    }
    res.json(result)
  })()
})

Router.post('/login', function (req, res) {
  (async () => {
    console.log(req.session)
    const result = await login(req.body, req)
    const { _id } = result.data
    req.session._id = _id
    res.json(result)
  })()
})

Router.get('/init', auth, function (req, res) {
  (async () => {
    const { _id } = req.session
    const find = await findUserById(_id)
    res.json(find)
  })()
})

Router.get('/logout', function (req, res) {
  console.log(req.session._id)
  req.session._id = ''
  res.json({
    code: 2000,
    msg: '成功'
  })
})

module.exports = Router
