<template name="skeleton">
	<view class="sk-container">
		<view>
			<navigationBar
				menuBackground="#00000030"
				menuBorderColor="#C49AAC"
				lineColor="#fff"
				color="#fff"
				titleColor="#fff"
				title="歌单"
				background="#efefef"
			></navigationBar>
			<view>
				<view class="playlist_box">
					<view class="bg sk-image"></view>
					<view class="playlist_info">
						<view class="cover_img">
							<image class="sk-image"></image>
							<view class="play_count sk-transparent">
								<view>
									<text
										class="uni-icons icons--uni-icons uniui-icon-play2 icons--uniui-icon-play2 icomoon icons--icomoon icon-play2 icons--icon-play2 sk-pseudo sk-pseudo-circle"
										data-event-opts="tap,_onClick,$event"
										style="color:#fff;font-size:16px;"
									></text>
								</view>
								50亿
							</view>
						</view>
						<view class="info">
							<view class="name sk-transparent sk-text-14-2857-563 sk-text">
								飙升榜
							</view>
							<view class="author">
								<text class="sk-transparent sk-text-14-2857-638 sk-text">
									网易云音乐
								</text>
							</view>
							<view class="desc">
								<text class="sk-transparent sk-text-14-2857-504 sk-text">
									云音乐中每天热度上升最快的100首单曲，每日更新。
								</text>
								<view>
									<text
										class="uni-icons icons--uni-icons uniui-right icons--uniui-right sk-pseudo sk-pseudo-circle"
										data-event-opts="tap,_onClick,$event"
										style="color:#e0e0e0;font-size:12px;"
									></text>
								</view>
							</view>
						</view>
					</view>
					<button
						class="share sk-button sk-pseudo sk-pseudo-circle"
						open-type="share"
					>
						<view>
							<text
								class="uni-icons icons--uni-icons uniui-redo icons--uniui-redo sk-pseudo sk-pseudo-circle"
								data-event-opts="tap,_onClick,$event"
								style="color:#fff;font-size:20px;"
							></text>
						</view>
						<text
							class="sk-transparent sk-text-30-0000-570 sk-text"
							style="background-position-x: 50%;"
						>
							分享
						</text>
					</button>
				</view>
				<view class="songlist">
					<view class="playAll sk-transparent">
						<view>
							<text
								class="uni-icons icons--uni-icons uniui-icon-play icons--uniui-icon-play icomoon icons--icomoon icon-play icons--icon-play sk-pseudo sk-pseudo-circle"
								data-event-opts="tap,_onClick,$event"
								style="color:#333333;font-size:22px;"
							></text>
						</view>
						播放全部
						<text class="sk-transparent sk-text-14-2857-429 sk-text">
							(共100首歌)
						</text>
					</view>
					<view class="song_item">
						<view
							class="song_index sk-transparent sk-text-14-2857-634 sk-text"
							style="background-position-x: 50%;"
						>
							1
						</view>
						<view class="song_name">
							<view class="name sk-transparent sk-text-14-2857-969 sk-text">
								我们的纪念
							</view>
							<view class="author">
								<image class="sq sk-image"></image>
								<text class="sk-transparent">
									<text class="sk-transparent sk-text-14-2857-464 sk-text">
										刘大壮
									</text>
									- 我们的纪念
								</text>
							</view>
						</view>
						<view class="song_play">
							<view>
								<text
									class="uni-icons icons--uni-icons uniui-icon-play icons--uniui-icon-play icomoon icons--icomoon icon-play icons--icon-play sk-pseudo sk-pseudo-circle"
									data-event-opts="tap,_onClick,$event"
									style="color:#ccc;font-size:28px;"
								></text>
							</view>
						</view>
					</view>
					<view class="song_item">
						<view
							class="song_index sk-transparent sk-text-14-2857-669 sk-text"
							style="background-position-x: 50%;"
						>
							2
						</view>
						<view class="song_name">
							<view class="name sk-transparent sk-text-14-2857-175 sk-text">
								再见无期
							</view>
							<view class="author">
								<image class="sq sk-image"></image>
								<text class="sk-transparent">
									<text class="sk-transparent sk-text-14-2857-11 sk-text">
										XMASwu
									</text>
									- 再见无期
								</text>
							</view>
						</view>
						<view class="song_play">
							<view>
								<text
									class="uni-icons icons--uni-icons uniui-icon-play icons--uniui-icon-play icomoon icons--icomoon icon-play icons--icon-play sk-pseudo sk-pseudo-circle"
									data-event-opts="tap,_onClick,$event"
									style="color:#ccc;font-size:28px;"
								></text>
							</view>
						</view>
					</view>
					<view class="song_item">
						<view
							class="song_index sk-transparent sk-text-14-2857-853 sk-text"
							style="background-position-x: 50%;"
						>
							3
						</view>
						<view class="song_name">
							<view class="name sk-transparent sk-text-14-2857-134 sk-text">
								海岸引力
							</view>
							<view class="author">
								<image class="sq sk-image"></image>
								<text class="sk-transparent">
									<text class="sk-transparent sk-text-14-2857-594 sk-text">
										翟潇闻
									</text>
									- 澈
								</text>
							</view>
						</view>
						<view class="song_play">
							<view>
								<text
									class="uni-icons icons--uni-icons uniui-icon-play icons--uniui-icon-play icomoon icons--icomoon icon-play icons--icon-play sk-pseudo sk-pseudo-circle"
									data-event-opts="tap,_onClick,$event"
									style="color:#ccc;font-size:28px;"
								></text>
							</view>
						</view>
					</view>
					<view class="song_item">
						<view
							class="song_index sk-transparent sk-text-14-2857-113 sk-text"
							style="background-position-x: 50%;"
						>
							4
						</view>
						<view class="song_name">
							<view class="name sk-transparent sk-text-14-2857-890 sk-text">
								In The Shadow Of The Sun
							</view>
							<view class="author">
								<image class="sq sk-image"></image>
								<text class="sk-transparent">
									<text class="sk-transparent sk-text-14-2857-401 sk-text">
										Professor Green
									</text>
									- Growing Up In Public
								</text>
							</view>
						</view>
						<view class="song_play">
							<view>
								<text
									class="uni-icons icons--uni-icons uniui-icon-play icons--uniui-icon-play icomoon icons--icomoon icon-play icons--icon-play sk-pseudo sk-pseudo-circle"
									data-event-opts="tap,_onClick,$event"
									style="color:#ccc;font-size:28px;"
								></text>
							</view>
						</view>
					</view>
					<view class="song_item">
						<view
							class="song_index sk-transparent sk-text-14-2857-752 sk-text"
							style="background-position-x: 50%;"
						>
							5
						</view>
						<view class="song_name">
							<view class="name sk-transparent sk-text-14-2857-655 sk-text">
								八月一日加减法
							</view>
							<view class="author">
								<text class="sk-transparent">
									<text class="sk-transparent sk-text-14-2857-451 sk-text">
										罗言/
									</text>
									<text class="sk-transparent sk-text-14-2857-178 sk-text">
										KnowKnow
									</text>
									- 八月一日加减法
								</text>
							</view>
						</view>
						<view class="song_play">
							<view>
								<text
									class="uni-icons icons--uni-icons uniui-icon-play icons--uniui-icon-play icomoon icons--icomoon icon-play icons--icon-play sk-pseudo sk-pseudo-circle"
									data-event-opts="tap,_onClick,$event"
									style="color:#ccc;font-size:28px;"
								></text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'playlist-skeleton',
	data() {
		return {}
	}
}
</script>

