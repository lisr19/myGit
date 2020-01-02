import { fetch, post, patch, del } from '../http'

// 上传图片
export function uploadImg (params) {
    return post('api/0.1/upload/img', params)
}
// 登录
export function userLogin (params) {
	return post('api/0.1/user/login', params)
}

// 用户信息
export function getUserDate (params) {
	return fetch('api/0.1/user/list', params)
}

// 修改用户信息
export function userUptate (params) {
	return patch('api/0.1/user/update', params)
}

// 消息
export function getMsgList (params) {
	return fetch('api/0.1/pushMessage/list', params)
}
// 培训文档列表（知识库列表）（已审核且已上架）
export function getLibraryList (params) {
	return fetch('api/0.1/knowledgeBase/listIsShowAndIsReview', params)
}

// 发送验证码
export function sendCode (params) {
	return post('api/0.1/SMS/sendCode', params)
}

//验证码
export function checkCode (params) {
	return post('api/0.1/SMS/checkCode', params)
}

//修改密码
export function resetPassword (params) {
	return fetch('api/0.1/user/resetPassword', params)
}
//企业列表
export function getEnterpriseList (params) {
	return fetch('api/0.1/enterprise/list', params)
}




















