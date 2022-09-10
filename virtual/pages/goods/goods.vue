<template>
	<view >
		<scroll-view scroll-y>
			<view class="grid col-2 cu-list  no-padding ">
				<view class="cu-item" v-for="(item, index) in dataList" :key="index">
					<navigator :url="'../detail/index?id=' + item.id">
						<view class="content text-center">
							<image
								class="cu-avatar xl  margin-10 "
								style="width: 96%;height: 280rpx; margin: 2%;"
								:src="item.thumb"
								:style="'background-image: url(' + item.thumb + ');'"></image>

							<text class="text-ABC text-lg " style="color: black;">{{ item.title }}</text>
							<view class="text-center">
								<text class="text-price text-lg" style="color: red;">{{ item.price }}</text>
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
			dataList: [],
			cate:'',
			pageSize:10,
			pageNum:1,
			_isEnded:false
		};
	},
	onLoad(option) {
		this.cate= option.id;
		this.loadData();
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
		  					'categoryId': thus.cate,
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
	.page{
		background-color: white;
	}
</style>
