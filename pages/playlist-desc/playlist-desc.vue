<template>
	<view>
		<navigationBar
			menuBackground="#00000030"
			menuBorderColor="#C49AAC"
			lineColor="#fff"
			color="#fff"
			titleColor="#fff"
			:background="background"
			x
			statusShadow
			title="歌单"
		></navigationBar>
		<view>
			<view
				class="desc_box"
				:style="{
					height:
						systemInfo.windowHeight - navigatorBarAndStatusBarHeight + 'px'
				}"
			>
				<view
					class="bg"
					:style="{
						backgroundImage: background,
						backgroundPosition: ` center -${navigatorBarAndStatusBarHeight}px`,
						backgroundSize: '260%'
					}"
				></view>
				<view class="desc_centent">
					<view class="desc_cover">
						<image class="cover_img" :src="detail.playlist.coverImgUrl"></image>
						<view class="title">{{ detail.playlist.name }}</view>
					</view>
					<view class="line"></view>
					<view class="text">
						<view class="tags">标签：无</view>
						<view class="introduce">{{ detail.playlist.description }}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex'
export default {
	computed: {
		...mapState(['systemInfo'])
	},
	data() {
		return {
			background: '',
			detail: {},
			navigatorBarAndStatusBarHeight:
				uni.getStorageSync('navigationBarHeight') +
				uni.getStorageSync('statusBarHeight')
		}
	},
	onLoad() {
		const eventChannel = this.getOpenerEventChannel()
		// 监听 index页面定义的 toB 事件
		eventChannel.on('options', res => {
			this.background = res.background
			this.detail = res.detail
		})
	}
}
</script>

<style lang="scss">
.desc_box {
	position: relative;
	overflow: hidden;
	background-repeat: no-repeat;
	.bg {
		position: absolute;
		width: 100%;
		height: 100%;
		background-repeat: no-repeat;
		z-index: 1;
	}
	.desc_centent {
		position: relative;
		z-index: 2;
		.desc_cover {
			margin-top: 40rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			.cover_img {
				width: 460rpx;
				height: 460rpx;
				border-radius: 16rpx;
			}
			.title {
				font-size: 34rpx;
				color: #fff;
				margin: 60rpx 0;
			}
		}
		.line {
			height: 1rpx;
			background-image: linear-gradient(
				to right,
				transparent,
				#ccc,
				transparent
			);
		}
		.text {
			padding: 0 40rpx;
			.tags,
			.introduce {
				margin-top: 44rpx;
				font-size: 24rpx;
				color: #fff;
			}
		}
	}
}
</style>
