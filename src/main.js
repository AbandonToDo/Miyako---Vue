import Vue from 'vue';
import App from './App.vue';
// import './elementUI/element';
import ElementUI from 'element-ui';
import 'font-awesome/css/font-awesome.min.css';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import service from './service';
import * as handleToken from './utils/handleToken';

// 全局引入
Vue.use(ElementUI);
//注册handleToken
Vue.prototype.$token = handleToken;
//使用service
Vue.prototype.$axios = service;
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
