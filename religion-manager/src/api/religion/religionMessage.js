import request from '@/utils/request'

// 查询预警列表
export function listReligionMessage(query) {
  return request({
    url: '/religion/religionMessage/list',
    method: 'get',
    params: query
  })
}

// 查询预警详细
export function getReligionMessage(id) {
  return request({
    url: '/religion/religionMessage/' + id,
    method: 'get'
  })
}

// 新增预警
export function addReligionMessage(data) {
  return request({
    url: '/religion/religionMessage',
    method: 'post',
    data: data
  })
}

// 修改预警
export function updateReligionMessage(data) {
  return request({
    url: '/religion/religionMessage',
    method: 'put',
    data: data
  })
}

// 删除预警
export function delReligionMessage(id) {
  return request({
    url: '/religion/religionMessage/' + id,
    method: 'delete'
  })
}
