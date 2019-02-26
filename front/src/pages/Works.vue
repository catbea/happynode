<template>
  <div style="padding-bottom: 60px;">
    <el-row style="border-bottom: 1px solid #ebeef5;">
      <el-col>
        <h1>HappyNode</h1>
      </el-col>
    </el-row>
    <el-row justify="center" style="border-bottom: 1px solid #ebeef5">
      <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4" align="center" style="padding: 20px 20px; border-right: 1px solid #ebeef5;">
        <el-button type="primary" plain style="width: 80%;" @click="showDlg">新建</el-button>
        <el-dialog title="填写信息" :visible.sync="dialogFormVisible">
          <el-form ref="form" :rules="rules2" :model="form" label-width="80px">
            <el-form-item label="标题" prop="title" :label-width="formLabelWidth">
              <el-input v-model="form.title" autoComplete="off" autofocus width="80%"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="description" :label-width="formLabelWidth">
              <el-input v-model="form.description" type="textarea" :rows="4" autoComplete="off"></el-input>
            </el-form-item>
            <el-form-item label="画布尺寸(PX)" align="left" :label-width="formLabelWidth">
              <el-col :span="11">
                <el-form-item prop="width">
                  <el-input-number v-model="form.width" type="number" autoComplete="off" :step="50" placeholder="宽(px)"
                    style="width: 100%;"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2" align="center">-</el-col>
              <el-col :span="11">
                <el-form-item prop="height">
                  <el-input-number v-model="form.height" type="number" autoComplete="off" :step="50" placeholder="高(px)"
                    style="width: 100%;"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col style="margin-top: 10px;">
                <el-button size="mini" round @click="selectPageSize(1500, 2100)">A3(1500x2100)</el-button>
                <el-button size="mini" round @click="selectPageSize(1050, 1500)">A4(1050x1500)</el-button>
                <el-button size="mini" round @click="selectPageSize(750, 1050)">A5(750x1050)</el-button>
              </el-col>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="createWork">确 定</el-button>
          </div>
        </el-dialog>
        <h4 disabled>我的文件</h4>
        <h4 style="color: #909399;">最近修改</h4>
        <h4 style="color: #909399;">与我协作</h4>
        <h4 style="color: #909399;">我的收藏</h4>
        <el-button type="danger" size="small" style="width: 80%;" @click="logout">退出登录</el-button>
      </el-col>
      <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="16" style="padding: 20px 20px;">
        <h5 align="left" style="margin-top: 0px;">文件列表</h5>
        <el-table :data="tableData" stripe border style="width: 100%; margin-bottom: 22px;">
          <el-table-column prop="title" label="标题" align="left">
          </el-table-column>
          <el-table-column prop="description" label="描述" align="left">
          </el-table-column>
          <el-table-column prop="width" label="画布尺寸(宽)" align="center">
          </el-table-column>
          <el-table-column prop="height" label="画布尺寸(高)" align="center">
          </el-table-column>
          <el-table-column prop="c_time" label="创建时间" :formatter="localTime">
          </el-table-column>
          <el-table-column prop="m_time" label="更新时间" :formatter="localTime">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="showEditDlg(scope.row)" style="margin-left: 10px">配置</el-button>
              <el-popover placement="left" popper-class="cusPopover" trigger="hover" @show="generateQR(scope.row)"
                style="margin-left: 10px">
                <div style="padding: 0px;">
                  <img alt="img" :src="scope.row.img" width="105">
                </div>
                <el-button type="text" size="small" slot="reference" @click="shareWork(scope.row)">浏览</el-button>
              </el-popover>
              <el-button type="text" size="small" @click="editWork(scope.row)" style="margin-left: 10px">编辑</el-button>
              <el-popover placement="top" width="160" v-model="scope.row.visible" style="margin-left: 10px">
                <p>删除不可恢复，确定删除"{{scope.row.title}}"吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="delPopoverCancel(scope.$index, scope.row)">取消</el-button>
                  <el-button type="primary" size="mini" @click="delPopoverOK(scope.$index, scope.row)">确定</el-button>
                </div>
                <el-button type="text" size="small" slot="reference" @click="scope.row.visible = true">删除</el-button>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination background align="right" layout="prev, pager, next" :total="total" :page-size="page_size"
          @current-change="changePage">
        </el-pagination>
      </el-col>
    </el-row>
    <el-row style="border-bottom: 1px solid #ebeef5;">
      <el-col>
        <h1>HappyNode ————catbea</h1>
      </el-col>
    </el-row>
    <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="16" style="padding: 20px 20px;">
        <h5 align="left" style="margin-top: 0px;">文件列表</h5>
        <el-table :data="myTableData" stripe border style="width: 100%; margin-bottom: 22px;">
          <el-table-column prop="title" label="标题" align="left">
          </el-table-column>
          <el-table-column prop="description" label="描述" align="left">
          </el-table-column>
          <el-table-column prop="width" label="画布尺寸(宽)" align="center">
          </el-table-column>
          <el-table-column prop="height" label="画布尺寸(高)" align="center">
          </el-table-column>
          <el-table-column prop="c_time" label="创建时间" :formatter="localTime">
          </el-table-column>
          <el-table-column prop="m_time" label="更新时间" :formatter="localTime">
          </el-table-column>
        </el-table>
    </el-col>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import moment from 'moment'
