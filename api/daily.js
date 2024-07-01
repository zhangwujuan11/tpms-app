import request from '@/utils/request'

// 组织列表
export function getfleetList() {
    return request({
        url: '/system/dept/list',
        method: 'GET',
    })
}

// 获取车牌号码
export function getplateNumber() {
    return request({
        url: '/app/v1/vehicles/actions/all',
        method: 'GET',
    })
}

// 获取车辆列表
export function getVehicleList(params) {
    return request({
        url: '/app/v1/vehicles/actions/search',
        method: 'GET',
        params: params
    })
}

//获取车辆详情
export function getVehiclesDetail(params) {
    return request({
        url: `/app/v1/vehicles/${params}`,
        method: 'GET',
    })
}

//车辆管理绑定接收器
export function vehiclesBinds(params) {
    return request({
        url: `/app/v1/vehicles/actions/binds/${params.id}?bindStatus=${params.data.bindStatus}&receiverId=${params.data.receiverId}`,
        method: 'PUT',
        data: params.data
    })
}

//车辆管理主车车型列表
export function carClass() {
    return request({
        url: `/system/dict/data/type/car_class`,
        method: 'GET',
    })
}

//动力类型
export function carPower() {
    return request({
        url: `/system/dict/data/type/car_power`,
        method: 'GET',
    })
}

//拖车车型
export function gaucarClass() {
    return request({
        url: `/system/dict/data/type/gaucar_class`,
        method: 'GET',
    })
}

//车辆管理详情编辑
export function editVehicles(params) {
    return request({
        url: `/app/v1/vehicles/${params.vehicleId}`,
        method: 'PUT',
        data: params
    })
}

//车辆管理详情新增
export function addVehicles(params) {
    return request({
        url: '/app/v1/vehicles',
        method: 'POST',
        data: params
    })
}

//人工里程登记列表
export function registerList(params) {
    return request({
        url: `/app/v1/tire/register/list`,
        method: 'GET',
        params: params
    })
}

//人工里程补录
export function tireRegister(params) {
    return request({
        url: `/app/v1/tire/register`,
        method: 'PUT',
        data: params
    })
}

// 里程管理车牌号
export function allVehicle(data) {
    return request({
        url: '/app/v1/vehicles/actions/allVehicle',
        method: 'get',
        params: data
    })
}

//甩挂里程登记
export function tireRecord(params) {
    return request({
        url: `/app/v1/tire/register`,
        method: 'POST',
        data: params
    })
}

//轮胎列表
export function getTires(params) {
    return request({
        url: `/app/v1/tire/lifecycle/getTires`,
        method: 'POST',
        data: params
    })
}

//轮胎修补记录
export function maintenanceList(params) {
    return request({
        url: `/app/v1/tire/maintenance/list`,
        method: 'POST',
        data: params
    })
}

// 获取修补单号
export function getKey() {
    return request({
        url: '/app/v1/common/tpms/getKey/XB',
        method: 'get',
    })
}

// 获取修补内容
export function getTireRepair() {
    return request({
        url: '/system/dict/data/type/lifecycle_tire_repair',
        method: 'get',
    })
}

// 获取修补内容
export function getStockStatus() {
    return request({
        url: '/system/dict/data/type/stockStatus_tire',
        method: 'get',
    })
}

//轮胎登记入库
export function maintenanceAdd(params) {
    return request({
        url: `/app/v1/tire/maintenance/add`,
        method: 'POST',
        data: params
    })
}

//轮胎记录
export function maintenance(params) {
    return request({
        url: `/app/v1/tire/maintenance/${params}`,
        method: 'GET',
    })
}

//轮胎维修记录
export function tireStatus() {
    return request({
        url: '/system/dict/data/type/lifecycle_tire_status',
        method: 'GET',
    })
}

//轮胎翻新登记单号
export function getKeyNumber() {
    return request({
        url: '/app/v1/common/tpms/getKey/FX',
        method: 'get',
    })
}

//轮胎翻新登记单号
export function inspectionList(data) {
    return request({
        url: '/app/v1/tire/inspection/list',
        method: 'get',
        params: data
    })
}

//字典查询
export function queryParamType(data) {
    return request({
        url: `/app/v1/param/type/data/paramType/${data}`,
        method: 'get',
    })
}

//新增轮胎检查
export function inspectionAdd(params) {
    return request({
        url: `/app/v1/tire/inspection`,
        method: 'POST',
        data: params
    })
}

//轮胎详情信息
export function inspectionDetail(data) {
    return request({
        url: `/app/v1/tire/inspection/${data}`,
        method: 'get',
    })
}

// 车牌号下拉框
export function vehicleNo() {
    return request({
        url: '/app/v1/tireMonitor/vehicles/list?pageNum=1&pageSize=100000',
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

// 轮位图
export function gettirepicture(data) {
    return request({
        url: '/app/v1/vehicles/actions/generate/' + data.id,
        method: 'get',
        params: { tireStatus: data.tireStatus }
    })
}

export function caralltire(data) {
    return request({
        url: '/app/v1/tire/lifecycle/tireChanger/' + data,
        method: 'get',
    })
}

// 仓库下拉框
export function warehouselist() {
    return request({
        url: '/app/v1/warehouse/getList',
        method: 'post',
        data: { pageNum: 1, pageSize: 100000 }
    })
}

// 规格字典下拉框
export function getSpecifications() {
    return request({
        url: '/app/v1/param/type/data/paramType/tire_specification_param',
        method: "get"
    })
}

// 品牌字典下拉框
export function getTireBands() {
    return request({
        url: '/app/v1/param/type/data/paramType/tpms_tire_brand_param',
        method: "get"
    })
}

// 轮胎花纹型号
export function getpatternmodel() {
    return request({
        url: '/app/v1/param/type/data/paramType/tire_pattern_model',
        method: 'get'
    })
}

// 轮胎入库
export function addtire(data) {
    return request({
        url: '/app/v1/tire/lifecycle/addTire',
        method: 'post',
        data: data
    })
}

//轮胎安装
export function tireinstall(data) {
    return request({
        url: '/app/v1/tire/lifecycle/tireChanger/install/' + data.vehicleId,
        method: 'post',
        data: data
    })
}

//胎压监控列表
export function tireMonitorList(data) {
    return request({
        url: '/app/v1/tireMonitor/vehicles/list',
        method: 'get',
        params: data
    })
}

//挂甩登记上挂，下挂登记
export function registrationStatus(data){
	return request({
		url:'/app/v1/tire/register/status',
		method:'post',
		data:{
			"vehicleNo":data
		}
	})
}