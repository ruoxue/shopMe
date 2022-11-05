import request from '@/utils/request'

// 查询商品规格项列表
export function listOption(query) {
  return request({
    url: '/shop/option/list',
    method: 'get',
    params: query
  })
}

// 查询商品规格项详细
export function getOption(id) {
  return request({
    url: '/shop/option/' + id,
    method: 'get'
  })
}

// 新增商品规格项
export function addOption(data) {
  return request({
    url: '/shop/option',
    method: 'post',
    data: data
  })
}

// 修改商品规格项
export function updateOption(data) {
  return request({
    url: '/shop/option',
    method: 'put',
    data: data
  })
}

// 删除商品规格项
export function delOption(id) {
  return request({
    url: '/shop/option/' + id,
    method: 'delete'
  })
}
