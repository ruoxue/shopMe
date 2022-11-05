import request from '@/utils/request'

// 查询商品分组对应关系列表
export function listProductGroupMap(query) {
  return request({
    url: '/shop/productGroupMap/list',
    method: 'get',
    params: query
  })
}

// 查询商品分组对应关系详细
export function getProductGroupMap(id) {
  return request({
    url: '/shop/productGroupMap/' + id,
    method: 'get'
  })
}

// 新增商品分组对应关系
export function addProductGroupMap(data) {
  return request({
    url: '/shop/productGroupMap',
    method: 'post',
    data: data
  })
}

// 修改商品分组对应关系
export function updateProductGroupMap(data) {
  return request({
    url: '/shop/productGroupMap',
    method: 'put',
    data: data
  })
}

// 删除商品分组对应关系
export function delProductGroupMap(id) {
  return request({
    url: '/shop/productGroupMap/' + id,
    method: 'delete'
  })
}
