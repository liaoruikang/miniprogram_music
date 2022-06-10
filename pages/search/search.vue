<template>
	<view class="search_container">
		<navigationBar title="搜索"></navigationBar>
		<view
			class="search_input"
			:style="{ top: navigatorBarAndStatusBarHeight + 'px' }"
		>
			<uni-icons type="search" size="28"></uni-icons>
			<input
				type="text"
				placeholder="搜索歌曲"
				v-model="keywords"
				@confirm="confirm(keywords)"
				@focus="isSearch = false"
				:focus="secondFocus"
			/>
			<uni-icons
				v-if="keywords"
				type="closeempty"
				size="18"
				@click="
					keywords = '';
					isSearch = false;
				"
			></uni-icons>
		</view>
		<scroll-view
			scroll-y
			class="search_box"
			:style="{
				height: `calc(${systemInfo.windowHeight -
					navigatorBarAndStatusBarHeight}px - 120rpx)`
			}"
			@scrolltolower="scrollBottom"
			lower-threshold="100"
		>
			<view style="margin-right: 20rpx;">
				<view v-if="!isSearch">
					<view v-if="!keywords">
						<!-- 历史搜索 -->
						<view class="search_history" v-if="historyList.length > 0">
							<view class="search_history_title">
								<text>历史搜索</text>
								<uni-icons
									type="trash-filled"
									size="40rpx"
									@click="removeHistory"
								></uni-icons>
							</view>
							<view class="search_history_list">
								<view
									class="tag"
									v-for="(item, index) in historyList"
									:key="index"
									@click="confirm(item)"
								>
									{{ item }}
								</view>
							</view>
						</view>
						<!-- 热搜榜 -->
						<view class="search_hot" v-if="hotList">
							<view class="search_hot_title">热搜榜</view>
							<view class="search_hot_list">
								<view
									class="list_item"
									v-for="(item, index) in hotList"
									:key="index"
									@click="confirm(item.searchWord)"
								>
									<view
										class="index"
										:style="{ color: index < 3 ? '#FF3A3A' : '#000000' }"
									>
										{{ index + 1 }}
									</view>
									<view class="keyword">
										<view class="searchWord">
											<text>{{ item.searchWord }}</text>
											<image
												v-if="item.iconUrl"
												:src="item.iconUrl"
												mode="heightFix"
											></image>
										</view>
										<view v-if="item.content" class="content">
											{{ item.content }}
										</view>
									</view>
									<view class="hot">{{ item.score }}</view>
								</view>
							</view>
						</view>
					</view>
					<!-- 搜索建议 -->
					<view class="search_suggest" v-if="keywords">
						<view class="search_suggest_keywords" @click="confirm(keywords)">
							搜索“{{ keywords }}”
						</view>
						<view class="search_suggest_list">
							<view
								class="list_item"
								v-for="(item, index) in suggestList"
								:key="index"
								@click="confirm(item.keyword)"
							>
								<uni-icons type="search" color="#999999" size="28"></uni-icons>
								<text>{{ item.keyword }}</text>
							</view>
						</view>
					</view>
				</view>
				<view v-else>
					<view class="empty" v-show="isEmpty">暂无搜索结果</view>
					<view class="search_list" v-if="searchList.length">
						<view
							class="list_item"
							v-for="item in searchList"
							:key="item.id"
							@click="gotoSong(item.id)"
						>
							<view class="info">
								<view class="info_name">
									<text
										v-for="(n, i) in item.name.split('')"
										:key="i"
										:style="{
											color:
												keywords.toUpperCase().indexOf(n.toUpperCase()) !== -1
													? '#507DAF'
													: '#000'
										}"
									>
										{{ n }}
									</text>
								</view>
								<view class="info_artists">
									<image
										v-if="item.fee === 1 || item.fee === 4"
										src="../../static/images/vip.png"
										class="sq"
									></image>
									<image
										v-if="item.sq"
										src="../../static/images/sq.png"
										class="sq"
									></image>
									<text v-for="(val, i) in item.ar" :key="i">
										<text
											v-for="(n, j) in val.name.split('')"
											:key="j"
											:style="{
												color:
													keywords.toUpperCase().indexOf(n.toUpperCase()) !== -1
														? '#507DAF'
														: '#000'
											}"
										>
											{{ n }}
										</text>
										{{ i === item.ar.length - 1 ? '' : '/' }}
									</text>
									<text style="margin: 0 7rpx;">-</text>
									<text
										v-for="(n, i) in item.al.name.split('')"
										:key="i"
										:style="{
											color:
												keywords.toUpperCase().indexOf(n.toUpperCase()) !== -1
													? '#507DAF'
													: '#000'
										}"
									>
										{{ n }}
									</text>
								</view>
							</view>
							<view class="play">
								<uni-icons
									customPrefix="icomoon"
									type="icon-play2"
									size="27"
									color="#D0D0D0"
								></uni-icons>
							</view>
						</view>
					</view>
					<view class="loading" v-show="isLoading">
						<image class="loading_img" src="/static/images/loading.png"></image>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import { mapState } from 'vuex'
