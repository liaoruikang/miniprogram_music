<template>
	<view class="simi_container">
		<view class="simi_title">
			<text>喜欢这首歌的人也听</text>
			<button class="allPlay" @click="allPlay">
				<uni-icons
					class="allPlay_icon"
					size="26rpx"
					customPrefix="icomoon"
					type="icon-play2"
					color="#fff"
				></uni-icons>
				一键收听
			</button>
		</view>
		<view class="simi_list">
			<view
				class="simi_list_item"
				v-for="item in simiSongList"
				:key="item.id"
				@click="$emit('change', { id: item.id })"
			>
				<view class="cover_img"><image :src="item.album.picUrl"></image></view>
				<view class="info">
					<view class="info_name">{{ item.name }}</view>
					<view class="info_artists">
						<image
							v-if="item.sqMusic"
							src="../../static/images/sq.png"
							class="sq"
						></image>
						<text v-for="(val, i) in item.artists" :key="i">
							{{ val.name + (i === item.artists.length - 1 ? '' : '/') }}
						</text>
						{{ ' - ' + item.album.name }}
					</view>
				</view>
				<view class="play">
					<uni-icons
						customPrefix="icomoon"
						type="icon-play2"
						color="#cccccc70"
						size="54rpx"
					></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getSimiSongApi } from '@/api/index.js'
import { mapMutations } from 'vuex'
export default {
	name: 'simiSong',
	props: {
		songId: {
			type: [String, Number],
			required: true
		}
	},
	data() {
		return {
			simiSongList: []
		}
	},
	watch: {
		songId(val) {
			this.getSimiSong(val)
		}
	},
	methods: {
		...mapMutations(['updateSonglist']),
		async getSimiSong(id) {
			const { data: result } = await getSimiSongApi(id)
			if (result.code !== 200) return uni.$showMsg('加载失败')
			this.simiSongList = result.songs
		},
		allPlay() {
			this.updateSonglist(this.simiSongList)
			this.$emit('change', { id: this.simiSongList[0].id })
		}
	}
}
</script>

<style lang="scss">
.simi_container {
	margin-bottom: 40rpx;
	.simi_title {
		display: flex;
		height: 100rpx;
		align-items: center;
		justify-content: space-between;
		text {
			font-size: 36rpx;
			color: #fff;
		}
		.allPlay {
			margin: 0;
			background-color: transparent;
			border: 2rpx solid #cccccc70;
			border-radius: 50rpx;
			font-size: 26rpx;
			color: #fff;
			.allPlay_icon {
				margin-right: 5rpx;
			}
		}
	}
	.simi_list {
		.simi_list_item {
			display: flex;
			align-items: center;
			margin: 20rpx 0;
			.cover_img {
				width: 92rpx;
				height: 92rpx;
				overflow: hidden;
				border-radius: 12rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.info {
				flex: 1;
				padding-left: 10rpx;
				.info_name {
					font-size: 32rpx;
					color: #fff;
					margin-bottom: 12rpx;
				}
				.info_artists {
					display: flex;
					align-items: center;
					font-size: 22rpx;
					color: #eee;
					.sq {
						width: 34rpx;
						height: 24rpx;
						vertical-align: middle;
						margin-right: 5rpx;
					}
				}
			}
		}
	}
}
</style>
