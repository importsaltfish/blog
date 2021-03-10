const mongoose = require('mongoose')
//密码加密
const bcrypt = require('bcrypt')
//用户信息验证
const Joi = require('joi')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 20
  },
  email: {
    type: String,
    unique: true,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  //admin 超级用户
  //normal 普通用户
  role: {
    type: String,
    require: true
  },
  //0启用
  //1禁用
  state: {
    type: Number,
    default: 0
  }
})
const User = mongoose.model('User', userSchema)

// async function createUser() {
//   const salt = await bcrypt.genSalt(10)
//   const pass = await bcrypt.hash('123456', salt)
//   const user = await User.create({
//     username: '小红',
//     email: '123456@qq.com',
//     password: pass,
//     role: 'admin',
//     state: 0
//   })
// }

// createUser()

//验证用户信息
const validateUser = user => {
  const schema = Joi.object({
    username: Joi.string().min(2).max(12).required().error(new Error('用户名不符合验证规则')),
    email: Joi.string().email().error(new Error('邮箱格式不符合要求')),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不符合要求')),
    role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值非法')),
    state: Joi.number().valid(0, 1).required().error(new Error('状态值非法'))
  })
  return schema.validateAsync(user)
}

module.exports = {
  User,
  validateUser
}