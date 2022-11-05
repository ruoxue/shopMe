<template name="order">
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
			<view class="cu-form-group bg-gradual-purple ">

				<view class="flex-sub  text-black" style="padding: 0px;margin:0px">
					编号
				</view>
				<view class=" flex-sub   text-black  no-border " style="padding: 0px;margin:0px">
					订单号
				</view>


				<view class="flex-sub     text-black" style="padding: 0px;margin:0px">
					状态
				</view>
				<view class="flex-sub     text-black" style="padding: 0px;margin:0px">
					订单金额
				</view>


				<view class="flex-sub     text-black" style="padding: 0px;margin:0px">
					店铺
				</view>
				<view class="flex-sub     text-black" style="padding: 0px;margin:0px">
					类型
				</view>

				<view class="flex-sub     text-black" style="padding: 0px;margin:0px">
					支付详情
				</view>
				<view class="flex-sub     text-black" style="padding: 0px;margin:0px">
					操作
				</view>

			</view>


			<view class="  text-center  cu-form-group" :class="[index%2==0?'bg-gray':'','']"
				v-for="(item,index) in dataLits">


				<view class="flex-sub " style="padding: 0px;margin:0px">
					<input class=" flex-sub   text-blue" @tap="checkTmp"
						:class="[item.check?'cuIcon-squarecheckfill':'cuIcon-squarecheck']" :data-index="index"
						:data-title="item.title" :data-currentid="item.orderId">

					</input>
				</view>
				<view class="flex-sub" style="padding: 0px;margin:0px;max-width: 10%;">
					<view>
						{{item.orderId.substring(0,10)}}
					</view>
					<view>

						{{item.orderId.substring(10)}}
					</view>
				</view>

				<view class="flex-sub    text-black" style="padding: 0px;margin:0px">
					{{$net.getOrderStatus(item.orderStatus,item.type)}}
				</view>
				<view class="flex-sub text-red   text-price" style="padding: 0px;margin:0px">
					{{item.totalPrice}}
				</view>
				<view class="flex-sub    text-black" style="padding: 0px;margin:0px">
					{{item.shopName}}
				</view>
				<view class="flex-sub    text-black" style="padding: 0px;margin:0px">
					{{$net.getType(item.type)}}
				</view>

				<view class="flex-sub    text-orange" style="padding: 0px;margin:0px">
					<button class="cu-btn sm round line-blue " :data-index="item.orderId" @tap="orderPayShow">
						支付详情
					</button>
				</view>
				<view class="flex-sub    text-orange" style="padding: 0px;margin:0px">
					<button class="cu-btn sm round line-blue " :data-index="item.orderId" @tap="orderPayShow">
						支付详情
					</button>
				</view>
			</view>
		</view>

		<view class="fr margin-lg justify-center box">

			<view class="cu-bar btn-group margin-right-lg">
				<text class="text-blue   margin-sm" @click="setPageParam" data-index="head">首页</text>
				<text class="text-blue" disabled @click="setPageParam" data-index="pre">上一页</text>
				<input class=" bg-white num text-center margin-sm" @confirm="setPageParam" data-index='current'
					style="width: 100rpx;" v-model="form.index" />
				<text class="text-blue" @click="setPageParam" data-index="next">下一页</text>
				<text class="text-blue margin-sm" @click="setPageParam" data-index="last">最后</text>
			</view>
		</view>

		<view class="cu-modal" :class="modalName=='mechant'?'show':''">

			<view class="cu-dialog bg-gray " style="width: 60%;">

				<view class="cu-bar bg-white justify-end">
					<view class="content"> 选择供应商 </view>



					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>


				<view class="cu-form-group round margin-lg">

					<uni-data-picker :localdata="commitIds" popup-title="选择供应商" :preload='border' :border="border"
						placeholder="选择供应商" @change="onchange" v-model="formData.commitId" :map="map"
						@nodeclick="onnodeclick"></uni-data-picker>


				</view>
				<view style="height: 30vh;">




				</view>


				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub text-blue solid-left" @tap="hideModal">取消</view>
					<view class="action margin-0 flex-sub  solid-left" @tap="saveData">确定</view>
				</view>
			</view>

		</view>

		<view class="cu-modal" :class="modalName=='add'?'show':''">
			<view class="cu-dialog bg-gray " style="width: 60%;">
				<view class="cu-bar bg-white justify-end">
					<view class="content"> {{modify}} </view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>


				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub text-blue solid-left" @tap="hideModal">取消</view>
					<view class="action margin-0 flex-sub  solid-left" @tap="saveData">提交</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='orderPay'?'show':''" style="z-index: 99;">
			<view class="cu-dialog bg-gray " style="width: 60%;">
				<view class="cu-bar bg-white justify-end">
					<view class="content"> {{modify}} </view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<orderPay ref="orderPay"></orderPay>
			</view>

		</view>
		<view class="cu-modal" :class="modalName=='pay'?'show':''" style="z-index: 99;">
			<view class="cu-dialog bg-gray " style="width: 60%;">
				<view class="cu-bar bg-white justify-end">
					<view class="content"> {{modify}} </view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>

				<view class="cu-form-group">
					<view>
						<picker @change="PickerChange" range-key='name' :range="channels">
							<view class="picker" style="text-align: center;">
								{{channelName}}
							</view>
						</picker>
					</view>

				</view>


				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub text-blue solid-left" @tap="hideModal">取消</view>
					<view class="action margin-0 flex-sub  solid-left" @tap="payReal">打款</view>
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		name: "order",
		data() {
			return {
				thumbList: [],
				formData: {

					title: '123'
				},
				modify: '',
				modalName: '',
				total: 0,
				index: 0,
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
			this.search();
		},
		methods: {orderPayShow(e) {
				var index = e.currentTarget.dataset.index;
				this.formData.orderId = index;
				var thus = this;

				this.$net.fetch(function(v) {
					console.log(v);
					thus.$refs.orderPay.init(v.rows);


					thus.modalName = 'orderPay'
					thus.modify = '支付详情'
				}, this.$net.buyerPayment, {
					'orderId': this.formData.orderId

				}, 'get');

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

			},
			del(e) {
				this.dataLits[this.index].check = false;
				var id = e.currentTarget.dataset.currentid;
				var title = e.currentTarget.dataset.title;

				uni.showModal({
					complete() {
						thus.delete(id);
					},
					content: '确定删除为' + title + '吗'

				})
			},

			checkTmp(e) {
				this.dataLits[this.index].check = false;
				this.currentId = e.currentTarget.dataset.currentid;
				this.title = e.currentTarget.dataset.title;
				this.index = e.currentTarget.dataset.index;

				if (this.dataLits[this.index].check == undefined) {
					this.dataLits[this.index].check = false;
				}
				this.dataLits[this.index].check = !this.dataLits[this.index].check;


				var tmp = this.dataLits[this.index];

				this.formData = tmp;
				this.thumbList = tmp.thumbs != undefined ? tmp.thumbs.split(',') : [];
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
								thus.formData.thumb = v.fileUrl;
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
					this.formData.thumb = '';
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
				this.formData.thumbs = this.thumbList.join(",");
				this.formData.categoryId.push(this.formData.categoryIds);
				this.$net.fetch(function(v) {}, this.$net.addProduct, this.formData, 'POST');
			},

			saveData() {
				console.log("save")
			},
			hideModal() {
				this.modalName = '';
			},
			add() {
				this.modify = '添加';
				this.modalName = 'add';
			},
			edit(e) {
				this.dataLits[this.index].check = false;
				var index = e.currentTarget.dataset.index;
				console.log(index);
				var tmp = this.dataLits[index];
				console.log(tmp);
				this.formData = tmp;
				this.thumbList = tmp.thumbs != undefined ? tmp.thumbs.split(',') : [];

				this.modify = '编辑';
				this.modalName = 'add';
			},

			setPageParam(e) {

				var type = e.currentTarget.dataset.index;

				if (type == 'head') {
					this.form.index = 1;
				} else if (type == 'pre') {
					if (Number.parseInt(this.form.index) > 1) {
						this.form.index = Number.parseInt(this.form.index) - 1;
					} else {
						uni.showToast({
							title: '已在首页',
							icon: 'none'
						});
						return;
					}

				} else if (type == 'current') {
					this.form.index = Number.parseInt(this.form.index);
				} else if (type == 'next') {
					if (Number.parseInt(this.form.index) < this.form.total) {

						this.form.index = Number.parseInt(this.form.index) + 1;
					} else {
						uni.showToast({
							title: '已经最后一页',
							icon: 'none'
						});
						return;
					}

				} else if (type == 'last') {
					this.form.index = this.form.total == undefined ? 1 : this.form.total;
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
					this.$net.getBuyList, thus.form,
					'GET'
				);
			},
		}
	}
</script>

<style>
	.page {
		height: 100vh;

	}

	.cu-list.grid.col-6>.cu-item:nth-child(6n):after {
		border-right-width: 0
	}
</style>
