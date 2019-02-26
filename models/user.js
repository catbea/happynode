const Crypto = require('crypto')
const utils = require('./utils')

const signIn = async function (userInfo) {
  let uid = 0

  const res = await transFn(async function (conn) {
    const date = parseInt((new Date()).getTime() / 1000 / 60 / 60 / 24) + ''

    // 怕uuid在数据库中重复，所以...
    for (let i = 0; i < 5; i++) {
      let str = $.tools.uuid(32 - date.length)

      // 这个肯定是可以rollback的，现在测试下面那个方法是否也可以
      const sql = await db.user.C({
        nickname: userInfo.account,
        sid: date + str,
        c_time: getSqlDate(),
        m_time: getSqlDate()
      }).get()

      const insertResult = await conn.query(sql)

      // const insertResult = await db.user.C({
      //   nickname: userInfo.account,
      //   sid: date + str,
      //   c_time: getSqlDate(),
      //   m_time: getSqlDate()
      // }).run()

      uid = insertResult.insertId
      if (uid) {
        break
      }
    }
    // return {
    //   code: -1,
    //   data: '',
    //   msg: '测试rollback'
    // }

    if (!uid) {
      return {
        code: -1,
        data: '',
        msg: '无法找到一个唯一的uuid'
      }
    }

    const res = await db.user_login_pwd.C({
      uid: uid,
      type: 0,
      account: userInfo.account,
      pwd: md5(userInfo.pwd) + ',' + userInfo.pwd, // 保留原始密码是为了方便以后优化
      c_time: getSqlDate(),
      m_time: getSqlDate()
    }).run()

    if (res < 0 || !res.insertId) {
      return {
        code: -1,
        data: '',
        msg: '此账号已存在，请换一个账号哦'
      }
    }

    return true
  })

  if (res === true) {
    return {
      code: 200,
      msg: '注册成功'
    }
  }

  return res
}

const login = async function (loginType, account, pwd) {
  let loginInfo = await db.user_login_pwd.R({
    d_flag: 0,
    type: loginType,
    account: account
  }, {
    uid: 1,
    pwd: 1
  }).run()

  if (!loginInfo.length) {
    return {
      code: -1,
      msg: '账号或密码错误哦'
    }
  }

  loginInfo = loginInfo[0]

  const pwdInDB = loginInfo.pwd.split(',')[0]
  if (md5(pwd) !== pwdInDB) {
    return {
      code: -1,
      msg: '账号或密码错误哦'
    }
  }

  const user = await db.user.R({
    id: loginInfo.uid,
    d_flag: 0
  }, {
    id: 1,
    sid: 1,
    nickname: 1
  }).run()

  if (!user.length) {
    return {
      code: -1,
      msg: '此用户已被禁用？'
    }
  }

  const token = await utils.setToken(user[0])
  if (!token) {
    return {
      code: -1,
      msg: '服务器有个服务使用出错'
    }
  }

  return {
    code: 200,
    data: {
      token
    },
    msg: '登录成功'
  }
}

/**
 * 以下为内部使用的方法，找个机会再封装到一个独立文件里
 */

function md5 (str) {
  const md5 = Crypto.createHash('md5')
  md5.update(str)
  return md5.digest('hex').toUpperCase() // 32位大写
}

/**
 * TODO 这个框架里的方法可能是有问题的，rollback执行了无效！
 * 执行事务
 * @param {function} fn 只有此函数返回true，才提交，否则回滚
 */
async function transFn (fn) {
  let pool = db._mysql
  let conn = await pool.getConnection()
  try {
    await conn.beginTransaction()

    const r = await fn(conn)

    if (r === true) {
      await conn.commit()
    } else {
      await conn.rollback()
    }
    await conn.release()
    return r
  } catch (e) {
    await conn.rollback()
    await conn.release()
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

function getSqlDate () {
  return new Date().date2Str()
}

module.exports = {
  signIn,
  login
}
