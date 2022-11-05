<template>
	<view>
		<swiper class="screen-swiper" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
			duration="500">
			<swiper-item v-for="(item, index) in banner" :key="index">
				<image :style="'background-image: url(' + item + ');'" mode="aspectFill"></image>
			</swiper-item>
		</swiper>

		<view class="flex menu bg-white">
			<text
				class="content padding-left-sm text-xl margin-top-lg margin-bottom-lg text-black">{{ goodsInfo.title }}</text>
		</view>
		<view class="flex menu text-red margin-tb-sm padding-left-sm ">
			<text class="content  text-black text-xl">现价：</text>
			<text class="content text-price text-xxl">{{ priceCom }}</text>
			<text class="content text-black  padding-left-sm">原价：</text>
			<text class="content text-black text-price ">{{ goodsInfo.price }}</text>
		</view>
		<view class="flex menu text-red margin-tb-sm">
			<text class="content  padding-left-sm ">销量： {{ goodsInfo.salesCount }}</text>
		</view>


		<view class="padding-xs bg-white padding-bottom-xxl">

			<view class="menu">
				<view class="self-center text-black text-xxl margin-bottom-xl  text-center">商品详情</view>
			</view>


			<editor id="editor" style="height: 100%;" class="ql-container" showImgSize showImgToolbar showImgResize
				read-only="true" @ready="onEditorReady">
			</editor>
			<view class="menu text-center">
				品质保证
			</view>
			<view class="cu-bar">
				&nbsp;

			</view>


		</view>




		<view class="bottom-fix-no">
			<!-- <view class="solid-bottom bottom-fix" style="[{margin-bottom:StatusBar + 'px'}]"> -->
			<view class="cu-bar bg-white tabbar border shop">
				<button class="action" open-type="contact">
					<view class="cuIcon-service text-green"></view>
					客服
				</button>
				<view class="action" @click="gotoCart">
					<view class="cuIcon-cart"></view>
					购物车
				</view>
				<vk-data-goods-sku-popup ref="skuPopup" v-model="skuKey" border-radius="20" :localdata="goodsInfo"
					:mode="skuMode" @open="onOpenSkuPopup" @close="SkuPopup" @add-cart="addCart" @buy-now="buyNow">
				</vk-data-goods-sku-popup>

				<view class="bg-red submit" @tap="buy" v-if="goodsInfo.type==4"> 立即出售</view>
				<view class="bg-red submit" @tap="buy" v-else="goodsInfo.type!=4"> 立即订购</view>

			</view>
		</view>
	</view>
</template>
<script>
	var that;
	export default {
		data() {
			return {
				readOnly: true,
				editorCtx: '',
				formats: {},
				banner: [],

				skuKey: false,
				id: '',
				specData: '',
				priceCom: 0,
				goodsInfo: {},
				skuMode: 3,

			};
		},
		onLoad(option) {
			this.id = option.id;

			that = this;
		},
		mounted() {
			that = this;

		},
		methods: {
			onEditorReady() {
				var thus = this;
				uni.createSelectorQuery().select('#editor').context((res) => {
					thus.editorCtx = res.context
					this.loadData();
				}).exec()
			},
			buy() { 
				this.skuKey = true;
 
			},
			priceFilter(n = 0) {
				let that = this;
				if (typeof n == 'string') {
					n = parseFloat(n);
				}
				if (that.amountType === 0) {
					return n.toFixed(2);
				} else {
					return (n / 100).toFixed(2);
				}
			},
			priceCom1() {
				let str = '';
				let that = this;

				let skuList = that.goodsInfo['sku_list'];
				if (skuList && skuList.length > 0) {
					let valueArr = [];
					skuList.map((skuItem, index) => {
						valueArr.push(skuItem.price);
					});
					let min = that.priceFilter(Math.min(...valueArr));
					let max = that.priceFilter(Math.max(...valueArr));
					if (min === max) {
						str = min + '';
					} else {
						str = `${min} - ${max}`;
					}

				}
				return str;
			},
			onPullDownRefresh() {
				this.loadData();
			},
			loadData() {
				var thus = this;
				this.$net.fetch(
					function(r) {

						thus.goodsInfo = r.data
						thus.banner = that.goodsInfo.thumbs.split(',');

						let tmp = {
							html: decodeURIComponent(thus.goodsInfo.content)
						};
						thus.editorCtx.setContents(tmp);


						thus.$net.fetch((r2) => {

							thus.goodsInfo['spec_list'] = r2.rows 

						}, thus.$net.productSpec + "/" + thus.id, '', 'GET');

						thus.$net.fetch((r2) => {
							thus.goodsInfo['sku_list'] = r2.rows

							that.priceCom = that.priceCom1();
						}, thus.$net.productSku + "/" + thus.id, '', 'GET');
					},
					this.$net.detail + thus.id, {},
					'GET'
				);
			},
			gotoCart() {
				console.log(123);
				uni.reLaunch({
					url: '../cart/cart'
				});
				// uni.navigateTo({
				// 	url:'../cate/cate'
				// })
			},

			// 加入购物车前的判断
			addCartFn(selectShop) {
				 var param = {
				 	goodsId: selectShop.goodsId,
				 	goodsNum: selectShop.buy_num,
				 	buyerItems: [{
				 		'skuId': selectShop.id
				 	}]
				 }
				 this.submit(param);
				 
			},
			// 加入购物车按钮
			addCart(selectShop) {
				var param = {
					goodsId: selectShop.goodsId,
					goodsNum: selectShop.buy_num,
					buyerItems: [{
						'skuId': selectShop.id
					}]
				}
				this.submit(param);
				
			},
			// 立即购买
			buyNow(selectShop) {
				console.log(90)
				var param = {
					goodsId: selectShop.goodsId,
					goodsNum: selectShop.buy_num,
					buyerItems: [{
						'skuId': selectShop.id
					}]
				}
				this.submit(param);

				//
			},
			submit(data) {
				this.$net.fetch(
					function(ret) {
						if (ret.data == null || ret.data == '') {
							uni.showToast({
								title: ret.msg,
								icon: 'none'
							});
						} else {
							uni.navigateTo({
								url: '../order/pay?id=' + ret.data
							});
						}

						// that.$router.push({path:})
					},
					this.$net.addOrder,
					data,
					'post'
				);
			},

			/**
			 * 获取商品信息
			 * 这里可以看到每次打开SKU都会去重新请求商品信息,为的是每次打开SKU组件可以实时看到剩余库存
			 */
			findGoodsInfo() {
				var thus = this;
				return new Promise(function(resolve, reject) {
					resolve(thus.specData);

					// 这里是获取商品信息的后端请求,可以用你自己的方式请求获取,本例子中用的是unicloud的云函数获取商品信息
				});
			},
			toast(msg) {
				uni.showToast({
					title: msg,
					icon: 'none'
				});
			},
			callFunction(obj) {
				uni.showLoading({
					title: '请求中'


				});
			}
		}
	};
</script>
<style>
	.page {
		background-color: white;
	}
</style>
