<template>
  <div>
    <div class="backBtn">
      <el-button size="mini" icon="el-icon-refresh" @click="handleRefreshBtn">重新加载</el-button>
    </div>
    <div class="signinBtn">
      <el-button size="mini" type="primary" @click="onJumpToSignIn">注册 HappyNode</el-button>
    </div>
    <div class="mainCanvas share"></div>
    <!-- <div class="shade"></div> -->
  </div>
</template>

<script>

import { Message } from 'element-ui'
import $ from '../tools/sky/meeko_ui'
import FlowChart from '../tools/sky/FlowChart'

import router from '../router'
import request from '../tools/request'

import config from '../config.js'

let flowChart
let dataOnServer

export default {
  data () {
    return {
      text: this.$route.params.sid
    }
  },

  mounted () {
    console.log('mounted')
    // if (this.timer) {
    //   clearTimeout(this.timer)
    // }
    // this.autoTime()
  },
  async beforeMount () {
    if (!this.$route.params.sid) {
      router.push({
        name: 'Works'
      })
      return
    }
    await this.init()
  },
  beforeDestroy () {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  },
  methods: {
    init: async function () {
      const sid = this.$route.params.sid
      const { data } = await request(config.apiHost + '/works/show?sid=' + sid, {
        method: 'GET'
      })

      if (parseInt(data.code) !== 200) {
        Message({
          message: data.msg,
          type: 'error'
        })
        return
      }

      flowChart = new FlowChart({
        p: $(document.querySelector('.mainCanvas')),
        onSave: () => {
          this.saveJson()
        },
        disabledKeyBoard: true,
        disabledEditLineName: true
      })
      data.data.content = data.data.content ? JSON.parse(data.data.content) : []
      flowChart.reloadJson(data.data.content)
      dataOnServer = data.data
    },
    saveJson (isManual) {
      dataOnServer.content = flowChart.getJson()
      // console.log(dataOnServer.content)
    },
    async refresh () {
      const sid = this.$route.params.sid
      const { data } = await request(config.apiHost + '/works/show?sid=' + sid, {
        method: 'GET'
      })

      if (parseInt(data.code) !== 200) {
        Message({
          message: data.msg,
          type: 'error'
        })
        return
      }
      data.data.content = data.data.content ? JSON.parse(data.data.content) : []
      flowChart.reloadJson(data.data.content)
    },
    handleRefreshBtn () {
      this.refresh()
      Message({
        message: '已重新加载',
        type: 'success'
      })
    },
    autoTime () {
      this.timer = setTimeout(() => {
        this.refresh()
        this.autoTime()
      }, 5000)
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

<style>
.backBtn {
  position: absolute;
  top: 1px;
  left: 10px;
  z-index: 99;
}
.signinBtn {
  position: absolute;
  top: 1px;
  right: 10px;
  z-index: 99;
}
/* .shade {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  z-index: 98;
} */
.mainCanvas.share .ButtonSet-default {
  padding-left: 110px;
}
.mainCanvas.share .BaseDiv-Head {
 display: none;
}
.mainCanvas.share .BaseDiv-Body.scroll-webkit {
  top: 0px!important;
}
.mainCanvas.share .layout-foot.scroll-webkit {
  display: none;
}
.mainCanvas.share .Layout-we .layout-bar {
  display: none;
}
.mainCanvas.share .layout-head.scroll-webkit.FlowChart-default {
  min-width: 100%;
}
.mainCanvas.share .FlowChart-default>.line:hover .line-text {
  border: none
}
</style>
