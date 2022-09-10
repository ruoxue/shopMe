<template>
	<view  >
		 
		<view class="cu-list menu">
			<view class="cu-item " v-for="(item, index) in list" :key="index">
				<view class="uni-thumb margin-right-xs" style="width: 200rpx; height: 200rpx;"  >
					<image :src="item.thumb" mode="widthFix"></image>
				</view>

				<view class="content  padding-lg">
					
					
					<view class="content">
						<text class="text-lg text-black">商品名称:{{item.skuIntro}}</text>
					</view>
					<view class="content">
						<text>商品编码:{{item.productSn}}</text>
					</view>
					 
					<view class="content">
						<text class="text-lg ">商品规格:{{item.skuTitle}}</text>
					</view>
					 
					<view class="content">
						优惠价:<text class="text-price text-red">{{item.price}}</text>
					</view>
					<view class="content">
						市场价:<text class="text-price text-red" style="text-decoration: line-through;">{{item.price}}</text>
					</view>
					
				 
					
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [],
			status: '1',
			page: 1,
			order_no:''
		};
	},
	onLoad(option) {
		this.order_no =  (option.id);
		this.loadData();
	},
	methods:{
		loadData() {
			var thus = this;
			this.$net.fetch(
				function(ret) {
					 console.log(thus.list);
					 if(ret.data.buyerItems!=null)
					thus.list = thus.list.concat(ret.data.buyerItems);
					console.log(thus.list.length);
				},
				this.$net.orderDetail+"/"+this.order_no,
				{},
				'get'
			);
		},
		onPullDownRefresh() {
			this.list = [];
			this.page = 1;
			this._isEnded = false;
			this.loadData();
		},
		
	}
};
</script>

<style></style>
