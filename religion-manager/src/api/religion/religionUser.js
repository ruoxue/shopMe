import request from '@/utils/request'

// 查询宗教人员列表
export function listReligionUser(query) {
  return request({
    url: '/religion/religionUser/list',
    method: 'get',
    params: query
  })
}

// 查询宗教人员详细
export function getReligionUser(id) {
  return request({
    url: '/religion/religionUser/' + id,
    method: 'get'
  })
}

// 新增宗教人员
export function addReligionUser(data) {
  return request({
    url: '/religion/religionUser',
    method: 'post',
    data: data
  })
}

// 修改宗教人员
export function updateReligionUser(data) {
  return request({
    url: '/religion/religionUser',
    method: 'put',
    data: data
  })
}

// 删除宗教人员
export function delReligionUser(id) {
  return request({
    url: '/religion/religionUser/' + id,
    method: 'delete'
  })
}
