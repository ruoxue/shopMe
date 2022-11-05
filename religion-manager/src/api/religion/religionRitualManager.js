import request from '@/utils/request'

// 查询法事登记备案列表
export function listReligionRitualManager(query) {
  return request({
    url: '/religion/religionRitualManager/list',
    method: 'get',
    params: query
  })
}

// 查询法事登记备案详细
export function getReligionRitualManager(id) {
  return request({
    url: '/religion/religionRitualManager/' + id,
    method: 'get'
  })
}

// 新增法事登记备案
export function addReligionRitualManager(data) {
  return request({
    url: '/religion/religionRitualManager',
    method: 'post',
    data: data
  })
}

// 修改法事登记备案
export function updateReligionRitualManager(data) {
  return request({
    url: '/religion/religionRitualManager',
    method: 'put',
    data: data
  })
}

// 删除法事登记备案
export function delReligionRitualManager(id) {
  return request({
    url: '/religion/religionRitualManager/' + id,
    method: 'delete'
  })
}
