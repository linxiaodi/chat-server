const Router = require('express')()
const auth = require('../../middlewares/auth')
const Chat = require('../../models/chat/').service

Router.use(auth)

Router.get('/details', (req, res) => {
  (async () => {
    const { _id } = req.session
    const findRes = await Chat.findDetails(_id)
    res.json(findRes)
  })()
})

Router.get('/contactList', (req, res) => {
  (async () => {
    const { _id } = req.session
    const findRes = await Chat.getContactList(_id)
    res.json(findRes)
  })()
})

Router.get('/markRead', (req, res) => {
  (async () => {
    const { _id } = req.session
    const { from } = req.query
    const findRes = await Chat.markRead({ from, to: _id })
    res.json(findRes)
  })()
})

module.exports = Router
