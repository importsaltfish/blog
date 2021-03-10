const Joi = require('joi')

const schema = Joi.object({
  username: Joi.string().required().min(2).max(5).error(new Error('username属性没有通过验证')),
  birth: Joi.number().min(1900).max(2021).error(new Error('birth没有通过验证'))
})
async function run() {
  try {
    await schema.validateAsync({username: 'ab'})
  }catch (err) {
    console.log(err.message);
    return
  }
  console.log('ok');
}
run()

