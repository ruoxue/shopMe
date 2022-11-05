<template name="product">
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
					名称
				</view>
				<view class="flex-sub     text-black" style="padding: 0px;margin:0px">
					店铺
				</view>

				<view class="flex-sub     text-black" style="padding: 0px;margin:0px">
					浏览数
				</view>

				<view class="flex-sub     text-black" style="padding: 0px;margin:0px">
					销量
				</view>
				<view class="flex-sub     text-black" style="padding: 0px;margin:0px">
					商品类型
				</view>

				<view class="flex-sub     text-black" style="padding: 0px;margin:0px">
					主图
				</view>
				<view class="flex-sub     text-black" style="padding: 0px;margin:0px">
					状态
				</view>
				<view class="flex-sub     text-black" style="padding: 0px;margin:0px">
					售价
				</view>



				<view class="flex-sub     text-black" style="padding: 0px;margin:0px">
					原价
				</view>
			 
				<view class="flex-sub     text-black" style="padding: 0px;margin:0px">
					操作
				</view>

			</view>


			<view class="  text-center cu-form-group" :class="[index%2==0?'bg-gray':'','']"
				v-for="(item,index) in dataLits">
				<view class="flex-sub " style="padding: 0px;margin:0px">
					<input class=" flex-sub   text-blue" @tap="checkTmp"
						:class="[item.check?'cuIcon-squarecheckfill':'cuIcon-squarecheck']" :data-index="index"
						:data-title="item.title" :data-currentid="item.id">
					<!-- {{item.id}} -->
					</input>
				</view>
				<view class="flex-sub  cuIcon-infofill text-blue " style="padding: 0px;margin:0px">
					{{item.title}}
				</view>
				<view class="flex-sub    text-black" style="padding: 0px;margin:0px">
					{{item.shopName}}
				</view>
				<view class="flex-sub " style="padding: 0px;margin:0px">
					{{item.viewCount}}
				</view>

				<view class="flex-sub    " style="padding: 0px;margin:0px">
					{{item.salesCount}}
				</view>
				<view class="flex-sub    text-black" style="padding: 0px;margin:0px">
					{{typeShow[item.type]}}
				</view>
				<view class="flex-sub   " style="padding: 0px;margin:0px">
					<image :src="item.thumb" class="cu-avatar"></image>
				</view>
				<view class="flex-sub    text-black" style="padding: 0px;margin:0px">
					{{statusShow[item.status]}}

				</view>
				<view class="flex-sub   text-price" style="padding: 0px;margin:0px">
					{{item.price}}
				</view>
				<view class="flex-sub   text-price" style="padding: 0px;margin:0px">
					{{item.originalPrice}}
				</view> 

				<view class="flex-sub    text-orange" style="padding: 0px;margin:0px">
					<!-- <button class="cu-btn sm round line-blue"  :data-index="index">详情</button> -->
					<button class="cu-btn sm round line-blue" @tap="edit" :data-index="index">编辑</button>

					<button class="cu-btn sm round line-red" @tap="del" :data-currentid="item.id"
						:data-title="item.title">删除</button>

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
					<view> 输入标题</view>
					<input type="text" v-model="formData.title" placeholder="输入标题" />
				</view>

				<view class="cu-form-group round margin-lg">
					<view> 输入短标题</view>
					<input type="text" v-model="formData.shortTitle" placeholder="输入短标题" />

					<view> 输入副标题</view>
					<input type="text" v-model="formData.subTitle" placeholder="输入副标题" />
				</view>

				<view class="cu-form-group round margin-lg">
					<view> 商品类型</view>
					<picker @change="PickerTypeChange" range-key="name" :range="type">
						<view class="picker" style="text-align: center;">

							{{typeName}}
						</view>
					</picker>
					<view> 店铺</view>
					<picker @change="PickerChange" range-key='shopName' :value="shopId" :range="shops">
						<view class="picker" style="text-align: center;">
							{{shopName}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group round margin-lg">
					<view> 售价</view>
					<input type="number" v-model="formData.price" placeholder="售价" />

					<view> 原价</view>
					<input type="number" v-model="formData.originalPrice" placeholder="原价" />
				</view>
				<view class="cu-form-group round margin-lg">
					<view> 是否快速提交
						<switch :checked="formData.auto==1" :class="formData.auto==1 ? 'checked' : 'check'" color="#f00"
							type="switch" @change="switch1Change" />
					</view>
					<view>
						<picker @change="formateChange" range-key="name" :value="formData.formateId" :range="formates">
							选择上送格式&nbsp;&nbsp;&nbsp;&nbsp;<text class="picker margin-left-lg"
								style="text-align: center;">
								{{formateName}}
							</text>
						</picker>

					</view>
				</view>


				<view class="cu-form-group round margin-lg no-border">

					请选择分类
					<uni-data-picker :localdata="categoryIds" popup-title="请选择分类" :preload='border' :border="border"
						placeholder="请选择分类" @change="onchange" v-model="formData.categoryId" :map="map"
						@nodeclick="onnodeclick"></uni-data-picker>

				</view>





				<view class="cu-form-group round margin-lg">
					<view> 上架时间</view>

					<picker mode="date" :value="putawayTime" data-type="putawayTime" :start="currentDate"
						@change="DateChange">
						<view class="line-blue">
							{{putawayTime}}
						</view>
					</picker>


					<view> 下架时间</view>
					<picker mode="date" :value="endTime" :start="currentDate" data-type="endTime" @change="DateChange">
						<view class="line-red">
							{{endTime}}
						</view>
					</picker>

				</view>

				<view class="cu-bar bg-white margin-top">
					<view class="action"> 图片或视频 </view>
					<view class="action"> 依次为（主图、视频首页、视频） </view>
				</view>
				<view class="cu-form-group">
					<view class="grid col-4 grid-square flex-sub">
						<view @click="ViewImage('thumb')">
							<text class="cuIcon-cameraadd">

							</text>
							<image @click="ChooseImage('thumb')" :src="formData.thumb" mode='aspectFill'></image>
							<view class="cu-tag bg-red" @click="DelImg" data-type="thumb"> <text
									class="cuIcon-close"></text>
							</view>
						</view>
						<view @click="ViewImage()">
							<text class="cuIcon-cameraadd"></text>
							<image @click="ChooseImage('videoThumb')" :src="formData.videoThumb" mode='aspectFill'>
							</image>
							<view class="cu-tag bg-red" @click="DelImg" data-type="videoThumb"> <text
									class="cuIcon-close"></text>
							</view>
						</view>
						<view @click="ViewImage()">
							<text class="cuIcon-cameraadd"></text>
							<image @click="ChooseImage('video')" :src="formData.video" mode='aspectFill'></image>
							<view class="cu-tag bg-red" @click="DelImg" data-type="video"> <text
									class="cuIcon-close"></text>
							</view>
						</view>

					</view>

				</view>

				<view class="cu-bar bg-white margin-top">
					<view class="action"> 轮播图 </view>
					<view class="action"> {{ thumbList.length}}张 </view>
				</view>
				<view class="cu-form-group">
					<view class="grid col-4 grid-square flex-sub">
						<view @click="ViewImage()" v-for="(item, index) in thumbList" :key="item" :data-url="item">

							<image :src="item" mode='aspectFill'></image>
							<view class="cu-tag bg-red" @click="DelImg" :data-index="index" data-type="thumbs"> <text
									class="cuIcon-close"></text>
							</view>
						</view>
						<view class="solids" @click="ChooseImage('thumbs')"> <text class="cuIcon-cameraadd"></text>
						</view>
					</view>
				</view>

				<view>
					<sku ref="skuPopup"></sku>
				</view>



				<view class="cu-form-group  bg-gray padding-bottom-lg">

					<view class='wrapper'>
						<view class='toolbar' @tap="format" style="overflow-y: auto;">
							<view :class="formats.bold ? 'ql-active' : ''" class="iconfont icon-zitijiacu"
								data-name="bold"></view>
							<view :class="formats.italic ? 'ql-active' : ''" class="iconfont icon-zitixieti"
								data-name="italic"></view>
							<view :class="formats.underline ? 'ql-active' : ''" class="iconfont icon-zitixiahuaxian"
								data-name="underline"></view>
							<view :class="formats.strike ? 'ql-active' : ''" class="iconfont icon-zitishanchuxian"
								data-name="strike"></view>
							<view :class="formats.align === 'left' ? 'ql-active' : ''" class="iconfont icon-zuoduiqi"
								data-name="align" data-value="left"></view>
							<view :class="formats.align === 'center' ? 'ql-active' : ''"
								class="iconfont icon-juzhongduiqi" data-name="align" data-value="center"></view>
							<view :class="formats.align === 'right' ? 'ql-active' : ''" class="iconfont icon-youduiqi"
								data-name="align" data-value="right"></view>
							<view :class="formats.align === 'justify' ? 'ql-active' : ''"
								class="iconfont icon-zuoyouduiqi" data-name="align" data-value="justify"></view>
							<view :class="formats.lineHeight ? 'ql-active' : ''" class="iconfont icon-line-height"
								data-name="lineHeight" data-value="2"></view>
							<view :class="formats.letterSpacing ? 'ql-active' : ''"
								class="iconfont icon-Character-Spacing" data-name="letterSpacing" data-value="2em">
							</view>
							<view :class="formats.marginTop ? 'ql-active' : ''"
								class="iconfont icon-722bianjiqi_duanqianju" data-name="marginTop" data-value="20px">
							</view>
							<view :class="formats.previewarginBottom ? 'ql-active' : ''"
								class="iconfont icon-723bianjiqi_duanhouju" data-name="marginBottom" data-value="20px">
							</view>
							<view class="iconfont icon-clearedformat" @tap="removeFormat"></view>
							<view :class="formats.fontFamily ? 'ql-active' : ''" class="iconfont icon-font"
								data-name="fontFamily" data-value="Pacifico"></view>
							<view :class="formats.fontSize === '24px' ? 'ql-active' : ''" class="iconfont icon-fontsize"
								data-name="fontSize" data-value="24px"></view>

							<view :class="formats.color === '#0000ff' ? 'ql-active' : ''"
								class="iconfont icon-text_color" data-name="color" data-value="#0000ff"></view>
							<view :class="formats.backgroundColor === '#00ff00' ? 'ql-active' : ''"
								class="iconfont icon-fontbgcolor" data-name="backgroundColor" data-value="#00ff00">
							</view>

							<view class="iconfont icon-date" @tap="insertDate"></view>
							<view class="iconfont icon--checklist" data-name="list" data-value="check"></view>
							<view :class="formats.list === 'ordered' ? 'ql-active' : ''"
								class="iconfont icon-youxupailie" data-name="list" data-value="ordered"></view>
							<view :class="formats.list === 'bullet' ? 'ql-active' : ''" class="iconfont icon-wuxupailie"
								data-name="list" data-value="bullet"></view>
							<view class="iconfont icon-undo" @tap="undo"></view>
							<view class="iconfont icon-redo" @tap="redo"></view>

							<view class="iconfont icon-outdent" data-name="indent" data-value="-1"></view>
							<view class="iconfont icon-indent" data-name="indent" data-value="+1"></view>
							<view class="iconfont icon-fengexian" @tap="insertDivider"></view>
							<view class="iconfont icon-charutupian" @tap="insertImage"></view>
							<view :class="formats.header === 1 ? 'ql-active' : ''" class="iconfont icon-format-header-1"
								data-name="header" :data-value="1"></view>
							<view :class="formats.script === 'sub' ? 'ql-active' : ''" class="iconfont icon-zitixiabiao"
								data-name="script" data-value="sub"></view>
							<view :class="formats.script === 'super' ? 'ql-active' : ''"
								class="iconfont icon-zitishangbiao" data-name="script" data-value="super"></view>
							<view class="iconfont icon-shanchu" @tap="clear"></view>
							<view :class="formats.direction === 'rtl' ? 'ql-active' : ''"
								class="iconfont icon-direction-rtl" data-name="direction" data-value="rtl"></view>

						</view>

						<view class="editor-wrapper ">
							<editor id="editor" class="ql-container" @input="getContent" placeholder="开始输入..."
								showImgSize showImgToolbar showImgResize @statuschange="onStatusChange"
								:read-only="readOnly" @ready="onEditorReady">
							</editor>
						</view>
					</view>

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
		name: "product",
		data() {
			return {

				map: {
					text: 'name',
					value: 'id'
				},
				border: false,
				readOnly: false,
				formats: {},
				thumbList: [],
				categoryIds: [{
					'id': 0,
					'name': ''
				}],
				currentDate: "",
				statusShow: ["放置仓库", '上架售卖', '上架隐藏'],
				shopName: '',
				shopId: 0,
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
						"value": 4
					}
				],
				typeName: "实物",
				putawayTime: '',
				endTime: '',
				shops: [{
					'shopId': 0,
					'shopName': ''
				}],
				formates: [{
					'id': 0,
					'name': ''
				}],
				formateName: '',
				formData: {
					title: ''
				},
				modify: '',
				modalName: '',
				total: 0,
				index: -1,
				title: '',
				currentId: 0,
				tableData: [],
				specArr: [],
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
			this.loadCategory(0);
			this.loadShop();
			this.loadPayCommitFormate();
			this.currentDate = this.$net.getNowDate(0);
			this.current30Date = this.$net.getNowDate(30);

		},

		methods: {


			switch1Change(e) {
				this.formData.auto = e.detail.value ? 1 : 0;
				console.log(this.formData.auto);
			},
			onchange(e) {
				const value = e.detail.value
				console.log(value)
			},
			onnodeclick(node) {},
			confirm(e) {
				this.result = '';
				e.map((val, index) => {
					// this.result += this.result == '' ? val.label : '-' + val.label;
					let result = val.label
					this.result += result;
				})
			},
			cancel(e) {
				console.log(e);
			},

			readOnlyChange() {
				this.readOnly = !this.readOnly
			},
			onEditorReady() {
				var thus = this;
				uni.createSelectorQuery().select('#editor').context((res) => {
					this.editorCtx = res.context
					let tmp = {
						html: thus.formData.content
					};
					thus.editorCtx.setContents(tmp);


				}).exec()
			},
			undo() {
				this.editorCtx.undo()
			},
			redo() {
				this.editorCtx.redo()
			},
			getContent(e) {
				var html = e.detail.html;
				this.formData.content = html;

			},
			format(e) {
				let {
					name,
					value
				} = e.target.dataset
				if (!name) return
				// console.log('format', name, value)
				this.editorCtx.format(name, value)

			},
			onStatusChange(e) {
				const formats = e.detail
				this.formats = formats
			},
			insertDivider() {
				this.editorCtx.insertDivider({
					success: function() {
						console.log('insert divider success')
					}
				})
			},
			clear() {
				this.editorCtx.clear({
					success: function(res) {
						console.log("clear success")
					}
				})
			},
			removeFormat() {
				this.editorCtx.removeFormat()

			},
			insertDate() {
				const date = new Date()
				const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
				this.editorCtx.insertText({
					text: formatDate
				})
			},
			insertImage() {
				this.ChooseImage("content");
			},
			PickerTypeChange(e) {
				var index = e.detail.value
				console.log(e);
				this.typeName = this.type[index].name;
				this.formData.type = this.type[index].id;
			},
			PickerChange(e) {
				this.index = e.detail.value

				this.shopName = this.shops[this.index].shopName;
				this.formData.shopId = this.shops[this.index].shopId;
			},
			formateChange(e) {
				this.index = e.detail.value

				this.formateName = this.formates[this.index].name;
				this.formData.formateId = this.formates[this.index].id;
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
				}, this.$net.addProduct + "/" + id, {}, 'DELETE');
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
				this.formData = tmp;
				this.thumbList = (tmp.thumbs != undefined && tmp.thumbs != '') ? tmp.thumbs.split(',') : [];
				this.putawayTime = tmp.putawayTime;
				this.endTime = tmp.endTime;

			},
			ChooseImage(type) {
				var thus = this;
				uni.chooseImage({
					count: 1,
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
							} else if (type == 'content') {
								thus.editorCtx.insertImage({
									src: v.fileUrl,
									alt: '图像',
									success: function() {
										console.log('insert image success')
									}
								})
							}

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
				this.formData.specArr = this.$refs.skuPopup.specArr;
				this.formData.skus = this.$refs.skuPopup.tableData;
				this.formData.thumbs = this.thumbList.join(",");
				this.formData.putawayTime = this.putawayTime;
				this.formData.endTime = this.endTime + " 23:59:59"

				if (this.shopId != undefined) {

					this.formData.shopId = this.shopId;
				} else {
					this.formData.content = '';
				}


				if (this.formData.content != undefined) {

					this.formData.content = encodeURIComponent(this.formData.content);
				} else {
					this.formData.content = '';
				}

				var thus = this;


				this.formData.stock = this.formData.skus.reduce(function(prev, curr) {
					return Number.parseInt(prev.stock) + Number.parseInt(curr.stock);
				});


				this.$net.fetch(function(v) {
					thus.modalName = '';
					this.formData.content = decodeURIComponent(this.formData.content);
					thus.search();
				}, this.$net.addProduct, this.formData, this.formData.id > 0 ? "PUT" : 'POST');
			},

			saveData() {
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
				var thus = this;
				if (this.dataLits[this.index] != undefined)
					this.dataLits[this.index].check = false;
				var index = e.currentTarget.dataset.index;
				var tmp = this.dataLits[index];
				this.formData = tmp;
				thus.$net.fetch((r2) => {
					thus.specArr = r2.rows;
					thus.$net.fetch((r2) => {
						thus.tableData = r2.rows;
						thus.realEdit();
					}, thus.$net.productSku + "/" + thus.formData.id, '', 'GET');

				}, thus.$net.productSpec + "/" + thus.formData.id, '', 'GET');

			},
			realEdit() {

				this.formData.content = decodeURIComponent(this.formData.content);
				this.$refs.skuPopup.initSku(this.tableData, this.specArr);
				let tmpcontent = {
					html: this.formData.content
				};
				this.editorCtx.setContents(tmpcontent);
				this.thumbList = (this.formData.thumbs != undefined && this.formData.thumbs != '') ? this.formData.thumbs
					.split(',') : [];
				this.putawayTime = this.formData.putawayTime;
				this.endTime = this.formData.endTime;
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
					this.$net.getMineGoods, thus.form,
					'GET'
				);
			},
			loadCategory(parentId) {
				var thus = this;
				this.$net.fetch(
					(r) => {
						thus.categoryIds = r.rows;
						console.log(thus.formData.categoryId);
						// thus.formData.categoryId='1-3';

					},
					this.$net.getCategory, {
						'parentId': parentId,
						'tree': 1
					},
					'GET'
				);
			},
			loadShop() {
				var thus = this;
				this.$net.fetch(
					(r) => {

						thus.shops = r.rows;
						thus.shopName = r.rows[0].shopName;
						thus.shopId = r.rows[0].shopId;

					},
					this.$net.getShop, thus.form,
					'GET'
				);
			},
			loadPayCommitFormate() {
				var thus = this;
				this.$net.fetch(
					(r) => {
						console.log(r);
						thus.formates = r.rows;
						thus.formateName = r.rows[0].name;
					},
					this.$net.payCommitFormate, {},
					'GET'
				);
			},
		}
	}
</script>

<style>
	@import "./editor-icon.css";

	.page-body {
		height: calc(100vh - var(--window-top) - var(--status-bar-height));
	}

	.wrapper {
		height: 100%;
	}

	.editor-wrapper {
		height: calc(100vh - var(--window-top) - var(--status-bar-height) - 140px);
		background: #fff;
	}

	.iconfont {
		display: inline-block;
		padding: 8px 8px;
		width: 24px;
		height: 24px;
		cursor: pointer;
		font-size: 20px;
	}

	.toolbar {
		box-sizing: border-box;
		border-bottom: 0;
		font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
	}


	.ql-container {
		box-sizing: border-box;
		padding: 12px 15px;
		width: 100%;
		min-height: 30vh;
		height: 100%;
		margin-top: 20px;
		font-size: 16px;
		line-height: 1.5;
	}

	.ql-active {
		color: #06c;
	}

	.page {
		height: 100vh;
		background: white;

	}
</style>
