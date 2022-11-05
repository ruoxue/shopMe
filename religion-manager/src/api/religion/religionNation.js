import request from '@/utils/request'

// 查询民族列表
export function listReligionNation(query) {
  return request({
    url: '/religion/religionNation/list',
    method: 'get',
    params: query
  })
}

// 查询民族详细
export function getReligionNation(id) {
  return request({
    url: '/religion/religionNation/' + id,
    method: 'get'
  })
}

// 新增民族
export function addReligionNation(data) {
  return request({
    url: '/religion/religionNation',
    method: 'post',
    data: data
  })
}

// 修改民族
export function updateReligionNation(data) {
  return request({
    url: '/religion/religionNation',
    method: 'put',
    data: data
  })
}

// 删除民族
export function delReligionNation(id) {
  return request({
    url: '/religion/religionNation/' + id,
    method: 'delete'
  })
}
