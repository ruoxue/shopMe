import request from '@/utils/request'

// 查询建筑安全隐患排查列表
export function listReligionBuildSafeManager(query) {
  return request({
    url: '/religion/religionBuildSafeManager/list',
    method: 'get',
    params: query
  })
}

// 查询建筑安全隐患排查详细
export function getReligionBuildSafeManager(id) {
  return request({
    url: '/religion/religionBuildSafeManager/' + id,
    method: 'get'
  })
}

// 新增建筑安全隐患排查
export function addReligionBuildSafeManager(data) {
  return request({
    url: '/religion/religionBuildSafeManager',
    method: 'post',
    data: data
  })
}

// 修改建筑安全隐患排查
export function updateReligionBuildSafeManager(data) {
  return request({
    url: '/religion/religionBuildSafeManager',
    method: 'put',
    data: data
  })
}

// 删除建筑安全隐患排查
export function delReligionBuildSafeManager(id) {
  return request({
    url: '/religion/religionBuildSafeManager/' + id,
    method: 'delete'
  })
}
