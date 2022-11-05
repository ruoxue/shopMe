<template>
	<view>
		<form ref="form">
			<!-- 添加或修改宗教建筑物对话框 -->
			<view class="cu-form-group margin-top">
				<view class="title">名称</view>
				<input placeholder="请输入名称" v-model="form.name" name="input"></input>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">状态</view>

				<radio-group class="block" @change="RadioChange" data-type="status">
					<label class="radio" v-for="dict in dict.type.global_status" :key="dict.dictValue">
						<radio class="margin-left-lg" :class="dict.dictValue=='form.status'?'checked':''"
							:checked="dict.dictValue==form.status?true:false" :value="(dict.dictValue)">
						</radio>
						{{dict.dictLabel}}
						<!-- {{dict}} -->
					</label>
				</radio-group>
			</view>

			<view class="cu-form-group margin-top">
				<view class="title">地区编号</view>
				<input placeholder="请输入地区编号" v-model="form.areaId" name="input"></input>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">经纬度</view>
				<input placeholder="请输入经度" v-model="form.longitude" name="input"></input>

				<button class="btn" @click="getMap">地点</button>
				<map></map>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">封面</view>
			</view>
			<view class="cu-form-group ">
				<ImageUpload v-model="form.thumb"></ImageUpload>
			</view>

			<view class="cu-form-group margin-top">
				<view class="title">封面详情</view>
			</view>
			<view class="cu-form-group ">
				<ImageUpload v-model="form.thumbDetail"></ImageUpload>
			</view>

			<view class="cu-form-group">
				<uni-datetime-picker type="datetime" v-model="form.create_time" />
			</view>

			<view class="cu-form-group margin-top">
				<view class="title">视频</view>
				<input placeholder="请输入视频" v-model="form.video" name="input"></input>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">备注</view>
				<textarea placeholder="请输入备注" v-model="form.remark"></textarea>
			</view>
		</form>
		<view style=" text-align: center;  ">
			<button @click="submitForm" class=" bg-red  margin-top-xl   text-center   radius  ">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dicts: ['global_status'],
				dict: {
					type: {}
				},
				// 查询参数
				queryParams: {
					pageNum: 1,
					pageSize: 10,
					name: null,

					status: null,

					areaId: null,

					longitude: null,

					latitude: null,

					thumb: null,

					thumbDetail: null,

					video: null,

				},
				// 表单参数
				form: { 
				},
				// 表单校验
				rules: {
					name: [{
						required: true,
						message: "名称不能为空",
						trigger: "blur"

					}],

				}
			};
		},



		async onLoad(options) {  
			this.getDics();
			this.loadData(options.id);
		},
		methods: {
			async getDics() {
				this.dict.type = await this.useDict(this.dicts);
				console.log(this.dict.type);
			},
			loadData(id){
				var thus=this;
				this.net.fetch(function(v) {
					thus.form=v.data;
				}, this.net.religionBuilding+"/"+id, {}, 'get');
			},
			RadioChange(e) {
				var type = e.currentTarget.dataset.type;
				this.form[type] = e.detail.value;
			},
			getMap() {
				uni.chooseLocation({
					latitude: 30.204823,
					longitude: 120.216288,
					success: function(res) {
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
					}
				});
			},
			submitForm() {

				console.log(123);
				console.log(this.form)

				if (true) {
					if (this.form.id != null) {
						this.updateReligionBuilding(this.form);
					} else {
						this.addReligionBuilding(this.form);
					}
				}

			},
			updateReligionBuilding(data) {
				this.net.fetch(function(v) {
					uni.showToast({
						icon: 'success',
						title: "修改成功"
					})
				}, this.net.religionBuilding, data, 'put');
			},
			addReligionBuilding(data) {
				this.net.fetch(function(v) {
					uni.showToast({
						icon: 'success',
						title: "添加成功"
					})
				}, this.net.religionBuilding, data, 'post');
			},
		}
	}
</script>
<style>
</style>
