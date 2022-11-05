import request from '@/utils/request'

// 查询商品规格信息列表
export function listSku(query) {
  return request({
    url: '/shop/sku/list',
    method: 'get',
    params: query
  })
}

// 查询商品规格信息详细
export function getSku(id) {
  return request({
    url: '/shop/sku/' + id,
    method: 'get'
  })
}

// 新增商品规格信息
export function addSku(data) {
  return request({
    url: '/shop/sku',
    method: 'post',
    data: data
  })
}

// 修改商品规格信息
export function updateSku(data) {
  return request({
    url: '/shop/sku',
    method: 'put',
    data: data
  })
}

// 删除商品规格信息
export function delSku(id) {
  return request({
    url: '/shop/sku/' + id,
    method: 'delete'
  })
}
