import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		systemInfo: {},
		codeList: {},
		cookie: uni.getStorageSync('cookie') || '',
		userData: JSON.parse(uni.getStorageSync('userData') || '{}'),
	},
	mutations: {
		// 更新设备信息
		updateSystemInfo(state, val) {
			state.systemInfo = val
		},
		updateCodeList(state, val) {
			state.codeList = val
		},
		updateCookie(state, val) {
			state.cookie = val
			this.commit('saveStorageCookie')
		},
		saveStorageCookie(state) {
			uni.setStorageSync('cookie', state.cookie)
		},
		updateUserData(state, val) {
			state.userData = val
			this.commit('saveStorageUserData')
		},
		saveStorageUserData(state) {
			uni.setStorageSync('userData', JSON.stringify(state.userData))
		}
	},
	actions: {},
	getters: {},
	modules: {}
})
