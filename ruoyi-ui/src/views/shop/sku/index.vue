<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="店铺ID" prop="shopId">
        <el-input
          v-model="queryParams.shopId"
          placeholder="请输入店铺ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="规格名称" prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="请输入规格名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="规格图片链接" prop="thumb">
        <el-input
          v-model="queryParams.thumb"
          placeholder="请输入规格图片链接"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="售卖价格" prop="price">
        <el-input
          v-model="queryParams.price"
          placeholder="请输入售卖价格"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="成本价" prop="costPrice">
        <el-input
          v-model="queryParams.costPrice"
          placeholder="请输入成本价"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="划线价格" prop="originalPrice">
        <el-input
          v-model="queryParams.originalPrice"
          placeholder="请输入划线价格"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="商品编码 格式:XXXX-YYYYYYYY-ZZ" prop="productCode">
        <el-input
          v-model="queryParams.productCode"
          placeholder="请输入商品编码 格式:XXXX-YYYYYYYY-ZZ"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="商品条形码" prop="productSn">
        <el-input
          v-model="queryParams.productSn"
          placeholder="请输入商品条形码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="库存预警" prop="stockWarning">
        <el-input
          v-model="queryParams.stockWarning"
          placeholder="请输入库存预警"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="销量" prop="salesCount">
        <el-input
          v-model="queryParams.salesCount"
          placeholder="请输入销量"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="重量(千克)" prop="weight">
        <el-input
          v-model="queryParams.weight"
          placeholder="请输入重量(千克)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="体积(m³)" prop="volume">
        <el-input
          v-model="queryParams.volume"
          placeholder="请输入体积(m³)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="规格项id 多个值逗号分割 关联product_spec_option表主键ID" prop="specOptionIds">
        <el-input
          v-model="queryParams.specOptionIds"
          placeholder="请输入规格项id 多个值逗号分割 关联product_spec_option表主键ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="展示顺序 越小越靠前" prop="displayOrder">
        <el-input
          v-model="queryParams.displayOrder"
          placeholder="请输入展示顺序 越小越靠前"
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
          v-hasPermi="['shop:sku:add']"
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
          v-hasPermi="['shop:sku:edit']"
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
          v-hasPermi="['shop:sku:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['shop:sku:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="skuList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="自增主键ID" align="center" prop="id" />
      <el-table-column label="店铺ID" align="center" prop="shopId" />
      <el-table-column label="商品ID" align="center" prop="goodsId" />
      <el-table-column label="规格名称" align="center" prop="title" />
      <el-table-column label="规格图片链接" align="center" prop="thumb" />
      <el-table-column label="售卖价格" align="center" prop="price" />
      <el-table-column label="成本价" align="center" prop="costPrice" />
      <el-table-column label="划线价格" align="center" prop="originalPrice" />
      <el-table-column label="商品编码 格式:XXXX-YYYYYYYY-ZZ" align="center" prop="productCode" />
      <el-table-column label="商品条形码" align="center" prop="productSn" />
      <el-table-column label="库存" align="center" prop="stock" />
      <el-table-column label="库存预警" align="center" prop="stockWarning" />
      <el-table-column label="销量" align="center" prop="salesCount" />
      <el-table-column label="重量(千克)" align="center" prop="weight" />
      <el-table-column label="体积(m³)" align="center" prop="volume" />
      <el-table-column label="规格项id 多个值逗号分割 关联product_spec_option表主键ID" align="center" prop="specOptionIds" />
      <el-table-column label="展示顺序 越小越靠前" align="center" prop="displayOrder" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['shop:sku:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['shop:sku:remove']"
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

    <!-- 添加或修改商品规格信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="店铺ID" prop="shopId">
          <el-input v-model="form.shopId" placeholder="请输入店铺ID" />
        </el-form-item>
        <el-form-item label="规格名称" prop="title">
          <el-input v-model="form.title" placeholder="请输入规格名称" />
        </el-form-item>
        <el-form-item label="规格图片链接" prop="thumb">
          <el-input v-model="form.thumb" placeholder="请输入规格图片链接" />
        </el-form-item>
        <el-form-item label="售卖价格" prop="price">
          <el-input v-model="form.price" placeholder="请输入售卖价格" />
        </el-form-item>
        <el-form-item label="成本价" prop="costPrice">
          <el-input v-model="form.costPrice" placeholder="请输入成本价" />
        </el-form-item>
        <el-form-item label="划线价格" prop="originalPrice">
          <el-input v-model="form.originalPrice" placeholder="请输入划线价格" />
        </el-form-item>
        <el-form-item label="商品编码 格式:XXXX-YYYYYYYY-ZZ" prop="productCode">
          <el-input v-model="form.productCode" placeholder="请输入商品编码 格式:XXXX-YYYYYYYY-ZZ" />
        </el-form-item>
        <el-form-item label="商品条形码" prop="productSn">
          <el-input v-model="form.productSn" placeholder="请输入商品条形码" />
        </el-form-item>
        <el-form-item label="库存预警" prop="stockWarning">
          <el-input v-model="form.stockWarning" placeholder="请输入库存预警" />
        </el-form-item>
        <el-form-item label="销量" prop="salesCount">
          <el-input v-model="form.salesCount" placeholder="请输入销量" />
        </el-form-item>
        <el-form-item label="重量(千克)" prop="weight">
          <el-input v-model="form.weight" placeholder="请输入重量(千克)" />
        </el-form-item>
        <el-form-item label="体积(m³)" prop="volume">
          <el-input v-model="form.volume" placeholder="请输入体积(m³)" />
        </el-form-item>
        <el-form-item label="规格项id 多个值逗号分割 关联product_spec_option表主键ID" prop="specOptionIds">
          <el-input v-model="form.specOptionIds" placeholder="请输入规格项id 多个值逗号分割 关联product_spec_option表主键ID" />
        </el-form-item>
        <el-form-item label="展示顺序 越小越靠前" prop="displayOrder">
          <el-input v-model="form.displayOrder" placeholder="请输入展示顺序 越小越靠前" />
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
import { listSku, getSku, delSku, addSku, updateSku } from "@/api/shop/sku";

export default {
  name: "Sku",
  data() {
    return {
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
      // 商品规格信息表格数据
      skuList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        shopId: null,
        goodsId: null,
        title: null,
        thumb: null,
        price: null,
        costPrice: null,
        originalPrice: null,
        productCode: null,
        productSn: null,
        stock: null,
        stockWarning: null,
        salesCount: null,
        weight: null,
        volume: null,
        specOptionIds: null,
        displayOrder: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        shopId: [
          { required: true, message: "店铺ID不能为空", trigger: "blur" }
        ],
        goodsId: [
          { required: true, message: "商品ID不能为空", trigger: "blur" }
        ],
        title: [
          { required: true, message: "规格名称不能为空", trigger: "blur" }
        ],
        thumb: [
          { required: true, message: "规格图片链接不能为空", trigger: "blur" }
        ],
        price: [
          { required: true, message: "售卖价格不能为空", trigger: "blur" }
        ],
        costPrice: [
          { required: true, message: "成本价不能为空", trigger: "blur" }
        ],
        originalPrice: [
          { required: true, message: "划线价格不能为空", trigger: "blur" }
        ],
        productCode: [
          { required: true, message: "商品编码 格式:XXXX-YYYYYYYY-ZZ不能为空", trigger: "blur" }
        ],
        productSn: [
          { required: true, message: "商品条形码不能为空", trigger: "blur" }
        ],
        stock: [
          { required: true, message: "库存不能为空", trigger: "blur" }
        ],
        stockWarning: [
          { required: true, message: "库存预警不能为空", trigger: "blur" }
        ],
        salesCount: [
          { required: true, message: "销量不能为空", trigger: "blur" }
        ],
        weight: [
          { required: true, message: "重量(千克)不能为空", trigger: "blur" }
        ],
        volume: [
          { required: true, message: "体积(m³)不能为空", trigger: "blur" }
        ],
        displayOrder: [
          { required: true, message: "展示顺序 越小越靠前不能为空", trigger: "blur" }
        ],
        createTime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        updateTime: [
          { required: true, message: "修改时间不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询商品规格信息列表 */
    getList() {
      this.loading = true;
      listSku(this.queryParams).then(response => {
        this.skuList = response.rows;
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
        goodsId: null,
        title: null,
        thumb: null,
        price: null,
        costPrice: null,
        originalPrice: null,
        productCode: null,
        productSn: null,
        stock: null,
        stockWarning: null,
        salesCount: null,
        weight: null,
        volume: null,
        specOptionIds: null,
        displayOrder: null,
        createTime: null,
        updateTime: null
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
      this.title = "添加商品规格信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getSku(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改商品规格信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateSku(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addSku(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除商品规格信息编号为"' + ids + '"的数据项？').then(function() {
        return delSku(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('shop/sku/export', {
        ...this.queryParams
      }, `sku_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
