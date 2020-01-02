import { fetch, post, patch, del } from '../http'



// 获取工单列表
export function getWorkList (params) {
	return fetch('api/0.1/appWorkOrder/list', params)
}

// 添加工单
export function addWork (params) {
	return post('api/0.1/appWorkOrder/add', params)
}

// 获取任务列表
export function getTaskList (params) {
	return fetch('api/0.1/appParkServiceTask/list', params)
}

// 修改任务
export function editTask (params) {
	return patch('api/0.1/appParkServiceTask/update', params)
}
















