import request from '@/utils/request'

// 查询地区码列表
export function listTArea(query) {
  return request({
    url: '/phone/tArea/list',
    method: 'get',
    params: query
  })
}

// 查询地区码详细
export function getTArea(areaId) {
  return request({
    url: '/phone/tArea/' + areaId,
    method: 'get'
  })
}

// 新增地区码
export function addTArea(data) {
  return request({
    url: '/phone/tArea',
    method: 'post',
    data: data
  })
}

// 修改地区码
export function updateTArea(data) {
  return request({
    url: '/phone/tArea',
    method: 'put',
    data: data
  })
}

// 删除地区码
export function delTArea(areaId) {
  return request({
    url: '/phone/tArea/' + areaId,
    method: 'delete'
  })
}
