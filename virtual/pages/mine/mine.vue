<template>
	<view>
		<scroll-view>
			<view>
				<view class="text-left " style="background-color: #f00;height: 280rpx;vertical-align: middle;">
					<view @click="login" v-if="info.avatar == ''" class="cu-avatar cu-item round lg"
						style="background-image: url(../../static/img/tabBar/user_on.png);margin: 60rpx"></view>

					<view @click="login" v-if="info.avatar != ''" class="cu-avatar cu-item round lg"
						:style="'background-image: url('+info.avatar+');margin: 60rpx'"></view>

					<text class="text-gray text-xxl" v-if="info.nickName == ''">{{ info.userName }}</text>
					<text class="text-gray text-xxl" v-if="info.nickName != ''">{{ info.nickName }}</text>

					<view>
						<text class="text-white fr  margin-right-lg" v-if="info.userIntro != ''">简介：{{ info.userIntro }}</text>
					</view>
				</view>

				<view>
					<!-- <view class=" margin-top-sm">我的订单</view> -->

					<view class="cu-list grid col-4">
						<view class="cu-item">
							<navigator url="../order/order?id=" class="cuIcon-text text-red"><text
									class="text-black">我的订单</text></navigator>
						</view>
						<view class="cu-item">
							<navigator url="../order/order?id=0" class="cuIcon-pay text-red"><text
									class="text-black">待付款</text></navigator>
						</view>
						<view class="cu-item">
							<navigator url="../order/order?id=10" class="cuIcon-send text-red"><text
									class="text-black">待发货</text></navigator>
						</view>
						<view class="cu-item">
							<navigator url="../order/order?id=100" class="cuIcon-safe text-red"><text
									class="text-black">待收货</text></navigator>
						</view>

					</view>
				</view>
				<view class="cu-list menu margin-top-xl">
					<view class="cu-item arrow">
						<navigator class="content" url="/pages/order/orderSale?id=" hover-class="none">
							<text class="cuIcon-addressbook text-gray"></text>
							<text class="text-grey">售出订单</text>
						</navigator>
					</view>
				</view>
				<view class="cu-list menu margin-top-xl">
					<view class="cu-item arrow">
						<navigator class="content" url="../address/address" hover-class="none">
							<text class="cuIcon-addressbook text-gray"></text>
							<text class="text-grey">收货地址</text>
						</navigator>
					</view>






					<!-- 	<view class="cu-item arrow">
						<navigator class="content" url="../invited/invited" hover-class="none">
							<text class="cuIcon-forward text-gray"></text>
							<text class="text-gray">邀请人</text>
						</navigator>
					</view> -->

					<!-- #ifdef MP-WEIXIN -->
					<view class="cu-item arrow">
						<button open-type="contact" class="content">
							<view class="content">
								<text class="cuIcon-community text-gray"></text>
								<text class="text-gray">联系客服</text>
							</view>
						</button>
					</view>

					<!-- #endif -->
					<view class="cu-item" @click="exit">
						<view>
							<view class="content">
								<text class="cuIcon-exit text-gray"></text>
								<text class="text-gray">退出</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {
					headimg: '',
					userName: '',
					nickName: ''
				},
			};
		},
		onLoad() {
			this.load();
		},
		methods: {
			login() {
				uni.navigateTo({
					url: '../login/login'
				});
			},
			load() {
				var thus = this;
				this.$net.fetch(
					function(ret) {

						uni.setStorageSync('user', JSON.stringify(ret.data));
						thus.info = ret.data;
					},
					this.$net.getUserInfo, {},
					'GET'
				);
			},
			onPullDownRefresh() {

				this.load();
			},
			exit() {
				uni.showModal({
					cancelText: '取消',
					confirmColor: '退出',
					content: '是否退出?',
					title: '提示',

					success(ret) {
						console.log(ret);
						if (ret.confirm) {
							uni.clearStorage();

							uni.navigateTo({
								url: '../login/login'
							});
						} else {}
					}
				});
			}
		}
	};
</script>

<style>
	.page {
		height: 100vh;
		width: 100vw;
	}

	.page.show {
		overflow: hidden;
	}

	.switch-sex::after {
		content: '\e716';
	}

	.switch-sex::before {
		content: '\e7a9';
	}

	.switch-music::after {
		content: '\e66a';
	}

	.switch-music::before {
		content: '\e6db';
	}
</style>
