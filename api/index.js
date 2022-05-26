import request from '@/request/request.js'
import store from '@/store/index.js'

// 获取轮播图列表
export const getBannerApi = (type) => {
	type = type ? type : 1
	return request.get('/banner', {
		type
	})
}
// 获取排行榜列表
export const getTopApi = () => {
	return request.get('/toplist')
}
// 获取歌单详情
export const getPlayListDetailApi = (id, s) => {
	const cookie = encodeURIComponent(store.state.cookie)
	s = s ? s : 8
	return request.get('/playlist/detail', {
		id,
		s,
		cookie
	})
}
// 获取国家编码列表
export const getCodeList = () => {
	return request.get('/countries/code/list')
}
// 登录
export const loginApi = (phone, password, countrycode) => {
	const timestamp = new Date().getTime()
	return request.post('/login/cellphone', {
		phone,
		password,
		countrycode,
		timestamp
	})
}

// 登录状态
export const loginStatusApi = () => {
	const timestamp = new Date().getTime()
	const cookie = encodeURIComponent(store.state.cookie)
	return request.get('/login/status', {
		cookie,
		timestamp
	})
}

// 退出登录
export const logoutApi = () => {
	const timestamp = new Date().getTime()
	const cookie = encodeURIComponent(store.state.cookie)
	return request.get('/logout', {
		cookie,
		timestamp
	})
}
