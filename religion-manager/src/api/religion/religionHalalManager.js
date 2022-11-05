import request from '@/utils/request'

// 查询清真食品备案列表
export function listReligionHalalManager(query) {
  return request({
    url: '/religion/religionHalalManager/list',
    method: 'get',
    params: query
  })
}

// 查询清真食品备案详细
export function getReligionHalalManager(id) {
  return request({
    url: '/religion/religionHalalManager/' + id,
    method: 'get'
  })
}

// 新增清真食品备案
export function addReligionHalalManager(data) {
  return request({
    url: '/religion/religionHalalManager',
    method: 'post',
    data: data
  })
}

// 修改清真食品备案
export function updateReligionHalalManager(data) {
  return request({
    url: '/religion/religionHalalManager',
    method: 'put',
    data: data
  })
}

// 删除清真食品备案
export function delReligionHalalManager(id) {
  return request({
    url: '/religion/religionHalalManager/' + id,
    method: 'delete'
  })
}
