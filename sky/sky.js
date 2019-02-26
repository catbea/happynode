#!/usr/bin/env node
/* eslint-disable */
'use strict'
// 全局对象
let db = {}
let redis = {}
// global.Promise = require('bluebird')
const $ = global.$ = require('meeko')
const frontApi = global.frontApi = {}// 推送给前端的接口定义
global.cache = { len: 0 }
const isDevMode = global.isDevMode = process.env.NODE_ENV === 'dev' || !process.env.NODE_ENV || process.env.NODE_ENV === 'testlog'

const Pro = require('../config')
const Pack = require('../package.json')
const path = require('path')
const com = require('./common')
// koa
const Koa = require('koa')
const app = new Koa()
const cors = require('koa2-cors')
const logger = require('koa-logger')
const bodyParse = require('koa-better-body')
const router = require('koa-router')()
const convert = require('koa-convert')
const staticServer = require('koa-static')
const req = require('request')

// io
const st = require('./socket.io')
$.option.logTime = !1
// koa设置
app.keys = ['kongxiangfeng', 'kongxiangfeng sky']
app.context.throwCode = function (errCode, errMsg, data) {
  this.type = 'json'
  let o = {
    data: data || [],
    code: errCode || 500,
    msg: errMsg || '服务端错',
    t: Number(new Date())
  }
  this.body = o
}
app.context.ok = function (data, msg) {
  this.type = 'json'
  let o = {
    data: data || [],
    code: 200,
    msg: msg || '',
    t: Number(new Date())
  }
  this.body = o
}

