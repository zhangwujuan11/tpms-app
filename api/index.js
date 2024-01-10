import request from '@/utils/request'

// 首页统计
export function indexcount(){
	return request({
		url:'/app/v1/home_page/actions/online/count',
		method:'get'
	})
}
export function nohavedata(){
	return request({
		url:'/app/v1/home_page/actions/pressureRecord/count',
		method:'get'
	})
}

export function install(){
	return request({
		url:'/app/v1/home_page/actions/install/count',
		method:'get'
	})
}