import request from '@/utils/request'

// 查询违法用地场所列表
export function listReligionIllegalUseManager(query) {
  return request({
    url: '/religion/religionIllegalUseManager/list',
    method: 'get',
    params: query
  })
}

// 查询违法用地场所详细
export function getReligionIllegalUseManager(id) {
  return request({
    url: '/religion/religionIllegalUseManager/' + id,
    method: 'get'
  })
}

// 新增违法用地场所
export function addReligionIllegalUseManager(data) {
  return request({
    url: '/religion/religionIllegalUseManager',
    method: 'post',
    data: data
  })
}

// 修改违法用地场所
export function updateReligionIllegalUseManager(data) {
  return request({
    url: '/religion/religionIllegalUseManager',
    method: 'put',
    data: data
  })
}

// 删除违法用地场所
export function delReligionIllegalUseManager(id) {
  return request({
    url: '/religion/religionIllegalUseManager/' + id,
    method: 'delete'
  })
}
