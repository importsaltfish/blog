const express = require('express')
//导入用户集合构造函数


const admin = express.Router()

admin.get('/login', require('./admin/loginPage'))
admin.post('/login', require('./admin/login') )
//创建用户列表路由
admin.get('/user', require('./admin/userPage'))
//实现退出功能
admin.get('/logout', require('./admin/logout'))
//用户编辑页面
admin.get('/user-edit', require('./admin/userEditPage'))
//实现用户添加功能
admin.post('/user-edit', require('./admin/userEdit'))
//用户信息更改功能
admin.post('/user-modify', require('./admin/userModify'))
//用户删除功能
admin.get('/delete', require('./admin/user-delete'))

//文章列表页面路由
admin.get('/article', require('./admin/article'))
//文章编辑页面路由
admin.get('/article-edit', require('./admin/article-edit'))
//实现文章添加功能
admin.post('/article-add', require('./admin/article-add'))

module.exports = admin