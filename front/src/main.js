import Vue from 'vue'
import App from './App'
import router from './router'
// import store from './store'

// 一个基于vuejs的ui库 http://element-cn.eleme.io/
/** 完整引入 */
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI, { size: 'small', zIndex: 3000 })

/** 部分引入，为方便开发，先使用完整引入 */
// import { Button, Select } from 'element-ui'
// Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 } // 设置全局配置
// Vue.use(Button)
// Vue.use(Select)

// 多语言配置，使用 vuex-i18n
// import langs from './lang'
// langs(store)

Vue.config.productionTip = false

// 这是为了让猎豹/360浏览器不报错
window.Promise = Promise

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // store,
  render: h => h(App)
})
