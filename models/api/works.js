module.exports = {
  '/works/show': {
    'desc': '查询指定作品',
    'method': 'get',
    'param': {
      'sid': {
        'desc': '指定作品的字符串id',
        'req': 1,
        'def': null,
        'type': 'string'
      },
      'ver': {
        'desc': '前端当前的版本号，如果指定该值，服务器将判断数据库的版本是否比此版本高，高则正常返回，相同或低则不会返回详细信息',
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
  '/works/checkVer': {
    'desc': '查询指定作品的版本号',
    'method': 'get',
    'param': {
      'sid': {
        'desc': '指定作品的字符串id',
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
  '/works/index': {
    'desc': '查询登录用户的所有作品',
    'method': 'get',
    'param': {
      'page': {
        'desc': '要查询的页数',
        'req': 0,
        'def': 1,
        'type': 'int'
      },
      'page_size': {
        'desc': '每页要多少条数据',
        'req': 0,
        'def': 15,
        'type': 'int'
      },
      'need_total_num': {
        'desc': '是否需要查询作品总数',
        'req': 0,
        'def': 1,
        'type': 'int'
      }
    },
    'token': true,
    'err_code': {},
    'test': {},
    'front': true
  },
  '/works/create': {
    'desc': '新建作品',
    'method': 'post',
    'param': {
      'content': {
        'desc': '作品的json数据',
        'req': 0,
        'def': '[]',
        'type': 'string'
      },
      'title': {
        'desc': '作品的标题',
        'req': 1,
        'def': null,
        'type': 'string'
      },
      'description': {
        'desc': '作品的描述',
        'req': 0,
        'def': '',
        'type': 'string'
      },
      'width': {
        'desc': '作品画布宽',
        'req': 0,
        'def': 1000,
        'type': 'int'
      },
      'height': {
        'desc': '作品画布高',
        'req': 0,
        'def': 1000,
        'type': 'int'
      }
    },
    'token': true,
    'err_code': {},
    'test': {},
    'front': true
  },
  '/works/update': {
    'desc': '修改作品',
    'method': 'post',
    'param': {
      'sid': {
        'desc': '作品的字符串id',
        'req': 1,
        'def': null,
        'type': 'string'
      },
      'content': {
        'desc': '作品的json数据',
        'req': 1,
        'def': null,
        'type': 'string'
      },
      'title': {
        'desc': '作品的标题',
        'req': 0,
        'def': null,
        'type': 'string'
      },
      'description': {
        'desc': '作品的描述',
        'req': 0,
        'def': null,
        'type': 'string'
      },
      'width': {
        'desc': '作品画布宽',
        'req': 0,
        'def': null,
        'type': 'int'
      },
      'height': {
        'desc': '作品画布高',
        'req': 0,
        'def': null,
        'type': 'int'
      }
    },
    'token': true,
    'err_code': {},
    'test': {},
    'front': true
  },
  '/works/delete': {
    'desc': '删除作品',
    'method': 'post',
    'param': {
      'sid': {
        'desc': '作品的字符串id',
        'req': 1,
        'def': null,
        'type': 'string'
      }
    },
    'token': true,
    'err_code': {},
    'test': {},
    'front': true
  }
}
