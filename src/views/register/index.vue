<template>
    <div class="login-container" style="">
      <el-form ref="registerForm" :model="registerForm" :rules="loginRules" class="register-form" auto-complete="on" label-position="center">
  
        <div class="title-container">
          <el-row style="margin: 10px 0;">
            <el-col>
              <el-card style="font-size: 25px; font-family: '宋体'; text-align: center; font-weight: bold;">
                <svg-icon icon-class="logo" style="margin: 0 5px; width: 50px;height: 40px;"/>
                Easy 后台管理系统注册
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
            v-model="registerForm.username"
            placeholder="请输入用户名"
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
            v-model="registerForm.password"
            :type="passwordType"
            placeholder="请输入密码"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleRigester"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

        
        <el-form-item>
            <i class="el-icon-s-custom"></i>昵称
            <el-input style="margin: 2px 5px;"
            v-model="registerForm.nickname"
            placeholder="请输入昵称"
            ></el-input>
        </el-form-item>


        <el-form-item> 
            <i class="el-icon-male"></i>
            性别
            <el-select v-model="registerForm.gender" placeholder="请选择">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item>
            <i class="el-icon-s-check"></i>
            角色
            <el-select v-model="registerForm.role" placeholder="请选择">
              <el-option label="管理员" value="管理员"></el-option>
              <el-option label="老师" value="老师"></el-option>
              <el-option label="学生" value="学生"></el-option>
              <el-option label="普通用户" value="普通用户"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="">
            <i class="el-icon-picture"></i>
            上传头像
          <el-upload
            class="avatar-uploader"
            action="/api/upload"
            :headers="token"
            name="file"   
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="registerForm.avatar" :src="registerForm.avatar" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
  
        <el-button :loading="loading" type="primary" icon="el-icon-thumb" style="width:100px; margin:30px; background-color: #c1e8ae; font-weight: bold;color: #000;border: 1px none #000;" @click.native.prevent="handleRigester">注册</el-button>
        <el-button type="primary" icon="el-icon-back" style="width:100px; margin-right: 30px; background-color: #c1e8ae; font-weight: bold;color: #000;border: 1px none #000;" @click="returnLogin">返回登录</el-button>
        <el-button type="primary" icon="el-icon-brush" style="width:100px; background-color: #c1e8ae; font-weight: bold;color: #000;border: 1px none #000;" @click="handleReset">重置</el-button>
    </el-form>
    </div>
  </template>
  
  <script>
  import { validUsername } from '@/utils/validate'
  import { register } from '@/api/user'
  import { getToken } from '@/utils/auth';

  export default {
    name: 'Register',
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
        registerForm: {
          nickname: '', //昵称
          username: '', //账号
          password: '', //密码
          //以下注册信息可选填
          role: '', //角色
          gender: '', //性别
          avatar: '', //头像
          age: '', //年龄
          phone: '', //电话
          address: '', //地址
          email: '', //邮箱

        },
        token: {token: getToken()},

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
      
      //注册方法
      handleRigester() {
        this.$refs.registerForm.validate(valid => {
          if (valid) {
            this.loading = true
            
            //调用登录后端接口
            register(this.registerForm).then((result) => {
              console.log(result)
              if (result.data.code == 1) {
                this.$message.success('注册成功！已为您跳转到登录页面');
                this.$router.push('/login');
              } else {
                this.$message.error(result.data.msg);
                this.loading = false
              }
            });
          } else {
            console.log('error submit!!')
            this.$message({ message: "账号或密码格式错误！", type: "warning" });
            return false
          }
        })
      },

      //返回登录方法
      returnLogin() {
        this.$router.push('/login')
      },

      // 重置方法
      handleReset() {
        this.registerForm = { 
            nickname: '',
            username: '',
            password: '',
            gender: '',
            role: '',
            avatar: '',
        }
      },

       //文件上传相关
        handleAvatarSuccess(res, file) {
            this.registerForm.avatar = res.data;
        },
        beforeAvatarUpload(file) {
        const isJPG = file.type === "image/jpeg";
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
            this.$message.error("上传头像图片只能是 JPG / JPEG 格式!");
        }
        if (!isLt2M) {
            this.$message.error("上传头像图片大小不能超过 2MB!");
        }
        return isJPG && isLt2M;
        },
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
      height: 45px;
      width: 330px;
  
      input {
        // background: transparent;
        -webkit-appearance: none;
        border-radius: 5px;
        padding: 12px 5px 12px 15px;
        color: #000;
        height: 45px;
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
  
    .register-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 10px 35px 0;
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

<style>
    .avatar-uploader .el-upload {
    border: 1px dashed #df7dca;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin: 5px 35%;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #0a1eb7;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>