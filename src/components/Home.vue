<template>
  <div class="home">
    <Header />
    <el-container class="container">
      <SideMenu />
      <el-container>
        <!-- <router-view /> -->
        <el-main>
          <BreadCrumb />
          <router-view></router-view>
        </el-main>
        <el-footer><Footer /></el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import Header from './common/Header.vue'
import Footer from './common/Footer.vue'
import SideMenu from './common/SideMenu.vue'
import BreadCrumb from './common/Breadcrumb.vue'
export default {
  name: 'Home',

  components: {
    Header,
    Footer,
    SideMenu,
    BreadCrumb
  }
}
</script>

<style scoped>
.home,
.container {
  height: 100%;
}
</style>
