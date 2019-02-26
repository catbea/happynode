'use strict'
let $ = global.$ = require('meeko')
let crypto = require('crypto')
/*
  room crud
  user2room crud
  user crud
*/
/*
var wsObj = {
  connectSets: new Set(),
  loginSets: new Set(),
  //sysUserSets: new Set(),
  //disconnectSets: new Set(),
  rooms: {
    'testRoom': {
      name: 'test',
      users: '',
      noSayList: [],
      admins: '',
      pwd:'',
      freqLimit:5,
      msgLengthLimit:200,
      sizeLimit:500,
      cTime: new Date(),
      uTime: new Date(),
      talks: []
    }
  },
  users: {
    'socket.io.ID': {
      io: null,
      info: {
        userType: '', // 'admin' 'users' or '' or null  'manger' 'system'
        name: '',
        nowRoom: '',
        roomList: '',
        id: '',
        token: '',
        uTime: 1234,
        cTime: 141234 //登陆的时间
      }
    }
  }
};
*/
function filterMsg (s) {
  s = s.replaceAll('<', '{').replaceAll('>', '}')
  return s
}

function isRight (opt) {
  if (opt.opt_id === 'root' || opt.rObj.admins.indexOf(opt.opt_id) >= 0) { // d.opt_id：操作者ID
    return 1
  }
  return 0
}
let wsOpt = {}
// 0、用户新建房间
wsOpt.roomCreate = function (o, d) {
  if (!d.room_name) {
    return {
      code: 400,
      msg: '房间名不能为空'
    }
  }
  if (o.rooms[d.room_name]) {
    return {
      code: 401,
      msg: '房间已存在'
    }
  }
  if (d.room_name.indexOf(' ') >= 0) {
    return {
      code: 401,
      msg: '房间有非法字符'
    }
  }
  let pwdNew
  if (d.pwd !== '' && d.pwd !== undefined) {
    let salt = $.tools.uuid(5)
    pwdNew = salt + crypto.createHmac('sha256', salt).update(d.pwd).digest('base64')
  } else {
    pwdNew = ''
  }
  o.rooms[d.room_name] = {}
  let rObj = o.rooms[d.room_name]
  rObj.name = d.room_name
  rObj.users = d.id
  rObj.noSayList = []
  rObj.admins = d.id
  rObj.pwd = pwdNew
  rObj.freqLimit = d.freqLimit || 5
  rObj.msgLengthLimit = d.msgLengthLimit || 200
  rObj.sizeLimit = d.sizeLimit || 500
  rObj.cTime = +new Date()
  rObj.talks = []
  let uInfo = o.users[d.id].info
  uInfo.nowRoom = d.room_name
  uInfo.roomList = uInfo.roomList.ac(d.room_name)
  return {
    data: o,
    code: 200,
    msg: '创建房间成功'
  }
}
// 1、管理员给房间增加成员
wsOpt.roomAddMember = function (o, d) {
  let rObj = o.rooms[d.room_name]
  let uInfo = o.users[d.id].info
  d.rObj = rObj
  if (!isRight(d)) {
    return {code: 400, msg: '没有权限'}
  };
  rObj.users = rObj.users.ac(d.id)
  uInfo.roomList = uInfo.roomList.ac(d.room_name)
  return {
    data: o,
    code: 200,
    msg: ''
  }
}
// 2、管理员从房间删除成员
wsOpt.roomRemoveMember = function (o, d) {
  let rObj = o.rooms[d.room_name]
  let uInfo = o.users[d.id].info
  d.rObj = rObj
  if (!isRight(d)) {
    return {code: 400, msg: '没有权限'}
  };
  rObj.users = rObj.users.dc(d.id)
  if (uInfo.nowRoom === d.room_name) {
    uInfo.nowRoom = ''
  }
  uInfo.roomList = uInfo.roomList.dc(d.room_name)
  return {
    data: o,
    code: 200,
    msg: ''
  }
}
// 3、管理员修改房间信息
wsOpt.roomModify = function (o, d) {
  let rObj = o.rooms[d.room_name]
  d.rObj = rObj
  if (!isRight(d)) {
    return {code: 400, msg: '没有权限'}
  };
  rObj.name = d.new_name || rObj.name
  rObj.freqLimit = d.freqLimit || rObj.freqLimit
  rObj.msgLengthLimit = d.msgLengthLimit || rObj.msgLengthLimit
  rObj.sizeLimit = d.sizeLimit || rObj.sizeLimit
  return {
    data: o,
    code: 200,
    msg: ''
  }
}
// 4、管理员增加禁言成员
wsOpt.roomBanMember = function (o, d) {
  let rObj = o.rooms[d.room_name]
  d.rObj = rObj
  if (!isRight(d)) {
    return {code: 400, msg: '没有权限'}
  };
  rObj.noSayList[d.id] = d.expTime
  return {
    data: o,
    code: 200,
    msg: '禁言成功'
  }
}
// 5、管理员允许成员说话
wsOpt.roomUnBanMember = function (o, d) {
  let rObj = o.rooms[d.room_name]
  d.rObj = rObj
  if (!isRight(d)) {
    return {code: 400, msg: '没有权限'}
  };
  delete rObj.noSayList[d.id]
  return {
    data: o,
    code: 200,
    msg: '允许言语'
  }
}
// 6、管理员查询成员信息
wsOpt.room_search = function (o, d) {
  let rObj = o.rooms[d.room_name]
  d.rObj = rObj
  if (!isRight(d)) {
    return {code: 400, msg: '没有权限'}
  };
  let uInfos = rObj.users.split(' ')
  uInfos = uInfos.map(function (item) {
    let uItem = o.users[item].info
    return {
      nickname: uItem.name,
      userType: uItem.userType,
      icon: uItem.icon,
      cTime: uItem.cTime,
      uTime: uItem.uTime
    }
  })
  return {
    data: uInfos,
    code: 200,
    msg: ''
  }
}
// 7、房间保存最后十句对话
wsOpt.room_lastestMsg = function (o, d) {
  let rObj = o.rooms[d.room_name]
  if ((rObj.talks).length > 9) {
    (rObj.talks).shift()
  }
  (rObj.talks).push({time: d.time, who_say: d.who_say, msg: d.msg, icon: d.icon})
  rObj.uTime = +new Date()
  return {
    data: o,
    code: 200,
    msg: ''
  }
}
// 8、统计房间个数和 返回所有房间名
wsOpt.room_count = function (o) {
  let count = 0
  let rooms = []
  count = Object.getOwnPropertyNames(o.rooms).length
  for (let item in o.rooms) {
    rooms.push(o.rooms[item].name)
  }
  return {
    data: {count: count, rooms: rooms},
    code: 200,
    msg: ''
  }
}
// 9、返回房间名称和所有user
wsOpt.room_count_user = function (o, d) {
  let rObj = o.rooms[d.room_name]
  let users = rObj.users.split(' ')
  return {
    data: {room_name: d.room_name, users: users},
    code: 200,
    msg: ''
  }
}
// ===================================================================
// 8、用户进入房间
wsOpt.room_enter = function (o, d) {
  try {
    let rObj = o.rooms[d.room_name]
    let uInfo = o.users[d.id].info
    if (rObj.pwd !== '') {
      let salt = (rObj.pwd).substring(0, 5)
      let pwdCheck = salt + crypto.createHmac('sha256', salt).update(d.pwd).digest('base64')
      if (rObj.pwd !== '' && pwdCheck !== rObj.pwd) {
        return {code: 400, msg: '对不起，密码错误'}
      }
    }
    if ((rObj.users).indexOf(d.id) < 0) {
      rObj.users = rObj.users.ac(d.id)
      rObj.count = rObj.count + 1
      uInfo.nowRoom = d.room_name
      uInfo.roomList = uInfo.roomList.ac(d.room_name)
      uInfo.token = d.token
      uInfo.icon = d.icon
    }
    uInfo.name = d.who_say
    if (o.users_id[d.who_say] === undefined) {
      o.users_id[d.who_say] = {}
    }
    o.users_id[d.who_say].id = d.id
    o.users_id[d.who_say].token = d.token
    o.users_id[d.who_say].icon = d.icon
    // console.log(o.users_id[d.who_say])
    return {
      data: o,
      code: 200,
      msg: ''
    }
  } catch (e) {
    $.log(e.toString())
  }
}
// 9、用户离开房间
wsOpt.room_leave = function (o, d) {
  let rObj = o.rooms[d.room_name]
  let uInfo = o.users[d.id].info
  rObj.users = rObj.users.dc(d.id)
  uInfo.nowRoom = ''
  uInfo.roomList = uInfo.roomList.dc(d.room_name)
  rObj.count = rObj.count - 1
  return {
    data: o,
    code: 200,
    msg: ''
  }
}
// 10、用户连上线
wsOpt.user_connect = function (o, d) {
  o.connectSets.add(d.id)

  o.users[d.id] = {}
  o.users[d.id].io = d.io
  o.users[d.id].info = {}
  let uInfo = o.users[d.id].info
  uInfo.userType = 'user'
  uInfo.nowRoom = ''
  uInfo.roomList = ''
  uInfo.id = d.id
  uInfo.name = d.name
  uInfo.token = d.token
  uInfo.icon = d.icon
  uInfo.uTime = +new Date()
  uInfo.cTime = +new Date()
  o.users_id[d.name] = {}
  o.users_id[d.name].id = d.id
  o.users_id[d.name].token = d.token
  o.users_id[d.name].icon = d.icon
  return {
    data: o,
    code: 200,
    msg: ''
  }
}
// 11、用户登录
/* wsOpt.user_login = function(o, d) {
  o.loginSets.add(d.id);
  let uInfo = o.users[d.id].info;
  uInfo.nowRoom = '';
  uInfo.roomList.ac(d.room_name);
  uInfo.uTime = +new Date();
  return {
  data: o,
  code: 200,
  msg: ''
  };
}; */
// 12、用户下线
wsOpt.user_disconnect = function (o, d) {
  try {
    o.connectSets.delete(d.id)
  // o.loginSets.delete(d.id);
  // o.sysUserSets.delete(d.id);
  // 去除相应的集合
    if (o.users[d.id].info.roomList !== '') {
      let roomList = o.users[d.id].info.roomList.split(' ')
      for (let i = 0; i < roomList.length; i++) {
        o.rooms[roomList[i]].users = o.rooms[roomList[i]].users.dc(d.id)
      }
    }
    o.users_id[(o.users[d.id]).info.name].id = ''
    delete o.users[d.id]
    return {
      data: o,
      code: 200,
      msg: ''
    }
  } catch (e) {
    $.log(e.stack())
  }
}
// 13、循环房间里除自己以外的所有用户(除大厅外都要改)
wsOpt.room_say2all = function (o, d) {
  d.msg = filterMsg(d.msg)
  switch (d.which_room) {
    case 1: // 大厅
      return {
        data: '',
        type: 1,
        code: 200,
        msg: d.msg
      }
    case 2: // 房间
      let rObj = o.rooms[d.room_name]
      let userList = rObj.users.split(' ')
      let users = []
      for (let i = 0; i < userList.length; i++) {
        users.push(userList[i])
      }
      return {
        data: users,
        type: 2,
        code: 200,
        msg: d.msg
      }
    case 3: // 个人
      if (d.listener_name === '') {
        return {
          data: '',
          type: 3,
          code: 400,
          msg: '对不起，私聊必须填写对方用户名'
        }
      }
      if (d.listener_id === '') {
        return {
          data: '',
          type: 3,
          code: 401,
          msg: '对不起，私聊必须填写对方user_id'
        }
      }
      if (d.speaker_id === '') {
        return {
          data: '',
          type: 3,
          code: 402,
          msg: '对不起，私聊必须填写user_id'
        }
      }
      if (d.listener_ws_id === '') { // 对方的WS的ID
        if (o.users_id[d.listener_name] !== undefined) {
          d.listener_ws_id = o.users_id[d.listener_name].id
        }
      }
      return {
        data: d.listener_ws_id, // 此刻room_name其实是对话接收方的ID
        type: 3,
        code: 200,
        msg: d.msg
      }
    default:
      break
  }
}
// 14、清理房间已经下线的用户
wsOpt.users_clear = function (o) {
  let rObj = o.rooms
  let uObj = o.users
  for (let i in rObj) {
  // console.log(rObj[i].users);
    let newUsers = []
    for (let j in uObj) {
      if ((rObj[i].users).indexOf(j) >= 0) {
        newUsers.push(j)
      }
    }
    rObj[i].count = newUsers.length
    newUsers = newUsers.join(' ')
    rObj[i].users = newUsers
  }
  return {
    data: o,
    code: 200,
    msg: ''
  }
}
module.exports = wsOpt
