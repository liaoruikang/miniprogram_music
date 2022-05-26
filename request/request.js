import config from './config.js'

let flag = false

function $http(url, data = {}, method = 'GET') {
	uni.showLoading({
		title: '加载中...'
	})
	return new Promise((resolve, reject) => {
		uni.request({
			url: config.baseURL + url,
			data,
			method,
			timeout: 10000,
			success: (result) => {
				resolve(result)
			},
			fail: (err) => {
				reject(err)
			},
			complete: () => {
				uni.hideLoading()
			}
		})
	})
}
$http.get = (url, data = {}) => {
	uni.showLoading({
		title: '加载中...'
	})
	return new Promise((resolve, reject) => {
		uni.request({
			url: config.baseURL + url,
			data,
			method: 'GET',
			timeout: 10000,
			success: (result) => {
				resolve(result)
			},
			fail: (err) => {
				reject(err)
			},
			complete: () => {
				uni.hideLoading()
			}
		})
	})
}
$http.post = (url, data = {}) => {
	uni.showLoading({
		title: '加载中...'
	})
	return new Promise((resolve, reject) => {
		uni.request({
			url: config.baseURL + url,
			data,
			method: 'post',
			timeout: 10000,
			success: (result) => {
				resolve(result)
			},
			fail: (err) => {
				reject(err)
			},
			complete: () => {
				uni.hideLoading()
			}
		})
	})
}

export default $http
