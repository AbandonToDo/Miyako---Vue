import Vue from 'vue';
import App from './App.vue';
// import './elementUI/element';
import ElementUI from 'element-ui';
import 'font-awesome/css/font-awesome.min.css';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import router from './router';

// 全局引入

Vue.use(ElementUI);

Vue.config.productionTip = false;
Vue.prototype.axios = axios; //挂载到原型上全局使用

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
