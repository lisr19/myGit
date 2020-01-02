import {userLogin} from "../../lib/API/comment";
export default {
	state: {
		enterpriseName:'',
		userInfo:{
		}
	},
	mutations:{
		setUserInfo(state, userInfo) {
			state.userInfo = userInfo
		},
		enterpriseName(state, enterpriseName){
			state.enterpriseName = enterpriseName
		}
	},
	getters: {},
	actions: {
		// 登录
		userLogin({commit}, params) {
			return new Promise((resolve, reject) => {
				userLogin(params).then((res) => {
					if (res.code === 200) {
						const userInfo = res.data.userInfo
						commit('setUserInfo', userInfo)
						commit('enterpriseName', userInfo.enterpriseName)
					}
					resolve(res)
				}).catch((err) => {reject(err)})
			})
		},
	}
}
