<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-button type="primary" icon="el-icon-setting" style="bottom: 7px; position: relative;">设置</el-button>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="changePassword">
            <span style="display:block;">修改个人密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-avatar shape="square" :size="40" :src="user.avatar_url" style="top: 7px; right: 7px;position: relative;"></el-avatar>
      
      <!--添加数据对话框表单-->
      <el-dialog ref="form" title="修改个人密码" :visible.sync="dialogVisible" width="30%">
        <el-form ref="form" :model="user" label-width="120px" size="mini">
          <el-form-item label="输入原密码" style="">
            <el-input v-model="password1" placeholder="请输入原密码"></el-input>
          </el-form-item>
          <el-form-item label="设置新密码"> 
            <el-input v-model="password2" placeholder="请输入新的密码"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码">
            <el-input v-model="user.password" placeholder="再次输入密码"></el-input>
          </el-form-item>
          
          <el-form-item>
            <el-button type="primary" @click="save">保存</el-button>
            <el-button @click="dialogVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    
    </div>

  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { removeToken, getToken } from '@/utils/auth'
import { getInfoByToken, updateUser } from '../../api/user'


export default {
  data() {
    return {
      //弹出框默认不可见
      dialogVisible: false,
      password1: '',
      password2: '',

      user: {
        avatar_url: '',
        password: '',
      },
    
    }
  },

  //页面渲染之后再调用该方法
  mounted () {
    //加载当前登录的用户头像
    this.setUserAvatar()
    
  },

  components: {
    Breadcrumb,
    Hamburger
  },

  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {

    //获取当前登录用户的头像url
    setUserAvatar() {
      let token = getToken() //获取token 即JWT令牌，里面封装了当前登录用户的 id,username等参数信息
      console.log('当前用户的 token：' + token)
      getInfoByToken(token).then(res => {
        //调用 getInfoByToken这个接口时，后端可以直接返回当前登录用户的 avatar头像url
        this.user.avatar_url = res.data.data.avatar //设置
      })

    },

    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },

    changePassword() {
      this.dialogVisible = true
    },

    //保存修改
    save() {
      updateUser(this.user).then((resp) => {

        if (resp.data.code == "1") {
          this.dialogVisible = false;
          this.$message({ message: "恭喜你，保存成功", type: "success" });
        } else {
          this.$message.error(resp.data.msg);
        }
      });
    },

    async logout() {
      removeToken();
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 55px;
  overflow: hidden;
  position: relative;
  background: #76b7aa5d;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 50px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 55px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 15px;

      .avatar-wrapper {
        margin-top: -5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 130px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
