const mongoose = require('mongoose')
const config = require('config')
// mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true })
//使用账号123和密码123注意没有空格
// mongoose.connect('mongodb://123:123@localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connect(`mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}/${config.get('db.name')}`, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('数据库连接成功');
  }).catch(() => {
    console.log('数据库连接失败');
  })