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
		cookie,
		limit: 3
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

// 获取歌曲url
export const getSongUrlApi = (id, br) => {
	br = br ? br : 320000
	const cookie = encodeURIComponent(store.state.cookie)
	return request.get('/song/url', {
		id,
		br,
		cookie
	})
}

// 获取歌曲详情
export const getSongDetailApi = (ids) => {
	const cookie = encodeURIComponent(store.state.cookie)
	return request.get('/song/detail', {
		ids,
		cookie
	})
}

// 获取歌曲歌词
export const getLyricApi = (id) => {
	const cookie = encodeURIComponent(store.state.cookie)
	return request.get('/lyric', {
		id,
		cookie
	})
}

// 获取相似歌曲
export const getSimiSongApi = (id) => {
	const cookie = encodeURIComponent(store.state.cookie)
	return request.get('/simi/song', {
		id,
		cookie
	})
}

// 获取热门评论
export const getHotCommentApi = (id, type) => {
	const timestamp = new Date().getTime()
	const cookie = encodeURIComponent(store.state.cookie)
	return request.get('/comment/hot', {
		id,
		type,
		cookie,
		timestamp
	})
}

// 给评论点赞
export const commentLikeApi = (id, cid, t, type) => {
	const timestamp = new Date().getTime()
	const cookie = encodeURIComponent(store.state.cookie)
	return request.get('/comment/like', {
		id,
		cid,
		t,
		type,
		cookie,
		timestamp
	})

}
