/**
 * Created by huweijian on 2018/1/31.
 * @title
 */
async function getConfig () {
  let r = await db.cmd('SELECT token_get AS tokenGet,token_invite AS tokenInvite FROM config ORDER BY create_at DESC LIMIT 1;').run(1)
  if (r && r[1] && r[1].length) {
    return {
      code: 1,
      data: r[1][0]
    }
  }
  return {
    code: -1,
    msg: '暂无配置'
  }
}

async function setConfig (data) {
  let {
    tokenGet,
    tokenInvite = 10
  } = data
  let sql = `INSERT INTO config (token_get, token_invite, create_at) `
  sql += `VALUES('${tokenGet}', '${tokenInvite}', '${new Date().date2Str()}');`
  let r = await db.cmd(sql).run(1)
  if (r && r[1] && r[1].affectedRows === 1) {
    return {
      code: 1,
      msg: ''
    }
  }
}
module.exports = {
  getConfig,
  setConfig
}
