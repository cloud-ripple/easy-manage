import request from '@/utils/request'

// 查询所有日志
export function page(begin,end,currentPage,pageSize) {
  return request({
    url: '/logs?begin='+begin+'&end='+end+'&currentPage='+currentPage+'&pageSize='+pageSize,
    method: 'get'
  })
}


// 通过id删除日志记录
export function deleteById(id) {
  return request({
    url: '/logs/' + id,
    method: 'delete'
  })
}