import {
	getSearchSuggestApi,
	getSearchHotApi,
	getSearchApi
} from '@/api/index.js'
export default {
	computed: {
		...mapState(['systemInfo'])
	},
	data() {
		return {
			keywords: '',
			navigatorBarAndStatusBarHeight:
				uni.getStorageSync('navigationBarHeight') +
				uni.getStorageSync('statusBarHeight'),
			hotList: [],
			historyList: JSON.parse(uni.getStorageSync('history') || '[]'),
			suggestList: [],
			limit: 20,
			songCount: 0,
			searchList: [],
			isSearch: false,
			isLoading: false,
			isEmpty: false,
			isBottom: true,
			secondFocus: false
		}
	},
	created() {
		this.getHotList()
	},
	mounted() {
		this.secondFocus = true
	},
	methods: {
		async getHotList() {
			const { data: result } = await getSearchHotApi()
			if (result.code !== 200) return uni.$showMsg('加载失败')
			this.hotList = result.data
		},
		confirm(keywords) {
			if (!keywords) return
			this.keywords = keywords
			this.saveStorage(keywords)
			this.search(keywords, this.limit, 1)
		},
		saveStorage(keywords) {
			this.historyList.unshift(keywords)
			const setHistory = new Set(this.historyList)
			this.historyList = [...setHistory]
			uni.setStorageSync('history', JSON.stringify(this.historyList))
		},
		removeHistory() {
			this.historyList = []
			uni.removeStorageSync('history')
		},
		async getSuggestList(keywords) {
			const { data: result } = await getSearchSuggestApi(keywords, 'mobile')
			if (result.code !== 200) return uni.$showMsg('加载失败')
			this.suggestList = result.result.allMatch ? result.result.allMatch : []
		},
		async search(keywords, limit, type) {
			this.isLoading = true
			this.isSearch = true
			this.isEmpty = false
			const { data: result } = await getSearchApi(keywords, limit, type)
			this.isLoading = false
			if (result.code !== 200) return (this.isBottom = false)
			if (!result.result.songCount) {
				this.songCount = 0
				this.isEmpty = true
				return
			}
			this.searchList = result.result.songs
			this.songCount = result.result.songCount
		},
		scrollBottom() {
			if (!this.isBottom) return
			if (this.isLoading) return
			if (this.limit > this.songCount) return
			this.limit += 20
			this.search(this.keywords, this.limit, 1)
		},
		gotoSong(id) {
			uni.navigateTo({
				url: '/pages/song/song?id=' + id
			})
		}
	},
	watch: {
		keywords(val) {
			if (val) {
				this.getSuggestList(val)
			} else {
				this.suggestList = []
			}
		},
		isSearch(val) {
			if (!val) {
				this.limit = 20
				this.searchList = []
				this.songCount = 0
				this.isBottom = true
			}
		}
	}
}
</script>

<style lang="scss">
.search_container {
	display: flex;
	flex-direction: column;
	padding: 0 0 0 20rpx;
	.search_input {
		position: fixed;
		display: flex;
		align-items: center;
		width: 95%;
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
		input {
			flex: 1;
			font-size: 32rpx;
		}
	}
	.search_box {
		margin-top: 120rpx;
		.search_history {
			.search_history_title {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 32rpx;
			}
			.search_history_list {
				margin: 20rpx 0 80rpx 0;
				.tag {
					display: inline-block;
					background-color: #f7f7f7;
					padding: 18rpx;
					border: 0;
					margin: 0 14rpx 14rpx 0;
					color: #000;
					font-size: 24rpx;
					border-radius: 50rpx;
				}
			}
		}
		.search_hot {
			font-size: 32rpx;
			.search_hot_list {
				.list_item {
					display: flex;
					align-items: center;
					height: 100rpx;
					.index {
						width: 70rpx;
						text-indent: 5rpx;
					}
					.keyword {
						flex: 1;
						.searchWord {
							image {
								height: 24rpx;
								width: auto;
								vertical-align: middle;
								margin-left: 5rpx;
							}
						}
						.content {
							font-size: 24rpx;
							color: #d3d3d3;
						}
					}
					.hot {
						font-size: 24rpx;
						color: #d3d3d3;
					}
				}
			}
		}
		.search_suggest {
			padding-left: 20rpx;
			.search_suggest_keywords {
				margin: 40rpx 0;
				font-size: 32rpx;
				color: #678eb9;
			}
			.search_suggest_list {
				.list_item {
					display: flex;
					align-items: center;
					margin: 40rpx 0;
					text {
						font-size: 30rpx;
					}
					.uni-icons {
						margin-right: 20rpx;
					}
				}
			}
		}
		.loading {
			padding-top: 20rpx;
			text-align: center;
			.loading_img {
				width: 48rpx;
				height: 48rpx;
				animation: rotate 1s linear infinite;
			}
			@keyframes rotate {
				100% {
					transform: rotate(360deg);
				}
			}
		}
		.empty {
			padding-top: 40rpx;
			font-size: 36rpx;
			color: #999999;
			text-align: center;
		}
		.search_list {
			.list_item {
				display: flex;
				align-items: center;
				padding-bottom: 20rpx;
				margin-top: 40rpx;
				border-bottom: 2rpx solid #e5e5e5;
				.info {
					flex: 1;
					padding-left: 10rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					.info_name {
						font-size: 32rpx;
						margin-bottom: 12rpx;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
					.info_artists {
						line-height: 22rpx;
						font-size: 22rpx;
						color: #999;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						.sq {
							width: 34rpx;
							height: 24rpx;
							vertical-align: middle;
							margin-right: 5rpx;
						}
					}
				}
				.play {
					margin-left: 100rpx;
				}
			}
		}
	}
}
</style>
