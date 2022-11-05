import request from '@/utils/request'

// 查询商户店铺列表
export function listProductShop(query) {
  return request({
    url: '/shop/productShop/list',
    method: 'get',
    params: query
  })
}

// 查询商户店铺详细
export function getProductShop(shopId) {
  return request({
    url: '/shop/productShop/' + shopId,
    method: 'get'
  })
}

// 新增商户店铺
export function addProductShop(data) {
  return request({
    url: '/shop/productShop',
    method: 'post',
    data: data
  })
}

// 修改商户店铺
export function updateProductShop(data) {
  return request({
    url: '/shop/productShop',
    method: 'put',
    data: data
  })
}

// 删除商户店铺
export function delProductShop(shopId) {
  return request({
    url: '/shop/productShop/' + shopId,
    method: 'delete'
  })
}
