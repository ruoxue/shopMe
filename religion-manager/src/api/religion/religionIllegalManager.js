import request from '@/utils/request'

// 查询非法活动管理列表
export function listReligionIllegalManager(query) {
  return request({
    url: '/religion/religionIllegalManager/list',
    method: 'get',
    params: query
  })
}

// 查询非法活动管理详细
export function getReligionIllegalManager(id) {
  return request({
    url: '/religion/religionIllegalManager/' + id,
    method: 'get'
  })
}

// 新增非法活动管理
export function addReligionIllegalManager(data) {
  return request({
    url: '/religion/religionIllegalManager',
    method: 'post',
    data: data
  })
}

// 修改非法活动管理
export function updateReligionIllegalManager(data) {
  return request({
    url: '/religion/religionIllegalManager',
    method: 'put',
    data: data
  })
}

// 删除非法活动管理
export function delReligionIllegalManager(id) {
  return request({
    url: '/religion/religionIllegalManager/' + id,
    method: 'delete'
  })
}
