import request from '@/utils/request'

// 查询访问记录列表
export function listTPhoneVisitor(query) {
  return request({
    url: '/phone/tPhoneVisitor/list',
    method: 'get',
    params: query
  })
}

// 查询访问记录详细
export function getTPhoneVisitor(id) {
  return request({
    url: '/phone/tPhoneVisitor/' + id,
    method: 'get'
  })
}

// 新增访问记录
export function addTPhoneVisitor(data) {
  return request({
    url: '/phone/tPhoneVisitor',
    method: 'post',
    data: data
  })
}

// 修改访问记录
export function updateTPhoneVisitor(data) {
  return request({
    url: '/phone/tPhoneVisitor',
    method: 'put',
    data: data
  })
}

// 删除访问记录
export function delTPhoneVisitor(id) {
  return request({
    url: '/phone/tPhoneVisitor/' + id,
    method: 'delete'
  })
}

export function addMobileTPhoneVisitor(data) {
  return request({
    url: '/phone/api/tPhoneVisitor',
    method: 'post',
    data: data
  })
}