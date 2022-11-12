<template>
  <div class="app-container" style="background-color: red;min-height: 100%;">


    <!-- 添加或修改访问记录对话框 -->
      <el-form ref="form"  style="margin-top: 40%;" :model="form" :rules="rules" label-width="0px">

        <el-form-item label=""    prop="connection">
          <el-input v-model="form.connection" placeholder="请输入联系方式" />
        </el-form-item>
      </el-form>
      <div slot="footer" style="" class="dialog-footer">
        <el-button type="primary" class="el-button--warning" style="width: 100%;margin-top: 20%;"  @click="submitForm">确 定</el-button>
      </div>
  </div>
</template>

<script>
import {  addMobileTPhoneVisitor } from "@/api/phone/tPhoneVisitor";

export default {
  name: "TPhoneVisitormobile",
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
      // 访问记录表格数据
      tPhoneVisitorList: [],
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
        connection: null
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
  },
  methods: {

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
        origin: null,
        remark: null,
        connection: null
      };
      this.resetForm("form");
    },

    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加访问记录";
    },

    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateTPhoneVisitor(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addMobileTPhoneVisitor(this.form).then(response => {
              this.$modal.msgSuccess("ok");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    }


  }
};
</script>
