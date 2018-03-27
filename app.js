const app = require('express')()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const user = require('./routers/user/')
const info = require('./routers/info/')
const chat = require('./routers/chat')
const api = require('./routers/discovery/')
const cors = require('cors')

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cookieSession({
  name: 'chat_session',
  keys: ['youkonw'],
  maxAge: 60 * 60 * 24 * 3 * 1000
}))

app.use('/api', api)
app.use('/user', user)
app.use('/info', info)
app.use('/chat', chat)

module.exports = app
