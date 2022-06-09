import App from '@/App.vue'
import store from '@/store/index.js'

// #ifndef VUE3
import Vue from 'vue'

Vue.config.productionTip = false
App.mpType = 'app'

uni.$showMsg = function(title, duration, icon) {
	uni.showToast({
		title: title || '数据加载失败！',
		duration: duration || 1500,
		icon: icon || 'none'
	})
}

Vue.filter('number_ch', (val) => {
	let str = val + ''
	const units = ['万',
		'亿'
	]
	if (str.length === 5) {
		return str.slice(0, 1) + units[0]
	} else if (str.length === 6) {
		return str.slice(0, 2) + units[0]
	} else if (str.length === 7) {
		return str.slice(0, 3) + units[0]
	} else if (str.length === 8) {
		return str.slice(0, 4) + units[0]
	} else if (str.length === 9) {
		return str.slice(0, 1) + units[1]
	} else if (str.length === 10) {
		return str.slice(0, 2) + units[1]
	} else if (str.length === 11) {
		return str.slice(0, 3) + units[1]
	} else if (str.length === 12) {
		return str.slice(0, 4) + units[1]
	}
	return num
})

const app = new Vue({
	...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'

export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
