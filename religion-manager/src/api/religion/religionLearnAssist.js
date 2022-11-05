import request from '@/utils/request'

// 查询学习辅助列表
export function listReligionLearnAssist(query) {
  return request({
    url: '/religion/religionLearnAssist/list',
    method: 'get',
    params: query
  })
}

// 查询学习辅助详细
export function getReligionLearnAssist(id) {
  return request({
    url: '/religion/religionLearnAssist/' + id,
    method: 'get'
  })
}

// 新增学习辅助
export function addReligionLearnAssist(data) {
  return request({
    url: '/religion/religionLearnAssist',
    method: 'post',
    data: data
  })
}

// 修改学习辅助
export function updateReligionLearnAssist(data) {
  return request({
    url: '/religion/religionLearnAssist',
    method: 'put',
    data: data
  })
}

// 删除学习辅助
export function delReligionLearnAssist(id) {
  return request({
    url: '/religion/religionLearnAssist/' + id,
    method: 'delete'
  })
}
