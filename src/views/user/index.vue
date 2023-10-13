<template>
    <div class="app-container">
  
      <!--搜索表单-->
      <el-form :inline="true" :model="searchUser" class="demo-form-inline">
        <el-form-item label="昵称">
          <el-input
            v-model="searchUser.nickname"
            placeholder="请输入昵称"
          ></el-input>
        </el-form-item>

        <el-form-item label="年龄">
          <el-input
            v-model="searchUser.age"
            placeholder="请输入年龄"
          ></el-input>
        </el-form-item>

        <el-form-item label="地址">
          <el-input
            v-model="searchUser.address"
            placeholder="请输入地址"
          ></el-input>
        </el-form-item>

        <el-form-item label="角色">
          <el-select v-model="searchUser.role" placeholder="请选择角色">
                <el-option label="管理员" value="管理员"></el-option>
              <el-option label="老师" value="老师"></el-option>
              <el-option label="学生" value="学生"></el-option>
              <el-option label="普通用户" value="普通用户"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="性别">
          <el-select v-model="searchUser.gender" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
  
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
           <el-button type="info" icon="el-icon-thumb" @click="clear">清空</el-button>
        </el-form-item>
      </el-form>
  
      <!--按钮-->
      <el-row>
        <el-button type="danger" icon="el-icon-delete" size="medium" @click="deleteByIds">批量删除</el-button>
        <!-- <el-button type="primary" icon="el-icon-circle-plus-outline" size="medium" @click="dialogVisible = true; user = { avatar: ''};" >添加用户</el-button> -->
      </el-row>
  
      <!--添加数据对话框表单-->
      <el-dialog ref="form" title="编辑用户信息" :visible.sync="dialogVisible" width="30%">
        <el-form ref="form" :model="user" label-width="80px" size="mini">
          <el-form-item label="昵称">
            <el-input v-model="user.nickname"></el-input>
          </el-form-item>

          <el-form-item label="角色">
            <el-select v-model="user.role" placeholder="请选择角色">
                <el-option label="管理员" value="管理员"></el-option>
              <el-option label="老师" value="老师"></el-option>
              <el-option label="学生" value="学生"></el-option>
              <el-option label="普通用户" value="普通用户"></el-option>
          </el-select>
          </el-form-item>

          <el-form-item label="年龄">
            <el-input v-model="user.age"></el-input>
          </el-form-item>
  
          <el-form-item label="性别" >
            <el-select v-model="user.gender" placeholder="请选择性别">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
          </el-select>
          </el-form-item>

          <el-form-item label="电话">
            <el-input v-model="user.phone"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="user.address"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="user.email"></el-input>
          </el-form-item>
          
          <!-- 头像上传 这里的 name参数名 file 
            一定要和后端UploadController类 uploadAliYunOSS(MultipartFile file)方法中接收参数的形参名称一致 
          否则前端发起请求时，后端接收不到参数 -->
          <el-form-item label="上传头像">
            <el-upload
              class="avatar-uploader"
              action="/api/upload"
              :headers="token"
              name="file"   
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="user.avatar" :src="user.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
  
          <el-form-item>
            <el-button type="primary" @click="add">提交</el-button>
            <el-button @click="dialogVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
  
      <br>
      <!--表格-->
      <template>
        <el-table :data="tableData" style="width: 100%" border @selection-change="handleSelectionChange">
          <!-- 批量删除多选框 -->
          <el-table-column type="selection" width="55" align="center" >
          </el-table-column>

          <el-table-column prop="avatar" label="头像" align="center">
            <template slot-scope="{ row }">
              <el-image style="width: auto; height: 50px; border: 2px solid #c1e8ae; cursor: pointer" :src="row.avatar"></el-image>
            </template>
          </el-table-column>

          <el-table-column  align="center" label="昵称">
            <template slot-scope="scope">
              <span style="margin-right: 10px">{{scope.row.nickname}}</span>
            </template>
          </el-table-column>
  
          <el-table-column align="center" label="性别">
            <template slot-scope="scope">
              <span style="margin-right: 10px">
              {{scope.row.gender}}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="年龄">
            <template slot-scope="scope">
              <span style="margin-right: 10px">
              {{scope.row.age}}</span>
            </template>
          </el-table-column>
  
          <el-table-column align="center" label="用户角色">
            <template slot-scope="scope">
              <el-tag style="width: 85px;height: 30px;background-color: #c1e8ae; color: #000;"> <i class="el-icon-user" style="margin-right: 5px;"></i>
              <span>{{scope.row.role}}</span>
            </el-tag>
            </template>
          </el-table-column>

          <el-table-column align="center" label="地址">
            <template slot-scope="scope">
              <span>{{scope.row.address}}</span>
            </template>
          </el-table-column>
  
          <el-table-column align="center" label="注册日期">
            <template slot-scope="scope">
              {{scope.row.registerDate ? scope.row.registerDate.replace('T','  '):''}}
            </template>
          </el-table-column>
  
          <el-table-column align="center" label="操作" width="250">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit-outline" size="small" @click="update(scope.row.id)">编辑</el-button>
              <el-button type="danger" icon="el-icon-delete-solid" size="small" @click="deleteById(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
  
      <!--分页工具条-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :background="background"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </div>
  </template>
  
  <script>
  import { pageUser, addUser, updateUser, deleteById, selectById } from "@/api/user.js";
  import { getToken } from '@/utils/auth';
  
  export default {
    name: 'User',
    data() {
      return {
        background: true,
        // 每页显示的条数
        pageSize: 5,
        // 总记录数
        totalCount: 100,
        // 当前页码
        currentPage: 1,
        // 添加数据对话框是否展示的标记
        dialogVisible: false,
        // 品牌模型数据
        searchUser: {
            nickname: '',
            age: '',
            address: '',
            role: '', 
            gender: '',
        },
        user: {
          avatar: "",
        },
        // 被选中的id数组
        selectedIds: [],
        // 复选框选中数据集合
        multipleSelection: [],
        // 表格数据
        tableData: [],
        token: {token: getToken()}
      };
    },
  
    mounted() {
      this.page(); //当页面加载完成后，发送异步请求，获取数据
    },
    
    methods: {
      // 查询分页数据
      page() {
        pageUser(
          this.searchUser.nickname,
          this.searchUser.age,
          this.searchUser.address,
          this.searchUser.role,
          this.searchUser.gender,
          this.currentPage,
          this.pageSize
        ).then((res) => {
          this.totalCount = res.data.data.total;
          this.tableData = res.data.data.rows;
        });
      },
  
      // 复选框选中后执行的方法
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
  
      // 查询方法
      onSubmit() {
        this.currentPage = 1;
        this.page();
      },
  
      clear(){
        this.searchUser = {
            nickname: '',
            age: '',
            address: '',
            role: '', 
            gender: '',
        };
        this.page();
      },

      // 提交保存数据
      add() {
        let operator;
  
        // if (this.user.id) {
          //修改
          operator = updateUser(this.user);
        // }
        // } else {
        //   operator = addUser(this.user);
        // }
  
        operator.then((resp) => {
          if (resp.data.code == "1") {
            this.dialogVisible = false;
            this.page();
            this.$message({ message: "恭喜你，保存成功", type: "success" });
            this.user = { avatar: "" };
          } else {
            this.$message.error(resp.data.msg);
          }
        });
      },
      update(id) {
        //1. 打开窗口
        this.dialogVisible = true;
        //2. 发送请求
  
        selectById(id).then((result) => {
          if (result.data.code == 1) {
            this.user = result.data.data; //根据ID查询的用户信息赋值给 user对象
            // this.user;
          }
        });
      },
  
      
      //分页
      handleSizeChange(val) {
        // 重新设置每页显示的条数
        this.pageSize = val;
        this.page();
      },
  
      handleCurrentChange(val) {
        // 重新设置当前页码
        this.currentPage = val;
        this.page();
      },
  
  
      //删除用户信息
      deleteById(id){
        this.$confirm("此操作将删除该数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
            //2. 发送AJAX请求
            deleteById(id).then((resp) => {
              if (resp.data.code == 1) {
                //删除成功
                this.$message.success("恭喜你，删除成功");
                this.page();
              } else {
                this.$message.error(resp.data.msg);
              }
            });
        }).catch(() => {
            //用户点击取消按钮
            this.$message.info("已取消删除");
          });
      },
  
  
      // 批量删除员工信息
      deleteByIds() {
        // 弹出确认提示框
        this.$confirm("此操作将删除该数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
            //用户点击确认按钮
            //1. 创建id数组, 从 this.multipleSelection 获取即可
            for (let i = 0; i < this.multipleSelection.length; i++) {
              this.selectedIds[i] = this.multipleSelection[i].id;
            }
  
            //2. 发送AJAX请求
            deleteById(this.selectedIds).then((resp) => {
              if (resp.data.code == "1") {
                //删除成功
                this.$message.success("恭喜你，删除成功");
                this.page();
              } else {
                this.$message.error(resp.data.msg);
              }
            });
        }).catch(() => {
            //用户点击取消按钮
            this.$message.info("已取消删除");
          });
      },
  
  
      //文件上传相关
      handleAvatarSuccess(res, file) {
        this.user.avatar = res.data;
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
    },
  
  };
  </script>
  <style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
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