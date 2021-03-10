const http = require('http')
const app = http.createServer()

const queryString = require('querystring')

app.on('request', (req, res) => {
  let message = ''
  req.on('data', params => {
    message += params
  })
  req.on('end', () => {
    console.log(message);
    console.log( queryString.parse(message));
   
  })
  res.end('ok')
})

app.listen(3000)