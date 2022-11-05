import request from '@/utils/request'

// 查询法会登记备案列表
export function listReligionFrenchManager(query) {
  return request({
    url: '/religion/religionFrenchManager/list',
    method: 'get',
    params: query
  })
}

// 查询法会登记备案详细
export function getReligionFrenchManager(id) {
  return request({
    url: '/religion/religionFrenchManager/' + id,
    method: 'get'
  })
}

// 新增法会登记备案
export function addReligionFrenchManager(data) {
  return request({
    url: '/religion/religionFrenchManager',
    method: 'post',
    data: data
  })
}

// 修改法会登记备案
export function updateReligionFrenchManager(data) {
  return request({
    url: '/religion/religionFrenchManager',
    method: 'put',
    data: data
  })
}

// 删除法会登记备案
export function delReligionFrenchManager(id) {
  return request({
    url: '/religion/religionFrenchManager/' + id,
    method: 'delete'
  })
}
