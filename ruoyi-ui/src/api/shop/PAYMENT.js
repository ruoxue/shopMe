import request from '@/utils/request'

// 查询支付列表
export function listPAYMENT(query) {
  return request({
    url: '/shop/PAYMENT/list',
    method: 'get',
    params: query
  })
}

// 查询支付详细
export function getPAYMENT(revision) {
  return request({
    url: '/shop/PAYMENT/' + revision,
    method: 'get'
  })
}

// 新增支付
export function addPAYMENT(data) {
  return request({
    url: '/shop/PAYMENT',
    method: 'post',
    data: data
  })
}

// 修改支付
export function updatePAYMENT(data) {
  return request({
    url: '/shop/PAYMENT',
    method: 'put',
    data: data
  })
}

// 删除支付
export function delPAYMENT(revision) {
  return request({
    url: '/shop/PAYMENT/' + revision,
    method: 'delete'
  })
}
