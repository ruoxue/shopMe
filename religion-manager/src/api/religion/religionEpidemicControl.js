import request from '@/utils/request'

// 查询疫情防控检查列表
export function listReligionEpidemicControl(query) {
  return request({
    url: '/religion/religionEpidemicControl/list',
    method: 'get',
    params: query
  })
}

// 查询疫情防控检查详细
export function getReligionEpidemicControl(id) {
  return request({
    url: '/religion/religionEpidemicControl/' + id,
    method: 'get'
  })
}

// 新增疫情防控检查
export function addReligionEpidemicControl(data) {
  return request({
    url: '/religion/religionEpidemicControl',
    method: 'post',
    data: data
  })
}

// 修改疫情防控检查
export function updateReligionEpidemicControl(data) {
  return request({
    url: '/religion/religionEpidemicControl',
    method: 'put',
    data: data
  })
}

// 删除疫情防控检查
export function delReligionEpidemicControl(id) {
  return request({
    url: '/religion/religionEpidemicControl/' + id,
    method: 'delete'
  })
}
