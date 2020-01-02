import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import echarts from 'echarts'
import iView from 'iview'
import "./exit";//监听返回
import * as socketApi from '../src/lib/socket'
import './common/less/reset.less'
import './plugins/vant.js'
import 'iview/dist/styles/iview.css'
import './flexible.js'


Vue.use(echarts)
Vue.use(iView)

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.prototype.socketApi = socketApi

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
	const token = localStorage.getItem('token')
	if (!token && to.path !== '/login') {
		next({
			path: '/login' // 跳转到登录页
		})
	} else if (!token && to.path === '/login') {
		// 未登陆且要跳转的页面是登录页
		next() // 跳转
	} else if (token && to.path === '/login') {
		// 已登录且要跳转的页面是登录页
		next({
			path: '/'
		})
	} else {
		next() // 跳转
	}
})
export default router