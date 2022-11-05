import request from '@/utils/request'

// 查询商品规格项列表
export function listProductSpecOption(query) {
  return request({
    url: '/shop/productSpecOption/list',
    method: 'get',
    params: query
  })
}

// 查询商品规格项详细
export function getProductSpecOption(id) {
  return request({
    url: '/shop/productSpecOption/' + id,
    method: 'get'
  })
}

// 新增商品规格项
export function addProductSpecOption(data) {
  return request({
    url: '/shop/productSpecOption',
    method: 'post',
    data: data
  })
}

// 修改商品规格项
export function updateProductSpecOption(data) {
  return request({
    url: '/shop/productSpecOption',
    method: 'put',
    data: data
  })
}

// 删除商品规格项
export function delProductSpecOption(id) {
  return request({
    url: '/shop/productSpecOption/' + id,
    method: 'delete'
  })
}
