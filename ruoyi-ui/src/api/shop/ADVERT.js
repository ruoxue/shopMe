import request from '@/utils/request'

// 查询广告列表
export function listADVERT(query) {
  return request({
    url: '/shop/ADVERT/list',
    method: 'get',
    params: query
  })
}

// 查询广告详细
export function getADVERT(id) {
  return request({
    url: '/shop/ADVERT/' + id,
    method: 'get'
  })
}

// 新增广告
export function addADVERT(data) {
  return request({
    url: '/shop/ADVERT',
    method: 'post',
    data: data
  })
}

// 修改广告
export function updateADVERT(data) {
  return request({
    url: '/shop/ADVERT',
    method: 'put',
    data: data
  })
}

// 删除广告
export function delADVERT(id) {
  return request({
    url: '/shop/ADVERT/' + id,
    method: 'delete'
  })
}
