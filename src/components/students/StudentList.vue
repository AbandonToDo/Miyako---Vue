<template>
  <div>
    <el-form
      :model="nameValidateForm"
      ref="nameValidateForm"
      label-width="100px"
      class="demo-ruleForm"
      :inline="true"
    >
      <el-form-item label="姓名" prop="name" :rules="rules.searchName">
        <el-input
          type="name"
          v-model="nameValidateForm.name"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('nameValidateForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('nameValidateForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="compTableData" stripe style="width: 100%">
      <el-table-column prop="id" label="ID" align="center"> </el-table-column>
      <el-table-column prop="name" label="姓名" align="center">
      </el-table-column>
      <el-table-column prop="age" label="年龄" align="center">
      </el-table-column>
      <el-table-column prop="sex_text" label="性别" align="center">
      </el-table-column>
      <el-table-column prop="number" label="学号" align="center">
      </el-table-column>
      <el-table-column prop="class" label="班级" align="center">
      </el-table-column>
      <el-table-column prop="state_text" label="状态" align="center">
      </el-table-column>
      <el-table-column prop="address" label="地址" align="center">
      </el-table-column>
      <el-table-column prop="phone" label="手机号码" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template v-slot="del">
          <el-button
            type="danger"
            size="small"
            icon="el-icon-delete"
            @click="handleDelete(del.row.id)"
          ></el-button
        ></template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[50, 100, 200, 300, 400]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
<script>
import { getStudentList, deleteStudent } from '@/api/api'

export default {
  name: 'StudentList',
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 50,
      total: 0,
      nameValidateForm: {
        name: ''
      },
      rules: {
        searchName: [
          { min: 2, max: 6, message: '请输入2-6位', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getStudentList('')
  },
  watch: {
    nameValidateForm: {
      handler: function () {
        console.log(this.nameValidateForm)
      },
      deep: true
    }
  },

  // tableData 根据 currentPage 和 pageSize 进行分页
  computed: {
    compTableData() {
      return this.tableData.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      )
    }
  },

  methods: {
    getStudentList(params) {
      getStudentList(params).then((res) => {
        if (res.status === 200) {
          this.tableData = res.data.data
          console.log(this.tableData)
          this.total = res.data.total
          // 不要修改原数据
          this.tableData.forEach((item) => {
            item.state === '1'
              ? (item.state_text = '已入学')
              : item.state === '2'
              ? (item.state_text = '未入学')
              : (item.state_text = '休学中')
            item.sex === 1 ? (item.sex_text = '男') : (item.sex_text = '女')
          })
        }
      })
    },
    handleCurrentChange(page) {
      this.currentPage = page
    },
    handleSizeChange(size) {
      this.pageSize = size
      this.currentPage = 1
    },
    handleDelete(del) {
      console.log(del)
      deleteStudent(del).then((res) => {
        if (res.status === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getStudentList('')
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getStudentList(this.nameValidateForm.name)
        } else {
          this.$message({
            type: 'error',
            message: '查询失败!'
          })
          return false
        }
      })
    },

    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.getStudentList(this.nameValidateForm.name)
    }
  }
}
</script>
<style>
.demo-ruleForm {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
</style>
