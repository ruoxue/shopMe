import request from '@/utils/request'

// 查询商品标签列表
export function listProductLabel(query) {
  return request({
    url: '/shop/productLabel/list',
    method: 'get',
    params: query
  })
}

// 查询商品标签详细
export function getProductLabel(id) {
  return request({
    url: '/shop/productLabel/' + id,
    method: 'get'
  })
}

// 新增商品标签
export function addProductLabel(data) {
  return request({
    url: '/shop/productLabel',
    method: 'post',
    data: data
  })
}

// 修改商品标签
export function updateProductLabel(data) {
  return request({
    url: '/shop/productLabel',
    method: 'put',
    data: data
  })
}

// 删除商品标签
export function delProductLabel(id) {
  return request({
    url: '/shop/productLabel/' + id,
    method: 'delete'
  })
}
