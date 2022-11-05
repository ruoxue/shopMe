import request from '@/utils/request'

// 查询民族团结进步创建列表
export function listReligionNationBuild(query) {
  return request({
    url: '/religion/religionNationBuild/list',
    method: 'get',
    params: query
  })
}

// 查询民族团结进步创建详细
export function getReligionNationBuild(id) {
  return request({
    url: '/religion/religionNationBuild/' + id,
    method: 'get'
  })
}

// 新增民族团结进步创建
export function addReligionNationBuild(data) {
  return request({
    url: '/religion/religionNationBuild',
    method: 'post',
    data: data
  })
}

// 修改民族团结进步创建
export function updateReligionNationBuild(data) {
  return request({
    url: '/religion/religionNationBuild',
    method: 'put',
    data: data
  })
}

// 删除民族团结进步创建
export function delReligionNationBuild(id) {
  return request({
    url: '/religion/religionNationBuild/' + id,
    method: 'delete'
  })
}
