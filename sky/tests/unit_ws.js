/* global describe */
/* global it */
'use strict'
let chatObj = require('../zc_ws')
let assert = require(`assert`)
let crypto = require('crypto')

let wsObj = {
  connectSets: new Set(),
  loginSets: new Set(),
  sysUserSets: new Set(),
  rooms: {
    'testRoom': {
      name: 'test',
      users: '', // new Set(),
      noSayList: [],
      admins: '', // new Set(),
      pwd: '',
      freqLimit: 5,
      msgLengthLimit: 200,
      sizeLimit: 500,
      cTime: +new Date(),
      uTime: +new Date(),
      talks: []
    },
    'hall_room': {
      name: 'hall',
      users: '', // new Set(),
      noSayList: [],
      admins: '', // new Set(),
      pwd: '',
      freqLimit: 5,
      msgLengthLimit: 200,
      sizeLimit: 500,
      cTime: +new Date(),
      uTime: +new Date(),
      talks: []
    },
    'room1': {
      name: 'pisa',
      users: '', // new Set(),
      noSayList: [],
      admins: '', // new Set(),
      pwd: '',
      freqLimit: 3,
      msgLengthLimit: 350,
      sizeLimit: 350,
      cTime: +new Date(),
      uTime: +new Date(),
      talks: []
    },
    'room3': {
      name: '',
      users: 'qqq www', // new Set(),
      noSayList: [],
      admins: '', // new Set(),
      pwd: '',
      freqLimit: 3,
      msgLengthLimit: 350,
      sizeLimit: 350,
      cTime: +new Date(),
      uTime: +new Date(),
      talks: []

    }
  },
  users: {

    'socket.io.ID': {
      io: null,
      info: {
        userType: '', // 'admin' 'users' or '' or null  'manger' 'system'
        name: 'socket.io.ID',
        nowRoom: '',
        roomList: '', // new Set(),
        id: '',
        token: '',
        icon: '',
        uTime: 1234,
        cTime: 141234 // 登陆的时间
      }
    },
    'root': {
      io: null,
      info: {
        userType: '', // 'admin' 'users' or '' or null  'manger' 'system'
        name: '',
        nowRoom: '',
        roomList: '', // new Set(),
        id: '',
        token: '',
        icon: '',
        uTime: 1234,
        cTime: 141234 // 登陆的时间
      }
    },
    'kitty': {
      io: null,
      info: {
        userType: '', // 'admin' 'users' or '' or null  'manger' 'system'
        name: 'kitty',
        nowRoom: '',
        roomList: '', // new Set(),
        id: '',
        token: '',
        icon: '',
        uTime: 1234,
        cTime: 141234 // 登陆的时间
      }
    },
    'smart': {
      io: null,
      info: {
        userType: '', // 'admin' 'users' or '' or null  'manger' 'system'
        name: 'smart',
        nowRoom: 'smart',
        roomList: '', // new Set(),
        id: '',
        token: '',
        icon: '',
        uTime: 1234,
        cTime: 141234 // 登陆的时间
      }
    },
    'cat': {
      io: null,
      info: {
        userType: '', // 'admin' 'users' or '' or null  'manger' 'system'
        name: 'helanlan',
        nowRoom: '',
        roomList: '', // new Set(),
        id: 'cat',
        token: '',
        icon: '',
        uTime: 1234,
        cTime: 141234 // 登陆的时间
      }
    },
    'boy': {
      io: null,
      info: {
        userType: '', // 'admin' 'users' or '' or null  'manger' 'system'
        name: '',
        nowRoom: '',
        roomList: '', // new Set(),
        id: 'cat',
        token: '',
        icon: '',
        uTime: 1234,
        cTime: 141234 // 登陆的时间
      }
    },
    'kind': {
      io: null,
      info: {
        userType: '', // 'admin' 'users' or '' or null  'manger' 'system'
        name: '',
        nowRoom: 'kind',
        roomList: '', // new Set(),
        id: 'kind',
        token: '',
        icon: '',
        uTime: 1234,
        cTime: 141234 // 登陆的时间
      }
    }

  },
  users_id: {
    'name_1': 'socket.io.ID',
    'name_2': 'root'
  }
}

