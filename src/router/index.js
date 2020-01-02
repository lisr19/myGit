import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: '首页',
		component: home
	},
	{
		path: '/login',
		name: '登录',
		component: () => import('@/views/login/login.vue')
	},
	{
		path: '/my-data',
		name: '个人中心',
		component: () => import('@/views/my/my-data.vue')
	},
	{
		path: '/version',
		name: '版本更新',
		component: () => import('@/views/my/version.vue')
	},
	{
		path: '/save-center',
		name: '安全中心',
		meta: { keepAlive: true },
		component: () => import('@/views/safe-center/safe-center.vue')
	},
	{
		path: '/patrol-list',
		name: '在线巡检',
		component: () => import('@/views/safe-center/patrol/patrol-list.vue')
	},
	{
		path: '/patrol-input',
		name: '巡检结果填报',
		component: () => import('@/views/safe-center/patrol/patrol-input.vue')
	},
	{
		path: '/verify-list',
		name: '资源审核',
		component: () => import('@/views/safe-center/emergency/verify-list.vue')
	},
	{
		path: '/verify-detail',
		name: '审核详情',
		component: () => import('@/views/safe-center/emergency/verify-detail.vue')
	},
	{
		path: '/video-list',
		name: '视频监控',
		component: () => import('@/views/safe-center/video/video-list.vue')
	},
	{
		path: '/reporting',
		name: '数据填报',
		component: () => import('@/views/reporting/reporting.vue')
	},
	{
		path: '/data-analysis',
		name: '数据分析',
		// meta: { keepAlive: true },
		component: () => import('@/views/data-analysis/data-analysis.vue')
	},
	{
		path: '/park-service',
		name: '园区服务',
		meta: { keepAlive: true },
		component: () => import('@/views/park-service/park-service.vue')
	},
	{
		path: '/add-order',
		name: '新增工单',
		component: () => import('@/views/park-service/work-order/add-order.vue')
	},
	{
		path: '/order-detail',
		name: '工单详情',
		component: () => import('@/views/park-service/work-order/order-detail.vue')
	},
	{
		path: '/add-task',
		name: '新增任务',
		component: () => import('@/views/park-service/task/add-task.vue')
	},
	{
		path: '/task-detail',
		name: '任务详情',
		component: () => import('@/views/park-service/task/task-detail.vue')
	},
	{
		path: '/message',
		name: '消息',
		component: () => import('@/views/message/msg.vue')
	},
	{
		path: '/library',
		name: '知识库',
		component: () => import('@/views/library/library.vue')
	},
	{
		path: '/video-detail',
		name: '监控详情',
		component: () => import('@/views/safe-center/video/video-detail.vue')
	},
	{
		// 编辑器
		path: '/write',
		name: 'Write',
		meta: { keepAlive: true },
		component: (resolve) => require(['@/components/write/write.vue'], resolve),
	},
]

const router = new VueRouter({
	routes
})

export default router
