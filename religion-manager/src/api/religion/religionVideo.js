import request from '@/utils/request'

// 查询视频接入列表
export function listReligionVideo(query) {
  return request({
    url: '/religion/religionVideo/list',
    method: 'get',
    params: query
  })
}

// 查询视频接入详细
export function getReligionVideo(id) {
  return request({
    url: '/religion/religionVideo/' + id,
    method: 'get'
  })
}

// 新增视频接入
export function addReligionVideo(data) {
  return request({
    url: '/religion/religionVideo',
    method: 'post',
    data: data
  })
}

// 修改视频接入
export function updateReligionVideo(data) {
  return request({
    url: '/religion/religionVideo',
    method: 'put',
    data: data
  })
}

// 删除视频接入
export function delReligionVideo(id) {
  return request({
    url: '/religion/religionVideo/' + id,
    method: 'delete'
  })
}
