<template>
	<view>
		<form>
			<!-- 添加或修改${functionName}对话框 -->
			#foreach($column in $columns)
			#set($field=$column.javaField)
			#if($column.insert && !$column.pk)
			#if(($column.usableColumn) || (!$column.superColumn))
			#set($parentheseIndex=$column.columnComment.indexOf("（"))
			#if($parentheseIndex != -1)
			#set($comment=$column.columnComment.substring(0, $parentheseIndex))
			#else
			#set($comment=$column.columnComment)
			#end
			#set($dictType=$column.dictType)
			#if($column.htmlType == "input")
			<view class="cu-form-group margin-top">
				<view class="title">${comment}</view>
				<input placeholder="请输入${comment}" v-model="form.${field}" name="input"></input>
			</view>
			#elseif($column.htmlType == "imageUpload")
			<view class="cu-form-group margin-top">
				<view class="title">${comment}</view>
			</view>
			<view class="cu-form-group ">
				<ImageUpload v-model="form.${field}"></ImageUpload>
			</view>

			#elseif($column.htmlType == "fileUpload")
			<view class="cu-form-group margin-top">
				<view class="title">${comment}</view>
			</view>
			<view class="cu-form-group ">
				<FileUpload v-model="form.${field}"></FileUpload>
			</view>
			#elseif($column.htmlType == "editor")
			<view class="cu-form-group margin-top">
				<view class="title">form.${field}</view>
				<textarea placeholder="请输入${comment}" v-model="form.${field}"></textarea>
			</view>
			#elseif($column.htmlType == "select" && "" != $dictType)
			<view class="cu-form-group margin-top">
				<view class="title">${comment}</view>
				<picker @change="PickerChange" :value="index" :range="picker">
					<view class="picker">
						{{index>-1?picker[index]:''}}
					</view>
				</picker>
			</view>

			#elseif($column.htmlType == "select" && $dictType)
			<view class="cu-form-group margin-top">
				<view class="title">${comment}</view>
				<picker @change="PickerChange" :value="index" :range="picker">
					<view class="picker">
						{{form.${field}}}
					</view>
				</picker>
			</view>
			#elseif($column.htmlType == "checkbox" && "" != $dictType)
			<view class="cu-form-group margin-top">
				<view class="title">${comment}</view>
				<checkbox-group v-model="form.${field}">
					<checkbox v-for="dict in dict.type.${dictType}" :key="dict.value" :label="dict.value">
						{{dict.label}}
					</checkbox>
				</checkbox-group>
			</view>
			#elseif($column.htmlType == "checkbox" && $dictType)
			<view class="cu-form-group margin-top">
				<view class="title">${comment}</view>

				<checkbox-group v-model="form.${field}">
					<checkbox>请选择字典生成</checkbox>
				</checkbox-group>
			</view>

			#elseif($column.htmlType == "radio" && "" != $dictType)
			<view class="cu-form-group margin-top">
				<view class="title">${comment}</view>

				<radio-group class="block" @change="RadioChange">

					<label class="radio">
						<radio class="margin-left-lg" :class="radio=='form.${field}'?'checked':''"
							:checked="radio=='form.${field}'?true:false" value="form.${field}"
							v-for="dict in dict.type.${dictType}" :key="dict.value" #if($column.javaType=="Integer" ||
							$column.javaType=="Long" ):label="parseInt(dict.value)" #else:label="dict.value" #end>

						</radio>{{dict.label}}
					</label>
				</radio-group>
			</view>
			#elseif($column.htmlType == "radio" && $dictType)
			<view class="cu-form-group margin-top">
				<view class="title">${comment}</view>

				<radio-group class="block" @change="RadioChange">
					<radio :class="radio=='form.${field}'?'checked':''" class="margin-left-lg"
						:checked="radio=='form.${field}'?true:false" value="form.${field}"></radio>
				</radio-group>
			</view>

			#elseif($column.htmlType == "datetime")
			<view class="cu-form-group">
				<view class="title">${comment}</view>
				<picker mode="date" :value="date" start="2015-09-01" end="2020-09-01" @change="DateChange">
					<view class="picker">
						{{date}}
					</view>
				</picker>
			</view>
			#elseif($column.htmlType == "textarea")
			<view class="cu-form-group margin-top">
				<view class="title">${comment}</view>
				<textarea placeholder="请输入${comment}" v-model="form.${field}"></textarea>
			</view>
			#end
			#end
			#end
			#end
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
				#if(${dicts} != '')
				dicts: [${dicts}],
				dict: {
					type: {}
				},
				#end
				// 查询参数
				queryParams: {
					pageNum: 1,
					pageSize: 10,
					#foreach($column in $columns)
					#if($column.query)
					$column.javaField: null #if($foreach.count != $columns.size()),
					#end
					#end
					#end
				},
				// 表单参数
				form: {},
				// 表单校验
				rules: {
					#foreach($column in $columns)
					#if($column.required)
					#set($parentheseIndex = $column.columnComment.indexOf("（"))
					#if($parentheseIndex != -1)
					#set($comment = $column.columnComment.substring(0, $parentheseIndex))
					#else
					#set($comment = $column.columnComment)
					#end
					$column.javaField: [{
						required: true,
						message: "$comment不能为空",
						trigger: #if($column.htmlType == "select")
						"change"
						#else "blur"
						#end
					}] #if($foreach.count != $columns.size()),
					#end
					#end
					#end
				}
			};
		},
		async onLoad(options) {
			this.getDics();
		},
		methods: {
			async getDics() {
				this.dict.type = await this.useDict(this.dicts);
			},
			submitForm() {
				
		 this.#[[$]]#refs["form"].validate(valid => {
				 if (valid) {
				#foreach ($column in $columns)
				#if($column.htmlType == "checkbox")
				          this.form.$column.javaField = this.form.${column.javaField}.join(",");
				#end
				#end
				#if($table.sub)
				          this.form.${subclassName}List = this.${subclassName}List;
				#end
				          if (this.form.${pkColumn.javaField} != null) {
				            update${BusinessName}(this.form).then(response => { 
							  uni.showToast({
							  	icon:'success',
								title:"修改成功"
							  })
							  
				              this.open = false;
				              this.getList();
				            });
				          } else {
				            add${BusinessName}(this.form).then(response => {
				              uni.showToast({
				              	icon:'success',
				              	title:"修改成功"
				              })
				              this.open = false;
				              this.getList();
				            });
				          }
				        }
				      });
			},
			update${BusinessName}(data) {
			  this.net.fetch(function(v) { 
			  }, this.net.${businessName}, data, 'put');
			},
			add${BusinessName}(data) {
			  this.net.fetch(function(v) { 
			  }, this.net.${businessName}, data, 'post');
			},
		}
	}
</script>

<style>

</style>
