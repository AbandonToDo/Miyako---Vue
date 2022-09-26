<template>
  <div>
    <el-button type="primary" @click="handleDialogFormVisible" size="normal">新增</el-button>
    <el-dialog :title="state ? '新增学生信息' : '修改学生信息'" :visible.sync="dialogFormVisible">
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
    <el-table :data="data" stripe style="width: 100%">
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
            @click="handleEdit(ele.row)"
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
import { getData, changeInfo, deleteInfo } from '@/utils/table.js';
export default {
  data() {
    return {
      state: true,
      data: [],
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
        ],
      },
    };
  },
  mounted() {
    this.getInfo();
  },

  methods: {
    getInfo() {
      getData(this, '/info').then((res) => {
        res.forEach((item) => {
          item.sex === '1' ? (item.sex_text = '男') : (item.sex_text = '女');
        });
      });
    },
    handleDialogFormVisible() {
      (this.form = {
        name: '',
        age: '',
        sex: '1',
        father: '',
        mather: '',
        time: '',
        address: '',
        phone: '',
      }),
        (this.dialogFormVisible = true);
      this.state = true;
    },

    handleSure(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let isMethod = this.state ? 'post' : 'put';
          changeInfo(this, isMethod, '/info', form, this.getInfo);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleEdit(rowData) {
      this.dialogFormVisible = true;
      const copyRowData = JSON.parse(JSON.stringify(rowData));
      this.form = copyRowData;
      this.state = false;
    },
    handleDelete(id) {
      deleteInfo(this, '/info', id, this.getInfo);
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
