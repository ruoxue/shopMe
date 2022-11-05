<template>
	<view>


		<view class="bg-white">

			<view class="cu-list  menu text-left solid-top  bg-black  nav fl" style="width: 20vw;height: 100vh;">

				<view class="action cu-item arrow" @click="NavChange" :data-cur="item.component" style="width: 100%;"
					v-for="item in list">
					<view :class="PageCur==item.component?'text-blue':'text-gray'"
						style="width: 100%; cursor: pointer;">
						{{item.menuName}}

					</view>
					<view>
						<view class="cu-list  menu text-left solid-top  bg-black  nav " style="width: 100vw;">
							<view class="action cu-item " @click="NavChange" :data-cur="chidrenItem.component"
								style="width: 100%;" v-for="chidrenItem in item.children">
								<view :class="PageCur==item.component?'text-blue':'text-gray'"
									style="width: 100%; cursor: pointer;">
									{{chidrenItem.menuName}}
								</view>
							</view>
						</view>
					</view>
				</view>


			</view>

			<view class="fr line-black" style="width: 80vw">
				<view class="fr margin-right-lg">
					<text >欢迎{{user.nickName}}</text>
					<button @tap="exit" class="cu-btn sm radius bg-blue margin-left-lg">退出</button>

				</view>

				<component :is="PageCur" >

				</component>
			</view>
		</view>
		<view class="bottom-fix text-center ">©2021-{{new Date().getFullYear()}}商户管理系统
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				PageCur: 'home',
				user: {},
				list: [],
			}
		},

		onLoad() {
			var that = this;
			var info = uni.getStorageSync("info");
			var infoJ = {};
			try {
				if (info != undefined) {
					infoJ = JSON.parse(info);
				}
			} catch (e) {

			}

			this.user = infoJ;
			console.log(that.user);
			this.$net.fetch(
				function(r) {
					that.list = r.data;

				},
				this.$net.getMenu, {
					"tree": 1,
					"parentId": 0
				},
				'GET'
			);
		},
		methods: {
			NavChange: function(e) {
				console.log(e)
				this.PageCur = e.currentTarget.dataset.cur
			},
			exit(){
				 
				uni.clearStorage('info'); 
				uni.navigateTo({
					url:'/pages/login/login'
				})
			}
		}
	}
</script>

<style>
	.page {
		height: 100%;
		background-color: blanchedalmond;
	}
</style>
