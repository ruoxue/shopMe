import request from '@/utils/request'

// 查询应急预案管理列表
export function listReligionEmergencyManager(query) {
  return request({
    url: '/religion/religionEmergencyManager/list',
    method: 'get',
    params: query
  })
}

// 查询应急预案管理详细
export function getReligionEmergencyManager(id) {
  return request({
    url: '/religion/religionEmergencyManager/' + id,
    method: 'get'
  })
}

// 新增应急预案管理
export function addReligionEmergencyManager(data) {
  return request({
    url: '/religion/religionEmergencyManager',
    method: 'post',
    data: data
  })
}

// 修改应急预案管理
export function updateReligionEmergencyManager(data) {
  return request({
    url: '/religion/religionEmergencyManager',
    method: 'put',
    data: data
  })
}

// 删除应急预案管理
export function delReligionEmergencyManager(id) {
  return request({
    url: '/religion/religionEmergencyManager/' + id,
    method: 'delete'
  })
}
