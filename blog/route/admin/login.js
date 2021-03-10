const { User } = require('../../model/user')
const bcrypt = require('bcrypt')

module.exports = async (req, res) => {
  //接收请求参数
  const { email, password } = req.body
  if (email.trim().length == 0 || password.trim().length == 0) {
    return res.status(400)
      .render('admin/error', { msg: '邮箱地址或者密码错误' })
  }
  //根据邮箱地址查询用户信息
  //若查询到用户，user变量为对象，否则为空
  let user = await User.findOne({ email })
  //比对加密后密码

  if (user) {
    let isValid = await bcrypt.compare(password, user.password)
    if (isValid) {
      //将用户名存储在请求对象中
      req.session.username = user.username
      //将用户角色存储在session中
      req.session.role = user.role
      // res.send('登录成功')
      //将用户登录信息存储在了app.locals中,据此可以判断用户是否是登录状态
      req.app.locals.userInfo = user
      if (user.role == 'admin') {
        //express提供了redirect方法，不需要用res.writeHead了
        res.redirect('/admin/user')
      }else {
        res.redirect('/home/')
      }

    } else {
      res.status(400).render('admin/error', { msg: '邮箱地址或者密码错误' })
    }

  } else {
    res.status(400).render('admin/error', { msg: '邮箱地址或者密码错误' })
  }

}