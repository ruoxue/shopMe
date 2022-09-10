import request from '@/utils/request'

// 查询商品标签对应关系列表
export function listProductLabelMap(query) {
  return request({
    url: '/shop/productLabelMap/list',
    method: 'get',
    params: query
  })
}

// 查询商品标签对应关系详细
export function getProductLabelMap(id) {
  return request({
    url: '/shop/productLabelMap/' + id,
    method: 'get'
  })
}

// 新增商品标签对应关系
export function addProductLabelMap(data) {
  return request({
    url: '/shop/productLabelMap',
    method: 'post',
    data: data
  })
}

// 修改商品标签对应关系
export function updateProductLabelMap(data) {
  return request({
    url: '/shop/productLabelMap',
    method: 'put',
    data: data
  })
}

// 删除商品标签对应关系
export function delProductLabelMap(id) {
  return request({
    url: '/shop/productLabelMap/' + id,
    method: 'delete'
  })
}
