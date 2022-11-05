import request from '@/utils/request'

// 查询财务投诉列表
export function listReligionFinanceComplain(query) {
  return request({
    url: '/religion/religionFinanceComplain/list',
    method: 'get',
    params: query
  })
}

// 查询财务投诉详细
export function getReligionFinanceComplain(id) {
  return request({
    url: '/religion/religionFinanceComplain/' + id,
    method: 'get'
  })
}

// 新增财务投诉
export function addReligionFinanceComplain(data) {
  return request({
    url: '/religion/religionFinanceComplain',
    method: 'post',
    data: data
  })
}

// 修改财务投诉
export function updateReligionFinanceComplain(data) {
  return request({
    url: '/religion/religionFinanceComplain',
    method: 'put',
    data: data
  })
}

// 删除财务投诉
export function delReligionFinanceComplain(id) {
  return request({
    url: '/religion/religionFinanceComplain/' + id,
    method: 'delete'
  })
}
