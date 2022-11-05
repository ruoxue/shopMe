<template name="home">

	<view class="margin-lg">
		<view class="cuIcon-infofill margin-top-lg margin-bottom-lg text-blue text-xsl">出售订单</view>
		<view class="cu-list col-3 grid">

			<view class="cu-item  menu">
				<view class="text-xl text-bold">待支付</view>
				<view class="margin-top-xl text-xxl" >{{data.orderStatus_0||0}}</view>
			</view>
			<view class="cu-item col-3 menu">
				<view class="text-xl text-bold"> 待发货</view>
				<view  class="margin-top-xl text-xxl text-red">{{data.orderStatus_10||0}}</view>
			</view>
			<view class="cu-item col-3 menu">
				<view class="text-xl text-bold">待签收</view>
				<view class="margin-top-xl text-xxl text-black" >{{data.orderStatus_100||0}}</view>
			</view>
		</view>
		<view class="cuIcon-infofill margin-top-lg text-blue text-xxl  margin-bottom-lg">求购订单</view>
		<view class="cu-list col-3 grid">
		
			<view class="cu-item  menu">
				<view class="text-xl text-bold">待提交供应商</view>
				<view class="margin-top-xl text-xxl" >{{data.buyStatus_10||0}}</view>
			</view>
			<view class="cu-item col-3 menu">
				<view class="text-xl text-bold">待打款</view>
				<view class="margin-top-xl text-xxl" >{{data.buyStatus_100||0}}</view>
			</view> 
		</view>
		
		<view class="cuIcon-infofill margin-top-lg text-blue text-xxl  margin-bottom-lg">当天数据</view>
		<view class="cu-list col-3 grid">
		
			<view class="cu-item  menu">
				<view class="text-xl text-bold">支付金额</view>
				<view class="margin-top-xl text-xxl text-red text-price">{{data.currentAMountStatus_10+data.currentAMountStatus_100||0}}</view>
			</view>
			<view class="cu-item col-3 menu">
				<view class="text-xl text-bold">支付订单数</view>
				<view class="margin-top-xl text-xxl text-red">{{data.currentStatus_10+data.currentStatus_100||0}}</view>
			</view>
			 
			 <view class="cu-item col-3 menu">
			 	<view class="text-xl text-bold">待支付订单数</view>
			 	<view class="margin-top-xl text-xxl">{{data.currentStatus_0||0}}</view>
			 </view>
		</view>
		
		
		
		
		
		
		
		
		
	</view>







</template>

<script>
	export default {

		name: "home",
		data() {
			return {
				 data:{}
					
			}

		},
		onLoad() {
			console.log("onLoad");
			this.loadData();
		},
		onLaunch() {
			console.log("onLoad11");
		},
		created() {
			console.log("created");
			this.loadData();
		},



		methods: {
			loadData() {
				var that = this;
				this.$net.fetch(
					function(r) {
						that.data = r.data;

					},
					this.$net.getBasicInfo, {},
					'GET'
				);
			}
		},
		onShow() {
			console.log("success")
		},
		onInit() {
			console.log("onLoad111111");
		}
	}
</script>

<style>
	.page {
		height: 100vh;
	}
</style>
