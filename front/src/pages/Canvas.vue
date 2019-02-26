<template>
  <div>
    <div class="backBtn">
      <el-button size="mini" icon="el-icon-back" @click="backWorks">返回列表</el-button>
    </div>

    <div class="helpBtn">
      <el-tooltip placement="right-end">
        <div slot="content">
          操作引导<br/><br/>
          Step1 单击选中节点<br/>
          Step2 按住热键拖动节点<br/><br/>
          Windows<br/>
          新增 (Ctrl+拖动至空白)<br/>
          连接 (Ctrl+拖动至目标)<br/>
          删除 (Del)<br/><br/>
          MacOS<br/>
          新增 (⌘+拖动空白)<br/>
          连接 (⌘+拖动至目标)<br/>
          删除 (Del)
          </div>
        <i class="el-icon-question" style="font-size: 36px;"></i>
      </el-tooltip>
    </div>
    <div class="mainCanvas"></div>
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

  async beforeMount () {
    if (!this.$route.params.sid) {
      router.push({
        name: 'Works'
      })
      return
    }
    await this.init()
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
        }
      })
      data.data.content = data.data.content ? JSON.parse(data.data.content) : []
      flowChart.reloadJson(data.data.content)
      dataOnServer = data.data
    },

    /**
     * 把json保存到服务端
     * @param isManual bool 是否手动保存
     * */
    saveJson (isManual) {
      dataOnServer.content = flowChart.getJson()

      const data = {
        content: flowChart.getJson(),
        sid: dataOnServer.sid
      }

      request(config.apiHost + '/works/update', {
        method: 'POST',
        body: JSON.stringify(data)
      }).then(function (data) {
        if (!data.data) {
          Message({
            message: '网络错误！',
            type: 'error'
          })
        }
        const d = data.data

        Message({
          message: parseInt(d.code) === 200 ? '保存成功！' : d.msg,
          type: parseInt(d.code) === 200 ? 'success' : 'error'
        })
      })
    },
    backWorks () {
      router.push({
        name: 'Works',
        replace: true
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
.helpBtn {
  position: absolute;
  top: 50px;
  left: 20px;
  z-index: 99;
}
.ButtonSet-default {
  padding-left: 110px;
}
</style>
