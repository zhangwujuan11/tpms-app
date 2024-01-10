import Vue from 'vue'
import App from './App'
import store from './store' // store
import plugins from './plugins' // plugins
// import './permission' // permission
import uView from './uni_modules/uview-ui'
import Util from './utils/utils.js'
Vue.use(uView)
// Vue.use(plugins)

// 引入 uView 对小程序分享的 mixin 封装
let mpShare = require('uni_modules/uview-ui/libs/mixin/mpShare.js');
Vue.mixin(mpShare);
Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$util = Util;

App.mpType = 'app'

const app = new Vue({
  ...App
})

app.$mount()
