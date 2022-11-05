<template name="shop">
	<view class="margin-lg">

		<view>
			<view class="cu-form-group margin-lg round">
				<input v-model="form.title" class="margin-sm text-lg round bg-white " name="input"
					placeholder="请输入标题" />

				<button class="cu-btn bg-blue  margin-sm  cuIcon-search radius " @tap="search">搜索</button>
				<button class="cu-btn   lines-orange  margin-sm  cuIcon-refresh fl   round">重置</button>
			</view>
		</view>
		<view>
			<button class="cu-btn bg-blue  margin-sm  radius " @click="add">添加</button>
			<button class="cu-btn line-blue  margin-sm round" @click="editNull">编辑</button>
			<button class="cu-btn bg-red  margin-sm  radius" @click="delNull">删除</button>
		</view>
		<view class="cu-list    bg-white nav text-center " style="width: 100%; ">
			<view class="grid col-3 text-center">
				<view class="grid col-3 line-black ">
					<view class="cu-item  text-black" style="padding: 0px;margin:0px">
						编号
					</view>

					<view class="cu-item     text-black" style="padding: 0px;margin:0px">
						店铺
					</view>
					<view class="cu-item     text-black" style="padding: 0px;margin:0px">
						最后登陆
					</view>
				</view>


				<view class="grid col-3 ">
					<view class="cu-item     text-black" style="padding: 0px;margin:0px">
						保证金
					</view>
					<view class="cu-item     text-black" style="padding: 0px;margin:0px">
						状态
					</view>
					<view class="cu-item     text-black" style="padding: 0px;margin:0px">
						用户打分
					</view>


				</view>
				<view class="grid col-1 line-blue ">

					 
					<view class="cu-item     text-black" style="padding: 0px;margin:0px">
						操作
					</view>

				</view>
			</view>


			<view class="  text-center " :class="[index%2==0?'bg-gray':'','']" v-for="(item,index) in dataLits">
				<view class="grid col-3 text-center">
					<view class="grid col-3 ">
						<view class="cu-item " style="padding: 0px;margin:0px">
							<input class=" cu-item   text-blue" @tap="checkTmp"
								:class="[item.check?'cuIcon-squarecheckfill':'cuIcon-squarecheck']" :data-index="index"
								:data-title="item.title" :data-currentid="item.id">
							<!-- {{item.id}} -->
							</input>
						</view>
						
						<view class="cu-item    text-black" style="padding: 0px;margin:0px">
							{{item.shopName}}
						</view>
						<view class="cu-item  cuIcon-infofill text-blue " style="padding: 0px;margin:0px">
							{{item.lastLoginTime}}
						</view>
					</view>
					<view class="grid col-3 ">
						<view class="cu-item " style="padding: 0px;margin:0px">
							{{item.promAmount}}
						</view>

						<view class="cu-item    " style="padding: 0px;margin:0px">
							{{statusShow[item.shopStatus]}}
						</view>
						<view class="cu-item    text-black" style="padding: 0px;margin:0px">
							{{item.userScore}}
						</view>
					</view>

					 

					<view class="grid col-1 ">
						 


						<view class="cu-item    text-orange" style="padding: 0px;margin:0px">
							<!-- <button class="cu-btn sm round line-blue"  :data-index="index">详情</button> -->
							<button class="cu-btn sm round line-blue" @tap="edit" :data-index="index">编辑</button>

							<button class="cu-btn sm round line-red" @tap="del" :data-currentid="item.id"
								:data-title="item.title">删除</button>
						</view>

					</view>
				</view>
			</view>
		</view>

		<view class="fr margin-lg justify-center box">

			<view class="cu-bar btn-group margin-right-lg">
				<text class="text-blue">共{{total}}条</text>
				<text class="text-blue   margin-sm" @click="setPageParam" data-index="head">首页</text>
				<text class="text-blue" disabled @click="setPageParam" data-index="pre">上一页</text>
				<input class=" bg-white num text-center margin-sm" @confirm="setPageParam" data-index='current'
					style="width: 100rpx;" v-model="form.index" />
				<text class="text-blue" @click="setPageParam" data-index="next">下一页</text>
				<text class="text-blue margin-sm" @click="setPageParam" data-index="last">最后</text>
			</view>
		</view>



		<view class="cu-modal" style="z-index: 99;" :class="modalName=='add'?'show':''">
			<view class="cu-dialog bg-gray " style="width: 60%">
				<view class="cu-bar  bg-blue justify-end">
					<view class="content"> {{modify}} </view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="cu-form-group round margin-lg">
					<view> 店铺名</view>
					<input type="text" v-model="formData.shopName" placeholder="输入标题" />
				</view> 
				<view class="cu-bar bg-white margin-top">
					<view class="action"> 图片或视频 </view>
					<view class="action">   </view>
				</view>
				<view class="cu-form-group">
					<view class="grid col-4 grid-square flex-sub">
						<view @click="ViewImage('thumb')">
							<text class="cuIcon-cameraadd">

							</text>
							<image @click="ChooseImage('thumb')" :src="formData.avatar" mode='aspectFill'></image>
							<view class="cu-tag bg-red" @click="DelImg" data-type="thumb"> <text
									class="cuIcon-close"></text>
							</view>
						</view>
						 

					</view>

				</view>

			 	<view class="cu-form-group">
					<view>详情</view>
					<textarea class="solid line-blue text-left text-xsl" style="margin:20rpx;"
						v-model="formData.shopInfo"></textarea>
				</view>





				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub text-blue solid-left" @tap="hideModal">取消</view>
					<view class="action margin-0 flex-sub  solid-left" @tap="saveData">确定</view>
				</view>
			</view>
		</view>




	</view>
