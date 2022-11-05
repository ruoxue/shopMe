import request from '@/utils/request'

// 查询宗教建筑物列表
export function listReligionBuilding(query) {
  return request({
    url: '/religion/religionBuilding/list',
    method: 'get',
    params: query
  })
}

// 查询宗教建筑物详细
export function getReligionBuilding(id) {
  return request({
    url: '/religion/religionBuilding/' + id,
    method: 'get'
  })
}

// 新增宗教建筑物
export function addReligionBuilding(data) {
  return request({
    url: '/religion/religionBuilding',
    method: 'post',
    data: data
  })
}

// 修改宗教建筑物
export function updateReligionBuilding(data) {
  return request({
    url: '/religion/religionBuilding',
    method: 'put',
    data: data
  })
}

// 删除宗教建筑物
export function delReligionBuilding(id) {
  return request({
    url: '/religion/religionBuilding/' + id,
    method: 'delete'
  })
}
