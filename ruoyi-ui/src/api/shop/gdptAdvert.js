import request from '@/utils/request'

// 查询广告列表
export function listGdptAdvert(query) {
  return request({
    url: '/shop/gdptAdvert/list',
    method: 'get',
    params: query
  })
}

// 查询广告详细
export function getGdptAdvert(id) {
  return request({
    url: '/shop/gdptAdvert/' + id,
    method: 'get'
  })
}

// 新增广告
export function addGdptAdvert(data) {
  return request({
    url: '/shop/gdptAdvert',
    method: 'post',
    data: data
  })
}

// 修改广告
export function updateGdptAdvert(data) {
  return request({
    url: '/shop/gdptAdvert',
    method: 'put',
    data: data
  })
}

// 删除广告
export function delGdptAdvert(id) {
  return request({
    url: '/shop/gdptAdvert/' + id,
    method: 'delete'
  })
}
