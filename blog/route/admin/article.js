const {Article} = require('../../model/article')
const pagination = require('mongoose-sex-page')

module.exports = async (req, res) => {
  //接收客户端传递过来的页码
  const page = req.query.page
  //表示当前访问的是用户管理页面
  req.app.locals.currentLink = 'article'
  // lean属性的作用：转换mongoose查询结果类型，从MongooseDocuments转换为JS Object，从而便于我们修改查询结果,这里不使用渲染时会报错
  // let articles = await Article.find().populate('author').lean()
  //分页
  //page 当前页
  //size 每页显示的数据条数
  //display 要显示的页码数量
  //exec 向数据库中发送查询请求
  // 如果使用了第三方模块mongoose-sex-page控制查询数据，则不能使用lean()
  let articles = await pagination(Article).find().page(page).size(2).display(3).populate('author').exec()
  articles = JSON.stringify(articles)
  // res.send(articles)
  res.render('admin/article', {
    articles
  })
}