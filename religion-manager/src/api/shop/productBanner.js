import request from '@/utils/request'

// 查询banner列表
export function listProductBanner(query) {
  return request({
    url: '/shop/productBanner/list',
    method: 'get',
    params: query
  })
}

// 查询banner详细
export function getProductBanner(id) {
  return request({
    url: '/shop/productBanner/' + id,
    method: 'get'
  })
}

// 新增banner
export function addProductBanner(data) {
  return request({
    url: '/shop/productBanner',
    method: 'post',
    data: data
  })
}

// 修改banner
export function updateProductBanner(data) {
  return request({
    url: '/shop/productBanner',
    method: 'put',
    data: data
  })
}

// 删除banner
export function delProductBanner(id) {
  return request({
    url: '/shop/productBanner/' + id,
    method: 'delete'
  })
}
