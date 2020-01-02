import { fetch, post, patch, del } from '../http'

// 摄像头
export function getCameraList (params) {
	return fetch('api/0.1/camera/list', params)
}
// 修改摄像头
export function updateCamera (params) {
	return patch('api/0.1/camera/update', params)
}

// 资源审核生产许可证
export function getProdList (params) {
	return fetch('api/0.1/safetyProductionPermit/list', params)
}
// 应急物资
export function getSuppList (params) {
	return fetch('api/0.1/emergencySupplies/list', params)
}
// 应急人员
export function getPersonList (params) {
	return fetch('api/0.1/emergencyPersonnel/list', params)
}
// 应急场所
export function getPlaceList (params) {
	return fetch('api/0.1/emergencyPlace/list', params)
}
// 修改资源审核生产许可证
export function editProd (params) {
	return patch('api/0.1/safetyProductionPermit/update', params)
}

// 修改应急物资
export function editSupp (params) {
	return patch('api/0.1/emergencySupplies/update', params)
}
// 修改应急人员
export function editPerson (params) {
	return patch('api/0.1/emergencyPersonnel/update', params)
}

// 修改应急场所
export function editPlace (params) {
	return patch('api/0.1/emergencyPlace/update', params)
}












