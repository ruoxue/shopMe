import request from '@/utils/request'

// 查询临时人员登记列表
export function listReligionOutuserManager(query) {
  return request({
    url: '/religion/religionOutuserManager/list',
    method: 'get',
    params: query
  })
}

// 查询临时人员登记详细
export function getReligionOutuserManager(id) {
  return request({
    url: '/religion/religionOutuserManager/' + id,
    method: 'get'
  })
}

// 新增临时人员登记
export function addReligionOutuserManager(data) {
  return request({
    url: '/religion/religionOutuserManager',
    method: 'post',
    data: data
  })
}

// 修改临时人员登记
export function updateReligionOutuserManager(data) {
  return request({
    url: '/religion/religionOutuserManager',
    method: 'put',
    data: data
  })
}

// 删除临时人员登记
export function delReligionOutuserManager(id) {
  return request({
    url: '/religion/religionOutuserManager/' + id,
    method: 'delete'
  })
}
