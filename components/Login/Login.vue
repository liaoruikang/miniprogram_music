<template>
	<view class="login_container">
		<view class="title">
			<uni-icons
				type="arrow-left"
				size="48rpx"
				class="back"
				@click="back"
				v-show="step != 0"
			></uni-icons>
			<text class="horizontal">登录</text>
		</view>
		<view class="text">
			<view>登录体验更多精彩</view>
			<text>未注册的手机号登陆后将自动创建账号</text>
		</view>
		<view class="login_form">
			<view v-if="step === 0" class="login_phone">
				<view class="select" @click="showDrawer('showRight')">
					<text>+{{ loginFormData.code }}</text>
					<uni-icons type="bottom" size="28rpx"></uni-icons>
				</view>
				<input
					type="number"
					placeholder="请输入手机号"
					v-model="loginFormData.phone"
				/>
			</view>
			<view v-if="step === 1" class="login_password">
				<input
					type="password"
					placeholder="请输入密码"
					v-model="loginFormData.password"
				/>
			</view>
		</view>

		<button :class="['login_btn', forbidden]" @click="next">
			{{ step === 0 ? '下一步' : '登录' }}
		</button>
		<uni-drawer
			ref="showRight"
			mode="right"
			@change="change($event, 'showRight')"
			:width="systemInfo.windowWidth * 0.7"
		>
			<view class="code_box">
				<view class="code_title">
					<uni-icons
						type="closeempty"
						size="40rpx"
						color="#999"
						@click="closeDrawer('showRight')"
					></uni-icons>
					<text class="txt">选择国家和地区</text>
				</view>
				<view class="code_list">
					<scroll-view scroll-y class="code_list_box">
						<view
							class="code_list_item"
							v-for="(item, index) in codeList"
							:key="index"
						>
							<view class="code_list_item_cat">{{ item.label }}</view>
							<view
								class="code_list_item_code"
								v-for="(val, i) in item.countryList"
								:key="i"
								@click="
									loginFormData.code = val.code;
									closeDrawer('showRight');
								"
							>
								<view class="zh">{{ val.zh }}</view>
								<view class="code">{{ val.code }}</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</uni-drawer>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { loginApi, loginStatusApi } from '../../api/index.js'
export default {
	name: 'Login',
	props: ['showPopup'],
	watch: {
		showPopup(val) {
			if (!val) {
				setTimeout(() => {
					this.loginFormData = {
						phone: '',
						code: 86,
						password: ''
					}
					this.step = 0
				}, 200)
			}
		}
	},
	computed: {
		...mapState(['codeList', 'systemInfo']),
		forbidden() {
			if (this.step === 0 && !this.loginFormData.phone) {
				return 'forbidden'
			} else if (this.step === 1 && !this.loginFormData.password) {
				return 'forbidden'
			}
			return ''
		}
	},
	data() {
		return {
			loginFormData: {
				phone: '',
				code: 86,
				password: ''
			},
			showLeft: false,
			step: 0
		}
	},

	methods: {
		...mapMutations(['updateCookie', 'updateUserData']),
		showDrawer(e) {
			this.$refs[e].open()
		},
		// 关闭窗口
		closeDrawer(e) {
			this.$refs[e].close()
		},
		// 抽屉状态发生变化触发
		change(e, type) {
			this[type] = e
		},
		next() {
			// 格式校验
			if (
				!/^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/.test(
					this.loginFormData.phone
				)
			)
				return uni.$showMsg('请输入正确的手机号')
			if (!this.loginFormData.phone) return
			this.step = 1
			if (!this.loginFormData.password) return
			this.login()
		},
		// 登录
		async login() {
			const { data: result } = await loginApi(
				this.loginFormData.phone,
				this.loginFormData.password,
				this.loginFormData.code
			).catch(err => err)
			if (result.code != 200) return uni.$showMsg(result.message)
			this.updateCookie(result.cookie)
			this.updateUserData(result)
			this.$emit('loginChange')
		},
		// async loginStatus() {
		// 	const { data: result } = await loginStatusApi()
		// 	console.log(result)
		// },
		// 上一页
		back() {
			this.step = 0
			this.loginFormData.password = ''
		}
	}
}
</script>

<style lang="scss">
.login_container {
	width: 600rpx;
	background-color: #fff;
	border-radius: 32rpx;
	box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
	padding: 40rpx;

	.title {
		text-align: center;
		font-size: 38rpx;
		.back {
			float: left;
			margin-top: 10rpx;
		}
	}
	.text {
		margin: 40rpx 0;
		text {
			font-size: 20rpx;
			color: #999;
		}
	}
	.login_form {
		border-bottom: 1rpx solid #999;
		.login_phone {
			display: flex;
			align-items: center;
			.select {
				margin-right: 10rpx;
				uni-icons {
					margin-left: 10rpx;
				}
			}
		}
		input {
			flex: 1;
		}
	}
	.login_btn {
		background-color: #e50113;
		margin: 60rpx 0;
		border-radius: 50rpx;
		height: 80rpx;
		line-height: 80rpx;
		color: #fff;
	}
	.forbidden {
		background-color: #e5011350;
	}
	.code_box {
		width: 100%;
		height: 100%;
		background-color: #fff;
		padding-left: 20rpx;
		.code_title {
			height: 80rpx;
			line-height: 80rpx;
			text {
				vertical-align: middle;
			}
			.txt {
				margin-left: 20rpx;
			}
		}
		.code_list {
			position: relative;
			height: 100%;
			font-size: 24rpx;
			line-height: 72rpx;
			.code_list_box {
				height: 100%;
				.code_list_item_cat {
					font-weight: 700;
				}
				.code_list_item_code {
					display: flex;
					justify-content: space-between;
					.code {
						margin-right: 40rpx;
						color: #999;
					}
				}
			}
		}
	}
}
::-webkit-scrollbar {
	display: none;
}
</style>
