import request from '@/utils/request'

// 查询地址列表
export function listADDRESS(query) {
  return request({
    url: '/shop/ADDRESS/list',
    method: 'get',
    params: query
  })
}

// 查询地址详细
export function getADDRESS(addressId) {
  return request({
    url: '/shop/ADDRESS/' + addressId,
    method: 'get'
  })
}

// 新增地址
export function addADDRESS(data) {
  return request({
    url: '/shop/ADDRESS',
    method: 'post',
    data: data
  })
}

// 修改地址
export function updateADDRESS(data) {
  return request({
    url: '/shop/ADDRESS',
    method: 'put',
    data: data
  })
}

// 删除地址
export function delADDRESS(addressId) {
  return request({
    url: '/shop/ADDRESS/' + addressId,
    method: 'delete'
  })
}
