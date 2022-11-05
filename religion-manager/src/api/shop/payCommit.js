import request from '@/utils/request'

// 查询求购自动提交信息列表
export function listPayCommit(query) {
  return request({
    url: '/shop/payCommit/list',
    method: 'get',
    params: query
  })
}

// 查询求购自动提交信息详细
export function getPayCommit(id) {
  return request({
    url: '/shop/payCommit/' + id,
    method: 'get'
  })
}

// 新增求购自动提交信息
export function addPayCommit(data) {
  return request({
    url: '/shop/payCommit',
    method: 'post',
    data: data
  })
}

// 修改求购自动提交信息
export function updatePayCommit(data) {
  return request({
    url: '/shop/payCommit',
    method: 'put',
    data: data
  })
}

// 删除求购自动提交信息
export function delPayCommit(id) {
  return request({
    url: '/shop/payCommit/' + id,
    method: 'delete'
  })
}
