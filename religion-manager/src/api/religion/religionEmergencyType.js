import request from '@/utils/request'

// 查询场所突发应急管理列表
export function listReligionEmergencyType(query) {
  return request({
    url: '/religion/religionEmergencyType/list',
    method: 'get',
    params: query
  })
}

// 查询场所突发应急管理详细
export function getReligionEmergencyType(id) {
  return request({
    url: '/religion/religionEmergencyType/' + id,
    method: 'get'
  })
}

// 新增场所突发应急管理
export function addReligionEmergencyType(data) {
  return request({
    url: '/religion/religionEmergencyType',
    method: 'post',
    data: data
  })
}

// 修改场所突发应急管理
export function updateReligionEmergencyType(data) {
  return request({
    url: '/religion/religionEmergencyType',
    method: 'put',
    data: data
  })
}

// 删除场所突发应急管理
export function delReligionEmergencyType(id) {
  return request({
    url: '/religion/religionEmergencyType/' + id,
    method: 'delete'
  })
}
