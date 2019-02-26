<template>
  <div>
    <header-nav></header-nav>
    <p>参数啊：{{$route.params.str}}</p>
    <div>
      <!-- <h1>{{ 'My nice title' | translate }}</h1>
      <p>{{ $t('content', {'type': 'nice!'}) }}</p>
      <p>{{$t('msg',{count:5})}}</p> -->
    </div>

    <button v-on:click="search">跳转</button>
  </div>
</template>

<script>
import HeaderNav from '../components/header'

import router from '../router'

export default {
  name: 'Test',
  components: {
    HeaderNav // 注册组件，命名规范要符合驼峰法，上面使用的时候大写字母之间用—横线分开
  },
  methods: {
    search () {
      router.push({
        name: 'search',
        params: {
          text: '哈哈哈哈'
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  p
    color: red
</style>
