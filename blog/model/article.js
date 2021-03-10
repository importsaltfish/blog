//导入
const mongoose = require('mongoose')
//创建规则
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 20,
    minlength: 4,
    require: [true, '请填写文章标题']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: [true, '请传递作者']
  },
  publishDate: {
    type: Date,
    default: Date.now
  },
  cover: {
    type: String,
    default: null
  },
  content: {
    type: String
  }
})
//利用规则创建集合
const Article = mongoose.model('Article', articleSchema)
//将集合规则作为模块成员进行导出
module.exports = {
  Article
}