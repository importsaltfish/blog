const bcrypt = require('bcrypt')

async function run() {
  //genSalt接收一个数值作为参数，数值越大，生成的随机字符串越复杂
  const salt = await bcrypt.genSalt(10)
  const result = await bcrypt.hash('123456', salt)
  console.log(salt);
  console.log(result);
}

run()