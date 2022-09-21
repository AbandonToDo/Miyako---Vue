<template>
  <el-header>
    <span>Miyako管理系统</span>
    <span>{{ username }}</span>
  </el-header>
</template>
<script>
export default {
  data() {
    return {
      username: '',
    };
  },
  //保存username
  created() {
    this.username = this.$token.getToken('username');
  },
};
</script>
<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #409eff;
  color: #fff;
}
</style>