</template>

<script>
	export default {
		name: "shop",
		data() {
			return {
				thumbList: [],
				categoryIds: [],
				currentDate: "",
				categoryName: ['', ''],
				statusShow: ["正常", '禁用'],
				categoryNameShow: '',
				shopName: '',
				typeShow: ['', '实物', '虚拟商品', '电子卡密', '求购'],
				type: [{
						"id": 1,
						"name": "实物",
						"value": 1
					},
					{
						"id": 2,
						"name": "虚拟商品",
						"value": 2
					},
					{
						"id": 3,
						"name": "电子卡密",
						"value": 3
					},
					{
						"id": 4,
						"name": "求购",
						"value": 3
					}
				],
				typeName: "实物",
				multiArray: [],
				putawayTime: '',
				endTime: '',
				shops: [],
				formData: {
					title: ''
				},
				modify: '',
				modalName: '',
				total: 0,
				index: -1,
				title: '',
				currentId: 0,
				form: {
					index: 1,
					total: 1,
					pageSize: 10,
					pageNum: 1

				},
				dataLits: [],

			}
		},
		onShow() {
			console.log("success")
		},
		created() {
			console.log(this.multiArray)
			this.search();
			// this.loadCategory(0);
			// this.loadShop();
			this.currentDate = this.$net.getNowDate(0);
			this.current30Date = this.$net.getNowDate(30);
		},

		methods: {
			PickerTypeChange(e) {
				var index = e.detail.value
				console.log(e);
				this.typeName = this.type[index].name;
				this.formData.type = this.type[index].id;
			},
			PickerChange(e) {
				this.index = e.detail.value
				console.log(e);
				this.shopName = this.shops[this.index].shopName;
				this.formData.shopId = this.shops[this.index].shopId;
			},
			MultiChange(e) {
				this.categoryIds = e.detail.value

			},
			MultiColumnChange(e) {
				console.log(e.detail.value)
				var column = e.detail.column;
				var value = e.detail.value;

				if (column == 0) {
					this.categoryName[0] = this.multiArray[0][value].name;
					this.loadCategory(value);
				} else {
					this.categoryName[1] = this.multiArray[1][value].name;
				}
				console.log(this.categoryName)
				this.categoryNameShow = this.categoryName.join(',');

			},
			DateChange(e) {
				var type = e.currentTarget.dataset.type;
				console.log(type);
				if (type == 'putawayTime') {
					this.putawayTime = e.detail.value
				} else if (type == 'endTime') {
					this.endTime = e.detail.value
				}
				console.log(this.formData);

			},
			editNull() {
				this.modalName = 'add'
			},
			delNull() {
				var thus = this;
				uni.showModal({
					complete() {
						thus.delete(thus.currentId);
					},

					content: '确定删除' + thus.title + '吗'
				})
			},
			delete(id) {
				var thus = this;
				this.$net.fetch(function(v) {

					thus.search();
				}, this.$net.getShop + "/" + id, {}, 'DELETE');
			},
			del(e) {
				if (this.dataLits[this.index] != undefined)
					this.dataLits[this.index].check = false;
				var id = e.currentTarget.dataset.currentid;
				var title = e.currentTarget.dataset.title;
				var thus = this;
				uni.showModal({
					complete() {
						thus.delete(id);
					},
					content: '确定删除为' + title + '吗'

				})
			},

			checkTmp(e) {
				if (this.dataLits[this.index] != undefined) {
					this.dataLits[this.index].check = false;
				}

				this.currentId = e.currentTarget.dataset.currentid;
				this.title = e.currentTarget.dataset.title;
				this.index = e.currentTarget.dataset.index;

				if (this.dataLits[this.index] != undefined && this.dataLits[this.index].check == undefined) {
					this.dataLits[this.index].check = false;
				}
				this.dataLits[this.index].check = !this.dataLits[this.index].check;


				var tmp = this.dataLits[this.index];
				console.log(tmp);
				this.formData = tmp;
				this.thumbList = tmp.thumbs != undefined ? tmp.thumbs.split(',') : [];
				this.putawayTime = tmp.putawayTime;
				this.endTime = tmp.endTime;
				// this.modify='编辑';
				// this.modalName='add';
			},
			ChooseImage(type) {
				var thus = this;
				uni.chooseImage({
					complete: (r) => {
						//console.log(r);
					},
					success: (r) => {
						//console.log(r);
						thus.$net.upload(function(v) {
							if (type == 'thumb') {
								thus.formData.avatar = v.fileUrl;
							} else if (type == 'thumbs') {
								thus.thumbList = [...thus.thumbList, v.fileUrl];
							} else if (type == 'video') {
								thus.formData.video = v.fileUrl;
							} else if (type == 'videoThumb') {
								thus.formData.videoThumb = v.fileUrl;
							}
							//console.log(this.formData.thumbList);

						}, r);


					}
				})

			},
			ViewImage(e) {

				//var img = e.currentTarget.dataset.curImage;


			},
			DelImg(e) {
				//console.log(type);
				var type = e.currentTarget.dataset.type;

				if (type == 'thumb') {
					this.formData.avatar = '';
				} else if (type == 'thumbs') {
					var index = e.currentTarget.dataset.index;

					this.thumbList.splice(index, 1);
				} else if (type == 'video') {
					this.formData.video = '';
				} else if (type == 'videoThumb') {
					this.formData.videoThumb = '';
				}

			},
			uploadProduct() {
				this.formData.avatar = this.thumb; 
				var thus = this;
				this.$net.fetch(function(v) {
					thus.modalName = '';
					thus.search();
				}, this.$net.getShop, this.formData, this.formData.shopId > 0 ? "PUT" : 'POST');
			},

			saveData() {
				console.log("save");
				this.uploadProduct();

			},
			hideModal() {
				this.modalName = '';
			},
			add() {
				this.formData = {};
				this.putawayTime = this.$net.getNowDate(0);
				this.endTime = this.$net.getNowDate(30);
				this.modify = '添加';
				this.modalName = 'add';
			},
			edit(e) {
				if (this.dataLits[this.index] != undefined)
					this.dataLits[this.index].check = false;
				var index = e.currentTarget.dataset.index;
				console.log(index);
				var tmp = this.dataLits[index];
				console.log(tmp);
				this.formData = tmp;
				this.thumbList = tmp.thumbs != undefined ? tmp.thumbs.split(',') : [];
				this.putawayTime = tmp.putawayTime;
				this.endTime = tmp.endTime;
				this.modify = '编辑';
				this.modalName = 'add';
			},

			setPageParam(e) {

				var type = e.currentTarget.dataset.index;

				if (type == 'head') {
					this.form.pageNum = 1;
				} else if (type == 'pre') {
					if (Number.parseInt(this.form.pageNum) > 1) {
						this.form.pageNum = Number.parseInt(this.form.pageNum) - 1;
					} else {
						uni.showToast({
							title: '已在首页',
							icon: 'none'
						});
						return;
					}

				} else if (type == 'current') {
					this.form.pageNum = Number.parseInt(this.form.pageNum);
				} else if (type == 'next') {
					if (Number.parseInt(this.form.pageNum) < this.form.total) {

						this.form.pageNum = Number.parseInt(this.form.pageNum) + 1;
					} else {
						uni.showToast({
							title: '已经最后一页',
							icon: 'none'
						});
						return;
					}

				} else if (type == 'last') {
					this.form.pageNum = this.total == undefined ? 1 : this.total;
				}



				this.search();
			},
			search() {
				var thus = this;
				this.$net.fetch(
					(r) => {
						console.log(r);
						thus.dataLits = r.rows;
						thus.total = r.total;
						thus.form.total = Number.parseInt(r.total / thus.form.pageSize) + 1;
					},
					this.$net.getShop, thus.form,
					'GET'
				);
			},
			loadCategory(parentId) {
				var thus = this;
				this.$net.fetch(
					(r) => {
						console.log(r);
						if (parentId == 0) {
							this.categoryIds[0] = r.rows[0].id;
							this.categoryName[0] = r.rows[0].name;
							this.multiArray[0] = r.rows;
							thus.loadCategory(r.rows[0].id);
						} else {
							this.multiArray[1] = r.rows;
							this.categoryIds[1] = r.rows[0].id;
							this.categoryName[1] = r.rows[0].name;
						}

						this.categoryNameShow = this.categoryName.join(',');

					},
					this.$net.getCategory, {
						'parentId': parentId
					},
					'GET'
				);
			},
			loadShop() {
				var thus = this;
				this.$net.fetch(
					(r) => {
						console.log(r);
						thus.shops = r.rows;
						thus.shopName = r.rows[0].shopName;
					},
					this.$net.getShop, thus.form,
					'GET'
				);
			},
		}
	}
</script>

<style>
	.page {
		height: 100vh;
		background: white;

	}
</style>
