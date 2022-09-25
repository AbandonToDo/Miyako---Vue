<template>
  <div>
    <el-button type="primary" @click="handleDialogFormVisible" size="normal">新增</el-button>
    <el-dialog title="新增学生信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="学生姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" label="学生姓名"></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
          <el-input v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
          <el-radio v-model="form.sex" label="1">男</el-radio>
          <el-radio v-model="form.sex" label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="父亲姓名" :label-width="formLabelWidth">
          <el-input v-model="form.father"></el-input>
        </el-form-item>
        <el-form-item label="母亲姓名" :label-width="formLabelWidth">
          <el-input v-model="form.mather"></el-input>
        </el-form-item>
        <el-form-item label="选择日期" :label-width="formLabelWidth" prop="time">
          <el-date-picker
            v-model="form.time"
            type="date"
            format="yyyy年MM月dd日"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="家庭住址" :label-width="formLabelWidth" prop="address">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSure('form')">确 定</el-button>
      </div>
    </el-dialog>
    <el-table :data="compTableData" stripe style="width: 100%">
      <el-table-column prop="id" label="ID" align="center"> </el-table-column>
      <el-table-column prop="name" label="姓名" align="center"> </el-table-column>
      <el-table-column prop="age" label="年龄" align="center"> </el-table-column>
      <el-table-column prop="sex_text" label="性别" align="center"> </el-table-column>
      <el-table-column prop="father" label="父亲" align="center"> </el-table-column>
      <el-table-column prop="mather" label="母亲" align="center"> </el-table-column>
      <el-table-column prop="time" label="入校时间" align="center"> </el-table-column>
      <el-table-column prop="address" label="家庭住址" align="center"> </el-table-column>
      <el-table-column prop="phone" label="联系方式" align="center"> </el-table-column>
      <el-table-column label="操作" align="center">
        <template v-slot="ele">
          <el-button
            type="danger"
            size="small"
            icon="el-icon-edit"
            @click="handleEdit(ele.row.id)"
          ></el-button>
          <el-button
            type="danger"
            size="small"
            icon="el-icon-delete"
            @click="handleDelete(ele.row.id)"
          ></el-button
        ></template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getStudentInfo, addStudentInfo } from '@/api/api';
export default {
  data() {
    return {
      compTableData: [],
      dialogFormVisible: false,
      formLabelWidth: '80px',
      form: {
        name: '',
        age: '',
        sex: '1',
        father: '',
        mather: '',
        time: '',
        address: '',
        phone: '',
      },
      rules: {
        name: [{ required: true, message: '请输入名字' }],
        age: [
          { required: true, message: '请输入年龄' },
          { pattern: /^[1-9]\d?$/, message: '请输入数字，在1-100之间' },
        ],
        sex: [{ required: true }],
        time: [{ required: true }],
        address: [{ required: true }],
        phone: [
          {
            required: true,
            message: '请输入手机号码',
          },

          {
            pattern: /^1[3456789]\d{9}$/,
            message: '请输入正确的手机号码',
          },
        ],
      },
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      getStudentInfo().then((res) => {
        this.compTableData = res.data.data;
        this.compTableData.forEach((item) => {
          item.sex === '1' ? (item.sex_text = '男') : (item.sex_text = '女');
        });
      });
    },
    handleDialogFormVisible() {
      this.dialogFormVisible = true;
    },
    handleSure(form) {
      console.log(this.form, form);
      this.$refs[form].validate((valid) => {
        if (valid) {
          addStudentInfo(this.form).then((res) => {
            if (res.data.status === 200) {
              this.$message({
                message: '添加成功',
                type: 'success',
              });
              this.getInfo();
              this.dialogFormVisible = false;
            } else {
              this.$message({
                message: '添加失败',
                type: 'error',
              });
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleEdit(id) {
      this.$router.push({ path: '/student/edit', query: { id: id } });
    },
    handleDelete(id) {
      console.log(id);
      this.$confirm('此操作将永久删除该学生信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
    },
  },
};
</script>
<style scoped>
.el-button {
  margin: 10px 0;
}
.el-form,
.el-form-item {
  width: 100%;
}
</style>
