import request from '@/utils/request'

// 查询场所消防检查列表
export function listReligionSafetyManager(query) {
  return request({
    url: '/religion/religionSafetyManager/list',
    method: 'get',
    params: query
  })
}

// 查询场所消防检查详细
export function getReligionSafetyManager(id) {
  return request({
    url: '/religion/religionSafetyManager/' + id,
    method: 'get'
  })
}

// 新增场所消防检查
export function addReligionSafetyManager(data) {
  return request({
    url: '/religion/religionSafetyManager',
    method: 'post',
    data: data
  })
}

// 修改场所消防检查
export function updateReligionSafetyManager(data) {
  return request({
    url: '/religion/religionSafetyManager',
    method: 'put',
    data: data
  })
}

// 删除场所消防检查
export function delReligionSafetyManager(id) {
  return request({
    url: '/religion/religionSafetyManager/' + id,
    method: 'delete'
  })
}
