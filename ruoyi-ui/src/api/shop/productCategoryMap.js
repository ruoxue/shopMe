import request from '@/utils/request'

// 查询商品分类对应关系列表
export function listProductCategoryMap(query) {
  return request({
    url: '/shop/productCategoryMap/list',
    method: 'get',
    params: query
  })
}

// 查询商品分类对应关系详细
export function getProductCategoryMap(id) {
  return request({
    url: '/shop/productCategoryMap/' + id,
    method: 'get'
  })
}

// 新增商品分类对应关系
export function addProductCategoryMap(data) {
  return request({
    url: '/shop/productCategoryMap',
    method: 'post',
    data: data
  })
}

// 修改商品分类对应关系
export function updateProductCategoryMap(data) {
  return request({
    url: '/shop/productCategoryMap',
    method: 'put',
    data: data
  })
}

// 删除商品分类对应关系
export function delProductCategoryMap(id) {
  return request({
    url: '/shop/productCategoryMap/' + id,
    method: 'delete'
  })
}
