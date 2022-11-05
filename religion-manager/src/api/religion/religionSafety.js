import request from '@/utils/request'

// 查询消防场所列表
export function listReligionSafety(query) {
  return request({
    url: '/religion/religionSafety/list',
    method: 'get',
    params: query
  })
}

// 查询消防场所详细
export function getReligionSafety(id) {
  return request({
    url: '/religion/religionSafety/' + id,
    method: 'get'
  })
}

// 新增消防场所
export function addReligionSafety(data) {
  return request({
    url: '/religion/religionSafety',
    method: 'post',
    data: data
  })
}

// 修改消防场所
export function updateReligionSafety(data) {
  return request({
    url: '/religion/religionSafety',
    method: 'put',
    data: data
  })
}

// 删除消防场所
export function delReligionSafety(id) {
  return request({
    url: '/religion/religionSafety/' + id,
    method: 'delete'
  })
}
