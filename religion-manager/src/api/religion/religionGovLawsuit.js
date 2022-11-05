import request from '@/utils/request'

// 查询行政诉讼登记列表
export function listReligionGovLawsuit(query) {
  return request({
    url: '/religion/religionGovLawsuit/list',
    method: 'get',
    params: query
  })
}

// 查询行政诉讼登记详细
export function getReligionGovLawsuit(id) {
  return request({
    url: '/religion/religionGovLawsuit/' + id,
    method: 'get'
  })
}

// 新增行政诉讼登记
export function addReligionGovLawsuit(data) {
  return request({
    url: '/religion/religionGovLawsuit',
    method: 'post',
    data: data
  })
}

// 修改行政诉讼登记
export function updateReligionGovLawsuit(data) {
  return request({
    url: '/religion/religionGovLawsuit',
    method: 'put',
    data: data
  })
}

// 删除行政诉讼登记
export function delReligionGovLawsuit(id) {
  return request({
    url: '/religion/religionGovLawsuit/' + id,
    method: 'delete'
  })
}
