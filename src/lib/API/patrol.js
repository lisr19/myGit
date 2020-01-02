import { fetch, post, patch, del } from '../http'



// 在线巡检列表
export function getPatrolList (params) {
	return fetch('api/0.1/inspectionHistory/list', params)
}

// 编辑
export function editPatrol (params) {
	return patch('api/0.1/inspectionHistory/update', params)
}



















