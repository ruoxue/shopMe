<template>
	<div>
		<form @submit.native.prevent>
			<view class="cu-list grid margin-sm cu-form-group" style="width: 50%;">
				<view class="cu-form-group">规格组</view>
				<input onkeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" placeholder="请输入规格组"
					v-model="specName" class="cu-form-group solid input " style="width: 300rpx;"
					@keyup.enter.native="createdSpecifi">
				<button class="cu-btn bg-blue  margin-sm  radius " @click="createdSpecifi">设置</button>

			</view>
			<view class="margin-sm " style="margin: 10px 0 20px 0">
				<div class="introTitle " v-for="(tab, indexs) in specArr" :key="indexs">
					<view class="margin-bottom-sm bg-white padding-sm text-left">
						<text class="fontWidth">规格组</text>
						<text class="fontWidth bg-gray">{{tab.name}}</text>
						<text class="delete  bg-grey fontWidth" @click="clearSpe(indexs)">×</text>
					</view>

					<div class="introCon">
						<view>
							<view class="cu-list grid ">

								<view class="cu-form-group">规格值</view>
								<view v-for="(val, index) in tab.conName" :key="index">

									<view class="margin-sm ">

										<text class="bg-gray  fontWidth">{{val}}</text>
										<text class="delete bg-grey fontWidth"
											@click="clearSpecif(indexs, index)">×</text>
									</view>

								</view>
								<view class="cu-list grid  cu-form-group  padding-left-xs" style="width: 30%;">

									<input class="cu-form-group solid"
										onkeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"
										size="small" placeholder="请输入规格值" v-model="tab.addField"
										@keyup.enter.native="clickSpecVal(indexs, tab.addField)" />

									<button class="cu-btn bg-blue  margin-sm  radius "
										@click="clickSpecVal(indexs, tab.addField)">设置</button>
								</view>
							</view>
						</view>
					</div>
				</div>
			</view>
			<view class="cu-list margin-sm cu-form-group grid padding-left-xs " style="width: 100%;"
				v-if="tableData.length > 0">
				批量设置
				<input class="  menu solid cu-form-group"
					onkeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" size="medium"
					placeholder="请输入库存" value="1" v-model="setStock" @keyup.native="proving(1)" />

				<button class="cu-btn bg-blue  margin-sm  radius " @click="clicksSet(1)">设置</button>

				<input class=" menu solid cu-form-group"
					onkeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" size="medium"
					placeholder="请输入单价" v-model="setPrice" @keyup.native="proving(2)" />
				<view slot="prepend">单价</view>
				<button class="cu-btn bg-blue  margin-sm  radius " @click="clicksSet(2)">设置</button>

				<input class=" menu solid cu-form-group"
					onkeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" size="medium"
					placeholder="请输入重量" v-model="setWeight" @keyup.native="proving(3)" />

				<button class="cu-btn bg-blue  margin-sm  radius " @click="clicksSet(3)">设置</button>
				<input class=" menu solid cu-form-group"
					onkeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" size="medium"
					placeholder="请输入体积" v-model="setVolume" @keyup.native="proving(4)" />

				<button class="cu-btn bg-blue  margin-sm  radius " @click="clicksSet(4)">设置</button>



			</view>

			<view class="menu  cu-list cu-custom margin-bottom-lg " v-if="tableData.length > 0">
				<view class="cu-item ">
					<view class=" sku-title">名称</view>
					<view class=" sku-title" v-for="(item, index) in specArr" :key="index" align="center">
						<view slot-scope="scope">
							<text>{{ item.name }}</text>
						</view>
					</view>
					<view class=" sku-title">库存</view>
					<view class=" sku-title">单价</view>
					<view class=" sku-title">重量(千克)</view>
					<view class=" sku-title">体积(m³)</view>
					<view class=" sku-title">图片</view>
				</view>


				<view class="cu-item" v-for="(rows,index) in  tableData">


					<view class="sku-content">

						<input class="cu-form-group " align="center" placeholder="输入名称" @input="clickSet"
							:data-index='index' data-type='0' :value="rows.title" />

					</view>

					<view class="sku-content" v-for="(item, index) in specArr" :key="index" align="center">
						<view slot-scope="scope" class="sku-content bg-gray" align="center">
							{{ rows.specs[index] }}
						</view>
					</view>
					<view class="sku-content">


						<input class="cu-form-group " align="center" placeholder="输入库存" @input="clickSet"
							:data-index='index' data-type='1' :value="rows.stock" />

					</view>
					<view class="sku-content">

						<template>
							<input class="sku-content" align="center" placeholder="输入价格" @input="clickSet"
								:data-index='index' data-type='2' :value="rows.price" />

						</template>
					</view>
					<view class="sku-content">

						<template>
							<input align="center" :value="rows.weight" placeholder="输入重量" :data-index='index'
								data-type='3' @input="clickSet" />
						</template>
					</view>
					<view class="sku-content">

						<template>
							<input align="center" :data-index='index' data-type='4' :value="rows.volume"
								placeholder="输入体积" @input="clickSet" />

						</template>
					</view>
					<view class="sku-content">

						<template>

							<view @click="ChooseImage" v-if="rows.thumb == ''" :data-index='index' data-type='1'
								class="cuIcon-cameraadd cu-avatar cu-item round lg"
								style="background-image: url(../../static/img/tabBar/user_on.png);margin: 60rpx"></view>
							<view @click="ChooseImage" :data-index='index' data-type='1' v-if="rows.thumb  != ''"
								class="cu-avatar cu-item round lg"
								:style="'background-image: url('+rows.thumb +');margin: 60rpx'"></view>
						</template>
					</view>
				</view>
			</view>
			<!-- <p>{{specArr}}</p>
			<p>{{allData}}</p>
			<p>{{tableData}}</p> -->
		</form>
	</div>
