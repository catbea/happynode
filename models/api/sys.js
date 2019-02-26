module.exports = {
  '/sys/mysql': {
    'desc': 'mysql',
    'method': 'get',
    'param': {
      'type': {
        'desc': '',
        'def': null,
        'type': 'string'
      },
      'dbName': {
        'desc': '',
        'def': null,
        'type': 'string'
      },
      'tableName': {
        'desc': '',
        'def': null,
        'type': 'string'
      }
    },
    'token': false,
    'err_code': {},
    'test': {},
    'front': true
  },
  '/sys/api': {
    'desc': 'getAPI',
    'method': 'post',
    'param': {
      'lev': {
        'desc': '',
        'req': 1,
        'def': null,
        'type': 'string'
      }
    },
    'token': false,
    'err_code': {},
    'test': {},
    'front': true
  },
  '/sys/sendMail': {
    'desc': '邮箱发送验证码',
    'method': 'post',
    'param': {
      'mail': {
        'desc': '',
        'req': 1,
        'def': null,
        'type': 'string',
        'reqErr': '请输入邮箱'
      }
    },
    'token': false,
    'err_code': {},
    'test': {},
    'front': true
  },
  '/sys/sendMobile': {
    'desc': '手机发送验证码',
    'method': 'post',
    'param': {
      'mobile': {
        'desc': '',
        'req': 1,
        'def': null,
        'type': 'string',
        'reqErr': '请输入手机号'
      }
    },
    'token': false,
    'err_code': {},
    'test': {},
    'front': true
  },
  '/sys/changePwd': {
    'desc': '忘记密码修改',
    'method': 'post',
    'param': {
      'mobile': {
        'desc': '',
        'req': 0,
        'def': null,
        'type': 'string'
      },
      'mail': {
        'desc': '',
        'req': 0,
        'def': null,
        'type': 'string'
      },
      'vcode': {
        'desc': '验证码',
        'req': 1,
        'def': null,
        'type': 'string',
        'reqErr': '验证码必填',
        'err': '验证码格式不对',
        'reg': '^\\d{4}$'
      },
      'password': {
        'desc': '密码',
        'req': 1,
        'def': null,
        'type': 'string',
        'reqErr': '密码必填',
        'err': '密码：长度6-16位，支持数字、字母',
        'reg': '[0-9a-zA-Z]{6,16}$'
      }
    },
    'token': false,
    'err_code': {},
    'test': {},
    'front': true
  },
  '/sys/frontapi': {
    'desc': '发送至前端的接口定义',
    'method': 'get',
    'param': {},
    'token': false,
    'err_code': {},
    'test': {},
    'front': true
  },
  '/sys/cache': {
    'desc': '缓存',
    'method': 'get',
    'param': {
      'cls': {
        'desc': '清空标志',
        'req': 0,
        'def': null,
        'type': 'int'
      }
    },
    'token': false,
    'err_code': {},
    'test': {},
    'front': true
  },
  '/sys/monitorParam': {
    'desc': '查看内部变量状态',
    'method': 'get',
    'param': {
      'pwd': {
        'desc': '密码',
        'req': 1,
        'def': null,
        'type': 'string'
      }
    },
    'token': false,
    'err_code': {},
    'test': {},
    'front': true
  },
  '/sys/gameDataInit': {
    'desc': '系统初始化',
    'method': 'get',
    'param': {
      'pwd': {
        'desc': '密码',
        'req': 1,
        'def': null,
        'type': 'string'
      }
    },
    'token': false,
    'err_code': {},
    'test': {},
    'front': false
  },
  '/sys/paramReload': {
    'desc': '参数从新从数据库读取',
    'method': 'get',
    'param': {
      'pwd': {
        'desc': '密码',
        'req': 1,
        'def': null,
        'type': 'string'
      }
    },
    'token': false,
    'err_code': {},
    'test': {},
    'front': true
  },
  '/sys/abc': {
    'desc': 'test',
    'method': 'get',
    'param': {},
    'token': false,
    'err_code': {},
    'test': {},
    'front': false
  }
}
