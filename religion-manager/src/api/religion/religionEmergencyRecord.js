import request from '@/utils/request'

// 查询突发事件记录列表
export function listReligionEmergencyRecord(query) {
  return request({
    url: '/religion/religionEmergencyRecord/list',
    method: 'get',
    params: query
  })
}

// 查询突发事件记录详细
export function getReligionEmergencyRecord(id) {
  return request({
    url: '/religion/religionEmergencyRecord/' + id,
    method: 'get'
  })
}

// 新增突发事件记录
export function addReligionEmergencyRecord(data) {
  return request({
    url: '/religion/religionEmergencyRecord',
    method: 'post',
    data: data
  })
}

// 修改突发事件记录
export function updateReligionEmergencyRecord(data) {
  return request({
    url: '/religion/religionEmergencyRecord',
    method: 'put',
    data: data
  })
}

// 删除突发事件记录
export function delReligionEmergencyRecord(id) {
  return request({
    url: '/religion/religionEmergencyRecord/' + id,
    method: 'delete'
  })
}
