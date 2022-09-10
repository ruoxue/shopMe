import request from '@/utils/request'

// 查询商品分类列表
export function listProductCategory(query) {
  return request({
    url: '/shop/productCategory/list',
    method: 'get',
    params: query
  })
}

// 查询商品分类详细
export function getProductCategory(id) {
  return request({
    url: '/shop/productCategory/' + id,
    method: 'get'
  })
}

// 新增商品分类
export function addProductCategory(data) {
  return request({
    url: '/shop/productCategory',
    method: 'post',
    data: data
  })
}

// 修改商品分类
export function updateProductCategory(data) {
  return request({
    url: '/shop/productCategory',
    method: 'put',
    data: data
  })
}

// 删除商品分类
export function delProductCategory(id) {
  return request({
    url: '/shop/productCategory/' + id,
    method: 'delete'
  })
}
