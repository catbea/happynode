/* global $ */
let co = require('co')
function getRedis (obj) {
  if (!obj) {
    $.err('obj is Null!')
    return 0
  }
  let dbNum = obj.db || 0
  let host = obj.host || '127.0.0.1'
  let port = obj.port || '6379'
  let auth = obj.auth || null

  let cRedis = require('redis').createClient(
    port, host, {}
  )
  if (auth) {
    cRedis.auth(auth)
  }
  let cRedisCo = require('co-redis')(cRedis)
  cRedis.on('connect', function () {
    // $.log(`<-- Redis [${$.c.yellow}${host} : ${port}${$.c.none}] db ${$.c.yellow}${dbNum}${$.c.none} connect!`)
    let _r = 0
    co(function * () {
      yield cRedisCo.select(dbNum)
      _r = yield cRedisCo.dbsize() || 0
    }).then(function () {
      cRedisCo.connStatus = {stat: 1}
      $.log($.c.g('✔'), `Redis [${$.c.yellow}${host} : ${port}${$.c.none}] db ${$.c.yellow}${dbNum}${$.c.none} [${$.c.yellow}${_r}${$.c.none}] Objects`)
    })
  })
  cRedis.on('error', function () {
    $.err($.c.r('✘'), `-x- Redis [${$.c.yellow}${host} : ${port}${$.c.none}] disconnect...`)
  })
  // $.log('--> Redis Obj Init start...')
  cRedisCo._redis = cRedis
  return cRedisCo
}
module.exports = getRedis
