<template>
	<view  class="flex solid-bottom padding align-center justify-center"   style="background-color: darkorchid;height: 100%;" >
		<view style="margin-top: 600rpx;margin-bottom: 100%;">
			<form    >
				<view class="cu-form-group">
					<text>用户名</text>
					<input  placeholder="用户名" v-model="formData.username"/>
				</view>
				<view class="cu-form-group">
					<text>密码</text>
					<input  placeholder="密码" type="password" v-model="formData.password" />
				</view>
			</form>
		<view class="flex solid-bottom padding justify-center">
		 
				<button class="cu-btn bg-blue lg padding-sm margin-xs radius" @tap="login">登录</button>
		</view>
	 
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData:{}
			}
		},
		methods: {
			login(){
				var thus=this;
				thus.$net.fetch((r)=>{
					  
					r.data.nickName=thus.formData.username;
					
					uni.setStorageSync("info",JSON.stringify(r.data));
					 uni.navigateTo({
					 	url:"/pages/home/home", 
					 })
				},this.$net.loginin,this.formData,'POST');
			}
			
		}
	}
</script>

<style>

</style>
