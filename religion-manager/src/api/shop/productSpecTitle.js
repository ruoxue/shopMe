import request from '@/utils/request'

// 查询商品规格项列表
export function listProductSpecTitle(query) {
  return request({
    url: '/shop/productSpecTitle/list',
    method: 'get',
    params: query
  })
}

// 查询商品规格项详细
export function getProductSpecTitle(id) {
  return request({
    url: '/shop/productSpecTitle/' + id,
    method: 'get'
  })
}

// 新增商品规格项
export function addProductSpecTitle(data) {
  return request({
    url: '/shop/productSpecTitle',
    method: 'post',
    data: data
  })
}

// 修改商品规格项
export function updateProductSpecTitle(data) {
  return request({
    url: '/shop/productSpecTitle',
    method: 'put',
    data: data
  })
}

// 删除商品规格项
export function delProductSpecTitle(id) {
  return request({
    url: '/shop/productSpecTitle/' + id,
    method: 'delete'
  })
}
