<template>
  <div class="main">
    <!-- 搜索表单 -->
    <!-- <div class="search" style="">
      <el-form :inline="true" :model="searchChart" class="demo-form-inline">
        <el-form-item label="查看图表">
        <el-select v-model="searchChart.info" placeholder="请选择">
          <el-option label="部门统计" value="dept"></el-option>
          <el-option label="员工统计" value="emp"></el-option>
          <el-option label="日志统计" value="log"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
          <el-button type="info" icon="el-icon-thumb" @click="clear">清空</el-button>
        </el-form-item>
      </el-form>
    </div> -->


    <!-- 图表 -->
    <div class="echarts" style="width: 100%; font-family: '宋体'; font-weight: bold; font-size: 18px;">
      <!-- gutter属性控制row中每个 col之间的间隔距离 -->
      <el-row :gutter="10" style="margin: 20px; ">
          <el-col :span="4">
            <el-card style="color: #409EEF;">
              <div><i class="el-icon-user-solid" size="mini" style="margin-right: 5px;"/>用户总数</div>
              <div style="padding: 10px 0; text-align: center;">
                <!-- <el-tag type="primary" style="font-size: 18px;">2.85 K</el-tag> -->
                2.85 K
              </div>
            </el-card>
          </el-col>
          
          <el-col :span="4">
            <el-card style="color: #F56C6C;">
              <div><i class="el-icon-view" size="medium" style="margin-right: 5px;"/>访问次数</div>
              <div style="padding: 10px 0; text-align: center;">
                12.8 W
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card style="color: #1ed2cf;">
              <div><i class="el-icon-share" size="medium" style="margin-right: 5px;"/>分享量</div>
              <div style="padding: 10px 0; text-align: center;">
                120
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card style="color: #d322c1;">
              <div><i class="el-icon-s-comment" size="medium" style="margin-right: 5px;"/>评论总数</div>
              <div style="padding: 10px 0; text-align: center;">
                7.8 W 
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card style="color: #67C23A;">
              <div><i class="el-icon-star-on" size="medium" style="margin-right: 5px;"/>Star</div>
              <div style="padding: 10px 0; text-align: center;">
                1200
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card style="color: #722687a6;">
              <div><i class="el-icon-download" size="medium" style="margin-right: 5px;"/>Download</div>
              <div style="padding: 10px 0; text-align: center;">
                278 次
              </div>
            </el-card>
          </el-col>
      </el-row>

      <!-- gutter属性控制row中每个 col之间的间隔距离 -->
      <el-row :gutter="100" style="margin-bottom: 30px;">
        <el-col :span="13">
          <div id="echarts_employee" style="width: 800px;height: 600px;"></div>
        </el-col>
        <el-col :span="11">
          <div id="echarts_dept" style="width: 500px;height: 580px;"></div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="11">
          <div id="echarts_employee2" style="width: 700px;height: 500px;"></div>
        </el-col>
        <el-col :span="13">
          <div id="echarts_dept2" style="width: 700px;height: 450px;"></div>
        </el-col>
      </el-row>
    </div>
  </div>

</template>
 
<script>
import * as echarts from 'echarts'
 import { getBarChart, getBarChart2, getPieChart, getPieChart2 } from '@/api/chart.js'
 import { getToken } from '@/utils/auth';

