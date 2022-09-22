<template>
  <el-aside width="200px">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <template v-for="(item, index) in menus">
        <el-submenu :key="index" :index="index + ''" v-if="!item.hidden">
          <template slot="title">
            <i :class="item.iconCls"></i>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item-group v-for="(child, index) in item.children" :key="index">
            <el-menu-item :index="child.path">
              <i :class="child.iconCls"></i>
              {{ child.name }}
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </template>
    </el-menu>
  </el-aside>
</template>
<script>
export default {
  data() {
    return {
      menus: [],
    };
  },
  // 获取路由配置
  created() {
    this.menus = JSON.parse(JSON.stringify(this.$router.options.routes));
  },
};
</script>
<style scoped>
.el-aside,
.el-menu {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  height: 100%;
}
.fa {
  margin-right: 8px;
}
</style>
