<template>

	<view class="grid col-3 grid-square flex-sub">
		<view class="bg-img" v-for="item in fileList">
			<text class="cuIcon-loading"></text>
			<image mode='aspectFill' :src="item.url"></image>
			<view class="cu-tag bg-red" @click="handleRemove(item,fileList)" > 
			<text class="cuIcon-close"></text>
			</view>
		</view>
		<view class="bg-img">
			<text class="cuIcon-cameraadd" @click="handleImage()"></text>
		</view>

		<!-- 上传提示 -->
		<div class="el-upload__tip" slot="tip" v-if="showTip">
			请上传
			<template v-if="fileSize"> 大小不超过 <b style="color: #f56c6c">{{ fileSize }}MB</b> </template>
			<template v-if="fileType"> 格式为 <b style="color: #f56c6c">{{ fileType.join("/") }}</b> </template>
			的文件
		</div>
	</view>

</template>

<script>
	export default {
		props: {
			value: [String, Object, Array],
			// 图片数量限制
			limit: {
				type: Number,
				default: 9,
			},
			// 大小限制(MB)
			fileSize: {
				type: Number,
				default: 10,
			},
			// 文件类型, 例如['png', 'jpg', 'jpeg']
			fileType: {
				type: Array,
				default: () => ["png", "jpg", "jpeg"],
			},
			// 是否显示提示
			isShowTip: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				number: 0,
				uploadList: [],
				dialogImageUrl: "",
				dialogVisible: false,
				hideUpload: false,
				uploading:false,
				headers: {
					Authorization: "Bearer ",
				},
				fileList: []
			};
		},
		watch: {
			value: {
				handler(val) {
					
					if (val) {
						// 首先将值转为数组
						const list = Array.isArray(val) ? val : this.value.split(',');
						// 然后将数组转为对象数组
						this.fileList = list.map(item => {
							if (typeof item === "string") {
								item = {
									name: item,
									url: item
								};
							}
							
							return item;
						});
						
						console.log(this.fileList);
						
					} else {
						this.fileList = [];
						return [];
					}
				},
				deep: true,
				immediate: true
			}
		},
		computed: {
			// 是否显示提示
			showTip() {
				return this.isShowTip && (this.fileType || this.fileSize);
			},
		},
		methods: {

			handleImage() {
				var thus = this; 
				thus.uploading=true; 
				uni.chooseImage({
					complete: (r) => {
						thus.uploading=false;
					}, 
					success: (r) => {
						this.number++;
						thus.net.upload(function(v) {
							thus.handleUploadSuccess(v);
						}, r);

					}, fail() {
						uni.showToast({
							icon: "error",
							title: '上传失败'
						})
					}
				});
			},
			// 删除图片
			handleRemove(file, fileList) {
				const findex = this.fileList.map(f => f.name).indexOf(file.name);
				if (findex > -1) {
					this.fileList.splice(findex, 1);
					this.$emit("input", this.listToString(this.fileList));
				}
			},
			// 上传成功回调
			handleUploadSuccess(res) {
				this.uploadList.push({
					name: res.data.name,
					url: res.data.url
				});
				if (this.uploadList.length === this.number) {
					this.fileList = this.fileList.concat(this.uploadList);
					this.uploadList = [];
					this.number = 0; 
					this.$emit("input", this.listToString(this.fileList));
					//this.$modal.closeLoading();
				}
			},
			 
			// 对象转成指定字符串分隔
			listToString(list, separator) {
				let strs = "";
				separator = separator || ",";
				for (let i in list) {
					strs += list[i].url + separator;
				}
				return strs != '' ? strs.substr(0, strs.length - 1) : '';
			}
		}
	};
</script>
<style scoped lang="scss">
	// .el-upload--picture-card 控制加号部分
	::v-deep.hide .el-upload--picture-card {
		display: none;
	}

	// 去掉动画效果
	::v-deep .el-list-enter-active,
	::v-deep .el-list-leave-active {
		transition: all 0s;
	}

	::v-deep .el-list-enter,
	.el-list-leave-active {
		opacity: 0;
		transform: translateY(0);
	}
</style>
