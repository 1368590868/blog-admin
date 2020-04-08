<template>
  <div class="reply">
    <div style="margin-top: 3vh">
      <span>选择文章：</span>
      <a-select
        :autoFocus="true"
        placeholder="请选择文章"
        style="width: 150px;margin:10px auto;"
        @change="getReply"
      >
        <a-select-option
          v-for="(option,index) of articleName"
          :key="index"
          :value="option._id"
        >{{option.title}}</a-select-option>
      </a-select>
    </div>
    <!-- 留言表格 -->
    <a-table :columns="columns" childrenColumnName="reply"  :dataSource="data" :rowSelection="rowSelection">
    <span slot="action" >
      <a-popconfirm
    title="确定删除这条评论吗？"
    @confirm="confirm"
    @cancel="cancel"
    okText="Yes"
    cancelText="No"
  >
      <a>删除</a>
      </a-popconfirm>
      <a @click="showModal" class="ant-dropdown-link"> 新增 <a-icon type="down" /> </a>
    </span>
    </a-table>
    <!-- 编辑弹出框 -->
     <a-modal
      :title="title"
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >
       <a-textarea v-model="reply" placeholder="编辑回复，自动邮箱通知" :rows="4" />
    </a-modal>
  </div>
</template>

<script>
import config from '../../../config/defaultSettings'
export default {
  name: 'Workbench',
  inject: ['reload'],
  data () {
    return {
      articleName: '',
      // 表格标题
      columns: config.tableColumns,
      // 表数据
      data: [],
      // 弹出框数据
      title: '',
      visible: false,
      confirmLoading: false,
      // 多行文本回复内容
      reply: '',
      // 选择一行的内容
      row: ''
    }
  },
  computed: {
    // 选项
    rowSelection () {
      return {
        onSelect: (selectedRows) => {
          this.title = `正在回复：${selectedRows.username}`
          this.row = selectedRows
        }

      }
    }
  },
  created () {
    /**
     * 查找指定文章内容
     */
    this.$axios('https://irlin.cn/api/article').then(res => {
      this.articleName = res.data.data
    }).catch(() => {
      alert('服务器正在修复')
    })
  },
  methods: {
    // 确认删除
    confirm () {
      if (this.row.key == '' || this.row.key == undefined) {
        this.$message.error('请选择需要删除的评论')
        return
      }
      this.$axios({
        method: 'delete',
        url: `https://irlin.cn/api/deleteReply/${this.row.key}`
      }).then(res => {
        this.$message.success('删除成功')
        setTimeout(() => {
          this.reload()
        }, 1000)
      })
    },
    // 删除评论取消
    cancel () {
      this.$message.success('你取消了删除')
    },
    /**
    * 选择当前文章并赋值到文本框里
    * @param {String}  id 对应数据库的 _id
    */
    getReply (id, key) {
      this.$axios.get(`https://irlin.cn/api/comment/${id}`).then(res => {
        this.data = res.data.data
        for (let i = 0; i < this.data.length; i++) {
          // 把评论的id 给 key
          this.data[i].key = this.data[i]._id
          this.data[i].reply = this.data[i].reply.map((m, i) => {
            const newKey = { key: i, ...m }
            return newKey
          })
        }
      })
    },
    // 弹出框显示
    showModal () {
      if (this.title === '' || this.title == undefined) {
        this.$message.error('请先选择')
        return
      }
      this.visible = true
    },
    // 弹出框ok
    handleOk () {
      this.confirmLoading = true
      this.$axios({
        method: 'put',
        url: 'https://irlin.cn/api/addReply',
        data: {
          comment: this.reply,
          id: this.row.key,
          email: this.row.email,
          username: this.row.username
        }
      }).then(res => {
        this.confirmLoading = false
        this.$message.success('回复成功,请重新选择文章')
        this.visible = false
        setTimeout(() => {
          this.reload()
        }, 1000)
      }).catch(() => { this.confirmLoading = false })
    },
    // 弹出框cancle
    handleCancel () {
      this.visible = false
    }

  }
}
</script>

<style scoped>
</style>
