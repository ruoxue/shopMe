import request from '@/utils/request'

// 查询商品分组列表
export function listProductGroup(query) {
  return request({
    url: '/shop/productGroup/list',
    method: 'get',
    params: query
  })
}

// 查询商品分组详细
export function getProductGroup(id) {
  return request({
    url: '/shop/productGroup/' + id,
    method: 'get'
  })
}

// 新增商品分组
export function addProductGroup(data) {
  return request({
    url: '/shop/productGroup',
    method: 'post',
    data: data
  })
}

// 修改商品分组
export function updateProductGroup(data) {
  return request({
    url: '/shop/productGroup',
    method: 'put',
    data: data
  })
}

// 删除商品分组
export function delProductGroup(id) {
  return request({
    url: '/shop/productGroup/' + id,
    method: 'delete'
  })
}
