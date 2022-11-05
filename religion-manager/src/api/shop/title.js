import request from '@/utils/request'

// 查询商品规格项列表
export function listTitle(query) {
  return request({
    url: '/shop/title/list',
    method: 'get',
    params: query
  })
}

// 查询商品规格项详细
export function getTitle(id) {
  return request({
    url: '/shop/title/' + id,
    method: 'get'
  })
}

// 新增商品规格项
export function addTitle(data) {
  return request({
    url: '/shop/title',
    method: 'post',
    data: data
  })
}

// 修改商品规格项
export function updateTitle(data) {
  return request({
    url: '/shop/title',
    method: 'put',
    data: data
  })
}

// 删除商品规格项
export function delTitle(id) {
  return request({
    url: '/shop/title/' + id,
    method: 'delete'
  })
}
