import request from '@/utils/request'

// 查询政策法规列表
export function listReligionLaw(query) {
  return request({
    url: '/religion/religionLaw/list',
    method: 'get',
    params: query
  })
}

// 查询政策法规详细
export function getReligionLaw(id) {
  return request({
    url: '/religion/religionLaw/' + id,
    method: 'get'
  })
}

// 新增政策法规
export function addReligionLaw(data) {
  return request({
    url: '/religion/religionLaw',
    method: 'post',
    data: data
  })
}

// 修改政策法规
export function updateReligionLaw(data) {
  return request({
    url: '/religion/religionLaw',
    method: 'put',
    data: data
  })
}

// 删除政策法规
export function delReligionLaw(id) {
  return request({
    url: '/religion/religionLaw/' + id,
    method: 'delete'
  })
}