</template>

<script>
	const defaultTable = {
		specs: [],
		name: "",
		stock: "0",
		price: "0",
		thumb: "",
		weight: "",
		volume: ""
	};
	export default {
		name: "sku",
		data() {
			return {
				specName: "",
				specArr: [],
				specContent: {},
				tableData: [],
				changeTableData: [],
				allData: [],
				setStock: "",
				setPrice: "",
				setWeight: '',
				setVolume: ''
			};
		},
		created() {

		},

		methods: {
			clickSet(e) {
				var index = e.currentTarget.dataset.index
				var name = e.currentTarget.dataset.type;
				var value = e.detail.value;


				if (name === '0' ) {
					this.tableData[index].title = value;
				} else if (name === '1'  ) {
					this.tableData[index].stock = value;
				} else if (name === '2'  ) {
					this.tableData[index].price = value;
				} else if (name === '3'  ) {
					this.tableData[index].weight = value;
				} else if (name === '4' ) {
					this.tableData[index].volume = value;
				}

			},

			ChooseImage(e) {
				var thus = this;
				var index = e.currentTarget.dataset.index 
				thus.$net.loadImg((r) => {
					thus.tableData[index].thumb = r;
				});

			},
			initSku(storeTableData, storeSpecArr) {

				if (storeTableData != undefined && storeTableData !== '' && storeSpecArr !== '') {
					this.tableData = storeTableData
					this.specArr = storeSpecArr
				}

			},
			// 点击添加规格组
			createdSpecifi() {
				if (this.specName) {
					const data = {
						name: "",
						conName: [],
						addField: ''
					};
					this.specContent = Object.assign({}, data);
					this.specContent.name = this.specName;
					this.specContent.conName = [];
					this.specArr.push(this.specContent);
					let obj = {};
					this.specArr = this.specArr.reduce((cur, next) => {
						obj[next.name] ? "" : (obj[next.name] = true && cur.push(next));
						return cur;
					}, []);
					this.specName = "";
					// this.$store.dispatch("getSpecArr", this.specArr);
				}
			},
			// 点击添加规格值
			clickSpecVal(indexs, name) {
				console.log(name)
				if (name) {
					this.specArr[indexs].conName.push(name);
					this.specArr[indexs].conName = [
						...new Set(this.specArr[indexs].conName)
					];
					for (const val in this.specArr) {
						if (this.specArr[val].conName.length === 0) {
							this.changeTableData[val] = ['']
						} else {
							this.changeTableData[val] = this.specArr[val].conName
						}
					}
					this.changeDataTable(this.changeTableData, this.specArr);
					this.specArr[indexs].addField = "";
					// this.$store.dispatch("getSpecArr", this.specArr);
				}
			},
			// 删除规格组
			clearSpe(indexs) {
				this.specArr.splice(indexs, 1);
				this.changeTableData = [];
				for (const item of this.specArr) {
					this.changeTableData.push(item.conName);
				}
				this.changeDataTable(this.changeTableData, this.specArr);
				// this.$store.dispatch("getSpecArr", this.specArr);
			},
			// 删除规格值
			clearSpecif(indexs, index) {
				this.specArr[indexs].conName.splice(index, 1);
				this.changeTableData[indexs] = this.specArr[indexs].conName;
				for (const item in this.changeTableData) {
					if (this.changeTableData[item].length === 0) {
						this.changeTableData.splice(item, 1);
					}
				}
				this.changeDataTable(this.changeTableData, this.specArr);
				// this.$store.dispatch("getSpecArr", this.specArr);
			},
			// 整理数据
			changeDataTable(m, n) {
				this.tableData = []
				this.allData = this.$net.descartes(m);
				if (n.length > 1) {
					for (const i in this.allData) {
						const dataArr = Object.assign({}, defaultTable);
						if (typeof this.allData[i] === "string") {
							dataArr.specs[i] = this.allData[i];
						} else {
							dataArr.specs = this.allData[i];
						}
						this.tableData.push(dataArr);
						// this.$store.dispatch("getTableData", this.tableData);
					}
				} else {
					for (const i in this.allData) {
						const dataArr = Object.assign({}, defaultTable);
						dataArr.specs = [this.allData[i]];
						this.tableData.push(dataArr);
						// this.$store.dispatch("getTableData", this.tableData);
					}
				}
			},
			clicksSet(name) {
				for (const item of this.tableData) {
					if (name === 1 && this.setStock != '') {
						item.stock = this.setStock;
					} else if (name === 2 && this.setPrice != '') {
						item.price = this.setPrice;
					} else if (name === 3 && this.setWeight != '') {
						item.weight = this.setWeight;
					} else if (name === 4 && this.setVolume != '') {
						item.volume = this.setVolume;
					}
				}
			},
			proving(num) {
				if (num === 1) {
					this.setStock = this.setStock.replace(/[^\.\d]/g, "");
					this.setStock = this.setStock.replace(".", "");
				} else if (num === 2) {
					this.setPrice = this.setPrice.replace(/[^\.\d]/g, "");
					this.setPrice = this.setPrice.replace(".", "");
				} else if (num === 3) {
					this.setWeight = this.setWeight.replace(/[^\.\d]/g, "");
					this.setWeight = this.setWeight.replace(".", "");
				} else if (num === 4) {
					this.setVolume = this.setVolume.replace(/[^\.\d]/g, "");
					this.setVolume = this.setVolume.replace(".", "");
				}
			}
		}
	};
