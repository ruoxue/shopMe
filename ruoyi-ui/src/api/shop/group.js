import request from '@/utils/request'

// 查询商品分组列表
export function listGroup(query) {
  return request({
    url: '/shop/group/list',
    method: 'get',
    params: query
  })
}

// 查询商品分组详细
export function getGroup(id) {
  return request({
    url: '/shop/group/' + id,
    method: 'get'
  })
}

// 新增商品分组
export function addGroup(data) {
  return request({
    url: '/shop/group',
    method: 'post',
    data: data
  })
}

// 修改商品分组
export function updateGroup(data) {
  return request({
    url: '/shop/group',
    method: 'put',
    data: data
  })
}

// 删除商品分组
export function delGroup(id) {
  return request({
    url: '/shop/group/' + id,
    method: 'delete'
  })
}
