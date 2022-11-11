<template>
  <div class="bg">
    <el-row>
      <el-col :span="8"   v-for="item in religionVideoList">
        <video width="96%" height="48%" controls   autoplay muted>
          <source   :src="item.url" type="video/mp4">
        </video>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {
    listReligionVideo,
    getReligionVideo,
    delReligionVideo,
    addReligionVideo,
    updateReligionVideo
  } from "@/api/religion/religionVideo";

  export default {
    name: "ReligionVideo",
    dicts: ['global_status'],
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
        // 视频接入表格数据
        religionVideoList: [],
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
          url: null,
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
    methods: {
      /** 查询视频接入列表 */
      getList() {
        this.loading = true;
        listReligionVideo(this.queryParams).then(response => {
          this.religionVideoList = response.rows;
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
          url: null,
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
        this.open = true;
        this.title = "添加视频接入";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const id = row.id || this.ids
        getReligionVideo(id).then(response => {
          this.form = response.data;
          this.open = true;
          this.title = "修改视频接入";
        });
      },
      /** 提交按钮 */
      submitForm() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id != null) {
              updateReligionVideo(this.form).then(response => {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              });
            } else {
              addReligionVideo(this.form).then(response => {
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
        this.$modal.confirm('是否确认删除视频接入编号为"' + ids + '"的数据项？').then(function() {
          return delReligionVideo(ids);
        }).then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        }).catch(() => {});
      },
      /** 导出按钮操作 */
      handleExport() {
        this.download('religion/religionVideo/export', {
          ...this.queryParams
        }, `religionVideo_${new Date().getTime()}.xlsx`)
      }
    }
  };
</script>


<style>
  .bg {
    height: 100%;
    min-height: 100%;
    padding-top: 30px;
    padding-bottom: 30px;
    background: url('../../../assets/images/bg.png');
  }
  .app-main{
    height: 100%;
    min-height: 100%;
  }
</style>
