<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="地址名称" prop="addressName">
        <el-input
          v-model="queryParams.addressName"
          placeholder="请输入地址名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="区" prop="county">
        <el-input
          v-model="queryParams.county"
          placeholder="请输入区"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="uid">
        <el-input
          v-model="queryParams.uid"
          placeholder="请输入${comment}"
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
          v-hasPermi="['shop:buyerAddress:add']"
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
          v-hasPermi="['shop:buyerAddress:edit']"
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
          v-hasPermi="['shop:buyerAddress:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['shop:buyerAddress:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="buyerAddressList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="地址ID" align="center" prop="addressId" />
      <el-table-column label="地址名称" align="center" prop="addressName" />
      <el-table-column label="顺序号" align="center" prop="seqNumber" />
      <el-table-column label="省" align="center" prop="province" />
      <el-table-column label="市" align="center" prop="city" />
      <el-table-column label="区" align="center" prop="county" />
      <el-table-column label="街道" align="center" prop="street" />
      <el-table-column label="门牌号" align="center" prop="lastDetail" />
      <el-table-column label="${comment}" align="center" prop="uid" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['shop:buyerAddress:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['shop:buyerAddress:remove']"
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

    <!-- 添加或修改地址对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="地址名称" prop="addressName">
          <el-input v-model="form.addressName" placeholder="请输入地址名称" />
        </el-form-item>
        <el-form-item label="区" prop="county">
          <el-input v-model="form.county" placeholder="请输入区" />
        </el-form-item>
        <el-form-item label="街道" prop="street">
          <el-input v-model="form.street" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="门牌号" prop="lastDetail">
          <el-input v-model="form.lastDetail" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="${comment}" prop="uid">
          <el-input v-model="form.uid" placeholder="请输入${comment}" />
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
import { listBuyerAddress, getBuyerAddress, delBuyerAddress, addBuyerAddress, updateBuyerAddress } from "@/api/shop/buyerAddress";

export default {
  name: "BuyerAddress",
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
      // 地址表格数据
      buyerAddressList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        addressName: null,
        seqNumber: null,
        province: null,
        city: null,
        county: null,
        street: null,
        lastDetail: null,
        uid: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询地址列表 */
    getList() {
      this.loading = true;
      listBuyerAddress(this.queryParams).then(response => {
        this.buyerAddressList = response.rows;
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
        addressId: null,
        addressName: null,
        seqNumber: null,
        province: null,
        city: null,
        county: null,
        street: null,
        lastDetail: null,
        revision: null,
        createdBy: null,
        createdTime: null,
        updatedBy: null,
        updatedTime: null,
        uid: null
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
      this.ids = selection.map(item => item.addressId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加地址";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const addressId = row.addressId || this.ids
      getBuyerAddress(addressId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改地址";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.addressId != null) {
            updateBuyerAddress(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addBuyerAddress(this.form).then(response => {
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
      const addressIds = row.addressId || this.ids;
      this.$modal.confirm('是否确认删除地址编号为"' + addressIds + '"的数据项？').then(function() {
        return delBuyerAddress(addressIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('shop/buyerAddress/export', {
        ...this.queryParams
      }, `buyerAddress_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
