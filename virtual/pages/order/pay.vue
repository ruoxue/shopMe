<template>
	<view class="container">
		<view>
			<view class="cu-list menu">
				<view class="cu-item  text-center align-center" v-if="address.addressId == undefined">
					<navigator class="content" url="../address/address" hover-class="none">
						<text class="cuIcon-add text-gray"></text>
						<text class="text-black">收货地址</text>
					</navigator>
				</view>

				<view class="cu-item   content margin-top-sm" v-if="address.addressId > 0">
					<navigator url="../address/address">
						<view class="padding-xs">
							<text>{{ address.addressName }}-{{ address.phone }}</text>
						</view>
						<view class="padding-xs">
							<view class="content">
								{{ address.provinceName }}-{{ address.cityName }}-{{ address.countyName }}-{{ address.street }}
							</view>
						</view>
					</navigator>
				</view>
			</view>
		</view>

		<scroll-view scroll-y class="margin-top-sm">
			<view class="cu-list menu ">
				<view class="cu-item arrow content" v-for="(item, index) in order.buyerItems" :index="index">

					<!-- <image style="width: 160rpx;height: 160rpx;" :src="item.thumb">
					</image> -->
					
					<image
						class="cu-avatar xl  margin-10 fl"
						style="width:180rpx;height: 180rpx; margin: 10rpx;"
						:src="item.thumb"
						:style="'background-image: url(' + item.thumb + ');'"
					></image>

					<view>
						<view class="margin-xl">
							<text class="text-black text-xl">{{ item.skuTitle }}</text>
						</view>
						 
						<view class="margin-xl   ">
							订单价:<text class="text-red text-price text-right margin-right-sm ">
								{{ item.price }}
							</text>
							原价:<text class="text-red text-price text-right  " style="text-decoration: line-through;">
								{{ item.originalPrice }}
							</text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>


	<view style="width: 100vw; " class="margin-top-lg">
		<textarea class="bg-white  padding-sm"
		  style="width: 94vw;margin-left: 3vw;"
		  :placeholder="order.formateDesc"
		  v-if="order.type==4" v-model="remark"> 备注信息</textarea>
		
	</view>

		<view class="cu-list menu margin-top-xl " style="margin-bottom: 1px;">
			<view class="cu-item text-red" v-for="(item, index) in channels" :index="index">

				<input class=" cu-item   text-red" @tap="checkTmp" :data-currentid="item.id"
					:class="[item.check?'cuIcon-squarecheckfill':'cuIcon-squarecheck']" :data-index="index">

				</input>


				<view class="fl">{{item.name}}</view>
			</view>
		</view>


		<view class="bottom-fix">


			<!-- <view class="solid-bottom bottom-fix" style="[{margin-bottom:StatusBar + 'px'}]"> -->
			<view class="cu-bar bg-white tabbar border ">
				<view class="action">合计: </view>
				<view class="text-price text-red ">{{ order.totalPrice }}</view>
				<button class="action text-price fl text-red text-ABC text-lg"> </button>
				<view class="bg-red submit" v-if="order.type==4" @click="perfectOrder">提交信息</view>
				<view class="bg-red submit" v-else @click="perfectOrder">立即支付</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				banner: [],
				goods: {},
				sku_key: false,
				order: {},
				address: {},
				remark: '',
				channels: [],
				index: 0,
				channel: {}
			};
		},
		onLoad(option) {
			var id = option.id;
			this.load(JSON.parse(id).data);
		},
		onShow: function() {
			let pages = getCurrentPages();
			let currPage = pages[pages.length - 1];
			if (currPage.address != undefined && currPage.address != null) {
				try {
					this.address = JSON.parse(currPage.address); //这就是传递的参数
				} catch (e) {}
			}
		},
		methods: {
			load(orderId) {
				var that = this;
				this.$net.fetch(
					function(ret) {
						that.order = ret.data;
						that.getChannel();
					},
					this.$net.orderDetail + "/" + orderId, {},
					'GET'
				);

			},
			checkTmp(e) {

				this.channels[this.index].check = false;

				this.index = e.currentTarget.dataset.index;

				if (this.channels[this.index].check == undefined) {
					this.channels[this.index].check = false;
				}
				this.channels[this.index].check = !this.channels[this.index].check;

				this.channel = this.channels[this.index];
				this.$forceUpdate();
			},

			getChannel() {
				var that = this;
				this.$net.fetch(
					function(ret) {
						console.log(ret);
						that.channels = ret.rows;
						that.channels[0].check = true;
					},
					this.$net.getPayChannel, {},
					'GET'
				);


			},

			perfectOrder(e) {
				var that = this;

				if(that.address.addressId==undefined){ 
				uni.showToast({
					title:'请选择收货地址',
					icon:'none'
				})	  
					return;
				}

				this.$net.fetch(
					function(ret) {
						if (ret.data.orderStatus == 10) {
							that.$router.push({
								path: './success?id=' + ret.data.orderId
							})
						}
					},
					this.$net.perfectOrder, {
						orderId: that.order.orderId,
						remark: that.remark,
						addressId:that.address.addressId,
						payMethod: that.channel.id
					},
					'POST'
				);
			}
		}
	};
</script>

<style></style>
