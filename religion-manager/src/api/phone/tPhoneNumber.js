import request from '@/utils/request'

// 查询手机管理列表
export function listTPhoneNumber(query) {
  return request({
    url: '/phone/tPhoneNumber/list',
    method: 'get',
    params: query
  })
}

// 查询手机管理详细
export function getTPhoneNumber(id) {
  return request({
    url: '/phone/tPhoneNumber/' + id,
    method: 'get'
  })
}

// 新增手机管理
export function addTPhoneNumber(data) {
  return request({
    url: '/phone/tPhoneNumber',
    method: 'post',
    data: data
  })
}

// 修改手机管理
export function updateTPhoneNumber(data) {
  return request({
    url: '/phone/tPhoneNumber',
    method: 'put',
    data: data
  })
}

// 删除手机管理
export function delTPhoneNumber(id) {
  return request({
    url: '/phone/tPhoneNumber/' + id,
    method: 'delete'
  })
}
