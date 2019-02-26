/* global $ */
/* global db */
/* global isDevMode */

const Crypto = require('crypto')
const Package = require('../package.json')
const Req = require('request')
const Config = require('../config.js')
const PasswordKey = 'ailink_PasswordKey'

const ClearInvalidTimeout = 5 // 清楚 状态位时间 单位：秒
let timestamp = +new Date() // 唯一时间戳
let tokenSaveTime = 3600 * 5 // redis 数据缓存保留时间 单位：秒
let operCode = Package.name + ':minerOper:'

async function exist (table, whereObj) {
  $.log(`exist-----table-------${JSON.stringify(table.find)}`)
  $.log(`exist-----table-------${JSON.stringify(whereObj)}`)
  let r = await table.find(whereObj, { id: 1 }).run(1, isDevMode)
  $.log(`--------exist-r---------${JSON.stringify(r)}`)
  return r[1].length > 0
}
async function transSql (sql) {
  let pool = db._mysql
  let conn = await pool.getConnection()
  try {
    // let sql = `insert into test (v1) values(3);;;;insert into test (v) values(3)`
    let sqlAry = sql.split(';')
    let r = []
    sqlAry = sqlAry.filter(item => {
      return item.length > 0
    })
    await conn.beginTransaction()
    for (let i = 0; i < sqlAry.length; i++) {
      r[i] = await conn.query(sqlAry[i])
    }
    await conn.commit()
    await conn.release()
    return r
  } catch (e) {
    await conn.rollback()
    await conn.release()
    console.log('transSql Error sql ->', sql)
    errStackFn(e)
    return -1
  }
}

function errStackFn (e) {
  let txt = e.stack.split('\n')
  let os = process.platform
  let f = __filename.split(os.includes('win32') ? '\\' : '/')
  let currentFile = f[f.length - 1]
  let pos = -1
  for (let i = 0; i < txt.length; i++) {
    if (txt[i].includes(currentFile)) {
      pos = i
      break
    }
  }
  $.err($.c.red + txt[0] + $.c.none, $.c.red + txt[pos] + $.c.none)
}

// 如果可购买  标记并返回true    不可购买返回false
async function setBuyMiner (minerCode, bossCode) {
  await clearInvalidStatus()
  let t = +new Date()
  let r = await redis.setnx(operCode + minerCode, t)
  if (r !== 1) {
    return false
  }
  r = await redis.setnx(operCode + bossCode, t)
  if (r !== 1) {
    await redis.del(operCode + minerCode)
    return false
  }
  return true
}

// 删除不可购买标记
async function delBuyMiner (minerCode, bossCode) {
  await redis.del(operCode + minerCode)
  await redis.del(operCode + bossCode)
}

async function setMinerStatus (bossCode) {
  await clearInvalidStatus()
  let t = +new Date()
  let r = await redis.setnx(operCode + bossCode, t)
  if (r !== 1) {
    return false
  }
  return true
}

async function delMinerStatus (bossCode) {
  await redis.del(operCode + bossCode)
}

// 清楚超过一定时间 minerStatus 和 buyStatus 多余的状态位
async function clearInvalidStatus () {
  let ol = await redis.keys(operCode + '*')
  let t = +new Date()
  for (let i = 0; i < ol.length; i++) {
    let code = ol[i]
    let r = await redis.get(code)
    if (r && t - Number(r) > ClearInvalidTimeout * 1000) { // 超过时间的删除
      await redis.del(code)
    }
  }
}

// 获取tableName 的  pageNumber 数据
function getMinerPageData (pageNumber, count = 9, desc = true) {
  require('./crud')('miner')
  return db['miner'].ext.page2({}, { code: 1, name: 1, price_new: 1, avatar: 1 }, pageNumber, count, 'price_new', desc)
}

