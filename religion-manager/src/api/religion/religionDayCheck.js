import request from '@/utils/request'

// 查询日常检查列表
export function listReligionDayCheck(query) {
  return request({
    url: '/religion/religionDayCheck/list',
    method: 'get',
    params: query
  })
}

// 查询日常检查详细
export function getReligionDayCheck(id) {
  return request({
    url: '/religion/religionDayCheck/' + id,
    method: 'get'
  })
}

// 新增日常检查
export function addReligionDayCheck(data) {
  return request({
    url: '/religion/religionDayCheck',
    method: 'post',
    data: data
  })
}

// 修改日常检查
export function updateReligionDayCheck(data) {
  return request({
    url: '/religion/religionDayCheck',
    method: 'put',
    data: data
  })
}

// 删除日常检查
export function delReligionDayCheck(id) {
  return request({
    url: '/religion/religionDayCheck/' + id,
    method: 'delete'
  })
}
