<template>
	<view>
		<scroll-view scroll-y>
			<view class="cu-list menu ">
				<view class="cu-item  " v-for="(item, index) in list">
					<view class="content">
						<view @click="select" :id="JSON.stringify(item)">
							<view class="padding-xs content">
								<view class=" content">{{ item.addressName }} -{{ item.phone }}</view>
							</view>
						</view>
						<view @click="select" :id="JSON.stringify(item)">
							<view class=" content">{{ item.provinceName }}-{{ item.cityName }}-{{ item.countyName }}-{{ item.street }}
							</view>
						</view>

						<view class="content fr flex text-right">
							<text class="text margin-right-xs">
								<navigator class="content" :url="'../address/add?id=' + JSON.stringify(item)">编辑
								</navigator>
							</text>
							<text class="text" @click="del" :id="item.addressId">删除</text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>

		<navigator class="content bottom-fix " url="../address/add" hover-class="none"><button
				class="text-white bg-red  no-border submit">新增</button></navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				pageSize:10,
				pageNum:1,
				_isEnded:false
			};
		},
		onLoad() {
		},
		onShow() {
			this.pageNum=1;
			 
			this._isEnded=false;
			this.list = [];
			this.loadData();
		},

		methods: {
			onPullDownRefresh() {
				this.pageNum=1;
				 
				this._isEnded=false;
				this.list = [];
				this.loadData();
			},
			loadData() {
				var thus = this;
				this.$net.fetch(
					function(r) {
						thus.list = thus.list.concat(r.rows);
						if (r.total <= thus.list.length) {
							thus._isEnded = true;
						} else {
							thus._isEnded = false;
						}
					},
					this.$net.address, {
						pageSize: 10,
						pageNum: 1
					},
					'get'
				);
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

			select(e) {
				try {
					let pages = getCurrentPages();
					let prevPage = pages[pages.length - 2]; //上一个页面

					prevPage.address = e.currentTarget.id;
					uni.navigateBack();
				} catch (e9) {
					uni.navigateTo({
						url: '../address/add?id=' + e.currentTarget.id
					});
				}
			},
			del(e) {
				var thus = this;
				this.$net.fetch(
					function(ret) {
						thus.list = [];
						thus.loadData();
					},
					this.$net.delAddress+"/"+e.currentTarget.id, {
						
					},
					'delete'
				);
			}
		}
	};
</script>

<style></style>
