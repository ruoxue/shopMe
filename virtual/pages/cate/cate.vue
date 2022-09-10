<template>
	<view>
		<scroll-view>
			<block>
				<view class="">
					<view class="flex flex-wrap">
						<view class="basis-xs" style="margin: 0rpx;">
							<scroll-view scroll-y>
								<view class="basis-xl   cu-list menu  no-padding">
									<view :class="item.select ? 'bg-white' : ''"
										:style="item.select ? 'background-color:#FFFFFF;color:red;font-size:30rpx ' : ''"
										@click="selectItem" v-for="(item, index) in items" :key="index" :id="index"
										class="cu-item " style="margin: 0rpx; background-color: #EEEEEE;">
										<view>
											<text class="text-center align-center ">{{ item.name }}</text>
										</view>
									</view>
								</view>
							</scroll-view>
						</view>
						<view class="basis-xl   bg-white  no-padding" style="margin: 0rpx;height: 100vh; ">
							<scroll-view scroll-y>
								<view class=" menu cu-list no-padding  " style=" margin-top: 10rpx;">
									<view v-for="(item, index) in subItem" :key="index" class="text-black ">
										<navigator :url="'../goods/goods?id=' + item.id">
											<view class="text-left  cu-item text-lg  padding-bottom-sm padding-top-sm "
												style="padding-left: 30rpx;">{{ item.name }}</view>
										</navigator>

										<view class="bg-gray" style="height: 1px;"></view>
										<view class=" grid col-2 cu-list no-padding "
											style=" margin-top: 0rpx;padding: 0rpx;background-color: #FFFFFF;">
											<view class="cu-item" v-for="(childerItems, child) in item.children"
												:key="child">
												<navigator :url="'../goods/goods?id=' + childerItems.id">
													<view class="cu-avatar"
														:style="'background-image: url(' + childerItems.thumb + ');'">
													</view>
													<view class="content ">
														<view class="text-black">{{ childerItems.name }}</view>
													</view>
												</navigator>
											</view>
										</view>
									</view>
								</view>
							</scroll-view>
						</view>
					</view>
				</view>
			</block>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				subItem: [],
				items: []
			};
		},
		onLoad() {
			var thus = this;
			this.$net.fetch(
				function(v) {
					thus.items = v.rows;
					thus.items[0].select = true;
					thus.subItem = thus.items[0].children;
				},
				this.$net.getCate, {
					'parentId': 0,
					'tree': 1
				}
			);
		},

		methods: {
			selectItem(e) {


				for (var i = 0; i < this.items.length; i++) {
					this.items[i].select = false;
				}

				this.items[e.currentTarget.id].select = true;
				if (this.items[e.currentTarget.id].children != undefined) {
					this.subItem = this.items[e.currentTarget.id].children;
				} else {
					this.subItem = [];
				}
			}
		}
	};
</script>

<style>
	page {
		padding-top: 0px;
	}
</style>
