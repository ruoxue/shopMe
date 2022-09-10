import request from '@/utils/request'

// 查询订单列表
export function listBuyerOrder(query) {
  return request({
    url: '/shop/buyerOrder/list',
    method: 'get',
    params: query
  })
}

// 查询订单详细
export function getBuyerOrder(orderId) {
  return request({
    url: '/shop/buyerOrder/' + orderId,
    method: 'get'
  })
}

// 新增订单
export function addBuyerOrder(data) {
  return request({
    url: '/shop/buyerOrder',
    method: 'post',
    data: data
  })
}

// 修改订单
export function updateBuyerOrder(data) {
  return request({
    url: '/shop/buyerOrder',
    method: 'put',
    data: data
  })
}

// 删除订单
export function delBuyerOrder(orderId) {
  return request({
    url: '/shop/buyerOrder/' + orderId,
    method: 'delete'
  })
}
