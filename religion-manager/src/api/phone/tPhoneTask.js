import request from '@/utils/request'

// 查询生产任务列表
export function listTPhoneTask(query) {
  return request({
    url: '/phone/tPhoneTask/list',
    method: 'get',
    params: query
  })
}

// 查询生产任务详细
export function getTPhoneTask(id) {
  return request({
    url: '/phone/tPhoneTask/' + id,
    method: 'get'
  })
}

// 新增生产任务
export function addTPhoneTask(data) {
  return request({
    url: '/phone/tPhoneTask',
    method: 'post',
    data: data
  })
}

// 修改生产任务
export function updateTPhoneTask(data) {
  return request({
    url: '/phone/tPhoneTask',
    method: 'put',
    data: data
  })
}

// 删除生产任务
export function delTPhoneTask(id) {
  return request({
    url: '/phone/tPhoneTask/' + id,
    method: 'delete'
  })
}
