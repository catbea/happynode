/**
 * Created by CuiGunaghao on 2018/3/21.
 * @title
 */

let selectId = [] // 选择id列表
let socketList = [] // websocket 列表

function disconnect (ctx) {
  delete socketList[ctx.socket.id]
}

function connection (ctx) {
  // console.log('new -> ', ctx.socket.id)
  ctx.socket.emit('who', { name: '小白' })

  ctx.socket.on('who', (data) => {
    // console.log('who->', data)
    socketList[ctx.socket.id] = ctx.socket
    ctx.socket.emit('init_data', selectId) // 发送初始数据
  })
}

function select (ctx, data) {
  console.log(data)
  // ctx.socket.emit('select', data)
  let item = selectId[data.id]
  if (item && item.length > 0) {
    // 清空
    data.name = ''
    selectId[data.id] = null
  } else {
    selectId[data.id] = data.name
    // 增加
  }
  sendAllToDate(data)
}

function sendAllToDate (data) {
  for (let i in socketList) {
    if (i !== 'copy' && i !== 'unique') {
      const item = socketList[i]
      item.emit('select', data)
    }
  }
}

module.exports = {
  select,
  disconnect,
  connection
}
