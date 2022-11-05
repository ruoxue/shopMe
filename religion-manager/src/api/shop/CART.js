import request from '@/utils/request'

// 查询购物车列表
export function listCART(query) {
  return request({
    url: '/shop/CART/list',
    method: 'get',
    params: query
  })
}

// 查询购物车详细
export function getCART(cartId) {
  return request({
    url: '/shop/CART/' + cartId,
    method: 'get'
  })
}

// 新增购物车
export function addCART(data) {
  return request({
    url: '/shop/CART',
    method: 'post',
    data: data
  })
}

// 修改购物车
export function updateCART(data) {
  return request({
    url: '/shop/CART',
    method: 'put',
    data: data
  })
}

// 删除购物车
export function delCART(cartId) {
  return request({
    url: '/shop/CART/' + cartId,
    method: 'delete'
  })
}
