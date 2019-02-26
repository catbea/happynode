import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/pages/HelloWorld'
import { getCookie } from '../tools/helper'
// import Test from '@/pages/Test'
// import search from '@/pages/search'

Vue.use(Router)

const routers = [
  {
    path: '/',
    name: 'Works',
    component: () => import(/* webpackChunkName: "canvas" */'@/pages/Works'),
    isToken: true

    // name: 'HelloWorld',
    // component: HelloWorld // 如果这个页面很经常被访问的，可以这样写，就会把这个vue文件编译进app.js里了
  }, {
    path: '/test/:str',
    name: 'Test',
    component: () => import(/* webpackChunkName: "test" */'@/pages/Test') // 这里的 webpackChunkName: "test" 是告诉webpack，这个chunk的[name]参数
  },
  { // 搜索页
    path: '/search/:text',
    name: 'search',
    component: () => import(/* webpackChunkName: "search" */'@/pages/search')
  },
  { // 登录页
    path: '/login/',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */'@/pages/Login')
  },
  { // 注册页
    path: '/signin/',
    name: 'SignIn',
    component: () => import(/* webpackChunkName: "signin" */'@/pages/SignIn')
  },
  { // 画布页
    path: '/canvas/:sid',
    name: 'Canvas',
    component: () => import(/* webpackChunkName: "canvas" */'@/pages/Canvas'),
    isToken: true
  },
  { // 画布浏览页
    path: '/share/:sid',
    name: 'Share',
    component: () => import(/* webpackChunkName: "canvas" */'@/pages/Share'),
    isToken: false
  },
  { // 作品列表
    path: '/works/',
    name: 'Works',
    component: () => import(/* webpackChunkName: "works" */'@/pages/Works'),
    isToken: true
  }
]
global.routers = routers
const router = new Router({
  routes: routers
})
router.beforeEach((to, from, next) => {
  const r = routers.filter(item => {
    return item.name === to.name
  })
  if (r.length > 0 && r[0]['isToken'] === true && getCookie('token') === '') {
    next('/login')
  } else {
    next()
  }
})
export default router
