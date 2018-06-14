import Vue from 'vue' //加载项目依赖模块vue
import Router from 'vue-router'   //引入路由插件vue-router
import Cookies from 'js-cookie' //引入js-cookie插件库
import {LoadingBar} from 'iview' //引入iview插件库

import Master from '@/views/Master' //引入组件
import Login from '@/views/Login' 
import University from '@/views/university/University'
import AddUniversity from '@/views/university/AddUniversity'
import User from '@/views/user/User'
import Order from '@/views/order/Order'

Vue.use(Router)  //显式声明要使用路由插件


//注册路由器 开始配置路由
export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {
          title: '登录'
      },
      component: () => import('@/views/Login')

    },
    {
      path: '/',
      component: Master,
      children: [
        {
          path: '/',
          component: {template: '<div>欢迎进入DIYimmigrant 订单管理系统！</div>'}
        },
        {
          path: '/user',
          name: '用户管理',
          icon: 'truck',
          visible: true,
          component: {template: '<router-view></router-view>'},
          children: [
            {
              path: '/user/manage',
              name: '用户列表',
              component: User
            },
          ]
        },
        {
          path: '/university',
          name: '高校管理',
          icon: 'shopping-bag',
          visible: true,
          component: {template: '<router-view></router-view>'},
          children: [
            {
              path: '/university/manage',
              name: '高校列表',
              component: University
            },
            {
              path: '/university/add',
              name: '新建高校',
              component: AddUniversity
            },
          ]
        },
        {
          path: '/order',
          name: '订单管理',
          icon: 'folder',
          visible: true,
          component: {template: '<router-view></router-view>'},
          children: [
            {
              path: '/order/manage',
              name: '订单列表',
              component: Order
            },
          ]
        },
        //用于暂时看看的登录页
        /*{
          path: '/testlogin',
          name: '登录',
          icon: 'folder',
          visible: true,
          component: {template: '<router-view></router-view>'},
          children: [
            {
              path: '/testlogin/log',
              name: '登录页',
              component: Login
            },
          ]
        },*/       
      ]
    } 
  ]
})
