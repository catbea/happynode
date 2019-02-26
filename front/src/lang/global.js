'use strict'
const langs = {
  sure: {
    en: 'sure', // 如果英语内容和key一致，则可以忽略
    zh_CN: '确定'
  },
  come: {
    en: 'come get good',
    zh_CN: '来快活啊'
  },
  content: {
    en: 'This is some {type} content',
    zh_CN: '这是某些坏东西'
  },
  msg: {
    en: 'You have {count} new messages',
    zh_CN: '你有{count}条新消息'
  },
  'My nice title': {
    zh_CN: '我的标题哦'
  }
}

function getLangs () {
  const returns = []

  for (let a in langs) {
    // 如果en没有配置，则把它的key设为en的值
    if (!langs[a]['en']) {
      langs[a]['en'] = a
    }

    for (let b in langs[a]) {
      if (!langs[a].hasOwnProperty(b)) {
        continue
      }
      if (!returns[b]) {
        returns[b] = {}
      }
      returns[b][a] = langs[a][b]
    }
  }
  return returns
}

module.exports = getLangs()
