import request from '@/utils/request'

// 查询预付卡订单列表
export function listPayCommitOrder(query) {
  return request({
    url: '/shop/payCommitOrder/list',
    method: 'get',
    params: query
  })
}

// 查询预付卡订单详细
export function getPayCommitOrder(revision) {
  return request({
    url: '/shop/payCommitOrder/' + revision,
    method: 'get'
  })
}

// 新增预付卡订单
export function addPayCommitOrder(data) {
  return request({
    url: '/shop/payCommitOrder',
    method: 'post',
    data: data
  })
}

// 修改预付卡订单
export function updatePayCommitOrder(data) {
  return request({
    url: '/shop/payCommitOrder',
    method: 'put',
    data: data
  })
}

// 删除预付卡订单
export function delPayCommitOrder(revision) {
  return request({
    url: '/shop/payCommitOrder/' + revision,
    method: 'delete'
  })
}
