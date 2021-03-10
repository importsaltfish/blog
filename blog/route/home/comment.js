const {Comment} = require('../../model/comment.js')
module.exports = async (req, res) => {
  const {content, uid, aid} = req.body
  await Comment.create({
    content,
    uid,
    aid,
    tiem: new Date()
  })
  res.redirect('/home/article?id=' + aid)
}