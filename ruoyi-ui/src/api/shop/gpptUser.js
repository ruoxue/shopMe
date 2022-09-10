import request from '@/utils/request'

// 查询用户列表
export function listGpptUser(query) {
  return request({
    url: '/shop/gpptUser/list',
    method: 'get',
    params: query
  })
}

// 查询用户详细
export function getGpptUser(userId) {
  return request({
    url: '/shop/gpptUser/' + userId,
    method: 'get'
  })
}

// 新增用户
export function addGpptUser(data) {
  return request({
    url: '/shop/gpptUser',
    method: 'post',
    data: data
  })
}

// 修改用户
export function updateGpptUser(data) {
  return request({
    url: '/shop/gpptUser',
    method: 'put',
    data: data
  })
}

// 删除用户
export function delGpptUser(userId) {
  return request({
    url: '/shop/gpptUser/' + userId,
    method: 'delete'
  })
}
