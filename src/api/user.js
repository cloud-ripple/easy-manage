import request from '@/utils/request'


//登录接口
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

//该接口根据请求参数 token (即JWT令牌 后端登录成功后会下发 JWT令牌字符串，里面封装了用户 id, username等信息，返回响应给前端 ）
//调用该接口时，后端可以拿到请求参数token，然后解析JWT令牌，根据解析内容查询数据库获取对应用户的信息 比如 avatar头像等
//最后返回响应给前端
export function getInfoByToken(token) {  //这里的token是方法形参
  return request({
    url: '/users/info',
    method: 'get',
    params: { token } //指定本次请求参数
  })
}


//退出
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}


//用户注册
export function register(data) {
  return request({
    url: '/register',
    method: 'post',
    data
  })
}


//用户信息 分页条件查询
export function pageUser(nickname, age, address, role, gender, currentPage, pageSize) {
  return request({
    url: '/users?nickname='+nickname+'&age='+age+'&address='+address+'&role='+role+'&gender='+gender+'&currentPage='+currentPage+'&pageSize='+pageSize,
    method: 'get'
  })
}

//添加用户
export function addUser(user) {
  return request({
    url: '/users',
    method: 'post',
    data: user
  })
}

//更新用户信息
export function updateUser(user) {
  return request({
    url: '/users',
    method: 'put',
    data: user
  })
}

// 查询用户 回显
export function selectById(id) {
  return request({
    url: '/users/'+id,
    method: 'get',
  })
}

// 删除用户
export function deleteById(id) {
  return request({
    url: '/users/'+id,
    method: 'delete',
  })
}




