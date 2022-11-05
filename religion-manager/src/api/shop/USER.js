import request from '@/utils/request'

// 查询买家列表
export function listUSER(query) {
  return request({
    url: '/shop/USER/list',
    method: 'get',
    params: query
  })
}

// 查询买家详细
export function getUSER(userId) {
  return request({
    url: '/shop/USER/' + userId,
    method: 'get'
  })
}

// 新增买家
export function addUSER(data) {
  return request({
    url: '/shop/USER',
    method: 'post',
    data: data
  })
}

// 修改买家
export function updateUSER(data) {
  return request({
    url: '/shop/USER',
    method: 'put',
    data: data
  })
}

// 删除买家
export function delUSER(userId) {
  return request({
    url: '/shop/USER/' + userId,
    method: 'delete'
  })
}
