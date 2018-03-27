const User = require('../models/user/').service
function auth(req, res, next) {
  (async () => {
    const { _id } = req.session
    const errorRes = { code: 4006, msg: '请登录' }
    console.log(req.session)
    if (_id) {
      const find = await User.findUserById(_id)
      if (find) {
        next()
      } else {
        res.json(errorRes)
      }
    } else {
      res.json(errorRes)
    }
  })()
}

module.exports = auth
