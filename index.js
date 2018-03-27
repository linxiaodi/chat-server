const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const socketIo = require('socket.io')
const app = require('./app')
const ChatService = require('./models/chat/').service
const robotCreator = require('./robot')
const robotAnalysis = require('./robot/analysis')

mongoose.Promise = global.Promise
const mongoUrl = 'mongodb://localhost:27017/chat'
const port = 8000

const server = http.createServer(app)
const io = socketIo(server)

app.use(express.static('public'))

// io run
io.on('connection', function (socket) {
  console.log('用户登录了')
  socket.on('sendMsg', function (data) {
    // 广播全局
    // data : from to content
    (async () => {
      const { from, to, content } = data
      const standardMsg = {
        from,
        to,
        content,
        chatid: [from, to].sort().join('_'),
        createAt: Date.now(),
        unread: 1
      }

      // 不必广播到全局
      if (to === 'robot') {
        socket.emit('resvmsg', { ...standardMsg, unread: 0 })
        const robotMsg = await robotCreator(data)
        return socket.emit('resvmsg', {
          ...standardMsg,
          to: data.from,
          from: data.to,
          content: robotAnalysis(JSON.parse(robotMsg)),
          createAt: Date.now(),
          unread: 0
        })
      }

      const inertOne = await ChatService.create(standardMsg)
      io.emit('resvmsg', inertOne)
    })()
  })
})

server.listen(port, () => {
  console.log(`engine start at http://localhost:${port}`)
})
// default port 27017
const db = mongoose.connect(mongoUrl, { useMongoClient: true })

db.on('open', () => {
  console.log('mongodb connect, port 27017, database is chat')
})

db.on('error', () => {
  console.log('mongodb connect error')
})