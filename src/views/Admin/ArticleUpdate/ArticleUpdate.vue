<template>
  <div class="article-update">
    <div class="left">
      <div style="border-bottom: 1px solid #cccccc;font-size: 18px;">修改文章</div>
      <div style="margin-top: 3vh">
        <span>选择文章:</span>
        <a-select :autoFocus='true'  placeholder='请选择文章' style="width: 150px;margin:10px auto;" @change="contentType">
          <a-select-option
            v-for="(option,index) of articleName"
            :key="index"
            :value="option._id"
          >{{option.title}}</a-select-option>
        </a-select>
      </div>
    </div>
    <!-- title -->
    <h2>文章标题</h2>
    <a-input placeholder="文章标题" v-model="article.title" :style="inputWidth" />
    <h2>文章简述</h2>
    <a-input placeholder="文章描述" v-model="article.desc" :style="inputWidth" />
    <h2>首页图片地址(可在写作中图片上传后，复制地址)</h2>
    <a-input
      placeholder="defaultImageUrl:     http://cdn.irlin.cn/wangwang.jpeg"
      v-model="article.imgurl"
      style="margin-bottom:10px;"
      :style="inputWidth"
    />
    <img :src="article.imgurl" alt="选择文章,加载首页图片" height="150px" width="150px" style="display:block;margin:0 auto;"/>
    <!-- 文章内容 -->
    <h2 style="margin-top: 3vh">文章内容</h2>
     <!-- 文章内容 -->
      <mavon-editor   codeStyle="tomorrow-night" @change="markChange"  v-model="handbook"/>
  <!-- 修改文章 -->
    <div style="text-align: left;margin-top: 3vh">
      <a-button type="primary" @click="updateArticle">修改文章</a-button>&nbsp;
      <a-button style="background: #ed4014;color: #ffffff" @click="deleteArticle">删除文章</a-button>
    </div>
  </div>
</template>

<script>
import config from '@/config/defaultSettings'

export default {
  name: 'ArticleUpdate',
  inject:['reload'],
  data () {
    return {
      // v-bind style
      inputWidth: {
        width: '60%'
      },
      // select Option
      articleName: [],
      loading: false,

      //   文章配置
      article: {
        id: '',
        body: '',
        title: '',
        desc: '',
        imgurl: ''
      },
      handbook: ""
    };

  },
  methods: {
    /**
     * 选择当前文章并赋值到文本框里
     */
     contentType(value,option){
        let id = option.data.key
        this.article.id = value
        this.article.title = this.articleName[id].title
        this.article.desc = this.articleName[id].desc
        this.handbook = this.articleName[id].markdown
        this.article.imgurl = this.articleName[id].imgurl
      },
      /**
       * 编辑区发生变化的回调事件
       * @param 
       */
      markChange(value,render){
          this.article.body = render
      },
    
    updateArticle(){
      this.$setLoading(true)
      this.$axios({
        method:'put',
        url: 'https://irlin.cn/api/updateArticle',
        data:{
          id: this.article.id,
          content: this.article.body,
        markdown: this.handbook,
        title: this.article.title,
        imgurl: this.article.imgurl,
        desc: this.article.desc,
        lastUpdateAt: ''
        }
      }).then(res => {
        this.$message.success('更新成功',3)
        this.reload()
        this.$setLoading(false)
      }).catch(() => this.$setLoading(false))
    },

    /**
     * 删除文章
     */

    deleteArticle(){
      this.$setLoading(true)
      this.$axios.delete(`https://irlin.cn/api/deleteArticle/${this.article.id}`).then(res => {
        if(res.data.result == 'success'){
          this.$message.success('删除成功',3);
          this.reload()
          this.$setLoading(false)
        }
      }).catch(() => this.$setLoading(false))
    }
    


  },
  created () {
    this.$axios('https://irlin.cn/api/article').then(res => {
      this.articleName = res.data.data
    }).catch()
    /**
     * 查找指定文章内容
     */
  }
}
</script>

<style lang="scss">
.article-update {
  padding-top: 3vh;
  padding-left: 2vw;
  padding-bottom: 3vh;

  & > .left {
    text-align: left;
  }
}

.ant-select-dropdown--single {
  z-index: 1600;
}
</style>
