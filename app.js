//导入
const http = require('http') 
//创建实例对象
const app = http.createServer()
//用于处理url地址
const url = require('url')
//监听事件
app.on('request', (req, res) => {

  res.writeHead(200, {
    'content-type': 'text/html;charset=utf8'
  })

  // console.log(req.url);
  console.log(url.parse(req.url));
  let {query, pathname} = url.parse(req.url)
  // console.log(req.headers.accept);
  if(pathname == '/index' || pathname == '/') {
    res.end('<h2>欢迎来到首页</h2>');
  } else if (pathname == '/list') {
    res.end('<h2>welcome to listpage</h2>');
  } else {
    res.end('<h2>404 not found</h2>');
  }
  //通过输入网址的方式时get
  //form表单可以设置请求方式，通过method方法，默认值是get可以设置为post
  //post更安全
  // if(req.method == 'POST') {
  //   res.end('post')
  // } else if (req.method == 'GET') {
  //   res.end('get')
  // }


})
//监听端口
app.listen(3000)

console.log('网站服务器启动成功');