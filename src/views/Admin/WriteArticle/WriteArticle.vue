<template>
  <div class="mavonEditor">
    <!-- 全屏loading -->
    <a-spin tip='加油，每天写一篇' :spinning="loading">
       <!-- 文章类别 --> 
       <div class="article-type" style="text-align:left;margin-left:20px;">
         <span>文章类型：</span>
<a-select defaultValue="life" style="width: 120px;margin:10px auto;"  @change="contentType">
      <a-select-option v-for="(option,index) of articleType" :key="index" :value="option.value">{{option.label}}</a-select-option>
      </a-select>
       </div>
      
      <!-- title -->
      <h2>文章标题</h2>
      <a-input placeholder="文章标题" v-model="article.title" :style="inputWidth"/>
      <h2>文章简述</h2>
      <a-input placeholder="文章描述" v-model="article.desc" :style="inputWidth"/>
      <h2>首页图片地址(可在写作中图片上传后，复制地址)</h2>
      <a-input placeholder="defaultImageUrl:     http://cdn.irlin.cn/wangwang.jpeg" v-model="article.imgurl" style="margin-bottom:10px;" :style="inputWidth"/>
    <h2 style="margin-top: 3vh">文章内容</h2>
      <!-- 文章内容 -->
      <mavon-editor ref=md @imgAdd="$imgAdd"  codeStyle="tomorrow-night" @change="markChange"  v-model="handbook"/>
  <!-- 发表文章 -->
  <a-button type="dashed" :style="{margin:'10px auto 50px auto'}"  @click="submit(article)" >发表文章</a-button>
    </a-spin>
  </div>
</template>
<script>
import config from '@/config/defaultSettings.js'
export default {
  data() {
    return {
      // v-bind style
      inputWidth:{
        width: '60%'
      },
      // select Option
      articleType: config.articleType,
      loading : false,
      
    //   文章配置
    article:{
        body:'',
        title:'',
        desc :'',
        Type: 'life',
        imgrul: ''
    },
      handbook: ""
    };
  },
  methods:{
      /**
       * 编辑区发生变化的回调事件
       * @param 
       */
      markChange(value,render){
          this.article.body = render 
      },
        /**
         * 图片上传到云服务器
         */
      $imgAdd(pos,$file){
           var formdata = new FormData();
           formdata.append('file', $file);
           this.$axios({
               url: 'http://irlin.cn:3001/api/upload',
               method: 'post',
               headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
               data: formdata,
           }).then((res) => {
               // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
               // $vm.$img2Url 详情见本页末尾
               let url = `http://cdn.irlin.cn/${res.data.data.key}`
               this.$refs.md.$img2Url(pos, url) ;
           }).catch(error => {console.log(error);})
      },
      /**
       * 发表文章
       * @param article.body
       */
      submit(article){
        if(this.article.title == ''){
          this.$message.error('文章标题不能为空')
          return
        }
        if(this.article.desc == ''){
          this.$message.error('文章描述不能为空')
          return
        }
        if(this.article.body == ''){
          this.$message.error('文章内容不能为空')
          return
        }
        this.loading = true
        const data = {title:article.title,
                      desc:article.desc,
                      content:article.body,
                      markdown:this.handbook,
                      articleType:article.Type,
                      imgurl:article.imgurl
              }
        this.$axios.post('https://irlin.cn/api/addArticle',data).then( res => {
          if(res.data.result === 'success'){
            this.loading = false
            this.$message.success('发表成功',2);
          }
        })
        .catch(error => {
          console.log(error);
         this.$message.success('发表失败，请重新发送')
          this.loading = false
        })
      },
      /**
       * 文章类别
       */
      contentType(value){
        this.article.Type = value
      }
  }
};
</script>

<style scoped>
.mavonEditor {
  width: 100%;
  height: 100%;
 
}
