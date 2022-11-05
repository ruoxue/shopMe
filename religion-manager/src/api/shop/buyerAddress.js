import request from '@/utils/request'

// 查询地址列表
export function listBuyerAddress(query) {
  return request({
    url: '/shop/buyerAddress/list',
    method: 'get',
    params: query
  })
}

// 查询地址详细
export function getBuyerAddress(addressId) {
  return request({
    url: '/shop/buyerAddress/' + addressId,
    method: 'get'
  })
}

// 新增地址
export function addBuyerAddress(data) {
  return request({
    url: '/shop/buyerAddress',
    method: 'post',
    data: data
  })
}

// 修改地址
export function updateBuyerAddress(data) {
  return request({
    url: '/shop/buyerAddress',
    method: 'put',
    data: data
  })
}

// 删除地址
export function delBuyerAddress(addressId) {
  return request({
    url: '/shop/buyerAddress/' + addressId,
    method: 'delete'
  })
}
