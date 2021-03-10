const {User, validateUser} = require('../../model/user')
const bcrypt = require('bcrypt')

module.exports = async (req, res, next) => {
 
  try{
    await validateUser(req.body)
  }catch(err) {
    // return res.redirect(`/admin/user-edit?message=${err.message}`)

    return next(JSON.stringify({path: '/admin/user-edit', message: err.message}))
  }
  //根据邮箱地址查询用户是否存在
  let userEmail = await User.findOne({email: req.body.email})
  let username = await User.findOne({username: req.body.username})
  if(userEmail) {
    //使用错误处理中间件
    // return res.redirect(`/admin/user-edit?message=邮箱地址已经被占用`)
    return next(JSON.stringify({path: '/admin/user-edit', message: '邮箱地址已经被占用'}))
  }else if (username){
    // return res.redirect(`/admin/user-edit?message=用户名重复`)
    return next(JSON.stringify({path: '/admin/user-edit', message: '用户名重复'}))
  }
  //对密码进行加密
  //生成随机字符串
  const salt = await bcrypt.genSalt(10)
  //加密
  const password = await bcrypt.hash(req.body.password, salt)
  //更替密码
  req.body.password = password 
  //将用户信息添加到数据库中
  await User.create(req.body)
  // res.send('添加成功')
  res.redirect('/admin/user')
}