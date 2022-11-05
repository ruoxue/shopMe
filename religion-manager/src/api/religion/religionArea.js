import request from '@/utils/request'

// 查询宗教场所列表
export function listReligionArea(query) {
  return request({
    url: '/religion/religionArea/list',
    method: 'get',
    params: query
  })
}

// 查询宗教场所详细
export function getReligionArea(id) {
  return request({
    url: '/religion/religionArea/' + id,
    method: 'get'
  })
}

// 新增宗教场所
export function addReligionArea(data) {
  return request({
    url: '/religion/religionArea',
    method: 'post',
    data: data
  })
}

// 修改宗教场所
export function updateReligionArea(data) {
  return request({
    url: '/religion/religionArea',
    method: 'put',
    data: data
  })
}

// 删除宗教场所
export function delReligionArea(id) {
  return request({
    url: '/religion/religionArea/' + id,
    method: 'delete'
  })
}
