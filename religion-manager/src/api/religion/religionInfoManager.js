import request from '@/utils/request'

// 查询信息登记列表
export function listReligionInfoManager(query) {
  return request({
    url: '/religion/religionInfoManager/list',
    method: 'get',
    params: query
  })
}

// 查询信息登记详细
export function getReligionInfoManager(id) {
  return request({
    url: '/religion/religionInfoManager/' + id,
    method: 'get'
  })
}

// 新增信息登记
export function addReligionInfoManager(data) {
  return request({
    url: '/religion/religionInfoManager',
    method: 'post',
    data: data
  })
}

// 修改信息登记
export function updateReligionInfoManager(data) {
  return request({
    url: '/religion/religionInfoManager',
    method: 'put',
    data: data
  })
}

// 删除信息登记
export function delReligionInfoManager(id) {
  return request({
    url: '/religion/religionInfoManager/' + id,
    method: 'delete'
  })
}