import QRCode from 'qrcode'
import qs from 'qs'
import router from '../router'
import request from '../tools/request'
import { redirecToLogin } from '../tools/helper'
import config from '../config.js'

export default {
  data () {
    return {
      tableData: [],
      myTableData: [],
      total: 0,
      page: 1,
      page_size: 10,
      dialogTableVisible: false,
      dialogFormVisible: false,
      rules2: {
        title: [
          {
            validator (rule, value, callback) {
              if (!value || value === '') {
                callback(new Error('不能为空'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        width: [
          {
            validator (rule, value, callback) {
              if (!value || value === '' || !/^\+?[1-9][0-9]*$/.test(value)) {
                callback(new Error('请输入正整数值'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        height: [
          {
            validator (rule, value, callback) {
              if (!value || value === '' || !/^\+?[1-9][0-9]*$/.test(value)) {
                callback(new Error('请输入正整数值'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      },
      form: {
        title: '',
        description: '',
        width: 1500,
        height: 2100
      },
      formLabelWidth: '72px'
    }
  },
  async created () {
    this.initData({
      page: 1,
      page_size: 10
    })
    this.initMyTableData({
      page: 1,
      page_size: 10
    })
  },
  methods: {
    async initData (params) {
      const { data } = await request(`${config.apiHost}/works/index?${qs.stringify(params)}`, { method: 'GET' })
      if (data && data.code === 200) {
        this.tableData = data.data.list.map(item => {
          item.visible = false
          item.img = ''
          return item
        })
        this.total = data.data.total
        this.page = data.data.page
        this.page_size = data.data.page_size
        this.total = data.data.total
      }
    },
    async initMyTableData (params) {
      let { data } = await request(`${config.apiHost}/works/index?${qs.stringify(params)}`, {method: 'GET'})
      if (data && data.code === 200) {
        this.myTableData = data.data.list.map(item => {
          item.visible = false
          item.img = ''
          return item
        })
      }
    },
    showDlg () {
      this.dialogFormVisible = true
      this.form = {
        title: '',
        description: '',
        width: 1500,
        height: 2100
      }
    },

    // 显示编辑弹窗
    showEditDlg (d) {
      this.form = d
      this.dialogFormVisible = true
    },

    delPopoverCancel (index, row) {
      row.visible = false
    },
    createWork (e) {
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          this.dialogFormVisible = false

          let data

          // 编辑作品
          if (this.form.sid) {
            data = await request(`${config.apiHost}/works/update`, {
              method: 'POST',
              body: JSON.stringify(this.form)
            })
          } else {
            data = await request(`${config.apiHost}/works/create`, {
              method: 'POST',
              body: JSON.stringify(this.form)
            })
          }

          data = data.data
          console.log(data.code === 200)
          if (data && data.code === 200) {
            Message({
              message: this.form.sid ? '修改成功' : '创建成功',
              type: 'success'
            })
            this.initData()
          } else {
            const msg = data ? data.msg : '网络发生错误'
            Message({
              message: msg,
              type: 'error'
            })
          }
        } else {
          Message({ message: '请正确填写相关信息', type: 'error' })
          return false
        }
      })
    },
    editWork (row) {
      router.push({
        name: 'Canvas',
        params: {
          sid: row.sid
        }
      })
    },
    async generateQR (row) {
      if (row.img !== '') {
        return row.img
      }
      let path = window.location.origin + `/#/share/${row.sid}`
      try {
        const base = await QRCode.toDataURL(path)
        row.img = base
        return base
      } catch (err) {
        console.error(err)
      }
    },
    async shareWork (row) {
      let routeData = this.$router.resolve({ path: `/share/${row.sid}` })
      // return generateQR
      window.open(routeData.href, '_blank')
    },
    async delPopoverOK  (index, row) {
      if (!row.visible) {
        // Message({
        //   message: '操作慢点哦',
        //   type: 'error'
        // })
        return
      }

      row.visible = false
      const { data } = await request(`${config.apiHost}/works/delete`, {
        method: 'POST',
        body: JSON.stringify({
          sid: row.sid
        })
      })

      if (data && data.code === 200) {
        Message({
          message: '删除成功',
          type: 'success'
        })
      } else {
        Message({
          message: data.msg,
          type: 'error'
        })
      }
      this.initData()
    },
    onJumpToLogin () {
      router.push({
        name: 'Login'
      })
    },
    localTime (row, column) {
      return moment(row.c_time).format('YYYY/MM/DD hh:mm:ss')
    },
    selectPageSize (width, height) {
      this.form = {
        ...this.form,
        width: width,
        height: height
      }
    },
    logout () {
      Message({
        message: '已安全退出',
        type: 'success'
      })
      redirecToLogin()
    },
    async changePage (page) {
      this.initData({
        page: page,
        page_size: 10
      })
    }
  }
}
</script>

<style>
.cusPopover {
  padding: 0px !important;
  min-width: 100px !important;
}

@media only screen and (max-width: 768px) {
  .el-dialog {
    width: 98%;
  }
}
</style>
