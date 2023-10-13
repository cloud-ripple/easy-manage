import request from '@/utils/request'

// 通过指定信息查询统计的图表 发起请求

// 第一种柱状图
export function getBarChart(info) {
    return request({
      url: '/barChart?info='+info,
      method: 'get',
    })
}

// 第二种 柱状图+折线图
// export function getBarChart2() {
//   return request({
//     url: '/barChart2',
//     method: 'post',
//   })
// }

// 第一种饼图
export function getPieChart(info) {
  return request({
    url: '/pieChart?info='+info,
    method: 'get',
  })
}

// 第二种饼图
export function getPieChart2() {
  return request({
    url: '/pieChart2',
    method: 'post',
  })
}