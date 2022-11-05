import request from '@/utils/request'

// 查询团体列表
export function listReligionTeam(query) {
  return request({
    url: '/religion/religionTeam/list',
    method: 'get',
    params: query
  })
}

// 查询团体详细
export function getReligionTeam(id) {
  return request({
    url: '/religion/religionTeam/' + id,
    method: 'get'
  })
}

// 新增团体
export function addReligionTeam(data) {
  return request({
    url: '/religion/religionTeam',
    method: 'post',
    data: data
  })
}

// 修改团体
export function updateReligionTeam(data) {
  return request({
    url: '/religion/religionTeam',
    method: 'put',
    data: data
  })
}

// 删除团体
export function delReligionTeam(id) {
  return request({
    url: '/religion/religionTeam/' + id,
    method: 'delete'
  })
}