<style lang="scss">
.sk-transparent {
	color: transparent !important;
}
.sk-text-30-0000-272 {
	background-image: linear-gradient(
		transparent 30%,
		#eeeeee 0%,
		#eeeeee 70%,
		transparent 0%
	) !important;
	background-size: 100% 80rpx;
	position: relative !important;
}
.sk-text {
	background-origin: content-box !important;
	background-clip: content-box !important;
	background-color: transparent !important;
	color: transparent !important;
	background-repeat: repeat-y !important;
}
.sk-text-14-2857-563 {
	background-image: linear-gradient(
		transparent 14.2857%,
		#eeeeee 0%,
		#eeeeee 85.7143%,
		transparent 0%
	) !important;
	background-size: 100% 56rpx;
	position: relative !important;
}
.sk-text-14-2857-638 {
	background-image: linear-gradient(
		transparent 14.2857%,
		#eeeeee 0%,
		#eeeeee 85.7143%,
		transparent 0%
	) !important;
	background-size: 100% 39.2rpx;
	position: relative !important;
}
.sk-text-14-2857-504 {
	background-image: linear-gradient(
		transparent 14.2857%,
		#eeeeee 0%,
		#eeeeee 85.7143%,
		transparent 0%
	) !important;
	background-size: 100% 33.6rpx;
	position: relative !important;
}
.sk-text-30-0000-570 {
	background-image: linear-gradient(
		transparent 30%,
		#eeeeee 0%,
		#eeeeee 70%,
		transparent 0%
	) !important;
	background-size: 100% 80rpx;
	position: relative !important;
}
.sk-text-14-2857-429 {
	background-image: linear-gradient(
		transparent 14.2857%,
		#eeeeee 0%,
		#eeeeee 85.7143%,
		transparent 0%
	) !important;
	background-size: 100% 39.2rpx;
	position: relative !important;
}
.sk-text-14-2857-634 {
	background-image: linear-gradient(
		transparent 14.2857%,
		#eeeeee 0%,
		#eeeeee 85.7143%,
		transparent 0%
	) !important;
	background-size: 100% 39.2rpx;
	position: relative !important;
}
.sk-text-14-2857-969 {
	background-image: linear-gradient(
		transparent 14.2857%,
		#eeeeee 0%,
		#eeeeee 85.7143%,
		transparent 0%
	) !important;
	background-size: 100% 50.4rpx;
	position: relative !important;
}
.sk-text-14-2857-464 {
	background-image: linear-gradient(
		transparent 14.2857%,
		#eeeeee 0%,
		#eeeeee 85.7143%,
		transparent 0%
	) !important;
	background-size: 100% 33.6rpx;
	position: relative !important;
}
.sk-text-14-2857-669 {
	background-image: linear-gradient(
		transparent 14.2857%,
		#eeeeee 0%,
		#eeeeee 85.7143%,
		transparent 0%
	) !important;
	background-size: 100% 39.2rpx;
	position: relative !important;
}
.sk-text-14-2857-175 {
	background-image: linear-gradient(
		transparent 14.2857%,
		#eeeeee 0%,
		#eeeeee 85.7143%,
		transparent 0%
	) !important;
	background-size: 100% 50.4rpx;
	position: relative !important;
}
.sk-text-14-2857-11 {
	background-image: linear-gradient(
		transparent 14.2857%,
		#eeeeee 0%,
		#eeeeee 85.7143%,
		transparent 0%
	) !important;
	background-size: 100% 33.6rpx;
	position: relative !important;
}
.sk-text-14-2857-853 {
	background-image: linear-gradient(
		transparent 14.2857%,
		#eeeeee 0%,
		#eeeeee 85.7143%,
		transparent 0%
	) !important;
	background-size: 100% 39.2rpx;
	position: relative !important;
}
.sk-text-14-2857-134 {
	background-image: linear-gradient(
		transparent 14.2857%,
		#eeeeee 0%,
		#eeeeee 85.7143%,
		transparent 0%
	) !important;
	background-size: 100% 50.4rpx;
	position: relative !important;
}
.sk-text-14-2857-594 {
	background-image: linear-gradient(
		transparent 14.2857%,
		#eeeeee 0%,
		#eeeeee 85.7143%,
		transparent 0%
	) !important;
	background-size: 100% 33.6rpx;
	position: relative !important;
}
.sk-text-14-2857-113 {
	background-image: linear-gradient(
		transparent 14.2857%,
		#eeeeee 0%,
		#eeeeee 85.7143%,
		transparent 0%
	) !important;
	background-size: 100% 39.2rpx;
	position: relative !important;
}
.sk-text-14-2857-890 {
	background-image: linear-gradient(
		transparent 14.2857%,
		#eeeeee 0%,
		#eeeeee 85.7143%,
		transparent 0%
	) !important;
	background-size: 100% 50.4rpx;
	position: relative !important;
}
.sk-text-14-2857-401 {
	background-image: linear-gradient(
		transparent 14.2857%,
		#eeeeee 0%,
		#eeeeee 85.7143%,
		transparent 0%
	) !important;
	background-size: 100% 33.6rpx;
	position: relative !important;
}
.sk-text-14-2857-752 {
	background-image: linear-gradient(
		transparent 14.2857%,
		#eeeeee 0%,
		#eeeeee 85.7143%,
		transparent 0%
	) !important;
	background-size: 100% 39.2rpx;
	position: relative !important;
}
.sk-text-14-2857-655 {
	background-image: linear-gradient(
		transparent 14.2857%,
		#eeeeee 0%,
		#eeeeee 85.7143%,
		transparent 0%
	) !important;
	background-size: 100% 50.4rpx;
	position: relative !important;
}
.sk-text-14-2857-451 {
	background-image: linear-gradient(
		transparent 14.2857%,
		#eeeeee 0%,
		#eeeeee 85.7143%,
		transparent 0%
	) !important;
	background-size: 100% 33.6rpx;
	position: relative !important;
}
.sk-text-14-2857-178 {
	background-image: linear-gradient(
		transparent 14.2857%,
		#eeeeee 0%,
		#eeeeee 85.7143%,
		transparent 0%
	) !important;
	background-size: 100% 33.6rpx;
	position: relative !important;
}
.sk-button {
	color: #efefef !important;
	background: #efefef !important;
	border: none !important;
	box-shadow: none !important;
}
.sk-image {
	background: #efefef !important;
}
.sk-pseudo::before,
.sk-pseudo::after {
	background: #efefef !important;
	background-image: none !important;
	color: transparent !important;
	border-color: transparent !important;
}
.sk-pseudo-rect::before,
.sk-pseudo-rect::after {
	border-radius: 0 !important;
}
.sk-pseudo-circle::before,
.sk-pseudo-circle::after {
	border-radius: 50% !important;
}
.sk-container {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: hidden;
	background-color: transparent;
}
</style>
