import request from '@/utils/request'

// 查询商品规格信息列表
export function listProductSku(query) {
  return request({
    url: '/shop/productSku/list',
    method: 'get',
    params: query
  })
}

// 查询商品规格信息详细
export function getProductSku(id) {
  return request({
    url: '/shop/productSku/' + id,
    method: 'get'
  })
}

// 新增商品规格信息
export function addProductSku(data) {
  return request({
    url: '/shop/productSku',
    method: 'post',
    data: data
  })
}

// 修改商品规格信息
export function updateProductSku(data) {
  return request({
    url: '/shop/productSku',
    method: 'put',
    data: data
  })
}

// 删除商品规格信息
export function delProductSku(id) {
  return request({
    url: '/shop/productSku/' + id,
    method: 'delete'
  })
}
