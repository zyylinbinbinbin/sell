import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import 'babel-polyfill'
import api from './api/index.js'
import filters from './filters/filters'
import * as directives from './directives/directives'
import config from './config/config'
import store from './store/index'
import animate from 'animate.css'
import './style/Public/reset.css'
import './style/Public/public.scss';
/* 引入自定义图标库 */
import './common/icon.css';
// import './theme/index.css'
import './style/Public/media.scss';
// 自定义elment主题
import '@/assets/css/element-variables.scss'
import 'element-ui/lib/theme-chalk/reset.css'





Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));
Object.keys(directives).forEach(key => Vue.directive(key, directives[key]));
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(animate)
Vue.prototype.$api = api
Vue.prototype.$config = config

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
