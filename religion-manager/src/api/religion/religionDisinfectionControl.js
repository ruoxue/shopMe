import request from '@/utils/request'

// 查询场所消杀管理列表
export function listReligionDisinfectionControl(query) {
  return request({
    url: '/religion/religionDisinfectionControl/list',
    method: 'get',
    params: query
  })
}

// 查询场所消杀管理详细
export function getReligionDisinfectionControl(id) {
  return request({
    url: '/religion/religionDisinfectionControl/' + id,
    method: 'get'
  })
}

// 新增场所消杀管理
export function addReligionDisinfectionControl(data) {
  return request({
    url: '/religion/religionDisinfectionControl',
    method: 'post',
    data: data
  })
}

// 修改场所消杀管理
export function updateReligionDisinfectionControl(data) {
  return request({
    url: '/religion/religionDisinfectionControl',
    method: 'put',
    data: data
  })
}

// 删除场所消杀管理
export function delReligionDisinfectionControl(id) {
  return request({
    url: '/religion/religionDisinfectionControl/' + id,
    method: 'delete'
  })
}
