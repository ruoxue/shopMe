<template>
	<view>
		<view class="text-center flex cu-bar">
			<scroll-view scroll-x class="bg-white nav text-center">
				<view class="cu-item flex-sub" :class="'' == dataType ? 'text-red cur' : ''" @click="tabSelect" id="">全部订单</view>
				<view class="cu-item flex-sub" @click="tabSelect" :class="'0' == dataType ? 'text-red cur' : '0'" id="0">待付款</view>
				<view class="cu-item flex-sub" @click="tabSelect" :class="'10' == dataType ? 'text-red cur' : ''" id="10">待发货</view>
				<view class="cu-item flex-sub" @click="tabSelect" :class="'100' == dataType ? 'text-red cur' : ''" id="100">待收货</view>
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
								<!-- <text class="uni-tag hot-tag">{{ item.goods_tip }}</text> -->
							</view>
						</view>
						<view>
							 
							<view class="uni-note">订单时间:{{ item.createdTime }}</view>

							<view class="content">
								订单价:
							 
								<text class="text-price text-red" >{{ item.totalPrice }}</text>
							</view>

							<view class="content margin-top-xs margin-bottom-xs padding-sm align-center">
								 {{$net.getOrderStatus(item.orderStatus,item.type)}} 

								<text @click.stop="pay" :id="item.orderId" class="text-white fr padding-xs  bg-red" v-if="item.orderStatus == 0">去付款</text>
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
			dataType: '',
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
				function(r) {
				 
					thus.list = thus.list.concat(r.rows);
					if(r.total<=thus.list.length){
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
