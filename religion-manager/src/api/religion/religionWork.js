import request from '@/utils/request'

// 查询工单列表
export function listReligionWork(query) {
  return request({
    url: '/religion/religionWork/list',
    method: 'get',
    params: query
  })
}

// 查询工单详细
export function getReligionWork(id) {
  return request({
    url: '/religion/religionWork/' + id,
    method: 'get'
  })
}

// 新增工单
export function addReligionWork(data) {
  return request({
    url: '/religion/religionWork',
    method: 'post',
    data: data
  })
}

// 修改工单
export function updateReligionWork(data) {
  return request({
    url: '/religion/religionWork',
    method: 'put',
    data: data
  })
}

// 删除工单
export function delReligionWork(id) {
  return request({
    url: '/religion/religionWork/' + id,
    method: 'delete'
  })
}
