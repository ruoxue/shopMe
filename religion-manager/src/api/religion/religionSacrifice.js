import request from '@/utils/request'

// 查询民间烧香点列表
export function listReligionSacrifice(query) {
  return request({
    url: '/religion/religionSacrifice/list',
    method: 'get',
    params: query
  })
}

// 查询民间烧香点详细
export function getReligionSacrifice(id) {
  return request({
    url: '/religion/religionSacrifice/' + id,
    method: 'get'
  })
}

// 新增民间烧香点
export function addReligionSacrifice(data) {
  return request({
    url: '/religion/religionSacrifice',
    method: 'post',
    data: data
  })
}

// 修改民间烧香点
export function updateReligionSacrifice(data) {
  return request({
    url: '/religion/religionSacrifice',
    method: 'put',
    data: data
  })
}

// 删除民间烧香点
export function delReligionSacrifice(id) {
  return request({
    url: '/religion/religionSacrifice/' + id,
    method: 'delete'
  })
}
