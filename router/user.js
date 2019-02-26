/**
 * 用户登录和注册的接口
 */

'use strict'

const user = require('../models/user')

module.exports = function (app) {
  app.post('/user/signIn', async (ctx, next) => {
    const { account, pwd } = ctx.checkedData.data

    try {
      if (!/^[A-Za-z0-9_]{4,20}$/.test(account)) {
        ctx.throwCode(-1, '账号要求4到20位，大小写字母、数字以及下横杠')
      } else if (!/^[A-Za-z0-9_]{6,20}$/.test(pwd)) {
        ctx.throwCode(-1, '密码要求6到20位，大小写字母、数字以及下横杠')
      } else {
        const res = await user.signIn({
          account, pwd
        })

        if (res.code === 200) {
          ctx.ok(res.data, res.msg || 'ok')
        } else {
          ctx.throwCode(res.code, res.msg)
        }
      }
    } catch (e) {
      throw (e)
    }
  })

  app.post('/user/login', async (ctx, next) => {
    const { account, pwd } = ctx.checkedData.data

    try {
      if (!/^[A-Za-z0-9_]{4,20}$/.test(account) || !/^[A-Za-z0-9_]{6,20}$/.test(pwd)) {
        ctx.throwCode(-1, '账号或密码不正确')
      } else {
        const res = await user.login(0, account, pwd)
        if (res.code === 200) {
          ctx.ok(res.data, res.msg || 'ok')
        } else {
          ctx.throwCode(res.code, res.msg)
        }
      }
    } catch (e) {
      throw (e)
    }
  })

  app.post('/user/testLogin', async (ctx, next) => {
    try {
      console.log('这里有啥：', ctx.checkedToken)
      ctx.ok(ctx.checkedToken, '成功登录')
    } catch (e) {
      throw (e)
    }
  })
}
