<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="姓名" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入姓名"
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
      <el-form-item label="用户账号" prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入用户账号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="法名" prop="nickName">
        <el-input
          v-model="queryParams.nickName"
          placeholder="请输入法名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input
          v-model="queryParams.email"
          placeholder="请输入用户邮箱"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="联系方式" prop="phonenumber">
        <el-input
          v-model="queryParams.phonenumber"
          placeholder="请输入联系方式"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="queryParams.password"
          placeholder="请输入密码"
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
      <el-form-item label="宗教派别" prop="religionSect">
        <el-input
          v-model="queryParams.religionSect"
          placeholder="请输入宗教派别"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="具体地址" prop="areaDetail">
        <el-input
          v-model="queryParams.areaDetail"
          placeholder="请输入具体地址"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="所属区域" prop="areaId">
        <el-input
          v-model="queryParams.areaId"
          placeholder="请输入所属区域"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否民族管理人" prop="nationSubMain">
        <el-input
          v-model="queryParams.nationSubMain"
          placeholder="请输入是否民族管理人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否民族负责人" prop="nationMain">
        <el-input
          v-model="queryParams.nationMain"
          placeholder="请输入是否民族负责人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="民族" prop="nationId">
        <el-input
          v-model="queryParams.nationId"
          placeholder="请输入民族"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="职别" prop="position">
        <el-input
          v-model="queryParams.position"
          placeholder="请输入职别"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="教育程度" prop="educ">
        <el-input
          v-model="queryParams.educ"
          placeholder="请输入教育程度"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="毕业院校" prop="graduatedFrom">
        <el-input
          v-model="queryParams.graduatedFrom"
          placeholder="请输入毕业院校"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否团体管理班子" prop="teamSubMain">
        <el-input
          v-model="queryParams.teamSubMain"
          placeholder="请输入是否团体管理班子"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否团体负责人" prop="teamMain">
        <el-input
          v-model="queryParams.teamMain"
          placeholder="请输入是否团体负责人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="团体" prop="teamId">
        <el-input
          v-model="queryParams.teamId"
          placeholder="请输入团体"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select v-model="queryParams.type" placeholder="请选择类型" clearable>
          <el-option
            v-for="dict in dict.type.religion_user_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
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
          v-hasPermi="['religion:religionUser:add']"
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
          v-hasPermi="['religion:religionUser:edit']"
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
          v-hasPermi="['religion:religionUser:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['religion:religionUser:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="religionUserList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="编号" align="center" prop="id" />
      <el-table-column label="姓名" align="center" prop="name" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
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
      <el-table-column label="用户账号" align="center" prop="userName" />
      <el-table-column label="法名" align="center" prop="nickName" />
      <el-table-column label="用户邮箱" align="center" prop="email" />
      <el-table-column label="联系方式" align="center" prop="phonenumber" />
      <el-table-column label="用户性别" align="center" prop="sex" />
      <el-table-column label="头像地址" align="center" prop="avatar" width="100">
        <template slot-scope="scope">
          <image-preview :src="scope.row.avatar" :width="50" :height="50"/>
        </template>
      </el-table-column>
      <el-table-column label="密码" align="center" prop="password" />
      <el-table-column label="宗教类别" align="center" prop="religionType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.religion_type" :value="scope.row.religionType"/>
        </template>
      </el-table-column>
      <el-table-column label="宗教派别" align="center" prop="religionSect" />
      <el-table-column label="具体地址" align="center" prop="areaDetail" />
      <el-table-column label="所属区域" align="center" prop="areaId" />
      <el-table-column label="是否民族管理人" align="center" prop="nationSubMain" />
      <el-table-column label="是否民族负责人" align="center" prop="nationMain" />
      <el-table-column label="民族" align="center" prop="nationId" />
      <el-table-column label="职别" align="center" prop="position" />
      <el-table-column label="教育程度" align="center" prop="educ">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.educ" :value="scope.row.educ"/>
        </template>
      </el-table-column>
      <el-table-column label="毕业院校" align="center" prop="graduatedFrom">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.graduated_from" :value="scope.row.graduatedFrom"/>
        </template>
      </el-table-column>
      <el-table-column label="是否团体管理班子" align="center" prop="teamSubMain" />
      <el-table-column label="是否团体负责人" align="center" prop="teamMain" />
      <el-table-column label="团体" align="center" prop="teamId" />
      <el-table-column label="类型" align="center" prop="type">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.religion_user_type" :value="scope.row.type"/>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['religion:religionUser:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['religion:religionUser:remove']"
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

    <!-- 添加或修改宗教人员对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名" />
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
        <el-form-item label="用户账号" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入用户账号" />
        </el-form-item>
        <el-form-item label="法名" prop="nickName">
          <el-input v-model="form.nickName" placeholder="请输入法名" />
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入用户邮箱" />
        </el-form-item>
        <el-form-item label="联系方式" prop="phonenumber">
          <el-input v-model="form.phonenumber" placeholder="请输入联系方式" />
        </el-form-item>
        <el-form-item label="头像地址">
          <image-upload v-model="form.avatar"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="宗教类别" prop="religionType">
          <el-select v-model="form.religionType" placeholder="请选择宗教类别">
            <el-option
              v-for="dict in dict.type.religion_type"
              :key="dict.value"
              :label="dict.label"
