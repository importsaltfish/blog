const {Article} = require('../../model/article')
const {Comment} = require('../../model/comment')
module.exports = async (req, res) => {
  const id = req.query.id
  //文章
  let article = await Article.findOne({_id: id}).populate('author')
  article = JSON.stringify(article)
  //评论
  let comments = await Comment.find({aid: id}).populate('uid')
  comments = JSON.stringify(comments)
  res.render('home/article.art', {
    article,
    comments
  })
}