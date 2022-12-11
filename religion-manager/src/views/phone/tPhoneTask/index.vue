<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable>
          <el-option
            v-for="dict in dict.type.task_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      
      <el-form-item label="数量" prop="num">
        <el-input
          v-model="queryParams.num"
          placeholder="请输入数量"
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
          v-hasPermi="['phone:tPhoneTask:add']"
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
          v-hasPermi="['phone:tPhoneTask:edit']"
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
          v-hasPermi="['phone:tPhoneTask:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['phone:tPhoneTask:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="tPhoneTaskList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="编号" align="center" prop="id" />
      <el-table-column label="名称" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <router-link :to="'/phone/sms-detail/index/' + scope.row.id" class="link-type">
            <span>{{ scope.row.name }}</span>
          </router-link>
        </template>
      </el-table-column>
      
      <el-table-column label="状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.task_status" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column label="范围" align="center" prop="scope" />
      <el-table-column label="仅系统" align="center" prop="inSystem">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.in_system" :value="scope.row.inSystem"/>
        </template>
      </el-table-column>
      <el-table-column label="模版" align="center" prop="templateName" />
      <el-table-column label="数量" align="center" prop="num" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">

          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['phone:tPhoneTask:edit']"
          >修改</el-button>

          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['phone:tPhoneTask:remove']"
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

    <!-- 添加或修改生产任务对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称" />
        </el-form-item>

        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in dict.type.task_status"
              :key="dict.value"
:label="parseInt(dict.value)"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>


        <el-form-item label="省份" prop="province">
          <el-select v-model="form.province" placeholder="省" clearable
            :style="{width: '100%'}"  @change="changeProvince">
            <el-option v-for="(item, index) in tProvinceList" :key="index"  :label="item.areaName"
              :value="item.areaId"  ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="市" prop="city">
          <el-select v-model="form.city" placeholder="市" clearable
            :style="{width: '100%'}" @change="changeCity">
            <el-option v-for="(item, index) in tCityList"  :key="index" :label="item.areaName"
              :value="item.areaName"  ></el-option>
          </el-select>
        </el-form-item>

      <el-form-item label="手机号段" prop="scope">
          <el-select v-model="form.scope" placeholder="手机号段" clearable
            :style="{width: '100%'}">
            <el-option v-for="(item, index) in tPhoneNumberList"  :key="index" :label="item.number"
              :value="item.number"  ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="范围" prop="scope">
          <el-input v-model="form.scope" placeholder="请输入范围" />
        </el-form-item>

        <el-form-item label="系统内生成">
                  <el-radio-group v-model="form.inSystem">
                    <el-radio
                      v-for="dict in dict.type.in_system"
                      :key="dict.value"
        :label="parseInt(dict.value)"
                    >{{dict.label}}</el-radio>
                  </el-radio-group>
                </el-form-item>

        <el-form-item label="数量" prop="num">
          <el-input v-model="form.num" placeholder="请输入数量" />
        </el-form-item>

          <el-form-item label="短信模版" prop="templateId">
            <el-select v-model="form.templateId" placeholder="请选择" filterable clearable
              :style="{width: '100%'}">
              <el-option v-for="(item, index) in tSmsTemplateList" :key="index" :label="item.name"
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
import { listTPhoneTask, getTPhoneTask, delTPhoneTask, addTPhoneTask, updateTPhoneTask } from "@/api/phone/tPhoneTask";
import { listTSmsTemplate } from "@/api/phone/tSmsTemplate";
import { listTArea} from "@/api/phone/tArea";
import { listTPhoneNumber} from "@/api/phone/tPhoneNumber";
export default {
  name: "TPhoneTask",
  dicts: ['task_status','in_system'],
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
      // 生产任务表格数据
      tPhoneTaskList: [],
      tSmsTemplateList:[],
      tProvinceList:[],
      tCityList:[],
      tPhoneNumberList:[],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        tenantId: null,
        status: null,
        inSystem: null,
        templateId: null,
        num: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [
          { required: true, message: "名称不能为空", trigger: "blur" }
        ],
        scope: [
          { required: true, message: "范围不能为空", trigger: "blur" }
        ],
        num: [
          { required: true, message: "数量不能为空", trigger: "blur" }
        ],
        templateId: [
          { required: true, message: "请选择模版", trigger: "blur" }
        ],
        status: [
          { required: true, message: "请选择状态", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
    this.loadTemplate();
  },
  methods: {
    loadTemplate(){
      var thus=this;
      listTSmsTemplate(this.queryParams).then(response => {
        thus.tSmsTemplateList = response.rows;
        console.log(response.rows);
        this.total = response.total;
        this.loading = false;
      });
    },
    /** 查询生产任务列表 */
    getList() {
      this.loading = true;
      listTPhoneTask(this.queryParams).then(response => {
        this.tPhoneTaskList = response.rows;
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
        name: null,
        tenantId: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        deleted: null,
        status: 0,
        remark: null,
        path: null,
        scope: null,
        url: null,
        content: null,
        inSystem: 0,
        templateId: null,
        num: null
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
    loadArea(){
      var thus=this;
      console.log(123)
      listTArea({"parentId":-1,"pageSize":1000}).then(response => {
        thus.tProvinceList = response.rows;
      });
    },
    changeProvince(value){
      this.loadCity(value);
    },
    loadCity(pid){
      var thus=this;
      console.log(pid+"pid")
      listTArea({"parentId":pid,"pageSize":1000}).then(response => {
        thus.tCityList = response.rows;
        thus.form.scope='';
        thus.form.city=thus.tCityList[0].areaName;
        thus.loadPhone(thus.form.city)
      });
    },
    changeCity(value){
      this.loadPhone(value);
    },

  loadPhone(city){
    var thus=this;
    listTPhoneNumber({'city':city.replace("市","")}).then(response => {
      thus.tPhoneNumberList = response.rows;

    });
  },

    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加生产任务";
      this.loadArea();
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getTPhoneTask(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改生产任务";
      });
    },

    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateTPhoneTask(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addTPhoneTask(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除生产任务编号为"' + ids + '"的数据项？').then(function() {
        return delTPhoneTask(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('phone/tPhoneTask/export', {
        ...this.queryParams
      }, `tPhoneTask_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
