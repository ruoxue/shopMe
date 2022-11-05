import request from '@/utils/request'

// 查询集会登记列表
export function listReligionPartyManager(query) {
  return request({
    url: '/religion/religionPartyManager/list',
    method: 'get',
    params: query
  })
}

// 查询集会登记详细
export function getReligionPartyManager(id) {
  return request({
    url: '/religion/religionPartyManager/' + id,
    method: 'get'
  })
}

// 新增集会登记
export function addReligionPartyManager(data) {
  return request({
    url: '/religion/religionPartyManager',
    method: 'post',
    data: data
  })
}

// 修改集会登记
export function updateReligionPartyManager(data) {
  return request({
    url: '/religion/religionPartyManager',
    method: 'put',
    data: data
  })
}

// 删除集会登记
export function delReligionPartyManager(id) {
  return request({
    url: '/religion/religionPartyManager/' + id,
    method: 'delete'
  })
}
