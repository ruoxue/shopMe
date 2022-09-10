import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listProductBanner(query) {
  return request({
    url: '/order/productBanner/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getProductBanner(id) {
  return request({
    url: '/order/productBanner/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addProductBanner(data) {
  return request({
    url: '/order/productBanner',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateProductBanner(data) {
  return request({
    url: '/order/productBanner',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delProductBanner(id) {
  return request({
    url: '/order/productBanner/' + id,
    method: 'delete'
  })
}
