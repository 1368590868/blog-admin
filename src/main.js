import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'
import './registerServiceWorker'
import '@/assets/css/BaseCss.css'
// import PluginAxios from '@/plugin/axios'
import '@/plugin/antd'
import 'ant-design-vue/dist/antd.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import axios from 'axios';

// Vue.use(PluginAxios)
// 富文本

Vue.prototype.$axios = axios
Vue.use(mavonEditor)

Vue.config.productionTip = false

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
