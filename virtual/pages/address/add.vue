<template>
	<view>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">收货人</view>
				<input placeholder="收货人" v-model="address.addressName" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">手机号</view>
				<input placeholder="手机号" v-model="address.phone" name="input"></input>
			</view>

			<view class="cu-form-group">
				<view class="title">所在地区</view>

				<view @click="chooseAddr">
					<text>{{address.region}}</text>
				</view>


			</view>
			<view class="cu-form-group">
				<view class="title">详细地址</view>
				<input placeholder="详细地址" v-model="address.street" name="input"></input>
			</view>



		</form>

		<button @click="save()" class="bg-red  submit text-white ">保存</button>


		<view class="container">

			<n-address ref="addr" @up-data="upData" :fValue="fValue" :fStyles="fStyles"></n-address>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				address: {},

				fValue: [0, 0, 0],
				fStyles: {
					'confirmText': '确定',
					'canceltext': '取消',
					'columnFontSize': '36rpx'
				}
			};
		},

		onLoad(option) {

			var id = option.id


			try {
				this.address = JSON.parse(id);
			} catch (e) {}

			this.address.region =
				this.address == undefined || this.address.region == undefined ? "选择地址" : this.address.region;


		},

		methods: {
			chooseAddr() {
				this.$refs['addr'].popUp();
				if (this.address.value != undefined) {
					console.log(this.address.value);
					this.$refs['addr'].initVale(this.address.value.split(',') || [0, 0, 0]);

				} else {
					this.$refs['addr'].initVale([0, 0, 0]);
				}
				this.$forceUpdate();


			},
			upData(e) {
				this.address.value = e.value.join(",");
				this.address.region = e.region;
				this.address.province = e.provinceCode;
				this.address.city = e.cityCode;
				this.address.county = e.districtCode;
				this.$forceUpdate();
			},
			save: function() {

				if (this.address.county == undefined) {
					uni.showToast({
						title: '请选择地址',
						icon: 'none'
					});
					return;
				}


				if (this.address.street == undefined) {
					uni.showToast({
						title: '请选择详细地址',
						icon: 'none'
					});
					return;
				}

				this.$net.fetch(function(ret) {
						uni.navigateBack({
							animationDuration: 300
						});
						console.log(ret);

					},
					this.$net.addAddress,
					this.address,
					this.address.addressId == undefined ? 'post' : 'put');
			},





		}
	};
</script>

<style>
</style>
