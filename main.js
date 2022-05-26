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
