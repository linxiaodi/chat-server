const Router = require('express')()
const auth = require('../../middlewares/auth')
const User = require('../../models/user/').service

Router.use(auth)

Router.get('/discovery', (req, res) => {
  (async () => {
    const { _id } = req.session
    const find = await User.discoverUser(_id)
    res.json(find)
  })()
})

module.exports = Router
