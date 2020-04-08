<template>
  <div class="clearfix">
    <a-upload
      action="http://irlin.cn:3001/api/upload"
      listType="picture-card"
      :fileList="fileList"
      @preview="handlePreview"
      @change="handleChange"
    >
      <a-icon type="plus" />
      <div class="ant-upload-text">Upload</div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>

    <ul>
      <li
        v-for="(item,i) of img"
        :key="i"
        :style="{listStyle: 'none',width:'150px',height:'150px',margin:'10px 20px'}"
      >
        <img :src="item.url" width="100%" @click="preview(item.url)" />
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      previewVisible: false,
      previewImage: '',
      img: '',
      fileList: [],
    };
  },
  created () {
    this.getPhoto()
  },
  methods: {
    handleCancel () {
      this.previewVisible = false;
    },
    handlePreview (file) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    },
    handleChange (info) {
      this.fileList = info.fileList;
      if (info.file.status === 'done') {
        this.$axios.post('https://irlin.cn/api/addImg', {
          //info.fileList.length   每次上传图片，会存为一个数组，图片的值应该取对应数组的下标
          url: `http://cdn.irlin.cn/${info.fileList[info.fileList.length - 1].response.data.key}`
        }).then(res => {
          this.img = [...this.img, { url: `http://cdn.irlin.cn/${info.fileList[info.fileList.length - 1].response.data.key}` }]
        })
      }

    },
    getPhoto () {
      this.$axios.get('https://irlin.cn/api/img').then(res => {
        this.img = res.data.data
      })
    },
    // 查看图片
    preview (url) {
      this.previewImage = url
      this.previewVisible = true
    }
  },
};
</script>
<style scoped>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
ul {
  display: flex;
  flex-flow: row wrap;
}
</style>