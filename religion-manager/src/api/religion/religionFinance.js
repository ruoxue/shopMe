import request from '@/utils/request'

// 查询财务数据列表
export function listReligionFinance(query) {
  return request({
    url: '/religion/religionFinance/list',
    method: 'get',
    params: query
  })
}

// 查询财务数据详细
export function getReligionFinance(id) {
  return request({
    url: '/religion/religionFinance/' + id,
    method: 'get'
  })
}

// 新增财务数据
export function addReligionFinance(data) {
  return request({
    url: '/religion/religionFinance',
    method: 'post',
    data: data
  })
}

// 修改财务数据
export function updateReligionFinance(data) {
  return request({
    url: '/religion/religionFinance',
    method: 'put',
    data: data
  })
}

// 删除财务数据
export function delReligionFinance(id) {
  return request({
    url: '/religion/religionFinance/' + id,
    method: 'delete'
  })
}