describe('聊天室单元测试', function () {
  it('0、用户新建房间', function () {
    let data = {room_name: 'aaaaaa', name: 'bbbbbb', id: 'socket.io.ID'}
    let r = chatObj.roomCreate(wsObj, data)
    assert.deepEqual(wsObj.rooms[data.room_name], r.data.rooms[data.room_name])
  })

  it('0、用户新建房间', function () {
    let data = {name: 'bbbbbb', id: 'socket.io.ID'}
    let r = chatObj.roomCreate(wsObj, data)
    assert.deepEqual(400, r.code)
  })
  it('0、用户新建房间', function () {
    let data = {room_name: 'aaaaaa', name: 'bbbbbb', id: 'socket.io.ID'}
    let r = chatObj.roomCreate(wsObj, data)
    assert.deepEqual(401, r.code)
  })
  it('0、用户新建房间', function () {
    let data = {room_name: 'k k', name: 'bbbbbb', id: 'socket.io.ID'}
    let r = chatObj.roomCreate(wsObj, data)
    assert.deepEqual(401, r.code)
  })
  it('1、管理员给房间增加成员', function () {
    let data = {room_name: 'aaaaaa', id: 'smart', opt_id: 'root'}
    let r = chatObj.roomAddMember(wsObj, data)
    assert.deepEqual((wsObj.rooms[data.room_name].users).indexOf(data.id) > -1, true)
    data = {room_name: 'aaaaaa', id: 'kitty', opt_id: 'root'}
    r = chatObj.roomAddMember(wsObj, data)
    data = {room_name: 'aaaaaa', id: 'root', opt_id: 'root'}
    r = chatObj.roomAddMember(wsObj, data)
    data = {room_name: 'room3', id: 'smart', opt_id: 'root'}
    r = chatObj.roomAddMember(wsObj, data)
    data = {room_name: 'room3', id: 'kind', opt_id: 'root'}
    r = chatObj.roomAddMember(wsObj, data)
  })
  it('1、管理员给房间增加成员', function () {
    let data = {room_name: 'aaaaaa', id: 'cat', opt_id: 'abcd'}
    let r = chatObj.roomAddMember(wsObj, data)
    assert.deepEqual(400, r.code)
  })
  it('2、管理员从房间删除成员', function () {
    let data = {room_name: 'aaaaaa', id: 'root', opt_id: 'root'}
    let r = chatObj.roomRemoveMember(wsObj, data)
    assert.deepEqual((wsObj.rooms[data.room_name].users).indexOf(data.id) < 0, true)
  })
  it('2、管理员从房间删除成员', function () {
    let data = {room_name: 'room3', id: 'kind', opt_id: 'root'}
    let r = chatObj.roomRemoveMember(wsObj, data)
		// console.log(wsObj.users.kind)
		// console.log(r.data.rooms.room3)
    assert.deepEqual((wsObj.rooms[data.room_name].users).indexOf(data.id) < 0, true)
  })
  it('2、管理员从房间删除成员', function () {
    let data = {room_name: 'aaaaaa', id: 'smart', opt_id: 'abcd'}
    let r = chatObj.roomRemoveMember(wsObj, data)
    assert.deepEqual(400, r.code)
  })
  it('3、管理员修改房间信息', function () {
    let data = {room_name: 'aaaaaa', freqLimit: 4, msgLengthLimit: 300, sizeLimit: 400, opt_id: 'root'}
    let r = chatObj.roomModify(wsObj, data)
    assert.deepEqual(wsObj.rooms[data.room_name].name === data.room_name, true)
    assert.deepEqual(wsObj.rooms[data.room_name].freqLimit === data.freqLimit, true)
    assert.deepEqual(wsObj.rooms[data.room_name].msgLengthLimit === data.msgLengthLimit, true)
    assert.deepEqual(wsObj.rooms[data.room_name].sizeLimit === data.sizeLimit, true)
  })
  it('3、管理员修改房间信息', function () {
    let data = {room_name: 'testRoom', freqLimit: 4, msgLengthLimit: 300, sizeLimit: 400, opt_id: 'abcd'}
    let r = chatObj.roomModify(wsObj, data)
    assert.deepEqual(400, r.code)
  })
  it('3、管理员修改房间信息', function () {
    let data = {new_name: 'room2', room_name: 'aaaaaa', freqLimit: 6, msgLengthLimit: 500, sizeLimit: 400, opt_id: 'root'}
    let r = chatObj.roomModify(wsObj, data)
    assert.deepEqual(wsObj.rooms[data.room_name].freqLimit === data.freqLimit, true)
    assert.deepEqual(wsObj.rooms[data.room_name].msgLengthLimit === data.msgLengthLimit, true)
    assert.deepEqual(wsObj.rooms[data.room_name].sizeLimit === data.sizeLimit, true)
  })
  it('3、管理员修改房间信息', function () {
    let data = {room_name: 'room1', opt_id: 'root'}
    let r = chatObj.roomModify(wsObj, data)
    assert.deepEqual(wsObj.rooms[data.room_name].freqLimit === (r.data.rooms.room1).freqLimit, true)
    assert.deepEqual(wsObj.rooms[data.room_name].msgLengthLimit === (r.data.rooms.room1).msgLengthLimit, true)
    assert.deepEqual(wsObj.rooms[data.room_name].sizeLimit === (r.data.rooms.room1).sizeLimit, true)
  })
  it('4、管理员增加禁言成员', function () {
    let data = {room_name: 'aaaaaa', id: 'smart', expTime: 15, opt_id: 'root'}
    let r = chatObj.roomBanMember(wsObj, data)
    assert.deepEqual(wsObj.rooms[data.room_name].noSayList.smart === 15, true)
    data = {room_name: 'aaaaaa', id: 'kitty', expTime: 15, opt_id: 'root'}
    r = chatObj.roomBanMember(wsObj, data)
  })
  it('4、管理员增加禁言成员', function () {
    let data = {room_name: 'aaaaaa', id: 'cat', expTime: 30, opt_id: 'abcd'}
    let r = chatObj.roomBanMember(wsObj, data)
    assert.deepEqual(400, r.code)
  })

  it('5、管理员允许成员说话', function () {
    let data = {room_name: 'aaaaaa', id: 'smart', opt_id: 'root'}
    let r = chatObj.roomUnBanMember(wsObj, data)
    assert.deepEqual(wsObj.rooms[data.room_name].noSayList.smart === undefined, true)
  })
  it('5、管理员允许成员说话', function () {
    let data = {room_name: 'aaaaaa', id: 'kitty', opt_id: 'abcd'}
    let r = chatObj.roomUnBanMember(wsObj, data)
    assert.deepEqual(400, r.code)
  })

  it('6、管理员查询成员信息', function () {
    let data = {room_name: 'aaaaaa', opt_id: 'root'}
    let r = chatObj.room_search(wsObj, data)
    assert.deepEqual(r.data[1].nickname === 'smart', true)
  })
  it('6、管理员查询成员信息', function () {
    let data = {room_name: 'aaaaaa', opt_id: 'abcd'}
    let r = chatObj.room_search(wsObj, data)
    assert.deepEqual(400, r.code)
  })

  it('7、房间保存最后十句对话', function () {
    let times = new Date()
    let data = {room_name: 'hall_room', who_say: 'cat', time: times, msg: 'wdadds', opt_id: 'root'}
    let r = chatObj.room_lastestMsg(wsObj, data)
    data = {room_name: 'hall_room', who_say: 'cat', time: times, msg: '你好双方说法的的', opt_id: 'root'}
    r = chatObj.room_lastestMsg(wsObj, data)
		// console.log(r)
    assert.deepEqual(wsObj.rooms[data.room_name].talks.length <= 10, true)
  })
  it('7、房间保存最后十句对话', function () {
    let times = new Date()
    let data = {room_name: 'hall_room', who_say: 'cat', time: times, msg: 'wdadds', opt_id: 'root'}
    let r = chatObj.room_lastestMsg(wsObj, data)
    data = {room_name: 'hall_room', who_say: 'cat', time: times, msg: 'rh', opt_id: 'root'}
    r = chatObj.room_lastestMsg(wsObj, data)
    data = {room_name: 'hall_room', who_say: 'cat', time: times, msg: 'rgt', opt_id: 'root'}
    r = chatObj.room_lastestMsg(wsObj, data)
    data = {room_name: 'hall_room', who_say: 'cat', time: times, msg: '输入格式如通过', opt_id: 'root'}
    r = chatObj.room_lastestMsg(wsObj, data)
    data = {room_name: 'hall_room', who_say: 'cat', time: times, msg: '的份上', opt_id: 'root'}
    r = chatObj.room_lastestMsg(wsObj, data)
    data = {room_name: 'hall_room', who_say: 'cat', time: times, msg: '问问', opt_id: 'root'}
    r = chatObj.room_lastestMsg(wsObj, data)
    data = {room_name: 'hall_room', who_say: 'cat', time: times, msg: '我认为', opt_id: 'root'}
    r = chatObj.room_lastestMsg(wsObj, data)
    data = {room_name: 'hall_room', who_say: 'cat', time: times, msg: '	我', opt_id: 'root'}
    r = chatObj.room_lastestMsg(wsObj, data)
    data = {room_name: 'hall_room', who_say: 'cat', time: times, msg: '我认为', opt_id: 'root'}
    r = chatObj.room_lastestMsg(wsObj, data)
    data = {room_name: 'hall_room', who_say: 'cat', time: times, msg: '请问', opt_id: 'root'}
    r = chatObj.room_lastestMsg(wsObj, data)
    data = {room_name: 'hall_room', who_say: 'cat', time: times, msg: '二区 ', opt_id: 'root'}
    r = chatObj.room_lastestMsg(wsObj, data)
    data = {room_name: 'hall_room', who_say: 'cat', time: times, msg: 'iuy  ', opt_id: 'root'}
    r = chatObj.room_lastestMsg(wsObj, data)
    assert.deepEqual(wsObj.rooms[data.room_name].talks.length <= 10, true)
  })
  it('8、统计房间个数和 返回所有房间名', function () {
    let data = {opt_id: 'root'}
    let r = chatObj.room_count(wsObj, data)
    let count = 0
    let rooms = []
    count = Object.getOwnPropertyNames(wsObj.rooms).length
    for (let item in wsObj.rooms) {
      rooms.push(wsObj.rooms[item].name)
    }
    assert.deepEqual(count === r.data.count, true)
    assert.deepEqual(r.data.rooms, rooms)
  })

  it('9、返回房间名称和所有user', function () {
    let data = {room_name: 'aaaaaa', opt_id: 'root'}
    let r = chatObj.room_count_user(wsObj, data)
    assert.deepEqual(wsObj.rooms[data.room_name].users.split(' ')[1] === r.data.users[1], true)
  })

  it('8、用户进入房间', function () {
    let data = {room_name: 'aaaaaa', id: 'cat', opt_id: 'root', token: 'aasef', icon: 'dede', who_say: 'aaaaaa'}
    let r = chatObj.room_enter(wsObj, data)
    assert.deepEqual((wsObj.rooms[data.room_name].users).indexOf(data.id) === (r.data.rooms.aaaaaa.users).indexOf(data.id), true)
    data = {room_name: 'room3', id: 'kind', opt_id: 'root'}
    r = chatObj.room_enter(wsObj, data)
  })
  it('0、用户新建房间', function () {
    let data = {room_name: 'room5', pwd: '123456', name: 'bbbbbb', id: 'socket.io.ID'}
    let r = chatObj.roomCreate(wsObj, data)
    assert.deepEqual(wsObj.rooms[data.room_name], r.data.rooms[data.room_name])
  })
  it('8、用户进入房间', function () {
    let data = {room_name: 'room5', pwd: '1234', id: 'kitty', opt_id: 'root'}
    let r = chatObj.room_enter(wsObj, data)
    assert.deepEqual(400, r.code)
  })
  it('8、用户进入房间', function () {
    let data = {room_name: 'room5', pwd: '123456', id: 'kitty', opt_id: 'root'}
    let r = chatObj.room_enter(wsObj, data)

    assert.deepEqual(wsObj.rooms[data.room_name].users.indexOf('kitty') >= 0, true)
  })
  it('9、用户离开房间', function () {
    let data = {room_name: 'aaaaaa', id: 'cat', opt_id: 'root'}
    let r = chatObj.room_leave(wsObj, data)
    assert.deepEqual(wsObj.rooms[data.room_name].users.indexOf(data.id) < 0, true)
  })
  it('10、用户连上线', function () {
    let data = {id: 'aaa', name: 'helanlan', token: '', icon: '', opt_id: 'root'}
    let r = chatObj.user_connect(wsObj, data)
    data = {id: 'cat', name: 'dd', token: '', icon: '', opt_id: 'root'}
    r = chatObj.user_connect(wsObj, data)
    data = {id: 'smart', name: 'smart', token: '', icon: '', opt_id: 'root'}
    r = chatObj.user_connect(wsObj, data)
    assert.deepEqual(wsObj.connectSets.has(data.id), true)
  })

  it('12、用户下线', function () {
    let data = {id: 'cat', opt_id: 'root'}
    let r = chatObj.user_disconnect(wsObj, data)
    assert.deepEqual(wsObj.connectSets.has(data.id), false)
  })
  it('8、用户进入房间', function () {
    let data = {room_name: 'room5', pwd: '123456', id: 'kitty', opt_id: 'root'}
    let r = chatObj.room_enter(wsObj, data)
    assert.deepEqual(wsObj.rooms[data.room_name].users.indexOf('kitty') >= 0, true)
  })
  it('12、用户下线', function () {
    let data = {id: 'kitty', opt_id: 'root'}
    let r = chatObj.user_disconnect(wsObj, data)
    assert.deepEqual(wsObj.connectSets.has(data.id), false)
  })

  it('13、循环房间里除自己以外的所有用户(除大厅外都要改)', function () {
    let data = {room_name: 'aaaaaa', msg: 'aca', which_room: 1}
    let r = chatObj.room_say2all(wsObj, data)
    assert.deepEqual(r.type, 1)
    data = {room_name: 'aaaaaa', msg: 'cat', which_room: 2}
    r = chatObj.room_say2all(wsObj, data)
    assert.deepEqual(r.type, 2)
    assert.deepEqual(r.code, 200)
    data = {room_name: 'aaaaaa', msg: 'cat', which_room: 3}
    r = chatObj.room_say2all(wsObj, data)
    assert.deepEqual(r.type, 3)
  })

  it('14、清理房间已经下线的用户', function () {
    let data = {opt_id: 'root'}
    let r = chatObj.users_clear(wsObj, data)
    assert.deepEqual((r.data.rooms.room3.users).indexOf('qqq') < 0, true)
  })
})
