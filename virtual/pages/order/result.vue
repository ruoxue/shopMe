<template  >
	<view   style="height: 100vh; background: #fff;">
		
		<view class="text-red text-center text-xsl "
		style="padding-top: 30vh;">
		{{$net.getOrderStatus(status,0)}} 
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
				order_no:'',
				result:""
			};
		},
		onLoad(option) {
			this.status =  (option.status);
			 console.log(this.status);
			 this.result=option.result;
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

<style>
</style>