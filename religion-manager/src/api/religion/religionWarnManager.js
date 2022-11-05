import request from '@/utils/request'

// 查询场所消防设施分布列表
export function listReligionWarnManager(query) {
  return request({
    url: '/religion/religionWarnManager/list',
    method: 'get',
    params: query
  })
}

// 查询场所消防设施分布详细
export function getReligionWarnManager(id) {
  return request({
    url: '/religion/religionWarnManager/' + id,
    method: 'get'
  })
}

// 新增场所消防设施分布
export function addReligionWarnManager(data) {
  return request({
    url: '/religion/religionWarnManager',
    method: 'post',
    data: data
  })
}

// 修改场所消防设施分布
export function updateReligionWarnManager(data) {
  return request({
    url: '/religion/religionWarnManager',
    method: 'put',
    data: data
  })
}

// 删除场所消防设施分布
export function delReligionWarnManager(id) {
  return request({
    url: '/religion/religionWarnManager/' + id,
    method: 'delete'
  })
}
