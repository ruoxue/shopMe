import request from '@/utils/request'

// 查询买家列表
export function listBuyerUser(query) {
  return request({
    url: '/shop/buyerUser/list',
    method: 'get',
    params: query
  })
}

// 查询买家详细
export function getBuyerUser(userId) {
  return request({
    url: '/shop/buyerUser/' + userId,
    method: 'get'
  })
}

// 新增买家
export function addBuyerUser(data) {
  return request({
    url: '/shop/buyerUser',
    method: 'post',
    data: data
  })
}

// 修改买家
export function updateBuyerUser(data) {
  return request({
    url: '/shop/buyerUser',
    method: 'put',
    data: data
  })
}

// 删除买家
export function delBuyerUser(userId) {
  return request({
    url: '/shop/buyerUser/' + userId,
    method: 'delete'
  })
}
