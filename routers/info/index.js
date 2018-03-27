const Router = require('express')()

const auth = require('../../middlewares/auth')
const User = require('../../models/user/').service

Router.use(auth)

Router.post('/fillUserInfo', (req, res) => {
  (async () => {
    const { _id } = req.session
    const updateResult = await User.updateUserInfo(_id, req.body)
    res.json(updateResult)
  })()
})


module.exports = Router
