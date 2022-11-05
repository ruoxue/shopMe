import request from '@/utils/request'

// 查询举报投诉列表
export function listReligionComment(query) {
  return request({
    url: '/religion/religionComment/list',
    method: 'get',
    params: query
  })
}

// 查询举报投诉详细
export function getReligionComment(id) {
  return request({
    url: '/religion/religionComment/' + id,
    method: 'get'
  })
}

// 新增举报投诉
export function addReligionComment(data) {
  return request({
    url: '/religion/religionComment',
    method: 'post',
    data: data
  })
}

// 修改举报投诉
export function updateReligionComment(data) {
  return request({
    url: '/religion/religionComment',
    method: 'put',
    data: data
  })
}

// 删除举报投诉
export function delReligionComment(id) {
  return request({
    url: '/religion/religionComment/' + id,
    method: 'delete'
  })
}
