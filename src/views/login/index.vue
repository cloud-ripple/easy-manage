<template>
  <div class="login-container" style="">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <el-row style="margin-bottom: 40px;">
          <el-col>
            <el-card style="font-size: 25px; font-family: '宋体'; text-align: center; font-weight: bold;">
              <svg-icon icon-class="logo" style="margin: 0 5px; width: 50px;height: 40px;"/>
              Easy 后台管理系统登录
            </el-card>
          </el-col>
        </el-row>
      </div>

      <el-form-item prop="username">
        <!-- <span class="svg-container">
          <svg-icon icon-class="user" />
        </span> -->
        <i class="el-icon-user"></i>
        账号
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入账号"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <!-- <span class="svg-container">
          <svg-icon icon-class="password" />
        </span> -->
        <i class="el-icon-lock"></i>
        密码
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:120px; margin:50px 60px; background-color: #c1e8ae; font-weight: bold;color: #000;border: 1px none #000;" @click.native.prevent="handleLogin">
        <svg-icon icon-class="login" style="margin: 0 5px;"/>
        Login
      </el-button>
      <el-button type="primary" style="width:120px; margin-left: 30px; background-color: #c1e8ae; font-weight: bold;color: #000;border: 1px none #000;" @click="register">
        <svg-icon icon-class="register" style="margin: 0 5px;"/>
        Register
      </el-button>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { login } from '@/api/user'
import { setToken } from '@/utils/auth'
export default {
  name: 'Login',
  data() {

    //用户名校验规则
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }

    //用户名校验规则
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码长度至少为6位'))
      } else {
        callback()
      }
    }

    //数据模型
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },

  methods: {
    //展示密码
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    
    //登录方法
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          
          //调用登录后端接口
          login(this.loginForm).then((result) => {
            console.log(result)
            if (result.data.code == 1) {
              //登录成功下发 JWT令牌 这里的 data就是后端返回响应的 JWT令牌字符串，里面封装了用户 id, username等信息
              setToken(result.data.data);
              console.log('login success');
              this.$message.success('登录成功！');
              this.$router.push('/');
            } else {
              this.$message.error(result.data.msg);
              this.loading = false
            }
          });
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    //注册方法 跳转到注册页面
    register() {
      this.$router.push('/register')
    }

  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#000;
$light_gray:#000;
$cursor: #000;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: #000;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 330px;

    input {
      // background: transparent;
      -webkit-appearance: none;
      border-radius: 5px;
      padding: 12px 5px 12px 15px;
      color: #000;
      height: 47px;
      caret-color: #000;
      margin: 2px 5px;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #fff inset !important;
        -webkit-text-fill-color: #000 !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: #c1e8ae;
    border-radius: 5px;
    color: #000;
    i {
        margin: 0 10px;
      }
  }
}
</style>

<style lang="scss" scoped>
    $bg:#eaf0ed;
    $dark_gray:#889aa4;
    $light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: #eaf0ed;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 60px 35px 0;
    margin: 40px auto;
    overflow: hidden;
    border: 2px solid #c1e8ae;
    border-radius: 10px;

  }

  .tips {
    font-size: 14px;
    color: #000;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: #000;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: black;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
      font-family: '宋体';
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: #000;
    cursor: pointer;
    user-select: none;
  }
}
</style>
