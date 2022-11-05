import request from '@/utils/request'

// 查询建筑隐患信息上报列表
export function listReligionBuildsafeInfoManager(query) {
  return request({
    url: '/religion/religionBuildsafeInfoManager/list',
    method: 'get',
    params: query
  })
}

// 查询建筑隐患信息上报详细
export function getReligionBuildsafeInfoManager(id) {
  return request({
    url: '/religion/religionBuildsafeInfoManager/' + id,
    method: 'get'
  })
}

// 新增建筑隐患信息上报
export function addReligionBuildsafeInfoManager(data) {
  return request({
    url: '/religion/religionBuildsafeInfoManager',
    method: 'post',
    data: data
  })
}

// 修改建筑隐患信息上报
export function updateReligionBuildsafeInfoManager(data) {
  return request({
    url: '/religion/religionBuildsafeInfoManager',
    method: 'put',
    data: data
  })
}

// 删除建筑隐患信息上报
export function delReligionBuildsafeInfoManager(id) {
  return request({
    url: '/religion/religionBuildsafeInfoManager/' + id,
    method: 'delete'
  })
}
