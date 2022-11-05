<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="queryParams.name" placeholder="请输入名称" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable>
          <el-option v-for="dict in dict.type.global_status" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="区域范围(m)" prop="radius">
        <el-input v-model="queryParams.radius" placeholder="请输入区域范围(m)" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['religion:religionSacrifice:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['religion:religionSacrifice:edit']">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['religion:religionSacrifice:remove']">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
          v-hasPermi="['religion:religionSacrifice:export']">导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="religionSacrificeList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="编号" align="center" prop="id" />
      <el-table-column label="名称" align="center" prop="name" />
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
          <dict-tag :options="dict.type.global_status" :value="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column label="区域范围(m)" align="center" prop="radius" />
      <el-table-column label="纬度" align="center" prop="latitude" />
      <el-table-column label="经度" align="center" prop="longitude" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['religion:religionSacrifice:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['religion:religionSacrifice:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改民间烧香点对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio v-for="dict in dict.type.global_status" :key="dict.value" :label="parseInt(dict.value)">
              {{dict.label}}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="范围(m)" prop="radius">
          <el-input v-model="form.radius" placeholder="请输入区域范围(m)" />
        </el-form-item>
        <el-form-item label="选择点" prop="latitude">
        </el-form-item>
        <el-form-item prop="lat_log">
          <TMap v-model="form.lat_log"></TMap>
          <!-- this.form.latitude = newPoint.lat; -->
          <!-- this.form.longitude = newPoint.lng; -->
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
  import {
    listReligionSacrifice,
    getReligionSacrifice,
    delReligionSacrifice,
    addReligionSacrifice,
    updateReligionSacrifice
  } from "@/api/religion/religionSacrifice";
  import {
    TMap
  } from '@/api/TMap';
  export default {
    name: "ReligionSacrifice",
    dicts: ['global_status'],
    data() {
      return {
        map: {},
        center: {
          lng: 121.478743,
          lat: 31.236176
        },
        point: {},
        lableStyle: {
          color: 'red',
          fontSize: '24px'
        },
        offset: {
          width: -35,
          height: 30
        },
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
        // 民间烧香点表格数据
        religionSacrificeList: [],
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
          radius: null,
          latitude: null,
          longitude: null,
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {
          name: [{
            required: true,
            message: "名称不能为空",
            trigger: "blur"
          }],
        }
      };
    },
    created() {

      this.getList();
    },
    mounted() {

    },
    methods: {

      /** 查询民间烧香点列表 */
      getList() {
        this.loading = true;
        listReligionSacrifice(this.queryParams).then(response => {
          this.religionSacrificeList = response.rows;
          this.total = response.total;
          this.loading = false;

        });
      },
      click(e) {

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
          radius: null,
          latitude: null,
          longitude: null,
          deleted: null,
          lat_log: null,
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
        this.single = selection.length !== 1
        this.multiple = !selection.length
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.reset();
        this.center = {
            lng: 121.478743,
            lat: 31.236176
          },
          this.title = "添加民间烧香点";
        this.open = true;
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        var thus = this;
        const id = row.id || this.ids
        getReligionSacrifice(id).then(response => {
          thus.form = response.data;
          thus.title = "修改民间烧香点";
          thus.form.lat_log =thus.form.latitude + "," + thus.form.longitude;
          thus.open = true;
        });
      },



      /** 提交按钮 */
      submitForm() {
        this.form.latitude = this.form.lat_log.split(',')[0];
        this.form.longitude = this.form.lat_log.split(',')[1];
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id != null) {
              updateReligionSacrifice(this.form).then(response => {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                // this.$router.go(0);
                this.getList();
              });
            } else {
              addReligionSacrifice(this.form).then(response => {
                this.$modal.msgSuccess("新增成功");
                this.open = false;
                // this.$router.go(0);
                this.getList();
              });

            }
          }
        });
      },
      /** 删除按钮操作 */
      handleDelete(row) {
        const ids = row.id || this.ids;
        this.$modal.confirm('是否确认删除民间烧香点编号为"' + ids + '"的数据项？').then(function() {
          return delReligionSacrifice(ids);
        }).then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        }).catch(() => {});
      },
      /** 导出按钮操作 */
      handleExport() {
        this.download('religion/religionSacrifice/export', {
          ...this.queryParams
        }, `religionSacrifice_${new Date().getTime()}.xlsx`)
      }
    }
  };
</script>
<style>
.map{
  height: 300px;
}
</style>
