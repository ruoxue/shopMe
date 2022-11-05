import request from '@/utils/request'

// 查询文化学习列表
export function listReligionLearn(query) {
  return request({
    url: '/religion/religionLearn/list',
    method: 'get',
    params: query
  })
}

// 查询文化学习详细
export function getReligionLearn(id) {
  return request({
    url: '/religion/religionLearn/' + id,
    method: 'get'
  })
}

// 新增文化学习
export function addReligionLearn(data) {
  return request({
    url: '/religion/religionLearn',
    method: 'post',
    data: data
  })
}

// 修改文化学习
export function updateReligionLearn(data) {
  return request({
    url: '/religion/religionLearn',
    method: 'put',
    data: data
  })
}

// 删除文化学习
export function delReligionLearn(id) {
  return request({
    url: '/religion/religionLearn/' + id,
    method: 'delete'
  })
}
