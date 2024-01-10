import request from '@/utils/request'
export function getWarehouseList(data) {
  return request({
    url: '/app/v1/warehouse/getList',
    method: 'post',
    data
  })
}
//新增仓库
export function addWarehouse(data) {
  return request({
    url: '/app/v1/warehouse/add',
    method: 'post',
    data
  })
}


// 获取仓库详细信息
export function Detail(id) {
  return request({
    url: '/app/v1/warehouse/' + id,
    method: 'get',
  })
}


// 修改仓库详细信息
export function update(data) {
  return request({
    url: '/app/v1/warehouse/update',
    method: 'post',
    data
  })
}

// 修改仓库详细信息
export function delwarehouse(id) {
  return request({
    url: '/app/v1/warehouse/' + id,
    method: 'delete',
  })
}