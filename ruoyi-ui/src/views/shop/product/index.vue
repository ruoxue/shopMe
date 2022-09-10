<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">

   <el-form-item label="店铺" prop="shopId">
           <el-select v-model="queryParams.shopId" placeholder="请选择店铺" clearable :style="{width: '100%'}">
             <el-option v-for="(item, index) in shopIdOptions" :key="index" :label="item.shopName"
               :value="item.shopId" :disabled="item.disabled"></el-option>
           </el-select>
         </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="请输入标题"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
</el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['shop:product:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['shop:product:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['shop:product:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['shop:product:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="productList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />

      <el-table-column label="店铺" align="center" prop="shopName" />

      <el-table-column label="商品类型" align="center" prop="type" />
      <el-table-column label="标题" align="center" prop="title" />
      <el-table-column label="短标题" align="center" prop="shortTitle" />
      <el-table-column label="商品状态" align="center" prop="status" />
      <el-table-column label="上架时间" align="center" prop="putawayTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.putawayTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品主图" align="center" prop="thumb" width="100">
        <template slot-scope="scope">
          <image-preview :src="scope.row.thumb" :width="50" :height="50"/>
        </template>
      </el-table-column>
      <el-table-column label="售卖价格" align="center" prop="price" />
      <el-table-column label="成本价" align="center" prop="costPrice" />
      <el-table-column label="商品编码" align="center" prop="productCode" />
      <el-table-column label="销量" align="center" prop="salesCount" />
      <el-table-column label="已出售数" align="center" prop="virtualSales" />


      <el-table-column label="下架时间" align="center" prop="endTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['shop:product:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['shop:product:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改商品基础信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">


        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="副标题" prop="subTitle">
          <el-input v-model="form.subTitle" placeholder="请输入副标题" />
        </el-form-item>
        <el-form-item label="短标题" prop="shortTitle">
          <el-input v-model="form.shortTitle" placeholder="请输入短标题" />
        </el-form-item>
        <el-form-item label="店铺" prop="shopId">
           <el-select v-model="form.shopId" placeholder="请选择店铺" clearable :style="{width: '100%'}">
             <el-option v-for="(item, index) in shopIdOptions" :key="index" :label="item.shopName"
               :value="item.shopId" :disabled="item.disabled"></el-option>
           </el-select>
         </el-form-item>
     <el-form-item label="分类" prop="categoryId">
            <el-cascader v-model="form.categoryId"
             :options="categoryIdOptions"
             :props="categoryIdProps"
              :style="{width: '100%'}" placeholder="请输入分类" clearable></el-cascader>
      </el-form-item>







        <el-form-item label="首图视频">
          <file-upload v-model="form.video"/>
        </el-form-item>
        <el-form-item label="视频封面图">
          <image-upload v-model="form.videoThumb"/>
        </el-form-item>
        <el-form-item label="商品主图">
          <image-upload v-model="form.thumb"/>
        </el-form-item>
        <el-form-item label="商品轮播图">
          <image-upload v-model="form.thumbs"/>
        </el-form-item>


        <el-form-item label="售卖价格" prop="price">
          <el-input v-model="form.price" placeholder="请输入售卖价格" />
        </el-form-item>

        <el-form-item label="成本价" prop="costPrice">
          <el-input v-model="form.costPrice" placeholder="请输入成本价" />
        </el-form-item>
        <el-form-item label="是否开启限购" prop="isBuyNumLimit">
          <el-input v-model="form.isBuyNumLimit" placeholder="请输入是否开启限购 1:限购 0:不限购" />
        </el-form-item>
        <el-form-item label="每人限购数" prop="maxBuyTotal">
          <el-input v-model="form.maxBuyTotal" placeholder="请输入每人限购数量上限" />
        </el-form-item>
        <el-form-item label="单次限购数" prop="maxBuyOnce">
          <el-input v-model="form.maxBuyOnce" placeholder="请输入单次下单购买限购数量" />
        </el-form-item>
        <el-form-item label="起购数量" prop="minBuy">
          <el-input v-model="form.minBuy" placeholder="请输入起购数量" />
        </el-form-item>
        <el-form-item label="商品详情">
          <editor v-model="form.content" :min-height="192"/>
        </el-form-item>
        <el-form-item label="上架时间" prop="putawayTime">
          <el-date-picker clearable
            v-model="form.putawayTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择上架时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="下架时间" prop="endTime">
          <el-date-picker clearable
            v-model="form.endTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择下架时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listProduct, getProduct, delProduct, addProduct, updateProduct } from "@/api/shop/product";
import { listProductCategory } from "@/api/shop/productCategory";
import { listProductShop } from "@/api/shop/productShop";
export default {
  name: "Product",
  data() {
    return {


        categoryIdOptions: [],
        categoryIdProps: {
          "multiple": false,
           "value": "id",
           "label": "name"
        },
        shopIdOptions: [{
          "shopName": "无",
          "shopId": 0
        } ],

      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 商品基础信息表格数据
      productList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        shopId: null,
        displayOrder: null,
        type: null,
        title: null,
        subTitle: null,
        shortTitle: null,
        status: null,
        putawayTime: null,
        video: null,
        videoThumb: null,
        thumb: null,
        thumbs: null,
        price: null,
        originalPrice: null,
        costPrice: null,
        priceHide: null,
        minPrice: null,
        maxPrice: null,
        hasOption: null,
        productCode: null,
        productSn: null,
        stock: null,
        stockWarning: null,
        stockHide: null,
        stockCnf: null,
        salesCount: null,
        salesHide: null,
        virtualSales: null,
        unit: null,
        weight: null,
        volume: null,
        autoComplete: null,
        dispatchType: null,
        dispatchPrice: null,
        dispatchId: null,
        dispatchMode: null,
        defaultDispatchMode: null,
        dispatchHide: null,
        isBuyNumLimit: null,
        maxBuyTotal: null,
        maxBuyOnce: null,
        minBuy: null,
        content: null,
        viewCount: null,
        isRefundSupport: null,
        relatedGoods: null,
        auditStatus: null,
        refuseReason: null,
        version: null,
        selloutTime: null,
        deleteTime: null,
        endTime: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        categoryId: [{
          required: true,
          type: 'array',
          message: '请至少选择一个categoryId',
          trigger: 'change'
        }],
        shopId: [
          { required: true, message: "店铺ID不能为空", trigger: "blur" }
        ],
        displayOrder: [
          { required: true, message: "$comment不能为空", trigger: "blur" }
        ],
        type: [
          { required: true, message: "商品类型 1:实物 2:虚拟商品 3:电子卡密不能为空", trigger: "change" }
        ],
        title: [
          { required: true, message: "标题不能为空", trigger: "blur" }
        ],
        subTitle: [
          { required: true, message: "副标题不能为空", trigger: "blur" }
        ],
        shortTitle: [
          { required: true, message: "短标题不能为空", trigger: "blur" }
        ],
        status: [
          { required: true, message: "商品状态 0:放置仓库 1:上架售卖 2:上架隐藏 3:定时上架 -1:后台删除不能为空", trigger: "blur" }
        ],
        putawayTime: [
          { required: true, message: "上架时间不能为空", trigger: "blur" }
        ],
        video: [
          { required: true, message: "首图视频不能为空", trigger: "blur" }
        ],
        videoThumb: [
          { required: true, message: "视频封面图不能为空", trigger: "blur" }
        ],
        thumb: [
          { required: true, message: "商品主图不能为空", trigger: "blur" }
        ],
        price: [
          { required: true, message: "售卖价格不能为空", trigger: "blur" }
        ],
        originalPrice: [
          { required: true, message: "划线价格不能为空", trigger: "blur" }
        ],
        costPrice: [
          { required: true, message: "成本价不能为空", trigger: "blur" }
        ],
        priceHide: [
          { required: true, message: "$comment不能为空", trigger: "blur" }
        ],
        minPrice: [
          { required: true, message: "$comment不能为空", trigger: "blur" }
        ],
        maxPrice: [
          { required: true, message: "$comment不能为空", trigger: "blur" }
        ],
        hasOption: [
          { required: true, message: "规格类型 1:多规格商品 0:无规格不能为空", trigger: "blur" }
        ],
        productCode: [
          { required: true, message: "商品编码 格式:XXXX-YYYYYYYY-ZZ不能为空", trigger: "blur" }
        ],
        productSn: [
          { required: true, message: "商品条形码不能为空", trigger: "blur" }
        ],
        stock: [
          { required: true, message: "商品库存不能为空", trigger: "blur" }
        ],
        stockWarning: [
          { required: true, message: "库存预警不能为空", trigger: "blur" }
        ],
        stockHide: [
          { required: true, message: "商品详情隐藏库存 1:隐藏 0:不隐藏不能为空", trigger: "blur" }
        ],
        stockCnf: [
          { required: true, message: "$comment不能为空", trigger: "blur" }
        ],
        salesCount: [
          { required: true, message: "销量不能为空", trigger: "blur" }
        ],
        salesHide: [
          { required: true, message: "商品详情隐藏销量 1:隐藏 0:不隐藏不能为空", trigger: "blur" }
        ],
        virtualSales: [
          { required: true, message: "已出售数不能为空", trigger: "blur" }
        ],
        unit: [
          { required: true, message: "单位不能为空", trigger: "blur" }
        ],
        weight: [
          { required: true, message: "重量(千克)不能为空", trigger: "blur" }
        ],
        volume: [
          { required: true, message: "体积(m³)不能为空", trigger: "blur" }
        ],
        autoComplete: [
          { required: true, message: "$comment不能为空", trigger: "blur" }
        ],
        dispatchType: [
          { required: true, message: "快递运费类型 0:运费模板 1:统一运费不能为空", trigger: "change" }
        ],
        dispatchPrice: [
          { required: true, message: "运费价格不能为空", trigger: "blur" }
        ],
        dispatchHide: [
          { required: true, message: "商品详情隐藏快递 1:隐藏 0:不隐藏不能为空", trigger: "blur" }
        ],
        isBuyNumLimit: [
          { required: true, message: "是否开启限购 1:限购 0:不限购不能为空", trigger: "blur" }
        ],
        maxBuyTotal: [
          { required: true, message: "每人限购数量上限不能为空", trigger: "blur" }
        ],
        maxBuyOnce: [
          { required: true, message: "单次下单购买限购数量不能为空", trigger: "blur" }
        ],
        minBuy: [
          { required: true, message: "起购数量不能为空", trigger: "blur" }
        ],
        content: [
          { required: true, message: "商品详情不能为空", trigger: "blur" }
        ],
        viewCount: [
          { required: true, message: "浏览数不能为空", trigger: "blur" }
        ],
        isRefundSupport: [
          { required: true, message: "是否支持售后维权 1:支持 0:不支持不能为空", trigger: "blur" }
        ],
        relatedGoods: [
          { required: true, message: "关联商品不能为空", trigger: "blur" }
        ],
        auditStatus: [
          { required: true, message: "$comment不能为空", trigger: "blur" }
        ],
        refuseReason: [
          { required: true, message: "$comment不能为空", trigger: "blur" }
        ],
        version: [
          { required: true, message: "商品版本号不能为空", trigger: "blur" }
        ],
        selloutTime: [
          { required: true, message: "售罄时间不能为空", trigger: "blur" }
        ],
        deleteTime: [
          { required: true, message: "删除时间不能为空", trigger: "blur" }
        ],
        createTime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        updateTime: [
          { required: true, message: "修改时间不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
    this.getCategoryIdOptions();
    this.getShopIdOptions();
  },
  methods: {

    getShopIdOptions() {
      // TODO 发起请求获取数据
      // this.shopIdOptions

      listProductShop().then(response => {
        this.shopIdOptions = response.rows;

      });
    },
    getCategoryIdOptions() {
      // TODO 发起请求获取数据
      // this.categoryIdOptions
      listProductCategory().then(response => {
        this.categoryIdOptions = response.rows;

      });
    },
    /** 查询商品基础信息列表 */
    getList() {
      this.loading = true;
      listProduct(this.queryParams).then(response => {
        this.productList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        shopId: null,
        displayOrder: null,
        type: null,
        title: null,
        subTitle: null,
        shortTitle: null,
        status: 0,
        putawayTime: null,
        video: null,
        videoThumb: null,
        thumb: null,
        thumbs: null,
        price: null,
        originalPrice: null,
        costPrice: null,
        priceHide: null,
        minPrice: null,
        maxPrice: null,
        hasOption: null,
        productCode: null,
        productSn: null,
        stock: null,
        stockWarning: null,
        stockHide: null,
        stockCnf: null,
        salesCount: null,
        salesHide: null,
        virtualSales: null,
        unit: null,
        weight: null,
        volume: null,
        autoComplete: null,
        dispatchType: null,
        dispatchPrice: null,
        dispatchId: null,
        dispatchMode: null,
        defaultDispatchMode: null,
        dispatchHide: null,
        isBuyNumLimit: null,
        maxBuyTotal: null,
        maxBuyOnce: null,
        minBuy: null,
        content: null,
        viewCount: null,
        isRefundSupport: null,
        relatedGoods: null,
        auditStatus: 0,
        refuseReason: null,
        version: null,
        selloutTime: null,
        deleteTime: null,
        createTime: null,
        updateTime: null,
        endTime: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加商品基础信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getProduct(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改商品基础信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateProduct(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addProduct(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除商品基础信息编号为"' + ids + '"的数据项？').then(function() {
        return delProduct(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('shop/product/export', {
        ...this.queryParams
      }, `product_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
