module.exports = {
  '/user/signIn': {
    'desc': '注册账号',
    'method': 'post',
    'param': {
      'account': {
        'desc': '账号',
        'req': 1,
        'def': null,
        'type': 'string',
        'reqErr': '请输入账号'
      },
      'pwd': {
        'desc': '密码',
        'req': 1,
        'def': null,
        'type': 'string',
        'reqErr': '请输入密码'
      }
    },
    'token': false,
    'err_code': {},
    'test': {},
    'front': true
  },
  '/user/login': {
    'desc': '登录',
    'method': 'post',
    'param': {
      'account': {
        'desc': '账号',
        'req': 1,
        'def': null,
        'type': 'string'
      },
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
  '/user/testLogin': {
    'desc': '登录',
    'method': 'post',
    'param': {},
    'token': true,
    'err_code': {},
    'test': {},
    'front': true
  }
}
