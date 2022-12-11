import request from '@/utils/request'

// 查询短信模版列表
export function listTSmsTemplate(query) {
  return request({
    url: '/phone/tSmsTemplate/list',
    method: 'get',
    params: query
  })
}

// 查询短信模版详细
export function getTSmsTemplate(id) {
  return request({
    url: '/phone/tSmsTemplate/' + id,
    method: 'get'
  })
}

// 新增短信模版
export function addTSmsTemplate(data) {
  return request({
    url: '/phone/tSmsTemplate',
    method: 'post',
    data: data
  })
}

// 修改短信模版
export function updateTSmsTemplate(data) {
  return request({
    url: '/phone/tSmsTemplate',
    method: 'put',
    data: data
  })
}

// 删除短信模版
export function delTSmsTemplate(id) {
  return request({
    url: '/phone/tSmsTemplate/' + id,
    method: 'delete'
  })
}
