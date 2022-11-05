import request from '@/utils/request'

// 查询牌位登记备案列表
export function listReligionMemorialManager(query) {
  return request({
    url: '/religion/religionMemorialManager/list',
    method: 'get',
    params: query
  })
}

// 查询牌位登记备案详细
export function getReligionMemorialManager(id) {
  return request({
    url: '/religion/religionMemorialManager/' + id,
    method: 'get'
  })
}

// 新增牌位登记备案
export function addReligionMemorialManager(data) {
  return request({
    url: '/religion/religionMemorialManager',
    method: 'post',
    data: data
  })
}

// 修改牌位登记备案
export function updateReligionMemorialManager(data) {
  return request({
    url: '/religion/religionMemorialManager',
    method: 'put',
    data: data
  })
}

// 删除牌位登记备案
export function delReligionMemorialManager(id) {
  return request({
    url: '/religion/religionMemorialManager/' + id,
    method: 'delete'
  })
}
