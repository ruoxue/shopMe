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
            v-for="dict in dict.type.global_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="简介" prop="introduce">
        <el-input
          v-model="queryParams.introduce"
          placeholder="请输入简介"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="宗教类别" prop="religionType">
        <el-select v-model="queryParams.religionType" placeholder="请选择宗教类别" clearable>
          <el-option
            v-for="dict in dict.type.religion_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="经度" prop="longitude">
        <el-input
          v-model="queryParams.longitude"
          placeholder="请输入经度"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="纬度" prop="latitude">
        <el-input
          v-model="queryParams.latitude"
          placeholder="请输入纬度"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="景区级别" prop="scenicLevel">
        <el-input
          v-model="queryParams.scenicLevel"
          placeholder="请输入景区级别"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="文保级别" prop="securityLevel">
        <el-input
          v-model="queryParams.securityLevel"
          placeholder="请输入文保级别"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="门票" prop="ticket">
        <el-input
          v-model="queryParams.ticket"
          placeholder="请输入门票"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="始建年代" prop="initialTime">
        <el-input
          v-model="queryParams.initialTime"
          placeholder="请输入始建年代"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="开发时间" prop="devTime">
        <el-input
          v-model="queryParams.devTime"
          placeholder="请输入开发时间"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="主要景点" prop="mainSpot">
        <el-input
          v-model="queryParams.mainSpot"
          placeholder="请输入主要景点"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="适宜游玩时间" prop="niceTime">
        <el-input
          v-model="queryParams.niceTime"
          placeholder="请输入适宜游玩时间"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="宗教事务" prop="religionThing">
        <el-input
          v-model="queryParams.religionThing"
          placeholder="请输入宗教事务"
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
          v-hasPermi="['religion:religionArea:add']"
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
          v-hasPermi="['religion:religionArea:edit']"
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
          v-hasPermi="['religion:religionArea:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['religion:religionArea:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="religionAreaList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="编号" align="center" prop="id" />
      <el-table-column label="名称" align="center" prop="name" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d} ') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center" prop="updateTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.global_status" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column label="简介" align="center" prop="introduce" />
      <el-table-column label="照片" align="center" prop="thumb" width="100">
        <template slot-scope="scope">
          <image-preview :src="scope.row.thumb" :width="50" :height="50"/>
        </template>
      </el-table-column>
      <el-table-column label="宗教类别" align="center" prop="religionType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.religion_type" :value="scope.row.religionType"/>
        </template>
      </el-table-column>
      <el-table-column label="经度" align="center" prop="longitude" />
      <el-table-column label="纬度" align="center" prop="latitude" />
      <el-table-column label="景区级别" align="center" prop="scenicLevel" />
      <el-table-column label="文保级别" align="center" prop="securityLevel">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.security_level" :value="scope.row.securityLevel"/>
        </template>
      </el-table-column>
      <el-table-column label="门票" align="center" prop="ticket" />
      <el-table-column label="始建年代" align="center" prop="initialTime" />
      <el-table-column label="开发时间" align="center" prop="devTime" />
      <el-table-column label="主要景点" align="center" prop="mainSpot" />
      <el-table-column label="适宜游玩时间" align="center" prop="niceTime" />
      <el-table-column label="宗教事务" align="center" prop="religionThing" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['religion:religionArea:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['religion:religionArea:remove']"
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

    <!-- 添加或修改宗教场所对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in dict.type.global_status"
              :key="dict.value"
:label="parseInt(dict.value)"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="简介" prop="introduce">
          <el-input v-model="form.introduce" placeholder="请输入简介" />
        </el-form-item>
        <el-form-item label="照片">
          <image-upload v-model="form.thumb"/>
        </el-form-item>
        <el-form-item label="宗教类别" prop="religionType">
          <el-select v-model="form.religionType" placeholder="请选择宗教类别">
            <el-option
              v-for="dict in dict.type.religion_type"
              :key="dict.value"
              :label="dict.label"
:value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="经度" prop="longitude">
          <el-input v-model="form.longitude" placeholder="请输入经度" />
        </el-form-item>
        <el-form-item label="纬度" prop="latitude">
          <el-input v-model="form.latitude" placeholder="请输入纬度" />
        </el-form-item>
        <el-form-item label="景区级别" prop="scenicLevel">
          <el-input v-model="form.scenicLevel" placeholder="请输入景区级别" />
        </el-form-item>
        <el-form-item label="文保级别" prop="securityLevel">
          <el-input v-model="form.securityLevel" placeholder="请输入文保级别" />
        </el-form-item>
        <el-form-item label="门票" prop="ticket">
          <el-input v-model="form.ticket" placeholder="请输入门票" />
        </el-form-item>
        <el-form-item label="始建年代" prop="initialTime">
          <el-input v-model="form.initialTime" placeholder="请输入始建年代" />
        </el-form-item>
        <el-form-item label="开发时间" prop="devTime">
          <el-input v-model="form.devTime" placeholder="请输入开发时间" />
        </el-form-item>
        <el-form-item label="主要景点" prop="mainSpot">
          <el-input v-model="form.mainSpot" placeholder="请输入主要景点" />
        </el-form-item>
        <el-form-item label="适宜游玩时间" prop="niceTime">
          <el-input v-model="form.niceTime" placeholder="请输入适宜游玩时间" />
        </el-form-item>
        <el-form-item label="宗教事务" prop="religionThing">
          <el-input v-model="form.religionThing" placeholder="请输入宗教事务" />
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
import { listReligionArea, getReligionArea, delReligionArea, addReligionArea, updateReligionArea } from "@/api/religion/religionArea";

export default {
  name: "ReligionArea",
  dicts: ['global_status', 'religion_type'],
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
      // 宗教场所表格数据
      religionAreaList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        status: null,
        introduce: null,
        thumb: null,
        religionType: null,
        longitude: null,
        latitude: null,
        scenicLevel: null,
        securityLevel: null,
        ticket: null,
        initialTime: null,
        devTime: null,
        mainSpot: null,
        niceTime: null,
        religionThing: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [
          { required: true, message: "名称不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询宗教场所列表 */
    getList() {
      this.loading = true;
      listReligionArea(this.queryParams).then(response => {
        this.religionAreaList = response.rows;
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
        status: 1,
        introduce: null,
        thumb: null,
        religionType: null,
        longitude: null,
        latitude: null,
        scenicLevel: null,
        securityLevel: null,
        ticket: null,
        initialTime: null,
        devTime: null,
        mainSpot: null,
        niceTime: null,
        religionThing: null,
        deleted: null,
        remark: null
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
      this.title = "添加宗教场所";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getReligionArea(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改宗教场所";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateReligionArea(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addReligionArea(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除宗教场所编号为"' + ids + '"的数据项？').then(function() {
        return delReligionArea(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('religion/religionArea/export', {
        ...this.queryParams
      }, `religionArea_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
