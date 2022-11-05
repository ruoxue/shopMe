<template>
	<view >
		<view>
			<view class="cu-list  flex-sub">
				<view class="bg-img cu-item menu arrow cu-form-group" v-for="item in fileList">
					<text>
						{{getFileName(item.name)}}
					</text>
					<text class="cu-tag cuIcon-delete" @click="handleRemove(item,fileList)"></text>
				</view>
			</view>
		</view>
		 
		<button class="btn cu-btn bg-blue margin-bottom-sm margin-top-sm text-lg "   @click="handleImage()">上传</button>
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
				uploading: false,
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
			// 获取文件名称
			getFileName(name) {
				if (name.lastIndexOf("/") > -1) {
					return name.slice(name.lastIndexOf("/") + 1);
				} else {
					return "";
				}
			},
			handleImage() {
				var thus = this;
				thus.uploading = true;
				uni.chooseFile({
					complete: (r) => {
						thus.uploading = false;
					},
					success: (r) => {
						this.number++;
						thus.net.upload(function(v) {
							thus.handleUploadSuccess(v);
						}, r);

					},
					fail() {
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
