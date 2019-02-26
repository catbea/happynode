/**
 * 不同项目也通用的工具s
 */

const redis = global.redis

/**
 * 生成一个在某集合内唯一的随机字符串。基于redis防重复
 * @param string setName 集合名称，可随意定义
 * @param int length 字符串长度
 * @return bool | string 字符串就是生成好的，false表示无法生成
 */
const generateRandString = async function (setName) {
  if (!redis) {
    return false
  }

  const date = parseInt((new Date()).getTime() / 1000 / 60 / 60 / 24) + ''

  // 273972602739726000 年后，这里会返回false
  if (date.length > 20) {
    return false
  }

  // let str = $.tools.uuid(32 - date.length)
  // conole.log()
}

module.exports = {
  generateRandString
}