:value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="宗教派别" prop="religionSect">
          <el-input v-model="form.religionSect" placeholder="请输入宗教派别" />
        </el-form-item>
        <el-form-item label="具体地址" prop="areaDetail">
          <el-input v-model="form.areaDetail" placeholder="请输入具体地址" />
        </el-form-item>
        <el-form-item label="所属区域" prop="areaId">
          <el-input v-model="form.areaId" placeholder="请输入所属区域" />
        </el-form-item>
        <el-form-item label="是否民族管理人" prop="nationSubMain">
          <el-input v-model="form.nationSubMain" placeholder="请输入是否民族管理人" />
        </el-form-item>
        <el-form-item label="是否民族负责人" prop="nationMain">
          <el-input v-model="form.nationMain" placeholder="请输入是否民族负责人" />
        </el-form-item>
        <el-form-item label="民族" prop="nationId">
          <el-input v-model="form.nationId" placeholder="请输入民族" />
        </el-form-item>
        <el-form-item label="职别" prop="position">
          <el-input v-model="form.position" placeholder="请输入职别" />
        </el-form-item>
        <el-form-item label="教育程度" prop="educ">
          <el-input v-model="form.educ" placeholder="请输入教育程度" />
        </el-form-item>
        <el-form-item label="毕业院校" prop="graduatedFrom">
          <el-input v-model="form.graduatedFrom" placeholder="请输入毕业院校" />
        </el-form-item>
        <el-form-item label="是否团体管理班子" prop="teamSubMain">
          <el-input v-model="form.teamSubMain" placeholder="请输入是否团体管理班子" />
        </el-form-item>
        <el-form-item label="是否团体负责人" prop="teamMain">
          <el-input v-model="form.teamMain" placeholder="请输入是否团体负责人" />
        </el-form-item>
        <el-form-item label="团体" prop="teamId">
          <el-input v-model="form.teamId" placeholder="请输入团体" />
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择类型">
            <el-option
              v-for="dict in dict.type.religion_user_type"
              :key="dict.value"
              :label="dict.label"
:value="parseInt(dict.value)"
            ></el-option>
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
import { listReligionUser, getReligionUser, delReligionUser, addReligionUser, updateReligionUser } from "@/api/religion/religionUser";

export default {
  name: "ReligionUser",
  dicts: ['global_status', 'religion_type', 'religion_user_type'],
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
      // 宗教人员表格数据
      religionUserList: [],
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
        userName: null,
        nickName: null,
        email: null,
        phonenumber: null,
        sex: null,
        avatar: null,
        password: null,
        religionType: null,
        religionSect: null,
        areaDetail: null,
        areaId: null,
        nationSubMain: null,
        nationMain: null,
        nationId: null,
        position: null,
        educ: null,
        graduatedFrom: null,
        teamSubMain: null,
        teamMain: null,
        teamId: null,
        type: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [
          { required: true, message: "姓名不能为空", trigger: "blur" }
        ],
        userName: [
          { required: true, message: "用户账号不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询宗教人员列表 */
    getList() {
      this.loading = true;
      listReligionUser(this.queryParams).then(response => {
        this.religionUserList = response.rows;
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
        deleted: null,
        userName: null,
        nickName: null,
        email: null,
        phonenumber: null,
        sex: null,
        avatar: null,
        password: null,
        religionType: null,
        religionSect: null,
        areaDetail: null,
        areaId: null,
        nationSubMain: null,
        nationMain: null,
        nationId: null,
        position: null,
        educ: null,
        graduatedFrom: null,
        teamSubMain: null,
        teamMain: null,
        teamId: null,
        type: null,
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
      this.title = "添加宗教人员";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getReligionUser(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改宗教人员";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateReligionUser(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addReligionUser(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除宗教人员编号为"' + ids + '"的数据项？').then(function() {
        return delReligionUser(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('religion/religionUser/export', {
        ...this.queryParams
      }, `religionUser_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
