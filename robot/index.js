const http = require('http')
const config = require('./config')
module.exports = function ({ content }) {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'openapi.tuling123.com',
      path: '/openapi/api/v2',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }, (res) => {
      let data = ''
      res.on('data', function (chunk) {
        data += chunk
      })
      res.on('end', () => {
        resolve(data)
      })
    })
    req.on('error', (e) => {
      console.log('problem with request: ' + e.message)
      reject(e)
    })
    req.write(JSON.stringify(config(content)))
    req.end()
  })
}
