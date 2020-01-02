import { fetch, post, patch, del } from '../http'


//  获取数据填报列表
export function getEntDate (params) {
	return fetch('api/0.1/enterpriseDataReport/list', params)
}

//  获取数据填报列表
export function addReport (params) {
	return post('api/0.1/enterpriseDataReport/add', params)
}











