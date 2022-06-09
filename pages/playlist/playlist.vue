<template>
	<view>
		<navigationBar
			menuBackground="#00000030"
			lineColor="#fff"
			color="#fff"
			titleColor="#fff"
			:background="background"
			statusShadow
			title="歌单"
		></navigationBar>
		<scroll-view
			v-if="JSON.stringify(this.detail) !== '{}'"
			scroll-y
			:style="{
				height: systemInfo.windowHeight - navigatorBarAndStatusBarHeight + 'px'
			}"
		>
			<view class="playlist_box">
				<view
					class="bg"
					:style="{
						background: `${background} center -${navigatorBarAndStatusBarHeight}px`
					}"
				></view>
				<view class="playlist_info">
					<view class="cover_img">
						<image :src="detail.playlist.coverImgUrl"></image>
						<view class="play_count">
							<uni-icons
								color="#fff"
								custom-prefix="icomoon"
								type="icon-play2"
								size="32rpx"
							></uni-icons>
							{{ detail.playlist.playCount | number_ch }}
						</view>
					</view>
					<view class="info">
						<view class="name">{{ detail.playlist.name }}</view>
						<view class="author">
							<image :src="detail.playlist.creator.avatarUrl"></image>
							<text>{{ detail.playlist.creator.nickname }}</text>
						</view>
						<view class="desc" @click="gotoDesc">
							<text>
								{{
									detail.playlist.description.length > 25
										? detail.playlist.description.substr(0, 25) + '...'
										: detail.playlist.description
								}}
							</text>
							<uni-icons type="right" size="24rpx" color="#e0e0e0"></uni-icons>
						</view>
					</view>
				</view>
				<button class="share" open-type="share">
					<uni-icons type="redo" size="40rpx" color="#fff"></uni-icons>
					<text>分享</text>
				</button>
			</view>
			<view class="songlist">
				<view class="playAll" @click="addSonglist(detail.playlist.tracks)">
					<uni-icons
						customPrefix="icomoon"
						size="45rpx"
						type="icon-play2"
					></uni-icons>
					播放全部
					<text>(共{{ detail.playlist.tracks.length }}首歌)</text>
				</view>
				<view
					class="song_item"
					v-for="(item, index) in detail.playlist.tracks"
					:key="item.id"
					@click="addPlay(item)"
				>
					<view class="song_index">{{ index + 1 }}</view>
					<view class="song_name">
						<view class="name">{{ item.name }}</view>
						<view class="author">
							<image
								v-if="item.sq"
								src="../../static/images/sq.png"
								class="sq"
							></image>
							<text>
								<text v-for="(val, i) in item.ar" :key="val.id">
									{{ val.name + (i === item.ar.length - 1 ? '' : '/') }}
								</text>
								{{ ' - ' + item.al.name }}
							</text>
						</view>
					</view>
					<view class="song_play">
						<uni-icons
							customPrefix="icomoon"
							size="56rpx"
							type="icon-play2"
							color="#ccc"
						></uni-icons>
					</view>
				</view>
			</view>
		</scroll-view>
		<playlist-skeleton v-else></playlist-skeleton>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getPlayListDetailApi } from '@/api/index.js'
export default {
	data() {
		return {
			query: {},
			detail: {},
			navigatorBarAndStatusBarHeight:
				uni.getStorageSync('navigationBarHeight') +
				uni.getStorageSync('statusBarHeight')
		}
	},
	onLoad(options) {
		this.query = options
		this.getDetail()
	},
	methods: {
		...mapMutations(['updateSonglist', 'updateCurrentPlay']),
		async getDetail() {
			const { data: result } = await getPlayListDetailApi(this.query.id)
			if (result.code !== 200) return uni.$showMsg('加载失败！')
			this.detail = result
		},
		gotoDesc() {
			uni.navigateTo({
				url: '/pages/playlist-desc/playlist-desc',
				success: res => {
					res.eventChannel.emit('options', {
						background: this.background,
						detail: this.detail
					})
				}
			})
		},
		// 将歌曲添加到播放列表中
		addSonglist(list) {
			this.updateSonglist(list)
			uni.navigateTo({
				url: '/pages/song/song?id=' + list[0].id
			})
		},
		// 将歌曲添加到播放器中
		addPlay(song) {
			uni.navigateTo({
				url: '/pages/song/song?id=' + song.id
			})
		}
	},
	computed: {
		...mapState(['systemInfo', 'songlist', 'currentPlay']),
		background() {
			if (JSON.stringify(this.detail) === '{}') return
			return `url('${this.detail.playlist.coverImgUrl +
				'?imageView&blur=40x20'}')`
		}
	}
}
</script>

<style lang="scss">
.playlist_box {
	position: relative;
	padding-top: 50rpx;
	padding-left: 40rpx;
	overflow: hidden;
	.bg {
		position: absolute;
		top: -20rpx;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.playlist_info {
		position: relative;
		z-index: 10;
		display: flex;
		.cover_img {
			position: relative;
			width: 300rpx;
			height: 300rpx;
			border-radius: 16rpx;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
			}
			.play_count {
				position: absolute;
				top: 5rpx;
				right: 5rpx;
				color: #fff;
			}
		}
		.info {
			flex: 1;
			padding: 0 40rpx;
			.name {
				font-size: 40rpx;
				color: #fff;
			}
			.author {
				margin: 20rpx 0;
				image {
					width: 60rpx;
					height: 60rpx;
					border-radius: 50%;
					vertical-align: middle;
					margin-right: 10rpx;
				}
				text {
					color: #fff;
				}
			}
			.desc {
				font-size: 24rpx;
				color: #e0e0e0;
			}
		}
	}
	.share {
		width: 360rpx;
		height: 80rpx;
		margin: 50rpx auto;
		margin-bottom: 100rpx;
		background-color: rgba(255, 255, 255, 0.2);
		border-radius: 50rpx;
		line-height: 80rpx;
		color: #fff;
		font-size: 32rpx;
	}
}
.songlist {
	position: relative;
	top: -50rpx;
	background-color: #fff;
	z-index: 11;
	border-top-left-radius: 50rpx;
	border-top-right-radius: 50rpx;
	min-height: 300px;
	padding: 0 30rpx;
	.playAll {
		font-size: 36rpx;
		display: flex;
		align-items: center;
		height: 116rpx;
		uni-icons {
			display: flex;
			align-items: center;
			margin-right: 30rpx;
		}
		text {
			font-size: 28rpx;
			margin-left: 5rpx;
			color: #b2b2b2;
		}
	}
	.song_item {
		display: flex;
		align-items: center;
		margin: 34rpx 0;
		.song_index {
			width: 44rpx;
			height: 44rpx;
			text-align: center;
			color: #999;
			margin-right: 30rpx;
		}
		.song_name {
			flex: 1;
			overflow: hidden;
			.name {
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				font-size: 36rpx;
			}
			.author {
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				.sq {
					width: 34rpx;
					height: 24rpx;
					vertical-align: middle;
					margin-right: 5rpx;
				}
				text {
					font-size: 24rpx;
					color: #999;
				}
			}
		}
		.song_play {
			margin-left: 20rpx;
		}
	}
}
</style>
