<template name="basics">
	<view  class="flex solid-bottom padding align-center justify-center"   style="background-color: darkorchid;height: 100%;" >
		<view style="margin-top: 600rpx;margin-bottom: 100%;">
			<form    >
				<view class="cu-form-group">
					<text>用户名</text>
					<input  placeholder="用户名"/>
				</view>
				<view class="cu-form-group">
					<text>密码</text>
					<input  placeholder="密码" />
				</view>
			</form>
		<view class="flex solid-bottom padding justify-center">
		 
				<button class="cu-btn bg-blue lg padding-sm margin-xs radius">登录</button>
		</view>
	 
		</view>
	</view>
</template>

<script>
	export default {
		name: "basics",
		data() {
			return {
				elements: [{
						title: '布局',
						name: 'layout',
						color: 'cyan',
						cuIcon: 'newsfill'
					},
					{
						title: '背景',
						name: 'background',
						color: 'blue',
						cuIcon: 'colorlens'
					},
					{
						title: '文本',
						name: 'text',
						color: 'purple',
						cuIcon: 'font'
					},
					{
						title: '图标 ',
						name: 'icon',
						color: 'mauve',
						cuIcon: 'cuIcon'
					},
					{
						title: '按钮',
						name: 'button',
						color: 'pink',
						cuIcon: 'btn'
					},
					{
						title: '标签',
						name: 'tag',
						color: 'brown',
						cuIcon: 'tagfill'
					},
					{
						title: '头像',
						name: 'avatar',
						color: 'red',
						cuIcon: 'myfill'
					},
					{
						title: '进度条',
						name: 'progress',
						color: 'orange',
						cuIcon: 'icloading'
					},
					{
						title: '边框阴影',
						name: 'shadow',
						color: 'olive',
						cuIcon: 'copy'
					},
					{
						title: '加载',
						name: 'loading',
						color: 'green',
						cuIcon: 'loading2'
					}
				],
			};
		},
		onShow() {
			console.log("success")
		}
	}
</script>

<style>
	.page {
		height: 100vh;
	}
</style>
