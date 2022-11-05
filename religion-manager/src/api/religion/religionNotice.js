import request from '@/utils/request'

// 查询通知公告列表
export function listReligionNotice(query) {
  return request({
    url: '/religion/religionNotice/list',
    method: 'get',
    params: query
  })
}

// 查询通知公告详细
export function getReligionNotice(id) {
  return request({
    url: '/religion/religionNotice/' + id,
    method: 'get'
  })
}

// 新增通知公告
export function addReligionNotice(data) {
  return request({
    url: '/religion/religionNotice',
    method: 'post',
    data: data
  })
}

// 修改通知公告
export function updateReligionNotice(data) {
  return request({
    url: '/religion/religionNotice',
    method: 'put',
    data: data
  })
}

// 删除通知公告
export function delReligionNotice(id) {
  return request({
    url: '/religion/religionNotice/' + id,
    method: 'delete'
  })
}
