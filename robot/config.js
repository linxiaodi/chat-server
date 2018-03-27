module.exports = function fn(msg) {
  return {
    'reqType': 0,
    'perception': {
      'inputText': {
        'text': msg
      },
      // 'selfInfo': {
      //   'location': {
      //     'city': '北京',
      //     'province': '北京',
      //     'street': '信息路'
      //   }
      // }
    },
    'userInfo': {
      'apiKey': '7d3c60f7f2e94ced91cf37561e9c8bca',
      'userId': 115329
    }
  }
}
