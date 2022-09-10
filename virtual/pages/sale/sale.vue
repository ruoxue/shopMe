<template>
	<view>

		<form>
			<view class="cu-bar bg-white margin-top">
				<view class="action"> 图片或视频 </view>
				<view class="action"> 依次为（主图、视频首页、视频） </view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" @click="ViewImage('thumb')">
						<text class="cuIcon-cameraadd"></text>
						<image @click="ChooseImage('thumb')" :src="form.thumb" mode='aspectFill'></image>
						<view class="cu-tag bg-red" @click="DelImg" data-type="thumb"> <text
								class="cuIcon-close"></text>
						</view>
					</view>
					<view class="bg-img" @click="ViewImage()">
						<text class="cuIcon-cameraadd"></text>
						<image @click="ChooseImage('videoThumb')" :src="form.videoThumb" mode='aspectFill'></image>
						<view class="cu-tag bg-red" @click="DelImg" data-type="videoThumb"> <text
								class="cuIcon-close"></text>
						</view>
					</view>
					<view class="bg-img" @click="ViewImage()">
						<text class="cuIcon-cameraadd"></text>
						<image @click="ChooseImage('video')" :src="form.video" mode='aspectFill'></image>
						<view class="cu-tag bg-red" @click="DelImg" data-type="video"> <text
								class="cuIcon-close"></text>
						</view>
					</view>

				</view>

			</view>



			<view class="cu-bar bg-white margin-top">
				<view class="action"> 轮播图 </view>
				<view class="action"> {{ form.thumbList.length}}张 </view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" @click="ViewImage()" v-for="(item, index) in form.thumbList" :key="index"
						:data-url="item">

						<image :src="item" mode='aspectFill'></image>
						<view class="cu-tag bg-red" @click="DelImg" :data-index="index" data-type="thumbs"> <text
								class="cuIcon-close"></text>
						</view>
					</view>
					<view class="solids" @click="ChooseImage('thumbs')"> <text class="cuIcon-cameraadd"></text> </view>
				</view>
			</view>


			<view class="cu-form-group margin-top">
				<view class="title">商品标题</view>
				<input placeholder="商品标题" v-model="form.title" name="input"></input>
			</view>

			<view class="cu-form-group margin-top">
				<view class="title">分类</view>
				<input placeholder="分类" v-model="form.categoryIds" name="input"></input>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">详情</view>
				
				<textarea v-model="form.content"></textarea> 
			</view>

		</form>



		<view style=" text-align: center;  ">
			<button @click="uploadProduct" class=" bg-red  margin-top-xl   text-center   radius  ">提交</button>

		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {

				form: {
					video: "",
					videoThumb: '',
					thumb: "", //主图
					thumbList: [], //轮播
					categoryId: []
				}
			}
		},
		methods: {
			ChooseImage(type) {
				var thus = this;
				uni.chooseImage({
					complete: (r) => {
						console.log(r);
					},
					success: (r) => {
						console.log(r);
						thus.$net.upload(function(v) {
							if (type == 'thumb') {
								thus.form.thumb = v.fileUrl;
							} else if (type == 'thumbs') {
								thus.form.thumbList.push(v.fileUrl); // = thus.form.thumbs.concat();
							} else if (type == 'video') {
								thus.form.video = v.fileUrl;
							} else if (type == 'videoThumb') {
								thus.form.videoThumb = v.fileUrl;
							}

						}, r);


					}
				})

			},
			ViewImage(e) {

				var img = e.currentTarget.dataset.curImage;


			},
			DelImg(e) {
				var type = e.currentTarget.dataset.type;
				if (type == 'thumb') {
					this.form.thumb = '';
				} else if (type == 'thumbs') {
					var index = e.currentTarget.dataset.index;

					this.form.thumbList.splice(index, 1);
				} else if (type == 'video') {
					this.form.video = '';
				} else if (type == 'videoThumb') {
					this.form.videoThumb = '';
				}

			},
			uploadProduct() {
				this.form.thumbs = this.form.thumbList.join(",");
				this.form.categoryId.push(this.form.categoryIds);
				this.$net.fetch(function(v) {


				}, this.$net.addProduct, this.form, 'POST');
			}

		}
	}
</script>

<style>

</style>
