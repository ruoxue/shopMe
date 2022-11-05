<template>
	<view>

		<view></view>
		<view class='cu-list bg-white'>

			<view class="cu-form-group bg-grey">
				<view class="flex-sub">
					支付id
				</view>
				 
				<view class="flex-sub">发起时间</view>
				<view class="flex-sub">订单金额</view>
				<view class="flex-sub">支付金额</view>
				<view class="flex-sub">描述</view>
				<view class="flex-sub">支付状态</view>
				<view class="flex-sub">三方订单号</view>
				<view class="flex-sub">支付时间</view>
				<view class="flex-sub">操作</view>
			</view>
			<view v-for="(item,index) in orderPay" class="cu-form-group" :class="[index%2==0?'bg-gray':'','']">
				 
					<view class="flex-sub"  >
						{{item.id}}
					</view>
					 
					<view class="flex-sub">
						{{item.createdTime}}
					</view>
					<view class="flex-sub text-red text-price">
						{{item.orderAmount}}
					</view>
					<view class="flex-sub text-red text-price">
						{{item.payAmount}}
					</view>

					<view class="flex-sub">
						{{item.payDesc}}
					</view>
					<view class="flex-sub">
						{{item.status}}
					</view>
					<view class="flex-sub">
						{{item.thirdSn}}
					</view>
					<view class="flex-sub">
						{{item.updatedTime}}
					</view>

					<view class="flex-sub">
						<button @tap="query" :data-id="item.id" class="cu-btn sm round line-blue ">查询</button>
					</view>
			 
			</view>


		</view>

	</view>
</template>

<script>
	export default {
		name: "orderPay",
		data() {
			return {
				orderPay: [1, 2]
			};
		},
		methods: {
			init(data) {
				console.log(data);
				this.orderPay = data;

			},
			query(e){
				var id = e.currentTarget.dataset.id;
				
				this.$net.fetch(
					function(r) {
						uni.showToast({
							title: r.msg,
							icon: 'none'
						
						})
				
					},
					this.$net.paymentQuery, {
						"id": id,
						"parentId": 0
					},
					'POST'
				);
			}
		}
	}
</script>

<style>
	.row {
	 background-color: red;
	}

	.flex-sub { 
		flex-grow: 1
	}
</style>
