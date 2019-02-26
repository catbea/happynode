/**
 * Created by CuiGunaghao on 2018/3/5.
 * @title
 */
const Package = require('../package.json')
const utils = require('./utils')

async function getUserInfo () {
  let r = await db.miner.R({d_flag: 0}, {name: 1, id: 1, code: 1}, {d_flag: 1, order_num: 1}).run()
  return r
}

module.exports = {
  getUserInfo
}