async function init (aModule, option, cbFun) {
  option = option || {}
  let wwwRouterDir = '/../' + (option.wwwRouterDir || Pro.routerDir)
  let wwwPort = option.wwwPort
  let proName = option.proName || Pack.name
  let wwwApi = option.wwwApi || 'api'
  let api = global.api = require(`../models/${wwwApi}`)
  if (aModule.includes('mysql')) {
    db = global.db = require('j2sql')(Pro.mysql)
  }
  if (aModule.includes('redis')) {
    let rd = Pro.redis
    rd.host = option.redisHost || rd.host
    rd.post = option.redisPort || rd.port
    rd.db = option.redisDb || rd.db
    rd.auth = option.redisAuth || rd.auth
    redis = global.redis = require('./redis')(rd)
  }
  if (aModule.includes('socket.io')) {
    st.start(app)
  }

  app.use(cors({
    maxAge: 600
  }))
  // NOTICE: 经过body格式格式化一下内容才可对象化
  app.use(convert(bodyParse({
    multipart: true,
    formLimit: 100000000 // 100M 上传限制
  })))
  // NOTICE: 优先进入web容器
  app.use(staticServer(path.join(__dirname, '/../', Pro.staticDir)))
  // 开发调试环境启用
  if (isDevMode) {
    app.use(logger())
  }
  app.use(async (ctx, next) => {
    let method = ctx.method.toLow()
    let url = ctx.request.url
    let _url = url.split('?')[0].split('/')
    if (global.cache[method + url]) {
      ctx.type = 'json'
      ctx.body = global.cache[method + url]
      $.log('CACHE..', url)
      return 1
    }
    if (['get', 'post'].indexOf(method) < 0) {
      ctx.throwCode(ctx.status, '只支持get/post方式')
      return
    }
    if (!api[_url[1]]) {
      if (_url[1] !== '') {
        ctx.throwCode(404, '无api模块或文件')
      }
      await next()
    } else {
      let _api = api[_url[1]][_url.join('/')]
      if (!_api) {
        ctx.throwCode(404, '无此方法')
        return 0
      }
      let token = ctx.header.token || 0 // NOTICE: 可以将token放到url里面
      if (_api.token && !token) {
        com.apiCheckLog(_url, { code: 490, msg: '接口需要token' }, method)
        ctx.throwCode(490, '非法用户')
        return 0
      }
      if (_api.token && token) {
        let r = await com.checkToken('userlogin', token)
        if (!r) {
          com.apiCheckLog(_url, { code: 490, msg: token + ' 非法用户' }, method)
          ctx.throwCode(490, '非法用户')
          return 0
        } else {
          ctx.checkedToken = r
        }
      }
      // console.log(['1:', _api.token, _url.join('/')]);

      if (!_api) {
        ctx.throwCode(404, '无此api')
        $.log(['No api...', _url.join('/')])
        await next()
        return 0
      } else {
        if (method !== _api.method.toLow() && _api.method.toLow() !== 'all') { // 允许get和post都接入
          ctx.throwCode(405, '方法类型不对')
          await next()
          return 0
        }
        // console.log(['do something...', _api]);
        switch (method) {
          case 'get':
          {
            let _reqGet = ctx.query || {}
            ctx.checkedData = $.tools.checkParam(_reqGet, _api.param)
            ctx.checkedData.token = !!ctx.checkedToken
            com.apiCheckLog(_url, ctx.checkedData, method)
            if (ctx.checkedData.code >= 400) {
              ctx.throwCode(ctx.checkedData.code, ctx.checkedData.msg)
            } else {
              await next()
            }
            break
          }
          case 'post':
          {
            let _reqPost = ctx.request.fields || ctx.body || {}
            ctx.checkedData = $.tools.checkParam(_reqPost, _api.param)
            ctx.checkedData.token = !!ctx.checkedToken
            com.apiCheckLog(_url, ctx.checkedData, method)
            if (ctx.checkedData.code >= 400) {
              ctx.throwCode(ctx.checkedData.code, ctx.checkedData.msg)
            } else {
              await next()
            }
            break
          }
          default:
            ctx.throwCode(ctx.status, '只支持get/post方式')
            break
        }
      }
    }
  })
  app.use(async (ctx, next) => {
    // (1) 进入路由
    let start = Date.now()
    try {
      await next()
    } catch (e) {
      let txt = e.stack.split('\n')
      $.err(txt[0] + $.c.none, $.c.red + txt[1])
      switch (true) {
        case (e.message.indexOf('ETIMEDOUT') > -1):
          ctx.throwCode(599, '服务端超时')
          break
        case (e.message.indexOf('ENOENT') > -1):
          ctx.throwCode(598, '服务端找不到路径')
          break
        default:
          ctx.throwCode(500, e)
      }
    }

    // (5) 再次进入 x-response-time 中间件，记录2次通过此中间件「穿越」的时间
    let ms = Date.now() - start
    // this.response.type = 'html' //总体控制mime
    ctx.set('X-Response-Time', ms + 'ms')
    try {
      if (aModule.includes('track')) {
        let url = ctx.request.url
        let _url = url.split('?')[0].split('/')
        if (api[_url[1]] && Pro.track.apiTrack) {
          req.post({
            url: `http://${Pro.track.host}:${Pro.track.port}/chart/apirecord`,
            form: {k: _url.join('_'), v: ms},
            json: true
          },
          function (e, d) {
            // $.dir(d.body)
          })
        }
      }
    } catch (error) {

    }

    /* this.set('token','kongxiangfeng');
    this.type = 'json'; */
    switch (ctx.status) {
      case 200:
        break
      case 204:
        ctx.throwCode(204, 'sys:无内容返回')
        break
      case 405:
        ctx.throwCode(405, 'sys:无访问api权限')
        break
      case 404:
        // ctx.throwCode.call(ctx, 404, 'sys:无此api或api发生错误', '', ctx)
        ctx.throwCode(404, 'sys:无此api或api发生错误')
        break
      case 401:
        ctx.throwCode(401, 'sys:无权限')
        break
      default:
        ctx.throwCode(ctx.status, 'sys:服务端未知错误')
    }
    // (6) 返回 this.body
  })
  require(path.join(__dirname, wwwRouterDir))(router)
  app.use(router.routes()).use(router.allowedMethods())

  // 其他函数

  async function loadRunDict () { // 加载处理程序需要的数据
    let [n, m] = [0, 0]
    try {
      // let file = yield fs.readFile(path.join(__dirname+'/../', '/models/dict_db.js'))
      // const dict = JSON.parse(file)
      // global.dictObj = dict

      for (let i in api) {
        for (let k in api[i]) {
          m++
          if (api[i][k].front) {
            n++
            let item = api[i][k]
            let param = item.param
            for (let m in param) {
              if (param[m].req === 0) delete param[m].req
              if (param[m].def === null) delete param[m].def
              if (param[m].type === 'string') delete param[m].type
            }
            frontApi[k] = { method: item.method, param: item.param }
          }
        }
      }
    } catch (e) {
      $.err(e.stack)
    }
    $.log(n === 0 ? $.c.r('✘') : $.c.g('✔'), `[${$.c.yellow}${n}/${m}${$.c.none}] Web Routers. At [${$.c.yellow}${path.join(__dirname, wwwRouterDir)}${$.c.none}]`)
  }
  async function start () {
    try {
      await loadRunDict()
      if (aModule.includes('redis')) {
        await com.waitNotEmpty(redis, 'connStatus')
      }
      if (aModule.includes('mysql')) {
        await com.waitNotEmpty(db, '_mysql', function (o) {
          // let n = +o['_nowPercent']
        })
      }
      app.on('error', function (err) {
        throw (err)
        // $.err(`-x- server [${$.c.green}0.0.0.0${$.c.none}] error ` + err.stack)
      })
      app.listen(process.env.node_port || wwwPort || Pro.port || 13000)

      require('figlet').text(proName,
        {
          font: 'Larry 3D'
        },
        function (err, data) {
          if (err) {
            return
          }
          $.option.logTime = !1
          $.log(`${$.c.magenta}${data}${$.c.none}`)
          $.log($.c.g('✔'), `${proName} WebServer [${$.c.yellow}0.0.0.0${$.c.none}] Listen at`, `${$.c.yellow}` + (process.env.node_port || wwwPort || Pro.port || 13000) + `${$.c.none}`)
          if (aModule.includes('socket.io')) {
            st.check()
          }
          cbFun(function () {
            $.option.logTime = !0 // 加载完成开始打印
          }())
        })
    } catch (e) {
      $.err(e.stack)
    }
  }
  await start()
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
  $.option.logTime = false
  $.err($.c.red + txt[0] + $.c.none, $.c.red + txt[pos] + $.c.none)
  $.err($.c.red + txt[txt.length - 2] + $.c.none, $.c.red + txt[pos] + $.c.none)
  $.err(e.stack)

  $.option.logTime = true
}

process.on('uncaughtException', errStackFn)
process.on('unhandledRejection', errStackFn)
module.exports = init
