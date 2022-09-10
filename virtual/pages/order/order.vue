<template>
	<view>
		<view class="text-center flex cu-bar">
			<scroll-view scroll-x class="bg-white nav text-center">
				<view class="cu-item flex-sub" :class="'all' == dataType ? 'text-red cur' : 'all'" @click="tabSelect" id="all">全部订单</view>
				<view class="cu-item flex-sub" @click="tabSelect" :class="'payment' == dataType ? 'text-red cur' : 'payment'" id="payment">待付款</view>
				<view class="cu-item flex-sub" @click="tabSelect" :class="'delivery' == dataType ? 'text-red cur' : ''" id="delivery">待发货</view>
				<view class="cu-item flex-sub" @click="tabSelect" :class="'received' == dataType ? 'text-red cur' : ''" id="received">待收货</view>
			</scroll-view>
		</view>

		<view class="margin-top-xl">
			<view class="cu-list menu ">
				<view @click="detail" :id="(item.orderId)" class="cu-item arrow padding-top-xl margin-top-xs" v-for="item in list" :key="item.orderId">
					 

					<view class="content margin-top-sm">
						<view>
							<view class="uni-title">
								<text class="uni-ellipsis-2">订单号:{{ item.orderId }}</text>
							</view>
							<view>
								<text class="uni-tag hot-tag">{{ item.goods_tip }}</text>
							</view>
						</view>
						<view>
							 
							<view class="uni-note">订单时间:{{ item.createdTime }}</view>

							<view class="content">
								订单价:
							 
								<text class="text-price text-red" >{{ item.totalPrice }}</text>
							</view>

							<view class="content margin-top-xs margin-bottom-xs padding-sm align-center">
								<!-- 订单状态: {{item.order_status.text}}
								付款状态: {{item.pay_status.text}}
								发货状态: {{item.receipt_status.text}} -->
							 

								<text @click.stop="pay" :id="item.order_id" class="text-white fr padding-xs  bg-red" v-if="item.pay_status == 10">去付款</text>
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- <uni-load-more v-if="loading || options.status === 'noMore' " :status="options.status" /> -->
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			waterfall: '',
			list: [],
			dataType: 'all',
			_isEnded: false,
			pageNum: 1,
			pageSize:10
		};
	},
	onLoad(option) {
		this.dataType = option.id;
		this.loadData();
	},

	methods: {
		tabSelect(e) {
			this.dataType = e.currentTarget.id;
			this.list = [];
			this.loadData();
		},
		detail(e) {
			console.log('00');
			uni.navigateTo({
				url: './detail?id=' + e.currentTarget.id
			});
		},
		loadData() {
			var thus = this;
			this.$net.fetch(
				function(ret) {
				 
					thus.list = thus.list.concat(ret.rows);
					if(r.total<=thus.dataList.length){
					  thus._isEnded=true;
					}else{
					 thus._isEnded=false;
					}
				},
				this.$net.paymentSaleOrder, 
				{ orderStatus: thus.dataType, 
				pageNum:thus.pageNum,
				pageSize:thus.pageSize, },
				'GET'
			);
		},
		onPullDownRefresh() {
			this.pageNum=1;
			 
			this._isEnded=false;
			this.dataList = [];
			this.loadData();
		},

		/**
		 * 上拉加载回调函数
		 */
		onReachBottom() {
			this.loadMore();
		},

		loadMore() {
			this.pageNum++;
			if (this._isEnded) {
				uni.showToast({
					title:'暂无更多数据',
					icon:'none'
				})
				return;
			}
			this.loadData(); 
		},
		pay(e){
			var thus = this;
			this.$net.fetch(
				function(ret) {
					 thus.onPullDownRefresh();
				},
				this.$net.paymentOrder,
				{ order_id: e.currentTarget.id},
				'post'
			); 
			
		}
	}
};
</script>

<style></style>
