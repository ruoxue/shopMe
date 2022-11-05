import request from '@/utils/request'

// 查询和谐建设列表
export function listReligionHarmoniousBuild(query) {
  return request({
    url: '/religion/religionHarmoniousBuild/list',
    method: 'get',
    params: query
  })
}

// 查询和谐建设详细
export function getReligionHarmoniousBuild(id) {
  return request({
    url: '/religion/religionHarmoniousBuild/' + id,
    method: 'get'
  })
}

// 新增和谐建设
export function addReligionHarmoniousBuild(data) {
  return request({
    url: '/religion/religionHarmoniousBuild',
    method: 'post',
    data: data
  })
}

// 修改和谐建设
export function updateReligionHarmoniousBuild(data) {
  return request({
    url: '/religion/religionHarmoniousBuild',
    method: 'put',
    data: data
  })
}

// 删除和谐建设
export function delReligionHarmoniousBuild(id) {
  return request({
    url: '/religion/religionHarmoniousBuild/' + id,
    method: 'delete'
  })
}
