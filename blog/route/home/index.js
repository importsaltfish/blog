const {Article} = require('../../model/article')
//分页
const pagination = require('mongoose-sex-page')

module.exports = async (req, res) => {
  const page = req.query.page
  let result = await pagination(Article).page(page).size(4).display(5).find().populate('author').exec()
  result = JSON.stringify(result)
  res.render('home/default.art', {
    result
  })
}