<template>
	<view class="content">
		<view class="all-tire-tit">轮胎信息共{{total}}条</view>
		<view class="tp-car-list">
			<view class="tp-car" v-for="item in tires">
				<view class="title">
					<view class="img"></view>
					<view>
						<view class="l1">{{item.tireNo}}</view>
						<view class="l2">{{item.installPositionDesc}}</view>
					</view>
				</view>
				<view class="data">
					<view class="item">
						<view class="t1">车牌</view>
						<view class="t2">{{item.vehicleNo}}</view>
					</view>
					<view class="item">
						<view class="t1">品牌</view>
						<view class="t2">{{item.tireBrandName}}</view>
					</view>
					<view class="item">
						<view class="t1">规格</view>
						<view class="t2">{{item.specificationsName}}</view>
					</view>
					<view class="item">
						<view class="t1">花纹型号</view>
						<view class="t2">{{item.pattern}}</view>
					</view>
					<view class="item">
						<view class="t1">新胎花纹深度</view>
						<view class="t2">{{item.depth}}</view>
					</view>
					<view class="item">
						<view class="t1">实测花纹深度</view>
						<view class="t2">{{item.measuredDepth}}</view>
					</view>
					<view class="item">
						<view class="t1">累计里程</view>
						<view class="t2">{{item.totalMileage}}</view>
					</view>
					<view class="item">
						<view class="t1">安装日期</view>
						<view class="t2">{{formateDate(item.installTime)}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getAllTireDetail } from '@/api/tirePressure'
	export default {
		data() {
			return {
				show: true,
				columns: [
						['中国', '美国', '日本']
				],
				tires: [],
				vehicleId: '',
				total: 0
			}
		},
		onLoad(options){
			this.vehicleId = options.item
			this.loadData()
		},
		methods: {
			confirm(e) {
				console.log('confirm', e)
				this.show = false
			},
			loadData(){
				let params = {
					vehicleId: this.vehicleId,
					install: 0,
				}
				getAllTireDetail(params).then(res=>{
					if(res.code == 200){
						this.tires = res.data.items
						this.total = res.data.total
					}
				})
			},
			formateDate(e){
				function addZero(number) {
				  return number < 10 ? `0${number}` : number;
				}
				const date = new Date(e);
				const year = date.getFullYear();
				const month = date.getMonth() + 1;
				const day = date.getDate();
				const hours = date.getHours();
				const minutes = date.getMinutes();
				const seconds = date.getSeconds();
				return `${year}-${addZero(month)}-${addZero(day)} ${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
			},
		},
		
	}
</script>

<style>
.content {
		height: 100%;
		padding: 0 20rpx;
	}
.all-tire-tit{
	padding-top: 16rpx;
	font-size: 24rpx;
	font-family: AppleSystemUIFont;
	color: #8A8EA6;
	line-height: 34rpx;
}

.tp-car-list{
	margin-top: 18rpx;
}
.tp-car{
	background: #FFFFFF;
	border-radius: 20rpx;
	padding: 20rpx;
	margin-bottom: 20rpx;
}
.tp-car .title{
	position: relative;
	padding-left: 124rpx;
}
.tp-car .title .img{
	position: absolute;
	left: 0rpx;
	top: 0px;
	width: 100rpx;
	height: 100rpx;
	background: url("https://tpms.5i84.cn/img/tirePressure/tire.png");
	background-size: 100% 100%;
}
.tp-car .title .img img{
	height: 100%;
	width: 100%;
}
.tp-car .title .l1{
	height: 48rpx;
	font-size: 32rpx;
	color: #010914;
	line-height: 46rpx;
}
.tp-car .title .l2{
	height: 36rpx;
	font-size: 24rpx;
	font-family: AppleSystemUIFont;
	color: #5C5F66;
	line-height: 34rpx;
	margin-top: 8rpx;
}
.tp-car .title .text{
	margin-left: 30rpx;
}

.tp-car .data{
	padding: 20rpx;
	background: #F5F7FB;
	border-radius: 20rpx;
	margin-top: 24rpx;
	
}
.tp-car .data .item{
	
	display: flex;
}
.tp-car .data .item .t1{
	text-align: left;
	flex: 1;
	font-size: 24rpx;
	font-family: AppleSystemUIFont;
	color: #5C5F66;
	line-height: 34rpx;
}
.tp-car .data .item .t2{
	text-align: right;
	flex: 1;
	font-size: 24rpx;
	font-family: AppleSystemUIFont;
	color: #010914;
	line-height: 34rpx;
}
</style>
