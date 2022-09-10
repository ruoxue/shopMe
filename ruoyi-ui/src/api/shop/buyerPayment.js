import request from '@/utils/request'

// 查询支付列表
export function listBuyerPayment(query) {
  return request({
    url: '/shop/buyerPayment/list',
    method: 'get',
    params: query
  })
}

// 查询支付详细
export function getBuyerPayment(revision) {
  return request({
    url: '/shop/buyerPayment/' + revision,
    method: 'get'
  })
}

// 新增支付
export function addBuyerPayment(data) {
  return request({
    url: '/shop/buyerPayment',
    method: 'post',
    data: data
  })
}

// 修改支付
export function updateBuyerPayment(data) {
  return request({
    url: '/shop/buyerPayment',
    method: 'put',
    data: data
  })
}

// 删除支付
export function delBuyerPayment(revision) {
  return request({
    url: '/shop/buyerPayment/' + revision,
    method: 'delete'
  })
}
