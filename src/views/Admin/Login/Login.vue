<template>
<a-spin :tip='tip' :spinning="loading">
  <div class="admin-login">

    <div>
      <div>
        <h2>
          <i class="icon" style="font-size: 50px;color:#534e4e;">&#xe61e;</i>
          后台登陆
        </h2>
        <p style="font-size: 14px">这世上真话本就不多，一位女子的脸红胜过一大段对白。</p>
      </div>
      <div class="logo-div" @click="login">
        <div style="font-size: 16px;">点击登录</div>
        <i class="icon" style="font-size: 50px;margin-top: 10px;color:rgba(0, 0, 0, 0.65);">&#xe64a;</i>
      </div>
    </div>
  </div>
    </a-spin>

</template>

<script>
import axios from 'axios'
import Cookie from 'js-cookie'

export default {
  layout (context) {
    return 'admin'
  },
  data () {
    return {
      loading: false,
      tip: '登陆中'
    }
  },
  methods: {
    login () {
      this.loading = true
      const client_id = '912f17eced062dcd5d85'
      const authorize_uri = 'https://github.com/login/oauth/authorize'

      location.href = `${authorize_uri}?client_id=${client_id}`
    },
    getToken (code) {
      this.loading = true
      axios({
        method: 'post',
        url: 'https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token',
        data: {
          client_id: '912f17eced062dcd5d85',
          client_secret: 'c3a71d2489d0b4e9a02470cdbbd8722ac1e34374',
          code: code
        }
      }).then(res => {
        this.tip = '登陆成功，正在跳转'
        let token = null
        // 获取token拆分获取
        token = res.data.split('=')[1].split('&')[0]
        if (token === 'bad_verification_code') {
          this.$message.error('登陆失败')
          this.loading = false
          return
        }
        // 本地存储保存token
        Cookie.set('token', token)
        this.$router.push('/home')
        this.loading = false
      }).catch((error) => {
        console.log(error)
        this.loading = false
      })
    }

  },
  mounted () {
    const code = this.$route.query.code
    if (code == null || code === '') {
    } else {
      this.getToken(code)
    }
  }
}
</script>
<style scoped lang="scss">
.admin-login {
  background-size: cover;
        width: 100vw;
        padding-top: 15vh;
        background: url("/img/logobg.svg") no-repeat;
  padding-top: 15vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  .logo-div {
    padding-top: 10px;
    margin-top: 3vh;
    border: 1px solid #1890ff;
    cursor: pointer;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
