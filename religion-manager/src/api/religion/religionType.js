import request from '@/utils/request'

// 查询宗教类型列表
export function listReligionType(query) {
  return request({
    url: '/religion/religionType/list',
    method: 'get',
    params: query
  })
}

// 查询宗教类型详细
export function getReligionType(id) {
  return request({
    url: '/religion/religionType/' + id,
    method: 'get'
  })
}

// 新增宗教类型
export function addReligionType(data) {
  return request({
    url: '/religion/religionType',
    method: 'post',
    data: data
  })
}

// 修改宗教类型
export function updateReligionType(data) {
  return request({
    url: '/religion/religionType',
    method: 'put',
    data: data
  })
}

// 删除宗教类型
export function delReligionType(id) {
  return request({
    url: '/religion/religionType/' + id,
    method: 'delete'
  })
}
