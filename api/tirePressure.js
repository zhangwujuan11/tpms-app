import request from '@/utils/request'

// 车辆状态
export function getAlarmType(data) {
	return request({
		url: '/system/dict/data/type/alarm_type',
		method: 'get',
		data
	})
}

// 车辆列表
export function getVehiclesList(data) {
	return request({
		url: '/app/v1/tireMonitor/vehicles/list',
		method: 'get',
		data: data
	})
}

// 车辆轮胎
export function getVehiclesTires(id) {
	return request({
		url: '/app/v1/tireMonitor/vehicles/' + id + '/tires',
		method: 'get'
	})
}

// 轮胎详情
export function getTireDetail(id) {
	return request({
		url: '/app/v1/tireMonitor/vehicles/tires/' + id,
		method: 'get'
	})
}

// 整车轮胎信息
export function getAllTireDetail(data) {
	return request({
		url: '/app/v1/tire/lifecycle/getTires',
		method: 'post',
		data
	})
}

export function getAlarmRecords(data) {
	return request({
		url: '/app/v1/tireMonitor/history/alarmRecords',
		method: 'get',
		data
	})
}

export function getGpsInfo(data) {
	return request({
		url: '/app/v1/tireMonitor/actions/gps_position',
		method: 'get',
		data
	})
}

export function getLastGpsInfo(data) {
	return request({
		url: '/app/v1/tireMonitor/actions/gps_positionLatest',
		method: 'get',
		data
	})
}

export function getPressureCurve(data) {
	return request({
		url: '/app/v1/tireMonitor/actions/pressure/curve',
		method: 'get',
		data
	})
}

// 车牌号下拉框
export function vehicleNo() {
	return request({
		url: '/app/v1/tireMonitor/vehicles/list?pageNum=1&pageSize=100000',
		method: 'get'
	})
}

// 胎压警报
export function alarmType() {
	return request({
		url: '/system/dict/data/type/alarm_type',
		method: 'get'
	})
}

// 胎压警报列表
export function alarmRecords(data) {
	return request({
		url: '/app/v1/tireMonitor/alarmRecords',
		method: 'get',
		data
	})
}

// 参数设置
export function parameter() {
	return request({
		url: '/app/v1/system/actions/parameter/search',
		method: 'get'
	})
}

// 保存参数设置
export function actions(data) {
	return request({
		url: '/app/v1/system/actions/parameter/' + data.id,
		method: 'put',
		data
	})
}

// 所属组织
export function option(data) {
	return request({
		url: '/system/dept/list',
		method: 'get'
	})
}

// 轮位图
export function gettirepicture(data) {
	return request({
		url: '/app/v1/vehicles/actions/generate/' + data.id,
		method: 'get',
		params: { tireStatus: data.tireStatus }
	})
}
// 根据车辆id获取车辆轮胎信息
export function getalltire(data) {
	return request({
		url: '/app/v1/tireMonitor/vehicles/' + data + '/tires',
		method: 'get'
	})
}

// 车牌号下拉框
export function carlistall() {
	return request({
		url: '/app/v1/vehicles/actions/all',
		method: 'get'
	})
}
// 用户信息
export function user() {
	return request({
		url: '/system/user/profile',
		method: 'get'
	})
}

// 单条调拨
export function batch(tids, warehouseId) {
	return request({
		url: `/app/v1/tire/lifecycle/actions/batch/warehouse/${tids}/${warehouseId}`,
		method: 'get'
	})
}

// 整车轮胎信息
export function getlifecycle(data) {
	return request({
		url: '/app/v1/tire/lifecycle/getTires',
		method: 'post',
		data
	})
}

export function getWarehouseList(data) {
	return request({
		url: '/app/v1/warehouse/getList',
		method: 'post',
		data
	})
}
// 修改密码
export function updatePwd(query) {
	return request({
		url: '/system/user/profile/updatePwd',
		method: 'put',
		params: query
	})
}

// 获取轮胎列表
export function getTires(data) {
	return request({
		url: '/app/v1/tire/lifecycle/getTires',
		method: 'post',
		data
	})
}

// 获取主键
export function getKey(id) {
	return request({
		url: '/app/v1/common/tpms/getKey/' + id,
		method: 'get'
	})
}

//新增轮胎
export function maintenance(data) {
	return request({
		url: '/app/v1/tire/maintenance/add',
		method: 'post',
		data
	})
}

//新增轮胎
export function hub(data) {
	return request({
		url: '/app/v1/hub',
		method: 'post',
		data
	})
}

//新增轮胎
export function paramType(id) {
	return request({
		url: '/app/v1/param/type/data/paramType/' + id,
		method: 'get'
	})
}
// 车辆信息
export function cardetail(data) {
	return request({
		url: '/app/v1/tireMonitor/vehicles/position/' + data,
		method: 'get'
	})
}


export function caralltire(data){
	return request({
		url:'/app/v1/tire/lifecycle/tireChanger/' + data,
		method:'get',
	})
}

// 轮毂信息
export function getallhub(data){
	return request({
		url:'/v1/hub/list',
		method:'get',
		params:{vehicleId:data}
	})
}

// 头像修改
export function uplodatav(data){
	return request({
		url:'/system/user/profile/avatar',
		method:'post',
		data:data
	})
}

// 轮胎详情
export function tireinfo(data){
	return request({
		url:'/v1/tire/lifecycle/' +data,
		method:'get'
	})
}
