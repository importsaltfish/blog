const express = require('express')
const path = require('path')
//会给req增加一个body属性，存的是post的参数
const bodyParser = require('body-parser')
const session = require('express-session')

const template = require('art-template')
const dateFormat = require('dateformat')
//开发环境时，将客户端发送的请求信息打印到控制台中
const morgan = require('morgan')
// 允许开发人员将不同运行环境下的应用配置信息抽离到单独的文件中，
// 模块内部自动判断但钱应用的运行环境，并读取对应的配置信息
const config = require('config')


const app = express()
//数据库
require('./model/connect')

//处理post请求参数
app.use(bodyParser.urlencoded({extended: false}))
//配置session
app.use(session({secret: 'secret key', saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'art')
app.engine('art', require('express-art-template'))
//向模板内部导入dateFormate变量
template.defaults.imports.dateFormat = dateFormat
//可以在模板中使用parse方法
template.defaults.imports.parse = JSON.parse
//开放静态资源
app.use(express.static(path.join(__dirname, 'public')))
//使用config模块获取相关信息
console.log(config.get("title"));
//获取系统环境变量(NODE_ENV是自己在电脑中配置的环境变量)
if (process.env.NODE_ENV == 'development') {
  console.log('当前是开发环境');
  //在开发环境中，将客户端发送到服务器端的请求信息打印到控制台中
  app.use(morgan('dev'))
}else {
  console.log('当前是生产环境');
}


//引入路由模块
const home = require('./route/home')
const admin = require('./route/admin')
//拦截请求，判断用户登录状态
app.use('/admin', require('./middleware/loginGuard'))

//为路由匹配请求路径
app.use('/home', home)
app.use('/admin', admin)
//错误处理中间件
// app.use((err, req, res, next) => {
//   //将字符串对象转换为对象类型
//   const result = JSON.parse(err)
//   let params = []
//   for(let attr in result) {
//     if (attr !='path') { 
//       params.push(attr + '=' + result[attr])
//     }
//   }
//   res.redirect(`${result.path}?${params.join('&')}`)
// })


app.listen(80)

console.log('服务器启动成功');