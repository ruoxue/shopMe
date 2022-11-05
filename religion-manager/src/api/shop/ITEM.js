import request from '@/utils/request'

// 查询购买明细列表
export function listITEM(query) {
  return request({
    url: '/shop/ITEM/list',
    method: 'get',
    params: query
  })
}

// 查询购买明细详细
export function getITEM(orderId) {
  return request({
    url: '/shop/ITEM/' + orderId,
    method: 'get'
  })
}

// 新增购买明细
export function addITEM(data) {
  return request({
    url: '/shop/ITEM',
    method: 'post',
    data: data
  })
}

// 修改购买明细
export function updateITEM(data) {
  return request({
    url: '/shop/ITEM',
    method: 'put',
    data: data
  })
}

// 删除购买明细
export function delITEM(orderId) {
  return request({
    url: '/shop/ITEM/' + orderId,
    method: 'delete'
  })
}
