import config from './config.js'

function $http(url, data = {}, method = 'GET') {
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
			}
		})
	})
}
$http.get = (url, data = {}) => {
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
			}
		})
	})
}
$http.post = (url, data = {}) => {
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
			}
		})
	})
}

export default $http
