<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Miyako管理系统</span>
      </div>
      <el-form label-width="80px" :model="form" ref="form" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login('form')">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { login } from '@/api/api.js';
export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 6, message: '请输入4-6位', trigger: 'blur' },
        ],
      },
    };
  },

  methods: {
    login(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          //发送请求
          login(this.form)
            .then((res) => {
              if (res.data.status === 200) {
                this.$message({
                  message: '登录成功',
                  type: 'success',
                });
                //使用封装的token方法保存token
                this.$token.setToken('token', res.data.token);
                // 储存username
                this.$token.setToken('username', res.data.username);
                //跳转到首页
                this.$router.push('/home');
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch((err) => {
              this.$message.error(err);
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss"></style>
