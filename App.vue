<script>
import { mapMutations } from 'vuex'
import { getCodeList } from '@/api/index.js'
export default {
	onLaunch: async function() {
		const [err, succ] = await uni.getSystemInfo()
		if (err) return
		this.updateSystemInfo(succ)
		// 获取国家编码
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
