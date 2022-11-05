import request from '@/utils/request'

// 查询支付类型列表
export function listPayChannel(query) {
  return request({
    url: '/order/payChannel/list',
    method: 'get',
    params: query
  })
}

// 查询支付类型详细
export function getPayChannel(id) {
  return request({
    url: '/order/payChannel/' + id,
    method: 'get'
  })
}

// 新增支付类型
export function addPayChannel(data) {
  return request({
    url: '/order/payChannel',
    method: 'post',
    data: data
  })
}

// 修改支付类型
export function updatePayChannel(data) {
  return request({
    url: '/order/payChannel',
    method: 'put',
    data: data
  })
}

// 删除支付类型
export function delPayChannel(id) {
  return request({
    url: '/order/payChannel/' + id,
    method: 'delete'
  })
}
