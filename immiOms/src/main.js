// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'  //引入vue库
import App from './App'  //引入App.vue组件
import router from './router/index.js'  //引入router.js
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import 'bulma/css/bulma.css'
import './assets/style/index.css';
import {Tools} from '@/assets/js/common'

Vue.use(iView);

Vue.config.productionTip = false

Vue.prototype.$Message.config({
  top: 100,
  duration: 3
});

router.beforeEach((to, from, next) => {
  document.documentElement.scrollTop = document.body.scrollTop = 0;
  let token = Tools.CookieHelper.getToken();
  //console.log('main each router',to,from,token)
  if (to.path === '/login' && token && token !== 'null' && token !== 'undefined') {
      next({path: '/'})
  } else if ((!token || token === 'null' || token === 'undefined') && to.path !== '/login') {
      next({path: '/login'})
  } else {
      next()
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
