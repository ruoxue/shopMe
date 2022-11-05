import request from '@/utils/request'

// 查询购买明细列表
export function listBuyerItem(query) {
  return request({
    url: '/shop/buyerItem/list',
    method: 'get',
    params: query
  })
}

// 查询购买明细详细
export function getBuyerItem(orderId) {
  return request({
    url: '/shop/buyerItem/' + orderId,
    method: 'get'
  })
}

// 新增购买明细
export function addBuyerItem(data) {
  return request({
    url: '/shop/buyerItem',
    method: 'post',
    data: data
  })
}

// 修改购买明细
export function updateBuyerItem(data) {
  return request({
    url: '/shop/buyerItem',
    method: 'put',
    data: data
  })
}

// 删除购买明细
export function delBuyerItem(orderId) {
  return request({
    url: '/shop/buyerItem/' + orderId,
    method: 'delete'
  })
}
