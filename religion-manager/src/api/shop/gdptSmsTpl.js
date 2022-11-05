import request from '@/utils/request'

// 查询短信模板列表
export function listGdptSmsTpl(query) {
  return request({
    url: '/shop/gdptSmsTpl/list',
    method: 'get',
    params: query
  })
}

// 查询短信模板详细
export function getGdptSmsTpl(id) {
  return request({
    url: '/shop/gdptSmsTpl/' + id,
    method: 'get'
  })
}

// 新增短信模板
export function addGdptSmsTpl(data) {
  return request({
    url: '/shop/gdptSmsTpl',
    method: 'post',
    data: data
  })
}

// 修改短信模板
export function updateGdptSmsTpl(data) {
  return request({
    url: '/shop/gdptSmsTpl',
    method: 'put',
    data: data
  })
}

// 删除短信模板
export function delGdptSmsTpl(id) {
  return request({
    url: '/shop/gdptSmsTpl/' + id,
    method: 'delete'
  })
}
