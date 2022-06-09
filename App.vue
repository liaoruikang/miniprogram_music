<script>
import { mapMutations } from 'vuex'
import { getCodeList } from '@/api/index.js'
export default {
	onLaunch: async function() {
		// 获取设备信息
		const [err, succ] = await uni.getSystemInfo()
		if (err) return
		// 获取navbar信息
		const { top, height, right } = uni.getMenuButtonBoundingClientRect()
		const statusBarHeight = succ.statusBarHeight
		uni.setStorageSync('statusBarHeight', statusBarHeight)
		uni.setStorageSync('menuButtonHeight', height ? height : 32)
		if (top && top !== 0 && height && height !== 0) {
			const navigationBarHeight = (top - statusBarHeight) * 2 + height
			uni.setStorageSync('navLeft', right ? succ.windowWidth - right : 8)
			uni.setStorageSync('navigationBarHeight', navigationBarHeight)
		} else {
			uni.setStorageSync(
				'navigationBarHeight',
				succ.platfrom === 'android' ? 48 : 40
			)
		}

		// 获取国家编码
		this.updateSystemInfo(succ)
		const { data: codeResult } = await getCodeList()
		if (codeResult.code === 200) {
			this.updateCodeList(codeResult.data)
		}
	},
	onShow: function() {
		console.log('App Show')
	},
	onHide: function() {
		console.log('App Hide')
	},
	methods: {
		...mapMutations(['updateSystemInfo', 'updateCodeList'])
	}
}
</script>

<style lang="scss">
@import '@/static/font/icomoon.css';
page {
	font-size: 28rpx;
	color: #333;
}
.horizontal {
	vertical-align: middle !important;
}
.omit {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>
