import request from '@/utils/request'

// 查询商品基础信息列表
export function listProduct(query) {
  return request({
    url: '/shop/product/list',
    method: 'get',
    params: query
  })
}

// 查询商品基础信息详细
export function getProduct(id) {
  return request({
    url: '/shop/product/' + id,
    method: 'get'
  })
}

// 新增商品基础信息
export function addProduct(data) {
  return request({
    url: '/shop/product',
    method: 'post',
    data: data
  })
}

// 修改商品基础信息
export function updateProduct(data) {
  return request({
    url: '/shop/product',
    method: 'put',
    data: data
  })
}

// 删除商品基础信息
export function delProduct(id) {
  return request({
    url: '/shop/product/' + id,
    method: 'delete'
  })
}
