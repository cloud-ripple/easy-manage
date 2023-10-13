<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link  key="collapse" class="sidebar-logo-link" to="/">
        <!-- <svg-icon icon-class="logo" style="margin: 0 5px; width: 50px;height: 40px;"/>
         <img src="@/assets/logo/hm-logo5.png" class="sidebar-logo"> -->
        <!-- <h1  class="sidebar-title">{{ title }} </h1>  -->
        <el-row style="margin: -20px 0; width: 100%; height: 40px;">
          <el-col>
            <el-card style="font-size: 20px; font-family: '宋体'; text-align: left; font-weight: bold;">
              <svg-icon icon-class="logo" style="margin-right: 15px; width: 20px;height: 30px;"/>
              <sapn>Easy后台管理</sapn>
            </el-card>
          </el-col>
        </el-row>
      </router-link>
    
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: 'Easy 后台管理系统',
      logo: 'https://bobo-tlias.oss-cn-hangzhou.aliyuncs.com/81b50f4f-ba04-4903-b41a-5370ad575bd2.jpg'
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
