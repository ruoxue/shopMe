import request from '@/utils/request'

// 查询行政许可备案列表
export function listReligionGovManager(query) {
  return request({
    url: '/religion/religionGovManager/list',
    method: 'get',
    params: query
  })
}

// 查询行政许可备案详细
export function getReligionGovManager(id) {
  return request({
    url: '/religion/religionGovManager/' + id,
    method: 'get'
  })
}

// 新增行政许可备案
export function addReligionGovManager(data) {
  return request({
    url: '/religion/religionGovManager',
    method: 'post',
    data: data
  })
}

// 修改行政许可备案
export function updateReligionGovManager(data) {
  return request({
    url: '/religion/religionGovManager',
    method: 'put',
    data: data
  })
}

// 删除行政许可备案
export function delReligionGovManager(id) {
  return request({
    url: '/religion/religionGovManager/' + id,
    method: 'delete'
  })
}
