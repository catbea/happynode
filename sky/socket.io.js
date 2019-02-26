#!/usr/bin/env node
'use strict'
const Pro = require('../config')
const path = require('path')
const io = global.io = new (require('koa-socket'))()
const st = {
  start: (app, routerDir) => {
    io.attach(app)
/*     io.use( async ( ctx, next )=> {
      console.log( ctx.io.set ,'Upstream' )
      await next()
      console.log( 'Downstream' )
    }) */
//.set('origins', '*')
    require(path.join(__dirname, routerDir || '/../' + Pro.wsRouterDir))(io)
  },
  check: () => { // 检测socket.io
    // if (!aModule.includes('socket.io')) { return 0 }
    const cio = require('socket.io-client')
    io.on('connection', (ctx, data) => {
      // $.log('io server connect', ctx.socket.id)
    })
    io.on('disconnect', (ctx, data) => {
      // $.log($.c.g('✔'), 'io server disconnect', ctx.socket.id)
    })
    let clientSt = cio.connect(`http://127.0.0.1:${(process.env.node_port || Pro.port || 13000)}/`)
    clientSt.on('connect', () => {
      // $.log($.c.g('✔'), `io client connected`)
      clientSt.emit('echo', 'client echo')
    })
    clientSt.on('svrEcho', data => {
      // $.log($.c.g('✔'), data)
      clientSt.close()
    })
    clientSt.on('disconnect', data => {
      $.log($.c.g('✔'), 'Socket.IO Checked!')
    })
  }
}
module.exports = st
