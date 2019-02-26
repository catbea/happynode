
/* global isDevMode */
'use strict'
const $ = require('meeko')
const Package = require('../package.json')
async function checkToken (tokenPre, token) {
  try {
    let keyStr = Package.name + ':' + tokenPre + ':' + token
    keyStr = keyStr.trim()
    let o = JSON.parse(await redis.get(keyStr))
    if (o === null) return 0
    if (o.id) {
      let ot = await redis.get(Package.name + ':id:' + o.id)
      if (ot !== token) {
        return 0
      }
    } else {
      return 0
    }
    switch (tokenPre) {
      case 'userlogin':
        return (o['id']) ? o : 0
      default:
        break
    }
    return 0
  } catch (e) {
    $.err(e.stack)
    return 0
  }
}
function apiCheckLog (url, obj, method) {
  if (isDevMode) {
    let checkColor = 'white'
    if (obj.code >= 400) checkColor = 'yellow'
    $.log($.c.dimc(method.toUp()) + $.c.dimy(url.join('/')) + $.c[checkColor], obj, $.c.none)
  }
}
let wait = $.wait
async function waitNotEmpty (o, prop, fn) {
  fn = fn || function () {}
  if (!o[prop]) {
    fn(o, prop)
    await wait(100)
    await waitNotEmpty(o, prop, fn)
  }
}
/* co(function * () {
  yield waitNotEmpty(redis, ['connStatus'], 'Wait Redis load...')
  // let r = yield checkToken('reg', 'ZJPRdVZPaokPUDZJXUogD3tWP1xhilfhSUy1hTHYeP0=')
  let r = yield checkToken('userlogin', '+SnK3GucLSjJmc9wkHVYB2FHu0UQ2XUmSvjV6U277S0=')
  $.log(r)
}) */

module.exports = {
  checkToken,
  apiCheckLog,
  wait,
  waitNotEmpty
}
