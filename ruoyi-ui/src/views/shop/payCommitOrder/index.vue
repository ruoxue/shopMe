<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
    
      <el-form-item label="orderId" prop="orderId">
        <el-input
          v-model="queryParams.orderId"
          placeholder="请输入orderId"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      
       
      <el-form-item label="三方订单号" prop="thirdSn">
        <el-input
          v-model="queryParams.thirdSn"
          placeholder="三方订单"
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
          v-hasPermi="['shop:payCommitOrder:add']"
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
          v-hasPermi="['shop:payCommitOrder:edit']"
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
          v-hasPermi="['shop:payCommitOrder:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['shop:payCommitOrder:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="payCommitOrderList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
       
      <el-table-column label="创建时间" align="center" prop="createdTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createdTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="更新时间" align="center" prop="updatedTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updatedTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单号" align="center" prop="orderId" />
      <el-table-column label="订单金额" align="center" prop="orderAmount" />
      <el-table-column label="支付金额" align="center" prop="payAmount" />
      <el-table-column label="描述" align="center" prop="payDesc" />
      <el-table-column label="三方订单号" align="center" prop="thirdId" />
      <el-table-column label="三方sn" align="center" prop="thirdSn" />
      <el-table-column label="状态" align="center" prop="status" />
      <el-table-column label="回调ip" align="center" prop="notifyIp" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['shop:payCommitOrder:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['shop:payCommitOrder:remove']"
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

    <!-- 添加或修改预付卡订单对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="乐观锁" prop="revision">
          <el-input v-model="form.revision" placeholder="请输入乐观锁" />
        </el-form-item>
        <el-form-item label="创建人" prop="createdBy">
          <el-input v-model="form.createdBy" placeholder="请输入创建人" />
        </el-form-item>
        <el-form-item label="创建时间" prop="createdTime">
          <el-date-picker clearable
            v-model="form.createdTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择创建时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="更新人" prop="updatedBy">
          <el-input v-model="form.updatedBy" placeholder="请输入更新人" />
        </el-form-item>
        <el-form-item label="更新时间" prop="updatedTime">
          <el-date-picker clearable
            v-model="form.updatedTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择更新时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="${comment}" prop="orderId">
          <el-input v-model="form.orderId" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="${comment}" prop="orderAmount">
          <el-input v-model="form.orderAmount" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="${comment}" prop="payAmount">
          <el-input v-model="form.payAmount" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="${comment}" prop="payDesc">
          <el-input v-model="form.payDesc" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="${comment}" prop="thirdId">
          <el-input v-model="form.thirdId" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="${comment}" prop="thirdSn">
          <el-input v-model="form.thirdSn" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="回调ip" prop="notifyIp">
          <el-input v-model="form.notifyIp" placeholder="请输入回调ip" />
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
import { listPayCommitOrder, getPayCommitOrder, delPayCommitOrder, addPayCommitOrder, updatePayCommitOrder } from "@/api/shop/payCommitOrder";

export default {
  name: "PayCommitOrder",
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
      // 预付卡订单表格数据
      payCommitOrderList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        revision: null,
        createdBy: null,
        createdTime: null,
        updatedBy: null,
        updatedTime: null,
        orderId: null,
        orderAmount: null,
        payAmount: null,
        payDesc: null,
        thirdId: null,
        thirdSn: null,
        status: null,
        notifyIp: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        orderId: [
          { required: true, message: "$comment不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询预付卡订单列表 */
    getList() {
      this.loading = true;
      listPayCommitOrder(this.queryParams).then(response => {
        this.payCommitOrderList = response.rows;
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
        revision: null,
        createdBy: null,
        createdTime: null,
        updatedBy: null,
        updatedTime: null,
        orderId: null,
        orderAmount: null,
        payAmount: null,
        payDesc: null,
        thirdId: null,
        thirdSn: null,
        status: 0,
        notifyIp: null
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
      this.ids = selection.map(item => item.revision)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加预付卡订单";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const revision = row.revision || this.ids
      getPayCommitOrder(revision).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改预付卡订单";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.revision != null) {
            updatePayCommitOrder(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addPayCommitOrder(this.form).then(response => {
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
      const revisions = row.revision || this.ids;
      this.$modal.confirm('是否确认删除预付卡订单编号为"' + revisions + '"的数据项？').then(function() {
        return delPayCommitOrder(revisions);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('shop/payCommitOrder/export', {
        ...this.queryParams
      }, `payCommitOrder_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
