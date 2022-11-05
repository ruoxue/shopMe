import request from '@/utils/request'

// 查询商户菜单权限列表
export function listUserMenu(query) {
  return request({
    url: '/order/userMenu/list',
    method: 'get',
    params: query
  })
}

// 查询商户菜单权限详细
export function getUserMenu(menuId) {
  return request({
    url: '/order/userMenu/' + menuId,
    method: 'get'
  })
}

// 新增商户菜单权限
export function addUserMenu(data) {
  return request({
    url: '/order/userMenu',
    method: 'post',
    data: data
  })
}

// 修改商户菜单权限
export function updateUserMenu(data) {
  return request({
    url: '/order/userMenu',
    method: 'put',
    data: data
  })
}

// 删除商户菜单权限
export function delUserMenu(menuId) {
  return request({
    url: '/order/userMenu/' + menuId,
    method: 'delete'
  })
}
