import request from '@/utils/request'


// 组织下拉列表
export function listDept(query) {
  return request({
    url: '/system/dept/treeList',
    method: 'get'
  })
}

// 仓库下拉框
export function warehouselist(){
	return request({
		url:'/app/v1/warehouse/getList',
		method:'post',
		data:{pageNum:1,pageSize:100000}
	})
}

// 品牌字典下拉框
export function getTireBands(){
	return request({
		url:'/app/v1/param/type/data/paramType/tpms_tire_brand_param',
		method:"get"
	})
}
// 规格字典下拉框
export function getSpecifications(){
	return request({
		url:'/app/v1/param/type/data/paramType/tire_specification_param',
		method:"get"
	})
}

// 轮胎入库
export function addtire(data){
	return request({
		url:'/app/v1/tire/lifecycle/addTire',
		method:'post',
		data:data
	})
}

// 胎号下拉款
export function tirelist (data){
	return request({
		url:'/app/v1/tire/lifecycle/getTires',
		method:'post',
		data:data
	})
}

// 轮胎详情
export function tirelistinfo (data){
	return request({
		url:'/app/v1/tire/lifecycle/'+ data,
		method:'get'
	})
}

// 绑定传感器
export function bangding(data){
	return request({
		url:'/app/v1/tire/lifecycle/actions/binding/sender/'+data.tireId+'/'+data.senderId+'/' + data.senderType,
		method:'post'
	})
}

// 解绑传感器
export function jiebang(data){
	return request({
		url:'/app/v1/tire/lifecycle/actions/ubbinding/sender/' + data,
		method:'POST'
	})
}

// 轮胎生命周期
export function gethistorylist(data){
	return request({
		url:'/app/v1/tire/history/list',
		method:'get',
		params:data
	})
}
// 绑定方式
export function sendidType() {
	return request({
		url: '/system/dict/data/type/lifecycle_tire_sendertype',
		method: 'get'
	})
}

export function tireinstall (data){
	return request({
		url:'/app/v1/tire/lifecycle/tireChanger/install/' + data.vehicleId,
		method:'post',
		data:data
	})
}

// 拆去方向
export function stockStatus_tire(){
	return request({
		url:'/system/dict/data/type/stockStatus_tire',
		method:'get',
	})
}

// 单号
export function getKeyFX(){
	return request({
		url:'/app/v1/common/tpms/getKey/FX',
		method:'get'
	})
}
export function getKeyWX(){
	return request({
		url:'/app/v1/common/tpms/getKey/WX',
		method:'get'
	})
}

// 轮胎拆卸
export function tiredetail(data){
	return request({
		url:'/app/v1/tire/lifecycle/tireChanger/uninstall/' + data.vehicleId,
		method:'post',
		data:data
	})
}

// 质量问题列表
export function zhili(){
	return request({
		url:'/system/dict/data/type/lifecycle_tire_quality_problem',
		method:'get'
	})
}

// 使用问题列表
export function shiyong(){
	return request({
		url:'/system/dict/data/type/lifecycle_tire_use_problem',
		method:'get'
	})
}
// 轮胎花纹型号
export function getpatternmodel(){
	return request({
		url:'/app/v1/param/type/data/paramType/tire_pattern_model',
		method:'get'
	})
}


// 轮毂列表
export function hublist(data){
	return request({
		url:'/app/v1/hub/list',
		method:'get',
		params:data
	})
}

// 轮毂参数
export function soucollist(data){
	return request({
		url:'/app/v1/param/type/data/paramType/' + data.paramType,
		method:"get"
	})
}


// 轮毂详情
export function hubinfo(data){
	return request({
		url:'/app/v1/hub/' + data,
		method:'get'
	})
}
// 轮毂绑定传感器
export function sendhubid(data){
	return request({
		url:'/app/v1/hub/actions/binds',
		method:'put',
		data:data
	})
}

// 轮毂生命周期
export function hublive(data){
	return request({
		url:"/app/v1/hubHistory/list",
		method:'get',
		data:data
	})
}

// 轮毂修改
export function hunchange(data){
	return request({
		url:'/app/v1/hub',
		method:'put',
		data:data
	})
}

// 轮胎修改
export function updateTire(data){
	return request({
		url:'/app/v1/tire/lifecycle/updateTire',
		method:'post',
		data:data
	})
}

// 轮毂安装
export function huninstall(data){
	return request({
		url:'/app/v1/hub/install/' + data.vehicleId,
		method:'post',
		data:data
	})
}
// 轮毂拆卸
export function hubjie(data){
	return request({
		url:'/app/v1/hub/uninstall/' + data.vehicleId,
		method:'post',
		data:data
	})
}

// 供应商
export function supperlist (data) {
	return request({
		url:'/v1/supplier/list',
		method:'get',
		params:data
	})
}
// 解绑rfid
export function jiebangrfid(data){
	return request({
		url:'/app/v1/tire/lifecycle/actions/ubbinding/rfid/' + data,
		method:'post'
	})
}
export function bangdingrfid(data){
	return request({
		url:'/app/v1/tire/lifecycle/actions/binding/rfid/' + data.tireid + '/' + data.code ,
		method:'post'
	})
}