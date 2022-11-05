import request from '@/utils/request'

// 查询商品分类对应关系列表
export function listMap(query) {
  return request({
    url: '/shop/map/list',
    method: 'get',
    params: query
  })
}

// 查询商品分类对应关系详细
export function getMap(id) {
  return request({
    url: '/shop/map/' + id,
    method: 'get'
  })
}

// 新增商品分类对应关系
export function addMap(data) {
  return request({
    url: '/shop/map',
    method: 'post',
    data: data
  })
}

// 修改商品分类对应关系
export function updateMap(data) {
  return request({
    url: '/shop/map',
    method: 'put',
    data: data
  })
}

// 删除商品分类对应关系
export function delMap(id) {
  return request({
    url: '/shop/map/' + id,
    method: 'delete'
  })
}
