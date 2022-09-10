import request from '@/utils/request'

// 查询订单列表
export function listORDER(query) {
  return request({
    url: '/shop/ORDER/list',
    method: 'get',
    params: query
  })
}

// 查询订单详细
export function getORDER(orderId) {
  return request({
    url: '/shop/ORDER/' + orderId,
    method: 'get'
  })
}

// 新增订单
export function addORDER(data) {
  return request({
    url: '/shop/ORDER',
    method: 'post',
    data: data
  })
}

// 修改订单
export function updateORDER(data) {
  return request({
    url: '/shop/ORDER',
    method: 'put',
    data: data
  })
}

// 删除订单
export function delORDER(orderId) {
  return request({
    url: '/shop/ORDER/' + orderId,
    method: 'delete'
  })
}
