import request from '@/utils/request'

// 查询用户类型列表
export function listReligionUserType(query) {
  return request({
    url: '/religion/religionUserType/list',
    method: 'get',
    params: query
  })
}

// 查询用户类型详细
export function getReligionUserType(id) {
  return request({
    url: '/religion/religionUserType/' + id,
    method: 'get'
  })
}

// 新增用户类型
export function addReligionUserType(data) {
  return request({
    url: '/religion/religionUserType',
    method: 'post',
    data: data
  })
}

// 修改用户类型
export function updateReligionUserType(data) {
  return request({
    url: '/religion/religionUserType',
    method: 'put',
    data: data
  })
}

// 删除用户类型
export function delReligionUserType(id) {
  return request({
    url: '/religion/religionUserType/' + id,
    method: 'delete'
  })
}
