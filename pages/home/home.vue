<template>
	<view class="home_container">
		<!-- 自定义navbar -->
		<navigationBar></navigationBar>

		<scroll-view
			v-if="show"
			scroll-y
			:style="{
				height: systemInfo.windowHeight - navigatorBarAndStatusBarHeight + 'px'
			}"
		>
			<!-- 用户信息 -->
			<view class="userinfo_box">
				<view class="user">
					<view class="avatar" v-if="cookie">
						<image :src="userData.profile.avatarUrl"></image>
						<text>{{ userData.profile.nickname }}</text>
					</view>
					<view class="avatar" v-else>
						<uni-icons type="contact-filled" size="46"></uni-icons>
						<text>未登录</text>
					</view>
				</view>
				<view class="btn" @click="cookie ? logout() : toggle('center')">
					{{ cookie ? '退出登录' : '立即登录' }}
				</view>
			</view>
			<uni-popup ref="popup" type="bottom" @change="popupChange">
				<Login :showPopup="showPopup" @loginChange="closePopup()"></Login>
			</uni-popup>
			<!-- 搜索 -->
			<view class="search_box">
				<uni-icons type="search" size="28"></uni-icons>
				<view class="horizontal">搜索歌曲</view>
			</view>
			<!-- 轮播图 -->
			<swiper
				class="banner"
				indicator-dots
				indicator-active-color="#fff"
				autoplay
				circular
				v-if="bannerList.length"
			>
				<swiper-item v-for="(item, index) in bannerList" :key="index">
					<image :src="item.pic"></image>
					<view class="title" :style="{ background: item.titleColor }">
						{{ item.typeTitle }}
					</view>
				</swiper-item>
			</swiper>
			<!-- 歌单列表 -->
			<view class="toplist_box" v-if="cookie">
				<view
					class="toplist_item"
					v-for="item in topList"
					:key="item.id"
					@click="goToPlayList(item.id)"
				>
					<view class="img">
						<image :src="item.coverImgUrl"></image>
						<view class="more">{{ item.updateFrequency }}</view>
					</view>
					<view class="songlist">
						<view
							v-for="(val, index) in item.tracks && item.tracks.slice(0, 3)"
							:key="val.id"
						>
							<text>{{ `${index + 1}. ${val.name}` + ' - ' }}</text>
							<text v-for="(ar, i) in val.ar" :key="ar.id">
								{{ ar.name + (i !== val.ar.length - 1 ? '/' : '') }}
							</text>
						</view>
					</view>
				</view>
			</view>
			<view class="login_text" v-if="!cookie">
				<uni-section title="基础卡片" type="line">
					<uni-card :is-shadow="false">
						<view style="text-align: center;">登陆后可获取更多内容</view>
					</uni-card>
				</uni-section>
			</view>
		</scroll-view>
		<home-skeleton v-if="!show"></home-skeleton>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import {
	getBannerApi,
	getTopApi,
	getPlayListDetailApi,
	logoutApi
} from '@/api/index.js'
export default {
	computed: {
		...mapState(['systemInfo', 'userData', 'cookie']),
		show() {
			if (this.cookie) {
				if (this.bannerList.length && this.topList.length) {
					return true
				} else {
					return false
				}
			} else {
				if (this.bannerList.length) {
					return true
				} else {
					return false
				}
			}
		}
	},
	watch: {
		cookie: {
			immediate: true,
			handler(val) {
				if (this.topList.length > 0) return
				if (val) this.getTopList()
			}
		}
	},
	data() {
		return {
			// 轮播图列表
			bannerList: [],
			// 歌单列表
			topList: [],
			type: 'center',
			showPopup: false,
			navigatorBarAndStatusBarHeight:
				uni.getStorageSync('navigationBarHeight') +
				uni.getStorageSync('statusBarHeight')
		}
	},
	onLoad() {
		this.getBannerList()
	},
	methods: {
		...mapMutations(['updateCookie', 'updateUserData']),
		async getBannerList() {
			let type = 1
			if (this.systemInfo.platform === 'iPhone') {
				if (this.systemInfo.includes('iPhone')) {
					type = 2
				} else {
					type = 3
				}
			}
			const { data: result } = await getBannerApi(type)
			if (result.code !== 200) return uni.$showMsg('加载失败！')
			this.bannerList = result.banners
		},
		async getTopList() {
			const { data: result } = await getTopApi()
			if (result.code !== 200) return uni.$showMsg('加载失败！')
			const step = result.list.slice(0, 4)
			for (let i = 0; i < step.length; i++) {
				const { data: res } = await getPlayListDetailApi(step[i].id)
				if (res.code === 200) step[i].tracks = res.playlist.tracks
			}
			this.topList = step
		},
		toggle(type) {
			this.type = type
			// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
			this.$refs.popup.open(type)
		},
		popupChange(e) {
			this.showPopup = e.show
		},
		// 退出登录
		async logout() {
			const { data: result } = await logoutApi()
			if (result.code === 200) {
				this.updateCookie('')
				this.updateUserData({})
			}
		},
		closePopup() {
			this.$refs.popup.close()
		},
		// 跳转到歌单详情页面
		goToPlayList(id) {
			uni.navigateTo({
				url: `/pages/playlist/playlist?id=${id}`
			})
		}
	}
}
</script>

<style lang="scss">
.home_container {
	padding: 0 20rpx;
	.userinfo_box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 90rpx;
		.user {
			.avatar {
				display: flex;
				align-items: center;
				color: #999999;
				.uni-icons {
					color: #999999 !important;
					font-size: 92rpx !important;
				}
				image {
					width: 92rpx;
					height: 92rpx;
					border-radius: 50%;
				}
			}
		}
		.btn {
			padding: 0 20rpx;
			border: #999999 solid 1px;
			line-height: 52rpx;
			border-radius: 52rpx;
		}
	}
	.search_box {
		display: flex;
		align-items: center;
		height: 80rpx;
		background-color: #f7f7f7;
		margin-top: 20rpx;
		border-radius: 50rpx;
		.uni-icons {
			margin-left: 20rpx;
			margin-right: 20rpx;
			line-height: 80rpx;
			color: #999999 !important;
		}
		.horizontal {
			color: #999999;
			font-size: 32rpx;
			smargin-left: 20rpx;
		}
	}

	.banner {
		margin-top: 20rpx;
		border-radius: 16rpx;
		overflow: hidden;
		height: 300rpx;
		swiper-item {
			position: relative;
			image {
				width: 100%;
				height: 100%;
			}
			.title {
				content: '';
				position: absolute;
				bottom: 0;
				right: 0;
				padding: 0 16rpx;
				line-height: 48rpx;
				font-size: 20rpx;
				color: #fff;
				border-top-left-radius: 16rpx;
			}
		}
	}
	.toplist_box {
		display: flex;
		flex-wrap: wrap;
		padding-bottom: 40rpx;
		.toplist_item {
			margin-top: 20rpx;
			display: flex;
			overflow: hidden;
			.img {
				position: relative;
				width: 220rpx;
				height: 220rpx;
				image {
					width: 100%;
					height: 100%;
					border-radius: 16rpx;
				}
				.more {
					position: absolute;
					bottom: 10rpx;
					left: 10rpx;
					font-size: 24rpx;
					color: #fff;
				}
			}
			.songlist {
				flex: 1;
				min-width: 0;
				display: flex;
				flex-direction: column;
				justify-content: space-evenly;
				margin: 0 10px;
				color: #666666;
				font-size: 30rpx;
				view {
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}
	}
}
</style>
