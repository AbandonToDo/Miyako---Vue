import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
      component: () => import('../components/Login.vue'),
    },

    {
      path: '/login',
      name: 'Login',
      component: () => import('../components/Login.vue'),
    },
    {
      path: '/home',
      //   component: () => import('../components/Home.vue'), //路由懒加载
      component: (resolve) => require(['../components/Home.vue'], resolve), //异步路由
    },
    //404
    {
      path: '*',
      name: '404',
      component: () => import('../components/404.vue'),
    },
  ],
  mode: 'history',
});
