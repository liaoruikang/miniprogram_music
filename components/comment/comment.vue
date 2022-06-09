<template>
	<view class="comment_container">
		<view class="comment_title"><text>精彩评论</text></view>
		<view class="comment_list">
			<view
				class="comment_list_item"
				v-for="item in commentList"
				:key="item.commentId"
			>
				<view class="item_img">
					<view class="img_box">
						<image class="avatarUrl" :src="item.user.avatarUrl"></image>
						<image
							v-if="item.user.avatarDetail"
							:src="item.user.avatarDetail.identityIconUrl"
							class="identityIcon"
						></image>
					</view>
				</view>
				<view class="item_box">
					<view class="item_box_hd">
						<view class="info">
							<view class="name">{{ item.user.nickname }}</view>
							<view class="time">{{ item.time | time }}</view>
						</view>
						<view
							class="like"
							@click="onLike(item.commentId, item.liked ? 0 : 1)"
						>
							<text>{{ item.likedCount }}</text>
							<uni-icons
								:color="item.liked ? '#c00000' : '#B9B8B8'"
								type="hand-up"
								size="46rpx"
								class="likeIcon"
							></uni-icons>
						</view>
					</view>
					<view class="item_box_bd">
						<view class="centent">{{ item.content }}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getHotCommentApi, commentLikeApi } from '@/api/index.js'
export default {
	name: 'comment',
	props: {
		songId: {
			type: [String, Number],
			required: true
		}
	},
	data() {
		return {
			commentList: []
		}
	},
	watch: {
		songId(val) {
			this.getComment(val)
		}
	},
	methods: {
		async getComment(id) {
			const { data: result } = await getHotCommentApi(id, 0)
			if (result.code !== 200) return uni.$showMsg('加载失败')
			this.commentList = result.hotComments
		},
		async onLike(cid, t) {
			const { data: result } = await commentLikeApi(this.songId, cid, t, 0)
			this.getComment(this.songId)
		}
	},
	filters: {
		time(val) {
			const time = new Date(val)
			let y = time.getFullYear()
			let m = time.getMonth() + 1
			let d = time.getDate()
			m = m < 10 ? '0' + m : m
			d = d < 10 ? '0' + d : d
			return y + '年' + m + '月' + d + '日'
		}
	}
}
</script>

<style lang="scss">
.comment_container {
	padding-bottom: 40rpx;
	.comment_title {
		line-height: 100rpx;
		text {
			font-size: 36rpx;
			color: #fff;
		}
	}
	.comment_list {
		.comment_list_item {
			display: flex;
			.item_img {
				width: 68rpx;
				.img_box {
					position: relative;
					width: 100%;
					height: 68rpx;
					.avatarUrl {
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
					.identityIcon {
						position: absolute;
						right: 0;
						bottom: 0;
						width: 30rpx;
						height: 30rpx;
					}
				}
			}
			.item_box {
				flex: 1;
				padding-left: 20rpx;
				.item_box_hd {
					display: flex;
					justify-content: space-between;
					align-items: center;
					.info {
						.name {
							font-size: 24rpx;
							color: #b9b8b8;
							margin: 8rpx 0;
						}
						.time {
							font-size: 18rpx;
							color: #7a7777;
						}
					}
					.like {
						display: flex;
						align-items: center;
						font-size: 24rpx;
						color: #b9b8b8;
					}
				}
				.item_box_bd {
					.centent {
						padding: 20rpx 0 40rpx 0;
						line-height: 40rpx;
						color: #fff;
						border-bottom: 2rpx solid #cccccc70;
					}
					padding-bottom: 20rpx;
				}
			}
		}
	}
}
</style>
