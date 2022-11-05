import request from '@/utils/request'

// 查询便民服务列表
export function listReligionConvenience(query) {
  return request({
    url: '/religion/religionConvenience/list',
    method: 'get',
    params: query
  })
}

// 查询便民服务详细
export function getReligionConvenience(id) {
  return request({
    url: '/religion/religionConvenience/' + id,
    method: 'get'
  })
}

// 新增便民服务
export function addReligionConvenience(data) {
  return request({
    url: '/religion/religionConvenience',
    method: 'post',
    data: data
  })
}

// 修改便民服务
export function updateReligionConvenience(data) {
  return request({
    url: '/religion/religionConvenience',
    method: 'put',
    data: data
  })
}

// 删除便民服务
export function delReligionConvenience(id) {
  return request({
    url: '/religion/religionConvenience/' + id,
    method: 'delete'
  })
}
