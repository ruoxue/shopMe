import request from '@/utils/request'

// 查询求购商品格式列表
export function listPayCommitFormate(query) {
  return request({
    url: '/shop/payCommitFormate/list',
    method: 'get',
    params: query
  })
}

// 查询求购商品格式详细
export function getPayCommitFormate(id) {
  return request({
    url: '/shop/payCommitFormate/' + id,
    method: 'get'
  })
}

// 新增求购商品格式
export function addPayCommitFormate(data) {
  return request({
    url: '/shop/payCommitFormate',
    method: 'post',
    data: data
  })
}

// 修改求购商品格式
export function updatePayCommitFormate(data) {
  return request({
    url: '/shop/payCommitFormate',
    method: 'put',
    data: data
  })
}

// 删除求购商品格式
export function delPayCommitFormate(id) {
  return request({
    url: '/shop/payCommitFormate/' + id,
    method: 'delete'
  })
}
