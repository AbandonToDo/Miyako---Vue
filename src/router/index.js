import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
      hidden: true,
      component: () => import('../components/Login.vue')
    },

    {
      path: '/login',
      name: 'Login',
      hidden: true,
      component: () => import('../components/Login.vue')
    },
    {
      path: '/home',
      name: '学生管理',
      iconCls: 'fa fa-users',
      redirect: '/home/student',
      component: () => import('../components/Home.vue'), //路由懒加载
      children: [
        {
          path: '/home/student',
          name: '学生列表',
          iconCls: ' fa fa-list',
          component: () => import('../components/students/StudentList.vue')
        },
        {
          path: '/home/info',
          name: '信息列表',
          iconCls: ' fa fa-list-alt',
          component: () => import('../components/students/InfoList.vue')
        },
        {
          path: '/home/infos',
          name: '信息管理',
          iconCls: ' fa fa-list-alt',
          component: () => import('../components/students/InfoLists.vue')
        },
        {
          path: '/home/work',
          name: '作业列表',
          iconCls: ' fa fa-th-list',
          component: () => import('../components/students/WorkList.vue')
        },
        {
          path: '/home/works',
          name: '作业管理',
          iconCls: ' fa fa-th-list',
          component: () => import('../components/students/WorkMent.vue')
        }
      ]
    },
    {
      path: '/home',
      name: '数据分析',
      iconCls: 'fa fa-bar-chart',
      component: () => import('../components/Home.vue'), //路由懒加载
      children: [
        {
          path: '/home/dataview',
          name: '数据概览',
          iconCls: ' fa fa-line-chart',
          component: () => import('../components/dataAnalysis/DataView.vue')
        },
        {
          path: '/home/mapview',
          name: '地图概览',
          iconCls: ' fa fa-line-chart',
          component: () => import('../components/dataAnalysis/MapView.vue')
        },
        {
          path: '/home/infos',
          name: '地图管理',
          iconCls: ' fa fa-line-chart',
          component: () => import('../components/dataAnalysis/TravelMap.vue')
        },
        {
          path: '/home/work',
          name: '分数地图',
          iconCls: ' fa fa-line-chart',
          component: () => import('../components/dataAnalysis/ScoreMap.vue')
        }
      ]
    },
    {
      path: '/home',
      name: '用户中心',
      iconCls: 'fa fa-user',
      component: () => import('../components/Home.vue'), //路由懒加载
      children: [
        {
          path: '/home/user',
          name: '权限管理',
          iconCls: ' fa fa-user',
          component: () => import('../components/users/User.vue')
        }
      ]
    },
    //404
    {
      path: '*',
      hidden: true,
      name: '404',
      component: () => import('../components/404.vue')
    }
  ],
  mode: 'history'
})
