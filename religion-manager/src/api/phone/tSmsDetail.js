import request from '@/utils/request'

// 查询短信内容列表
export function listTSmsDetail(query) {
  return request({
    url: '/phone/tSmsDetail/list',
    method: 'get',
    params: query
  })
}

// 查询短信内容详细
export function getTSmsDetail(id) {
  return request({
    url: '/phone/tSmsDetail/' + id,
    method: 'get'
  })
}

// 新增短信内容
export function addTSmsDetail(data) {
  return request({
    url: '/phone/tSmsDetail',
    method: 'post',
    data: data
  })
}

// 修改短信内容
export function updateTSmsDetail(data) {
  return request({
    url: '/phone/tSmsDetail',
    method: 'put',
    data: data
  })
}

// 删除短信内容
export function delTSmsDetail(id) {
  return request({
    url: '/phone/tSmsDetail/' + id,
    method: 'delete'
  })
}