</script>
<style scoped>
	html,
	body,
	div,
	text,
	p,
	i,
	ul,
	li {
		margin: 0;
		padding: 0;
	}



	.introTitle {
		border: 1px solid rgb(238, 238, 238);
		padding-left: 10px;
		padding-top: 10px;
		line-height: 30px;
		margin-bottom: 10px;
	}

	.fontWidth {
		font-weight: 500;
		font-size: 16px;
		display: inline-block;
		padding: 0 10px;
		vertical-align: middle;
	}

	.introTitle i {
		cursor: pointer;
	}

	.introCon ul {
		list-style: none;
		padding: 5px 0 10px 0;
	}

	.introCon ul li {
		display: inline-block;
		margin: 5px 10px;
		background-color: rgb(238, 238, 238);
		line-height: 30px;
	}

	.introCon ul li:last-child {
		background-color: #ffffff;
		width: 300px;
	}

	.introCon ul li text:nth-child(1) {
		display: inline-block;
		padding: 0 10px;
		text-align: center;
	}

	.introCon ul li text:nth-child(2) {
		display: inline-block;
		width: 30px;
		background-color: rgb(211, 207, 208);
		text-align: center;
	}

	.delete {
		color: #ffffff;
		cursor: pointer;
	}

	.clear {
		background-color: rgb(238, 238, 238);
		display: inline-block;
		width: 15px;
		line-height: 15px;
		height: 15px;
		vertical-align: middle;
		border-radius: 50%;
		text-align: center;
	}
</style>
