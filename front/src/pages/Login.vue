<template>
  <el-row type="flex" justify="center" style="padding: 10px;">
    <el-col :xs="24" :sm="16" :md="12" :lg="8" :xl="6">
      <h1>HappyNode 登录</h1>
      <el-form ref="form" :rules="rules2" :model="form" label-width="80px">
        <el-form-item label="账号" prop="account">
          <el-input v-model="form.account" placeholder="请输入账号" clearable maxlength="32"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="form.pwd" type="password" placeholder="请输入密码" clearable maxlength="32" @keyup.enter.native="onSubmit"></el-input>
        </el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
        <el-button type="primary" plain @click="onJumpToSignIn">注册</el-button>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import { Message } from 'element-ui'
import router from '../router'
import request from '../tools/request'
import { setCookie } from '../tools/helper'
import config from '../config.js'

export default {
  data () {
    return {
      rules2: {
        account: [
          {
            validator (rule, value, callback) {
              if (!value || typeof value !== 'string') {
                callback(new Error('请输入账号'))
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
              if (!value || typeof value !== 'string') {
                callback(new Error('请输入密码'))
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
        pwd: ''
      }
    }
  },
  methods: {
    onSubmit (e) {
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          const { data } = await request(`${config.apiHost}/user/login`, {
            method: 'POST',
            body: JSON.stringify(this.form)
          })
          if (data && data.code === 200) {
            Message({
              message: '登录成功!',
              type: 'success'
            })
            setCookie('token', data.data.token, 720)
            router.push({
              name: 'Works'
            })
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
    onJumpToSignIn () {
      console.log('跳转去注册！')
      router.push({
        name: 'SignIn'
      })
    }
  }
}
</script>
