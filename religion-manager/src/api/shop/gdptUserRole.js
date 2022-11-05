import request from '@/utils/request'

// 查询用户角色列表
export function listGdptUserRole(query) {
  return request({
    url: '/shop/gdptUserRole/list',
    method: 'get',
    params: query
  })
}

// 查询用户角色详细
export function getGdptUserRole(id) {
  return request({
    url: '/shop/gdptUserRole/' + id,
    method: 'get'
  })
}

// 新增用户角色
export function addGdptUserRole(data) {
  return request({
    url: '/shop/gdptUserRole',
    method: 'post',
    data: data
  })
}

// 修改用户角色
export function updateGdptUserRole(data) {
  return request({
    url: '/shop/gdptUserRole',
    method: 'put',
    data: data
  })
}

// 删除用户角色
export function delGdptUserRole(id) {
  return request({
    url: '/shop/gdptUserRole/' + id,
    method: 'delete'
  })
}
