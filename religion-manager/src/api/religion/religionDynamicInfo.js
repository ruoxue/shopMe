import request from '@/utils/request'

// 查询动态信息列表
export function listReligionDynamicInfo(query) {
  return request({
    url: '/religion/religionDynamicInfo/list',
    method: 'get',
    params: query
  })
}

// 查询动态信息详细
export function getReligionDynamicInfo(id) {
  return request({
    url: '/religion/religionDynamicInfo/' + id,
    method: 'get'
  })
}

// 新增动态信息
export function addReligionDynamicInfo(data) {
  return request({
    url: '/religion/religionDynamicInfo',
    method: 'post',
    data: data
  })
}

// 修改动态信息
export function updateReligionDynamicInfo(data) {
  return request({
    url: '/religion/religionDynamicInfo',
    method: 'put',
    data: data
  })
}

// 删除动态信息
export function delReligionDynamicInfo(id) {
  return request({
    url: '/religion/religionDynamicInfo/' + id,
    method: 'delete'
  })
}
