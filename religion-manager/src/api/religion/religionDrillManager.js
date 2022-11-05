import request from '@/utils/request'

// 查询消防演练管理列表
export function listReligionDrillManager(query) {
  return request({
    url: '/religion/religionDrillManager/list',
    method: 'get',
    params: query
  })
}

// 查询消防演练管理详细
export function getReligionDrillManager(id) {
  return request({
    url: '/religion/religionDrillManager/' + id,
    method: 'get'
  })
}

// 新增消防演练管理
export function addReligionDrillManager(data) {
  return request({
    url: '/religion/religionDrillManager',
    method: 'post',
    data: data
  })
}

// 修改消防演练管理
export function updateReligionDrillManager(data) {
  return request({
    url: '/religion/religionDrillManager',
    method: 'put',
    data: data
  })
}

// 删除消防演练管理
export function delReligionDrillManager(id) {
  return request({
    url: '/religion/religionDrillManager/' + id,
    method: 'delete'
  })
}
