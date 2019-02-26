// 通用配置
let config = {
  apiHost: location.origin + '/happynode'
}

/**
 * process.env 是在 build/webpack.dev.conf.js 和 build/webpack.prod.conf.js 定义的，是可以在业务代码中读到的
 *
 * 下面使用if-else而不用其他方法写，是因为这样写之后，经过UglifyJsPlugin压缩js，
 * 会把肯定为false的代码块直接去掉，只留为true的
 * */

// 公网测试服
if (process.env.NODE_ENV === 'testing') {

} else if (process.env.NODE_ENV === 'development') {
  // 开发环境
  config.apiHost = 'http://127.0.0.1:16800'
}

module.exports = config