export default {
  name: "Home",
  data() {
    return {
      
      token: {token: getToken()},
    }
  },

  // mounted()方法，页面元素渲染之后再触发
  mounted() {
    this.$nextTick(() => {
      this.barChart() // 展示图表
      this.pieChart()
      this.barChart2()
      this.pieChart2()
    });
    
  },

  // 方法
  methods: {
    // 员工统计柱状图 1
    barChart() {
      let chartDom = document.getElementById('echarts_employee');
      let myChart = echarts.init(chartDom);
      let option = {
        title: {
          text: '各部门男性和女性员工分布统计',
          subtext: '阶梯对比图',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: function (params) {
            let tar;
            if (params[1] && params[1].value !== 0) {
              tar = params[1];
            } else {
              tar = params[2];
            }
            if (tar.value === 0) {
                  this.series[1].label.show = false
            } 
            if (tar.value === 0) {
                this.series[2].label.show = false
            }  
            return tar.name + '<br/>'  + '女性人数 : ' +  params[1].value
            + '<br/>' + '男性人数 : ' + params[2].value;
          }
        },
        legend: {
          data: [ '女性','男性'],
          right: '15%'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category', 
          // 部门信息 x 轴 
          data: []
        },  
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Placeholder',
            type: 'bar',
            stack: 'Total',
            silent: true,
            itemStyle: {
              borderColor: 'transparent',
              color: 'transparent'
            },

            emphasis: {
              itemStyle: {
                borderColor: 'transparent',
                color: 'transparent'
              }
            },
            // 柱状块距离 X轴 的高度固定
            data: [13, 22, 44, 55, 66, 33, 59, 88, 87, 17, 38]
          },
          
          {
            name: '女性',
            type: 'bar',
            stack: 'Total',
            label: {
              show: true,
              position: 'top'
            },
            // 每个部门中的女性员工数量
            data: []

          },

          {
            name: '男性',
            type: 'bar',
            stack: 'Total',
            label: {
              show: true,
              position: 'top'
            },
            // 每个部门中的男性员工数量
            data: []
          },
        ],
      };
      // 这里的getBarChart()方法是从 @/api/chart.js 中导入引用的，发送异步请求，并传入一个参数，获取后端相应的数据
       getBarChart('员工统计柱状图 1').then((res) => {
        // console.log(res);
        // 图表数据填充
        option.xAxis.data = res.data.data.deptData
        option.series[1].data = res.data.data.womanData
        option.series[2].data = res.data.data.manData
        
        // 设置图表到DOM
        myChart.setOption(option);
      });
    },

    // 员工统计柱状图 2
    barChart2() {
      var chartDom = document.getElementById('echarts_employee2');
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: '各部门男性和女性员工分布统计',
          subtext: '趋势图',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          right: '15%'
        },
        grid: {
          left: '3%',
          right: '7%',
          bottom: '7%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          // 部门名称 X轴
          data: []
        },
        yAxis: {
          type: 'value'
        },
        // 数组中有 4个对象
        series: [
          {
            name: '男性',
            // 各部门的男性员工数量 柱状
            data: [120, 145, 150, 80, 70, 110, 130],
            type: 'bar'
          },
          {
            name: '男性',
            // 各部门的男性员工数量 折线
            data: [120, 145, 150, 80, 70, 110, 130],
            type: 'line'
          },
          {
            name: '女性',
            // 各部门的女性员工数量 柱状
            data: [66, 156, 46, 80, 5, 38, 111],
            type: 'bar'
          },
          {
            name: '女性',
            // 各部门的女性员工数量 折线
            data: [66, 156, 46, 80, 5, 38, 111],
            type: 'line'
          }
        ]
      };
      // 这里的getBarChart2()方法是从 @/api/chart.js 中导入引用的，发送异步请求，并传入一个参数 2，获取后端相应的数据
      getBarChart('员工统计柱状图 2').then((res) => {
        // console.log(res);
        // 图表数据填充
        //部门名称
        option.xAxis.data = res.data.data.deptData 
        // 各部门男性员工数量
        option.series[0].data = res.data.data.manData //柱状数据
        option.series[1].data = res.data.data.manData //折线数据
        //各部门女性员工数量
        option.series[2].data = res.data.data.womanData 
        option.series[3].data = res.data.data.womanData 
        
        // 设置图表到DOM
        myChart.setOption(option);
      });

    },

    // 部门统计饼图 1
    pieChart() {
      let pieDom = document.getElementById('echarts_dept');
      let pie = echarts.init(pieDom);
      let option;

      option = {
        backgroundColor: '#76b7aa5d',
        title: {
          text: '各部门员工数量统计',
          left: 'center',
          top: 20,
          textStyle: {
            color: 'green'
          }
        },
        tooltip: {
          trigger: 'item'
        },
        visualMap: {
          show: false,
          min: 0,
          max: 20,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: '员工数量',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            /* 注意这里的 data数据格式 name代表部门名称 value代表该部门的员工数量
            data: [ { value: 335, name: '人力资源部' },
                    { value: 310, name: '财务部' },
                    { value: 274, name: 'Union Ads' },
                    { value: 235, name: 'Video Ads' },
                    { value: 400, name: 'Search Engine' }
                 ] 
            */
            data: [
              
            ].sort(function (a, b) {
              return a.value - b.value;
            }),
            roseType: 'radius',
            label: {
              color: 'green'
            },
            labelLine: {
              lineStyle: {
                color: 'red'
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            },
            itemStyle: {
              color: 'yellow',
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0.6, 0.5)'
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
              return Math.random() * 200;
            }
          }
        ]
      };

      // 这里的getPieChart()方法是从 @/api/chart.js 中导入引用的，发送异步请求，指定参数 1，获取后端相应的数据
      getPieChart('部门统计饼图 1').then((res) => {
        //图表数据填充
        option.series[0].data = res.data.data
        //设置图表到DOM
        pie.setOption(option);
      }); 
    },

    // 部门统计饼图 2
    pieChart2() {
      var chartDom = document.getElementById('echarts_dept2');
      var pie2 = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: '各部门男性和女性员工分布统计',
          subtext: '比例图',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          top: 'bottom',
          // 各部门名称
          data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7']
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: '男性',
            type: 'pie',
            radius: [20, 110],
            center: ['27%', '50%'],
            roseType: 'radius',
            itemStyle: {
              borderRadius: 5
            },
            label: {
              show: true
            },
            emphasis: {
              label: {
                show: true
              }
            },
            // 各部门男性员工数量
            data: [
              { value: 40, name: 'rose 1' },
              { value: 33, name: 'rose 2' },
              { value: 28, name: 'rose 3' },
              { value: 22, name: 'rose 4' },
              { value: 20, name: 'rose 5' },
              { value: 15, name: 'rose 6' },
              { value: 12, name: 'rose 7' }
            ]
          },
          {
            name: '女性',
            type: 'pie',
            radius: [20, 110],
            center: ['73%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 5
            },

            // 各部门女性员工数量
            data: [
              { value: 30, name: 'rose 1' },
              { value: 28, name: 'rose 2' },
              { value: 26, name: 'rose 3' },
              { value: 24, name: 'rose 4' },
              { value: 22, name: 'rose 5' },
              { value: 20, name: 'rose 6' },
              { value: 18, name: 'rose 7' }
            ]
          }
        ]
      };
       // 这里的getPieChart()方法是从 @/api/chart.js 中导入引用的，发送异步请求，指定参数 2，获取后端相应的数据
       getPieChart2('部门统计饼图 2').then((res) => {
        //图表数据填充
        //部门名称
        option.legend.data = res.data.data[0]
        // 各部门男性员工数量
        option.series[0].data = res.data.data[1][0]
        // 各部门女性员工数量
        option.series[1].data = res.data.data[1][1]

        //设置图表到DOM
        pie2.setOption(option);
      }); 

    },

    // 点击查询按钮触发
    onSubmit() {
      //显示图表
      this.barChart()
      this.pieChart()
    },

    // 清空按钮触发
    clear(){
      this.searchChart = {info: ""};
    },
 
  }
}
</script>
 
<style scoped>
 
</style>
