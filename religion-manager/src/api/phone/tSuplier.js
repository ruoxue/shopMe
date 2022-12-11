import request from '@/utils/request'

// 查询供应商列表
export function listTSuplier(query) {
  return request({
    url: '/phone/tSuplier/list',
    method: 'get',
    params: query
  })
}

// 查询供应商详细
export function getTSuplier(supId) {
  return request({
    url: '/phone/tSuplier/' + supId,
    method: 'get'
  })
}

// 新增供应商
export function addTSuplier(data) {
  return request({
    url: '/phone/tSuplier',
    method: 'post',
    data: data
  })
}

// 修改供应商
export function updateTSuplier(data) {
  return request({
    url: '/phone/tSuplier',
    method: 'put',
    data: data
  })
}

// 删除供应商
export function delTSuplier(supId) {
  return request({
    url: '/phone/tSuplier/' + supId,
    method: 'delete'
  })
}
