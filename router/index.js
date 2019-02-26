'use strict'
/* global $ */
/* global db */
/* global redis */
/* global wechat */
const pack = require('../package.json')
const config = require('../config.js')
// const wechat = require('../models/wechat')
module.exports = function (router) {
  router.get('/sys/abc', async (ctx, next) => {
    try {
      let t = Date.now()
      let r = {
        pid: process.pid,
        name: pack.name,
        ver: pack.version,
        desc: pack.description,
        method: 'get',
        header: ctx.header,
        query: ctx.query,
        checkedData: ctx.checkedData,
        mysql: await db.cmd('show databases').run(),
        test: true
        // redis: await redis.dbsize()
      }

      // dynamic
      /*       let keys = Object.keys(config)
      for (let item of keys) {
        if (item === 'wechat') {
          r.wechat = {'status': 'install'}
          let token = await redis.get(wechat.serverTokenKey)
          if (token) {
            r.wechat.token = JSON.parse(token)
          }
        } else if (item.indexOf('mysql') > -1 && item !== 'mysql') {
          let dbKey = item.replace('mysql', 'db')
          if (global[dbKey]) {
            r[item] = await global[dbKey]._mysql.query('show databases')
          } else {
            r[item] = 'Not Found ' + item + ':' + dbKey + ' in global'
          }
        } else if (item.indexOf('redis') > -1 && item !== 'redis') {
          if (global[item]) {
            r[item] = await global[item].dbsize()
          } else {
            r[item] = 'Not Found ' + item + ' in global'
          }
        }
      } */
      let dt = Date.now() - t
      r.rTime = dt
      ctx.body = r
    } catch (e) {
      ctx.body = {
        name: pack.name,
        ver: pack.version,
        desc: pack.description,
        method: 'get',
        header: ctx.header,
        query: ctx.query,
        checkedData: ctx.checkedData,
        errMsg: e.toString(),
        global: global
      }
    }
  })
  router.get('/', async (ctx, next) => {
    try {
      let t = Date.now()
      let r = {
        name: pack.name,
        ver: pack.version,
        desc: pack.description,
        method: 'get',
        header: ctx.header,
        query: ctx.query,
        global: Object.keys(global),
        // redis: await redis.dbsize(),
        test: true
      }
      ctx.body = r
    } catch (e) {
      ctx.body = {
        name: pack.name,
        ver: pack.version,
        desc: pack.description,
        method: 'get',
        header: ctx.header,
        query: ctx.query,
        checkedData: ctx.checkedData,
        errMsg: e.toString()
      }
    }
  })
  router.post('/', async (ctx, next) => {
    ctx.body = {
      name: pack.name,
      ver: pack.version,
      desc: pack.description,
      method: 'post',
      header: ctx.header,
      query: ctx.query,
      body: ctx.body
    }
  })
  var allroutes = require('requireindex')(__dirname)
  for (var key in allroutes) {
    allroutes[key](router)
  }
}
