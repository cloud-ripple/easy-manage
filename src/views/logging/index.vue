<template>
    <div class="app-container">
  
      <!--搜索表单-->
      <div class="header" style="margin: 0 300px; font-size: 30px;">
        <el-form :inline="true" :model="searchEmp" class="demo-form-inline">
            <el-form-item label="请选择时间范围">
            <el-date-picker
                v-model="duringTime"
                clearable
                value-format="yyyy-MM-dd"
                type="daterange"
                placeholder="选择日期"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="width: 400px; margin-left: 10px"
            ></el-date-picker>
            </el-form-item>
    
            <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
            <el-button type="info" icon="el-icon-thumb" @click="clear">清空</el-button>
            </el-form-item>
        </el-form>
       </div>
  
    <div>
      <!--按钮-->
      <el-row>
        <el-button type="danger" icon="el-icon-delete" size="medium" @click="deleteByIds">- 批量删除</el-button>
      </el-row>
    </div>
    <br>

      <!--表格-->
       <div>
        <template>
            <el-table :data="tableData" style="width: 100%" border @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"  align="center"></el-table-column>
            <el-table-column  prop="id"  label="日志编号"  align="center"></el-table-column>
    
            <el-table-column align="center" label="操作时间">
                <template slot-scope="scope">
                {{ scope.row.createTime ? scope.row.createTime.replace('T','  '):''}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="日志描述">
                <template slot-scope="scope">
                {{scope.row.description }}
                </template>
            </el-table-column>
    
            <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                <el-button type="danger" icon="el-icon-delete-solid" size="small" @click="deleteById(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
            </el-table>
        </template>
       </div>
  
      <!--分页工具条-->
    <div style="margin-top: 10px;">
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
    </div>
  </template>
  
  <script>
  import { page, deleteById } from "@/api/logging.js";
  import { getToken } from '@/utils/auth';
  
  export default {
    name: 'log',
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
        beginTime: "",
        endTime: "",
        duringTime: "",
  
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
      findAll().then((result) => {
        this.deptList = result.data.data;
      });
    },
    
    methods: {
      // 查询分页数据
      page() {
        page(
          this.beginTime,
          this.endTime,
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
        this.beginTime = "",
        this.endTime = "";
        this.duringTime = "";
        this.page();
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
  
  
      //删除日志信息
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
  
  
      // 批量删除日志信息
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
    },
  
    watch: {
        duringTime(val) {
        if (val && val.length >= 2) {
          this.beginTime = val[0];
          this.endTime = val[1];
        } else {
          this.beginTime = "";
          this.endTime = "";
        }
      },
    },
  };
  </script>
  <style>
  
  </style>