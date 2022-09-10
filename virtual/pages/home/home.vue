<template>
	<view>
	 
		 
		<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500" indicator-color="#333" indicator-active-color="#ff0000">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item.url" mode="aspectFill"  ></image>
				<!-- <video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video> -->
			</swiper-item>
		</swiper>
		 
		 
		 <scroll-view scroll-y>
		 	<view class="grid col-1 cu-list  no-padding ">
		 		<view class="cu-item" v-for="(item, index) in dataList" :key="index">
					
					
					
		 			<navigator :url="'../detail/index?id=' +  item.id">
						
						<view class="grid col-2 cu-list no-padding ">
							<text class="text-left text-black padding-left-xl">{{item.shopName}}</text>
						 <text class="text-right padding-left-xl text-red" style="color: red;">{{$net.getType(item.type)}}</text>
						</view>
						
		 				<view class="content"> 
		 					<image
		 						class="cu-avatar xl  margin-10 fl"
		 						style="width:180rpx;height: 180rpx; margin: 10rpx;"
		 						:src="item.thumb"
		 						:style="'background-image: url(' + item.thumb + ');'"
		 					></image>
		 
		 					<view class="justify-center " style="padding: 20rpx;">
								
								<text class="text-xl text-left padding-left-lg" style=" color: black;font-size: 32rpx;">{{ item.title }}</text>
								<view class="fr padding-right-lg">
									<text class="text-price text-lg text-right" style="color: red;">{{ item.price }}</text>
								<text class="text-price text-right" style=" font-style: italic;text-decoration: line-through;">{{ item.originalPrice }}</text>
								<text class=" text-sl" style="color: black;">发布时间:{{ item.putawayTime }}</text>
								</view>
							</view>
		 				</view>
		 			</navigator>
		 		</view> 
		 	</view>
			
		 </scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cardCur: 0,
				swiperList: [ ],
				dotStyle: false,
				towerStart: 0,
				direction: '',
				dataList: [],
				cate:'',
				pageSize:10,
				pageNum:1,
				_isEnded:false
				
			};
		},
		onLoad() {
			this.TowerSwiper('swiperList');
			// 初始化towerSwiper 传已有的数组名即可
			
			var thus=this;
			this.$net.fetch(function(v){
				thus.swiperList=v.rows==null?[]:v.rows;
			 
				
			},this.$net.getSlider);
			thus.loadData();
			
		},
		methods: { 
			
			loadData() {
				
				var thus = this;
				this.$net.fetch(
					function(r) { 
						 thus.dataList =thus.dataList.concat(r.rows) ;
						  if(r.total<=thus.dataList.length){
						    thus._isEnded=true;
						  }else{
							 thus._isEnded=false;
						  }
						
						
					},
					this.$net.getGoods,
					{
						cate: thus.cate,
						'pageNum':thus.pageNum,
						'pageSize':thus.pageSize,
					},
					'get'
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
		 
			// towerSwiper
			// 初始化towerSwiper
			TowerSwiper(name) {
				let list = this[name];
				for (let i = 0; i < list.length; i++) {
					list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
					list[i].mLeft = i - parseInt(list.length / 2)
				}
				this.swiperList = list
			},

			// towerSwiper触摸开始
			TowerStart(e) {
				this.towerStart = e.touches[0].pageX
			},

			// towerSwiper计算方向
			TowerMove(e) {
				this.direction = e.touches[0].pageX - this.towerStart > 0 ? 'right' : 'left'
			},

			// towerSwiper计算滚动
			TowerEnd(e) {
				let direction = this.direction;
				let list = this.swiperList;
				if (direction == 'right') {
					let mLeft = list[0].mLeft;
					let zIndex = list[0].zIndex;
					for (let i = 1; i < this.swiperList.length; i++) {
						this.swiperList[i - 1].mLeft = this.swiperList[i].mLeft
						this.swiperList[i - 1].zIndex = this.swiperList[i].zIndex
					}
					this.swiperList[list.length - 1].mLeft = mLeft;
					this.swiperList[list.length - 1].zIndex = zIndex;
				} else {
					let mLeft = list[list.length - 1].mLeft;
					let zIndex = list[list.length - 1].zIndex;
					for (let i = this.swiperList.length - 1; i > 0; i--) {
						this.swiperList[i].mLeft = this.swiperList[i - 1].mLeft
						this.swiperList[i].zIndex = this.swiperList[i - 1].zIndex
					}
					this.swiperList[0].mLeft = mLeft;
					this.swiperList[0].zIndex = zIndex;
				}
				this.direction = ""
				this.swiperList = this.swiperList
			},
		}
	}
</script>

<style>
	.tower-swiper .tower-item {
		transform: scale(calc(0.5 + var(--index) / 10));
		margin-left: calc(var(--left) * 100upx - 150upx);
		z-index: var(--index);
	}
</style>
