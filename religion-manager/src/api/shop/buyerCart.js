import request from '@/utils/request'

// 查询购物车列表
export function listBuyerCart(query) {
  return request({
    url: '/shop/buyerCart/list',
    method: 'get',
    params: query
  })
}

// 查询购物车详细
export function getBuyerCart(cartId) {
  return request({
    url: '/shop/buyerCart/' + cartId,
    method: 'get'
  })
}

// 新增购物车
export function addBuyerCart(data) {
  return request({
    url: '/shop/buyerCart',
    method: 'post',
    data: data
  })
}

// 修改购物车
export function updateBuyerCart(data) {
  return request({
    url: '/shop/buyerCart',
    method: 'put',
    data: data
  })
}

// 删除购物车
export function delBuyerCart(cartId) {
  return request({
    url: '/shop/buyerCart/' + cartId,
    method: 'delete'
  })
}
