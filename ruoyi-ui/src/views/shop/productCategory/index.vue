<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">

      <el-form-item label="分类名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入分类名称"
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
          v-hasPermi="['shop:productCategory:add']"
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
          v-hasPermi="['shop:productCategory:edit']"
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
          v-hasPermi="['shop:productCategory:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['shop:productCategory:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>


 <el-table
      v-if="refreshTable"
      v-loading="loading"
      :data="productCategoryList"
      row-key="id"
      :default-expand-all="isExpandAll"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >

    <!-- <el-table v-loading="loading" :data="productCategoryList" @selection-change="handleSelectionChange"> -->
      <el-table-column label="名称" align="center" prop="name" />
      <el-table-column label="父分类id" align="center" prop="parentId" />




      <el-table-column label="分类图片" align="center" prop="thumb" >
       <template slot-scope="scope">
         <image-preview :src="scope.row.thumb" :width="50" :height="50"/>
       </template>
      </el-table-column>
      <el-table-column label="分类等级" align="center" prop="level" />
      <el-table-column label="排序" align="center" prop="displayOrder" />
      <el-table-column label="状态" align="center" prop="status" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['shop:productCategory:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['shop:productCategory:remove']"
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

    <!-- 添加或修改商品分类对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">

        <el-form-item label="分类名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入分类名称" />
        </el-form-item>
        <el-form-item label="父分类"  prop="parentId">

            <el-col :span="24">
              <el-form-item >
                <treeselect
                  v-model="form.parentId"
                  :options="pIdOptions"
                  :normalizer="normalizer"
                  :show-count="true"
                  placeholder="选择父分类"
                />
              </el-form-item>
            </el-col>
        </el-form-item>



        <el-form-item label="分类图片" prop="thumb">
          <image-upload v-model="form.thumb"/>
        </el-form-item>
        <el-form-item label="分类等级" prop="level">
          <el-input v-model="form.level" placeholder="请输入分类等级" />
        </el-form-item>
        <el-form-item label="排序" prop="displayOrder">
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
import { listProductCategory, getProductCategory, delProductCategory, addProductCategory, updateProductCategory } from "@/api/shop/productCategory";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import IconSelect from "@/components/IconSelect";
export default {
  name: "ProductCategory",
  components: { Treeselect, IconSelect },
  data() {
    return {
      pIdOptions:[],
      categoryIdOptions: [],
      categoryIdProps: {
        "multiple": false,
         "value": "id",
         "label": "name"
      },
        refreshTable: true,
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
      // 商品分类表格数据
      productCategoryList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        shopId: null,
        name: null,
        parentId: null,
        thumb: null,
        level: null,
        displayOrder: null,
        status: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        shopId: [
          { required: true, message: "店铺ID不能为空", trigger: "blur" }
        ],
        name: [
          { required: true, message: "分类名称不能为空", trigger: "blur" }
        ],
        parentId: [
          { required: true, message: "父分类id不能为空", trigger: "blur" }
        ],
        thumb: [
          { required: true, message: "分类图片不能为空", trigger: "blur" }
        ],
        level: [
          { required: true, message: "分类等级不能为空", trigger: "blur" }
        ],
        displayOrder: [
          { required: true, message: "展示顺序 越小越靠前不能为空", trigger: "blur" }
        ],
        status: [
          { required: true, message: "状态 1:正常 0:无效不能为空", trigger: "blur" }
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
    this.getCategoryIdOptions();
  },
  methods: {
    getCategoryIdOptions() {
      // TODO 发起请求获取数据
      // this.categoryIdOptions
      listProductCategory().then(response => {
        this.categoryIdOptions = response.rows;

      });
    },
    /** 转换菜单数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.id,
        label: node.name,
        children: node.children
      };
    },
    /** 查询商品分类列表 */
    getList() {
      this.loading = true;
      this.queryParams['parentId']=0;
      this.queryParams['tree']=1;
      listProductCategory(this.queryParams).then(response => {
        this.productCategoryList = response.rows;
        this.total = response.total;
        this.loading = false;
        this.pIdOptions= response.rows;
        console.log(   this.pIdOptions);
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
        name: null,
        parentId: 0,
        thumb: null,
        level: null,
        displayOrder: null,
        status: 0,
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
      this.title = "添加商品分类";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
       
      const id = row.id || this.ids
      getProductCategory(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改商品分类";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          // this.form['parentId']=this.form['parentId'][0];
          if (this.form.id != null) {
            updateProductCategory(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addProductCategory(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除商品分类编号为"' + ids + '"的数据项？').then(function() {
        return delProductCategory(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('shop/productCategory/export', {
        ...this.queryParams
      }, `productCategory_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
