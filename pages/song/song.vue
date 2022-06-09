<template>
	<view>
		<navigationBar
			menuBackground="#00000030"
			lineColor="#fff"
			color="#fff"
			titleColor="#fff"
			:title="currentPlay.name ? currentPlay.name : '歌曲详情'"
			:background="background"
			:mask="mask"
			backgroundSize="cover"
			backdropFilter="blur(20px)"
		></navigationBar>
		<scroll-view
			scroll-y
			class="song_box"
			:style="{
				height: systemInfo.windowHeight - navigatorBarAndStatusBarHeight + 'px',
				background:
					background + (' center ' + -navigatorBarAndStatusBarHeight + 'px'),
				backgroundSize: `cover`
			}"
		>
			<view class="main">
				<view class="pic">
					<view class="needle"></view>
					<view class="vinyl">
						<image
							:style="{ animationPlayState: rotate }"
							:src="currentPlay.al && currentPlay.al.picUrl"
							@load="imgLoad = true"
						></image>
						<view class="vinyl_img"></view>
						<uni-icons
							customPrefix="icomoon"
							:type="playIconType"
							class="play"
							size="80rpx"
							color="#fff"
							@click="isPlay ? pause() : play()"
						></uni-icons>
					</view>
				</view>
				<view class="lyric">
					<view class="lyric_centent" :style="{ top: -offsetTop + 'px' }">
						<view
							:class="['txt', active === index ? 'active' : '']"
							v-for="(item, index) in lyric"
							:key="index"
						>
							{{ item.centent }}
						</view>
					</view>
				</view>
				<button class="share" open-type="share">
					<text>分享给微信好友</text>
				</button>
				<view class="main_sum">
					<!-- 喜欢这首歌的五个用户 -->
					<simiSong :songId="id" @change="simiSongChange"></simiSong>
					<!-- 精彩评论 -->
					<comment :songId="id"></comment>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getSongDetailApi, getSongUrlApi, getLyricApi } from '@/api/index.js'
export default {
	data() {
		return {
			navigatorBarAndStatusBarHeight:
				uni.getStorageSync('navigationBarHeight') +
				uni.getStorageSync('statusBarHeight'),
			isPlay: false,
			imgLoad: false,
			audio: {},
			src: '',
			lrc: '',
			offsetTop: 0,
			active: 0,
			id: '',
			isInit: false
		}
	},
	computed: {
		...mapState(['systemInfo', 'currentPlay', 'songlist']),
		background() {
			if (JSON.stringify(this.currentPlay) === '{}') return ''
			return `url('${this.currentPlay.al.picUrl}?param=320y720')`
		},
		mask() {
			if (!this.src || !this.imgLoad) return `#0B0C12`
			return `#00000070`
		},
		rotate() {
			if (!this.isPlay) return 'paused'
			return 'running'
		},
		singer() {
			if (JSON.stringify(this.currentPlay) === '{}') return '无'
			let ar = ''
			this.currentPlay.ar.forEach(item => {
				ar += item.name + '/'
			})
			ar = ar.substr(0, ar.length - 1)
			return ar
		},
		playIconType() {
			if (!this.isPlay) return 'icon-play'
			return 'icon-pause'
		},
		lyric() {
			if (!this.lrc) return []
			let arr = this.lrc.split(/\n/)
			arr.forEach((item, index) => {
				// 处理时间
				let time = item.match(/\[[\S]+\]/g)
				time = time
					? time[0].substr(1, time[0].length - 2).split(':')
					: [1000, 1000]
				const m = Number(time[0]) * 60
				const s = Number(time[1])
				time = m + s
				// 处理歌词
				let centent = item.split(/\]/)[1]
				if (typeof centent === 'string') {
					centent = centent.trim()
				}
				if (time === 61000) {
					arr.splice(index, 1)
				} else {
					arr[index] = {
						time,
						centent
					}
				}
			})
			arr = arr.filter(item => item.centent)
			arr.push({
				time: arr[arr.length - 1].time + 3,
				centent: ''
			})
			return arr
		}
	},
	methods: {
		...mapMutations(['updateCurrentPlay']),
		// 获取歌曲详情
		async getSongDetail(id) {
			const { data: result } = await getSongDetailApi(id)
			if (result.code !== 200) return uni.$showMsg('加载失败')
			this.updateCurrentPlay(result.songs[0])
			this.getSongUrl(id)
		},
		// 获取歌曲url
		async getSongUrl(id) {
			const { data: result } = await getSongUrlApi(id)
			if (result.code !== 200) return uni.$showMsg('加载失败')
			this.src = result.data[0].url
			this.initAudio(
				this.currentPlay.name,
				this.singer,
				this.currentPlay.al.picUrl,
				this.src
			)
		},
		// 获取歌曲歌词
		async getLyric(id) {
			const { data: result } = await getLyricApi(id)
			if (result.code !== 200) return uni.$showMsg('加载失败')
			this.lrc = result.lrc.lyric
		},
		initAudio(title, singer, coverImgUrl, src, stop) {
			if (title === this.audio.title) return (this.isPlay = true)
			this.audio.title = title
			this.audio.singer = singer
			this.audio.coverImgUrl = coverImgUrl
			this.audio.src = src
			this.isPlay = true
			this.isInit = true
		},
		// 自然播放结束
		onEnded() {
			this.isPlay = false
			const [currentSong] = this.songlist.filter(
				item => item.id === this.currentPlay.id
			)
			const index = this.songlist.indexOf(currentSong)
			if (index === -1 || !this.songlist[index + 1]) return
			this.id = this.songlist[index + 1].id
		},
		// 播放监听
		onPlay() {
			this.isPlay = true
		},
		// 暂停监听
		onPause() {
			this.isPlay = false
		},
		// 播放进度更新
		onTimeUpdate() {
			const query = uni.createSelectorQuery()
			query.select('.txt').boundingClientRect()
			query.exec(res => {
				if (!res[0]) return
				const height = res[0].height
				const currentTime = this.audio.currentTime
				const [currentLyric] = this.lyric.filter((item, index) => {
					if (this.lyric[index + 1]) {
						if (
							currentTime >= item.time &&
							currentTime < this.lyric[index + 1].time
						) {
							return item
						}
					}
				})
				let index = this.lyric.indexOf(currentLyric)
				this.active = index
				if (index <= 1) return (this.offsetTop = 0 * height)
				if (index >= this.lyric.length - 4)
					return (this.offsetTop = (this.lyric.length - 4) * height)
				this.offsetTop = (index - 1) * height
			})
		},
		// 播放
		play() {
			if (!this.isInit) {
				this.initAudio(
					this.currentPlay.name,
					this.singer,
					this.currentPlay.al.picUrl,
					this.src
				)
			}
			this.audio.play()
		},
		// 暂停
		pause() {
			this.audio.pause()
		},
		onStop() {
			this.isPlay = false
			this.isInit = false
		},
		onerror() {
			console.log('播放错误')
		},
		simiSongChange(e) {
			this.id = e.id
		}
	},
	onLoad(options) {
		this.id = options.id
	},
	created() {
		this.audio = uni.getBackgroundAudioManager()
		this.audio.onPlay(this.onPlay)
		this.audio.onPause(this.onPause)
		this.audio.onEnded(this.onEnded)
		this.audio.onTimeUpdate(this.onTimeUpdate)
		this.audio.onStop(this.onStop)
		this.audio.onError(this.onerror)
	},
	watch: {
		id(val) {
			this.getLyric(val)
			this.getSongDetail(val)
		}
	}
}
</script>

