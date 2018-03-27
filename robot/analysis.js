module.exports = function (res) {
  const { results } = res
  let response = ''
  console.log(res.results)
  results.forEach((e) => {
    switch (e.resultType) {
      case 'text':
        response += e.values.text
      default:
        response += ''
    }
  })
  return response
}
