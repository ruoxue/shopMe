import request from '@/utils/request'

// 查询场所建设登记管理列表
export function listReligionBuildingManager(query) {
  return request({
    url: '/religion/religionBuildingManager/list',
    method: 'get',
    params: query
  })
}

// 查询场所建设登记管理详细
export function getReligionBuildingManager(id) {
  return request({
    url: '/religion/religionBuildingManager/' + id,
    method: 'get'
  })
}

// 新增场所建设登记管理
export function addReligionBuildingManager(data) {
  return request({
    url: '/religion/religionBuildingManager',
    method: 'post',
    data: data
  })
}

// 修改场所建设登记管理
export function updateReligionBuildingManager(data) {
  return request({
    url: '/religion/religionBuildingManager',
    method: 'put',
    data: data
  })
}

// 删除场所建设登记管理
export function delReligionBuildingManager(id) {
  return request({
    url: '/religion/religionBuildingManager/' + id,
    method: 'delete'
  })
}
