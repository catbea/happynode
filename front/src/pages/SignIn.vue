<template>
  <el-row type="flex" justify="center" style="padding: 10px;">
    <el-col :xs="24" :sm="16" :md="12" :lg="8" :xl="6">
      <h1>HappyNode 注册</h1>
      <el-form ref="form" :rules="rules2" :model="form" label-width="80px">
        <el-form-item label="账号" prop="account">
          <el-input v-model="form.account" placeholder="请输入账号" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="form.pwd" type="password" placeholder="请输入密码" clearable></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="pwd2">
          <el-input v-model="form.pwd2" type="password" placeholder="请再次输入密码" clearable></el-input>
        </el-form-item>
        <el-button type="primary" plain @click="goSignIn">提交注册</el-button>
        <el-button type="primary" @click="onJumpToLogin">已有账号，登录</el-button>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import { Message } from 'element-ui'
import router from '../router'
import request from '../tools/request'
import config from '../config.js'

export default {
  data () {
    const t = this
    return {
      rules2: {
        account: [
          {
            validator (rule, value, callback) {
              if (!value.match || !/^[A-Za-z0-9_]{4,20}$/.test(value)) {
                callback(new Error('账号要求4到20位，大小写字母、数字以及下横杠'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        pwd: [
          {
            validator (rule, value, callback) {
              if (!value.match || !/^[A-Za-z0-9_]{6,20}$/.test(value)) {
                callback(new Error('密码要求6到20位，大小写字母、数字以及下横杠'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        pwd2: [
          {
            validator (rule, value, callback) {
              if (value !== t.form.pwd) {
                callback(new Error('两次密码不一致'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      },
      form: {
        account: '',
        pwd: '',
        pwd2: ''
      }
    }
  },
  methods: {
    goSignIn (e) {
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          const { data } = await request(`${config.apiHost}/user/signIn`, {
            method: 'POST',
            body: JSON.stringify(this.form)
          })
          if (data && data.code === 200) {
            Message({
              message: '恭喜。注册成功! 请登录...',
              type: 'success'
            })
            this.onJumpToLogin()
          } else {
            const msg = data ? data.msg : '网络发生错误'
            Message({
              message: msg,
              type: 'error'
            })
          }
        } else {
          console.log('请先解决输入错误！')
          return false
        }
      })
    },
    onJumpToLogin () {
      router.push({
        name: 'Login'
      })
    }
  }
}
</script>
