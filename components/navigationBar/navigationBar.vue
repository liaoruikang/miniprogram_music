<template>
	<view class="navbar_container">
		<view
			class="navbar_box"
			:style="{ background: background + ' center 0', backgroundSize }"
		>
			<view class="bg">
				<view
					class="statusBarBg"
					:style="{
						height: statusBarHeight + 'px',
						backgroundImage: statusShadow
							? 'linear-gradient(#ffffff70,#ffffff30,transparent)'
							: ''
					}"
				></view>
				<view
					class="mask"
					v-if="mask"
					:style="{
						backgroundColor: mask,
						backdropFilter,
						height: systemInfo.windowHeight + 'px'
					}"
				></view>
			</view>
			<view
				class="statusBar"
				:style="{
					height: statusBarHeight + 'px'
				}"
			></view>
			<view class="navigatorBar" :style="{ height: navigatorBarHieght + 'px' }">
				<view
					class="nav"
					:style="{
						height: menuButtonHeight - 2 + 'px',
						left: navLeft + 'px',
						background: menuBackground,
						borderColor: menuBorderColor
					}"
					v-if="currentPage !== 'pages/home/home'"
				>
					<view class="back" v-if="isBack" @click="gotoBack">
						<uni-icons :color="color" size="16" type="back"></uni-icons>
					</view>
					<view
						class="line"
						v-if="isBack"
						:style="{ backgroundColor: lineColor }"
					></view>
					<view class="home" @click="gotoHome">
						<uni-icons :color="color" size="16" type="home"></uni-icons>
					</view>
				</view>
				<view
					class="title"
					:style="{
						lineHeight: navigatorBarHieght + 'px',
						color: titleColor,
						fontSize: titleSize,
						fontWeight: titleWeight
					}"
				>
					{{ title }}
				</view>
			</view>
		</view>
		<view
			class="placeholder_container"
			:style="{ height: navigatorBarAndStatusBarHeight + 'px' }"
		></view>
	</view>
</template>

<script>
import { mapState } from 'vuex'
export default {
	name: 'navigationBar',
	props: {
		title: {
			type: String,
			default: '云音乐'
		},
		background: {
			type: String,
			default: '#fff'
		},
		backgroundSize: {
			type: String,
			default: 'auto'
		},
		backdropFilter: {
			type: String,
			default: 'blur(0px)'
		},
		titleSize: {
			type: String,
			default: '16px'
		},
		titleWeight: {
			type: String,
			default: '700'
		},
		titleColor: {
			type: String,
			default: '#000'
		},
		menuBackground: {
			type: String,
			default: '#ffffff'
		},
		menuBorderColor: {
			type: String,
			default: '#c6c6c6'
		},
		lineColor: {
			type: String,
			default: '#c6c6c6'
		},
		color: {
			type: String,
			default: '#000'
		},
		statusShadow: {
			type: Boolean,
			default: false
		},
		mask: {
			type: String,
			default: ''
		}
	},
	computed: {
		...mapState(['systemInfo'])
	},
	data() {
		return {
			navigatorBarHieght: uni.getStorageSync('navigationBarHeight'),
			statusBarHeight: uni.getStorageSync('statusBarHeight'),
			menuButtonHeight: uni.getStorageSync('menuButtonHeight'),
			navigatorBarAndStatusBarHeight:
				uni.getStorageSync('navigationBarHeight') +
				uni.getStorageSync('statusBarHeight'),
			navLeft: uni.getStorageSync('navLeft'),
			currentPage: '',
			isBack: true
		}
	},
	methods: {
		gotoBack() {
			uni.navigateBack({
				delta: 1
			})
		},
		gotoHome() {
			uni.reLaunch({
				url: '/pages/home/home'
			})
		}
	},
	created() {
		const pages = getCurrentPages()
		if (pages.length === 1) {
			this.isBack = false
		}
		this.currentPage = pages[pages.length - 1].route
	}
}
</script>

<style lang="scss">
.navbar_box {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 999;
	width: 100%;
	.bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		.mask {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			z-index: 99;
		}
		.statusBarBg {
			position: relative;
			z-index: 100;
		}
	}
	.navigatorBar {
		z-index: 999;
		position: relative;
		.title {
			text-align: center;
		}
		.nav {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);

			display: flex;
			align-items: center;
			border: 1px solid #c6c6c6;
			border-radius: 28px;
			.back,
			.home {
				padding: 0 10px;
				uni-icons {
					display: flex;
					align-items: center;
				}
			}
			.line {
				width: 1px;
				height: 12px;
				background-color: #c6c6c6;
			}
		}
	}
}
</style>