// 把事件堆积到redis里
async function setEventRedis (code, obj) {
  try {
    console.log('setEventRedis', code, obj)
    let newObj = await getEventRedis(code)
    if (newObj !== -1) {
      for (let i = 0; i < newObj.length; i++) {
        obj[obj.length] = newObj[i]
      }
    }

    if (await redis.set(Package.name + ':event:' + code, JSON.stringify(obj)) === 'OK') { // 保存2个小时
      return 1
    }
  } catch (error) {
    console.error(error)
    return -1
  }
}

// 获取redis中用户堆积事件
async function getEventRedis (code) {
  console.log('getEventRedis', code)
  let r = await redis.get(Package.name + ':event:' + code)
  if (r) {
    return JSON.parse(r)
  }
  return -1
}

// 删除redis中用户堆积事件
async function delEventRedis (code) {
  console.log('delEventRedis', code)
  let r = await redis.del(Package.name + ':event:' + code)
  if (r !== 1) {
    return -1
  }
  return r
}

// 默认返回 100
function getPackageLimit (packageType) {
  switch (packageType) {
    case 1:
      return 100
    case 2:
      return 500
    case 3:
      return 2000
  }
  return 100
}

// 结构体中 price和asset  补全4位小数点
function allToFixed (r) {
  let ftf = (item) => {
    if (item.price_new !== undefined) {
      item.priceNew = Math.floor(item.price_new)
      delete item.price_new
    }
    if (item.asset !== undefined) {
      item.asset = Number(item.asset).toFixed(4)
    }
    if (item.name) { // 名字转换
      item.name = unescape(item.name)
    }
  }

  if (r.length >= 1) {
    r.forEach((item, index) => {
      ftf(item)
    })
  } else {
    ftf(r)
  }
}

// 统计服务  k-操作  v-相应值
function track (k, v) {
  try {
    Req.post({
      url: `http://${Config.track.host}:${Config.track.port}/chart/track`,
      form: { k, v },
      json: true
    },
    function (e, d) {
      // $.dir(d.body)
    })
  } catch (error) {
  }
}

// 获取时间戳 每次返回都唯一
function getTimestamp () {
  let ts = +new Date()
  if (ts > timestamp) {
    timestamp = ts
  } else {
    ts += 1
    timestamp = ts
  }
  return ts
}

// src-原文  dest-加密文
function checkShaStr (src, dest) {
  if (getShaStr(src) === dest) {
    return true
  }
  return false
}

// src-原文
function getShaStr (src) {
  let s = PasswordKey + src
  return Crypto.createHmac('sha256', s.slice(0, 5)).update(s).digest('base64')
}

// 删除原先的登录凭证
async function delOldToken (id) {
  let ot = await redis.get(Package.name + ':id:' + id)
  if (ot && ot.length > 13) {
    await redis.del(Package.name + ':userlogin:' + ot)
  }
}

// 创建token 以id 并且设定用户数据
async function setToken (obj) { // obj - 存放对象
  try {
    let s = obj.id + ' ' + +new Date()
    let token = Crypto.createHmac('sha256', s.slice(0, 5)).update(s).digest('base64')
    let keyStr = Package.name + ':userlogin:' + token
    if (await redis.setex(keyStr, tokenSaveTime, JSON.stringify(obj)) === 'OK') { // 保存2个小时
      // 删除原先的登录凭证
      await delOldToken(obj.id)
      // 设定新的登录凭证
      await redis.set(Package.name + ':id:' + obj.id, token)
      console.log('成功保存token：', keyStr, token, obj)
      return token
    }
    return -1
  } catch (e) {
    console.error(e)
    return -1
  }
}

module.exports = {
  exist,
  checkShaStr,
  getShaStr,
  setToken,
  transSql,
  setBuyMiner,
  setMinerStatus,
  delBuyMiner,
  delMinerStatus,
  clearInvalidStatus,
  getMinerPageData,
  getPackageLimit,
  getEventRedis,
  setEventRedis,
  delEventRedis,
  getTimestamp,
  allToFixed,
  tokenSaveTime,
  track,
  delOldToken
}