<style lang="scss">
.song_box {
	position: relative;
	background-repeat: no-repeat !important;

	.main {
		position: relative;
		z-index: 999;
		.pic {
			padding-top: 240rpx;
			.needle {
				position: absolute;
				top: 0;
				left: 50%;
				transform: translateX(-40rpx);
				height: 400rpx;
				width: 240rpx;
				background: url('@/static/images/needle.png') no-repeat;
				background-size: 100% 100%;
				z-index: 1;
			}
			.vinyl {
				position: relative;
				margin: 0 auto;
				height: 620rpx;
				width: 620rpx;
				overflow: hidden;
				.vinyl_img {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background: url('@/static/images/vinyl.png') no-repeat;
					background-size: 100% 100%;
				}
				.play {
					position: absolute;
					top: 50%;
					left: 50%;
					width: 110rpx;
					height: 110rpx;
					margin-top: -55rpx;
					margin-left: -55rpx;
					background-color: #00000070;
					text-align: center;
					border-radius: 50%;
					line-height: 110rpx;
				}
				image {
					position: absolute;
					top: 50%;
					left: 50%;
					margin: -210rpx 0 0 -210rpx;
					width: 420rpx;
					height: 420rpx;
					border-radius: 50%;
					animation: rotate 30s linear infinite;
				}
				@keyframes rotate {
					100% {
						transform: rotate(360deg);
					}
				}
			}
		}
		.lyric {
			height: 240rpx;
			text-align: center;
			overflow: hidden;
			line-height: 80rpx;
			margin: 40rpx 0;
			.lyric_centent {
				position: relative;
				transition: all 0.5s;
				.txt {
					color: #cccccc50;
					font-size: 30rpx;
				}
				.active {
					color: #fff;
				}
			}
		}
		.share {
			width: 360rpx;
			height: 80rpx;
			margin: 50rpx auto;
			margin-bottom: 100rpx;
			border: 2rpx solid rgba(255, 255, 255, 0.7);
			background-color: transparent;
			line-height: 80rpx;
			color: #fff;
			font-size: 32rpx;
			border-radius: 50rpx;
		}
		.main_sum {
			padding: 0 34rpx;
		}
	}
}
</style>
