<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="归属地" prop="city">
        <el-input
          v-model="queryParams.city"
          placeholder="请输入归属地"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable>
          <el-option
            v-for="dict in dict.type.global_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="重发" prop="cycle">
        <el-input
          v-model="queryParams.cycle"
          placeholder="请输入重发"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="已发数" prop="hadCycle">
        <el-input
          v-model="queryParams.hadCycle"
          placeholder="请输入已发送次数"
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
          v-hasPermi="['phone:tSmsDetail:add']"
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
          v-hasPermi="['phone:tSmsDetail:edit']"
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
          v-hasPermi="['phone:tSmsDetail:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['phone:tSmsDetail:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="tSmsDetailList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="短信编号" align="center" prop="id" />
      <el-table-column label="手机号" align="center" prop="phoneNum" />
      <el-table-column label="归属地" align="center" prop="city" />
      <el-table-column label="模版" align="center" prop="templateName" />
      <el-table-column label="更新时间" align="center" prop="updateTime"/>
      <el-table-column label="状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sms_status" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column label="任务" align="center" prop="taskName" />
      <el-table-column label="结果" align="center" prop="result" />
      <el-table-column label="供应商" align="center" prop="suplierName" />
      <el-table-column label="操作" align="center" width="135" class-name="small-padding ">

        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdateSend(scope.row)"
            v-hasPermi="['phone:tPhoneTask:edit']"
          >重新发送</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['phone:tSmsDetail:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['phone:tSmsDetail:remove']"
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

    <!-- 添加或修改短信内容对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="手机号" prop="phoneNum">
          <el-input v-model="form.phoneNum" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="归属地" prop="city">
          <el-input v-model="form.city" placeholder="请输入归属地" />
        </el-form-item>
     
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in dict.type.sms_status"
              :key="dict.value"
:label="parseInt(dict.value)"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="重发" prop="cycle">
          <el-input v-model="form.cycle" placeholder="请输入重发" />
        </el-form-item>
        <el-form-item label="已发送次数" prop="hadCycle">
          <el-input v-model="form.hadCycle" placeholder="请输入已发送次数" />
        </el-form-item>
        <el-form-item label="短信模版" prop="templateId">
          <el-select v-model="form.templateId" placeholder="请选择" filterable clearable
            :style="{width: '100%'}">
            <el-option v-for="(item, index) in tSmsTemplateList" :key="index" :label="item.name"
              :value="item.id"  ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务" prop="taskId">
          <el-select v-model="form.taskId" placeholder="请选择" filterable clearable
            :style="{width: '100%'}">
            <el-option v-for="(item, index) in tPhoneTaskList" :key="index" :label="item.name"
              :value="item.id"  ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
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
import { listTSmsDetail, getTSmsDetail, delTSmsDetail, addTSmsDetail, updateTSmsDetail } from "@/api/phone/tSmsDetail";

import { listTPhoneTask } from "@/api/phone/tPhoneTask";
import { listTSmsTemplate } from "@/api/phone/tSmsTemplate";
export default {
  name: "TSmsDetail",
  dicts: ['sms_status'],
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
      // 短信内容表格数据
      tSmsDetailList: [],
      tPhoneTaskList: [],
      tSmsTemplateList:[],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        city: null,
        templateId: null,
        status: null,
        taskId: null,
        province: null,
        result: null,
        cycle: null,
        hadCycle: null,
        suplierId: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        phoneNum: [
          { required: true, message: "手机号不能为空", trigger: "blur" }
        ],
        status: [
          { required: true, message: "请选择状态", trigger: "blur" }
        ],
        templateId: [
          { required: true, message: "请选择模版", trigger: "blur" }
        ],
        taskId: [
          { required: true, message: "请选择任务", trigger: "blur" }
        ],
      }
    };
  },

  created() {
    const taskId = this.$route.params && this.$route.params.taskId;
    this.queryParams.taskId=taskId;
    console.log(taskId)
    this.getList();
    this.loadTemplate();
    this.loadTPhoneTask();
  },
  methods: {
    loadTPhoneTask() {
       var thus=this;
      listTPhoneTask(this.queryParams).then(response => {
        thus.tPhoneTaskList = response.rows; 
      });
    },
    loadTemplate(){
      var thus=this;
      listTSmsTemplate(this.queryParams).then(response => {
        thus.tSmsTemplateList = response.rows;
        console.log(response.rows);
        this.total = response.total;
        this.loading = false;
      });
    },
    /** 查询短信内容列表 */
    getList() {
      this.loading = true;
      listTSmsDetail(this.queryParams).then(response => {
        this.tSmsDetailList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    handleUpdateSend(row) {
      this.reset();
      var thus=this;
      const id = row.id || this.ids
      getTSmsDetail(id).then(response => {
        thus.form = response.data;
        thus.form.cycle=1;
        thus.form.status=0;
        updateTSmsDetail(thus.form).then(response => {
          this.$modal.msgSuccess("重发成功");
          this.getList();
        });

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
        phoneNum: null,
        city: null,
        createTime: null,
        templateId: null,
        remark: null,
        status: 0,
        taskId: null,
        province: null,
        result: null,
        cycle: null,
        hadCycle: null,
        suplierId: null
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
      this.title = "添加短信内容";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getTSmsDetail(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改短信内容";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateTSmsDetail(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addTSmsDetail(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除短信内容编号为"' + ids + '"的数据项？').then(function() {
        return delTSmsDetail(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('phone/tSmsDetail/export', {
        ...this.queryParams
      }, `tSmsDetail_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
