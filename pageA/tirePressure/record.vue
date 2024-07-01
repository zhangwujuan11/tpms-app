<template>
	<view class="content">
		<view class="search"  @click.stop="show=true">
			<view class="text">报警日期：</view>
			<view  style="flex: 1;">
				<view class="time-range">
					<view class="item input" @click="begin">{{beginTime?formateDate(beginTime,'{y}-{m}-{d} {h}:{i}:{s}'):"开始时间"}}</view>
					<view class="item input" style="margin-top: 10upx;"  @click="end">{{endTime?formateDate(endTime,'{y}-{m}-{d} {h}:{i}:{s}'):"结束时间"}}</view>
				</view>
			</view>
		</view>
		<view class="tp-car-list">
			<view class="tp-car" v-for="item in records">
				<view class="title">
					<view class="img"></view>
					<view>
						<view class="l1">{{item.vehicleNo}}</view>
						<view class="l2">报警时间:{{formateDate(item.reportTime,'{y}-{m}-{d} {h}:{i}:{s}') }}</view>
					</view>
					<view class="info status1">{{item.alarmLevelDesc[0]}}</view>
				</view>
				      
				<view class="data">
					<view class="item">
						<view class="t1">胎号</view>
						<view class="t2">{{item.tireNumber}}</view>
					</view>
					<view class="item">
						<view class="t1">轮位</view>
						<view class="t2">{{item.tirePositionDesc}}</view>
					</view>
					<view class="item">
						<view class="t1">压力(bar)</view>
						<view class="t2">{{item.pressure}}</view>
					</view>
					<view class="item">
						<view class="t1">温度(℃)</view>
						<view class="t2">{{item.temperature}}</view>
					</view>
					<view class="item">
						<view class="t1">电池电压(V)</view>
						<view class="t2">{{item.batteryVoltage}}</view>
					</view>
					<view class="item">
						<view class="t1">当时报警压力阈值(bar)</view>
						<view class="t2">{{item.highPressureThreshold}}</view>
					</view>
					<view class="item">
						<view class="t1">当时报警高温阈值(℃)</view>
						<view class="t2">{{item.highTemperatureThreshold}}</view>
					</view>
				</view>
			</view>
		</view>
<!-- 		<u-calendar :show="show" :mode="mode" @confirm="confirm" @close="close"></u-calendar>
 -->		<u-datetime-picker
			@cancel="dateShow=false"
			@confirm="confirm"
			:show="dateShow"
			v-model="date"
			mode="datetime"
		></u-datetime-picker>
	</view>
</template>

<script>
	import { getAlarmRecords } from '@/api/tirePressure'
	export default {
		data() {
			return {
				show: false,
				mode: 'range',
				records: [],
				dateShow: false,
				date:Number(new Date()),
				beginTime: "",
				endTime: "",
				action: "begin",
				pageSize:10,
				pageNum:1,
				total:0,
				is_show:false
			}
		},
		onLoad(options){
			this.vehicleId = options.item
			this.loadData()
		},
		methods: {
			confirm(e) {
				this.show = false
			},
			close(){
				this.show = false
			},
			loadData(){
				let params = {
					vehicleId: this.vehicleId,
					install: 0,
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					startTime:this.beginTime,
					endTime:this.endTime,
				}
				getAlarmRecords(params).then(res=>{
					if(res.code == 200){
						this.records = res.data.items
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
			begin(){
				this.action = "begin"
				this.dateShow = true
			},
			end(){
				this.action = "end"
				this.dateShow = true
			},
			confirm(e) {
				this.dateShow = false
				if(this.action == "begin"){
					this.beginTime= e.value
				}
				if(this.action == "end"){
					this.endTime= e.value
				}
				if(this.beginTime && this.endTime){
					if (this.beginTime > this.endTime) {
						uni.$u.toast("温馨提示开始时间不能大于结束时间！");
						return false;
					}else{
						this.loadData()
					}
					
				}
				
			},
		},
		onReachBottom() { //触底事件
			if (this.pageNum * this.pageSize >= this.total) {
				this.is_show = true;
			} else {
				this.is_show = false;
				if (this.pageNum <= this.pageNum - 1) {
					setTimeout(() => {
						uni.hideLoading()
					}, 500)
				} else {
					uni.showLoading({
						title: '加载中'
					});
					this.pageNum++
					getAlarmRecords({
						vehicleId: this.vehicleId,
						install: 0,
						pageNum: this.pageNum,
						pageSize: this.pageSize,
						startTime:this.beginTime,
						endTime:this.endTime,
					}).then(res=>{
						if(res.code == 200){
							this.total=res.data.total
							this.records=[...this.records,...res.data.items]
							setTimeout(() => {
								uni.hideLoading()
							}, 500)
						}
					})
				}
				
			}
		}
	}
</script>

<style scoped>
.content {
		height: 100%;

	}
.search{
	padding: 20rpx 0;
	background: #fff;
	display:flex;
	justify-content: space-around;
}
.search .text{
	width: 180rpx;
	line-height: 60rpx;
	font-size: 28rpx;
	color: #000000;
	padding-left: 20rpx;
}
.search .input{
	flex: 1;
	margin-right: 20rpx;
	height: 60rpx;
	border-radius: 180rpx;
	border: 1rpx solid #D8DBE2;
	padding: 0 20rpx  0 60rpx;
	background: url(https://tpms.5i84.cn/img/tirePressure/date-bg.png) no-repeat 15rpx 15rpx;
	background-size: 28rpx 28rpx;
	line-height: 56rpx;
	font-size: 24rpx;
}
.record-date{
	height: 60rpx;
	border-radius: 180rpx;
	border: 1rpx solid #D8DBE2;
	padding: 0 20rpx  0 60rpx;
	background: url(https://tpms.5i84.cn/img/tirePressure/date-bg.png) no-repeat 15rpx 15rpx;
	background-size: 28rpx 28rpx
}

.tp-car-list{
	margin-top: 18rpx;
			padding: 0 20rpx;
}
.tp-car{
	background: #FFFFFF;
	border-radius: 20rpx;
	padding: 20rpx;
	margin-top: 20rpx;
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
	background: url(https://tpms.5i84.cn/img/tirePressure/record.png);
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
.tp-car .title .info{
	position: absolute;
	padding: 0 10rpx;
	height: 52rpx;
	line-height: 52rpx;
	border-radius: 8rpx;
	top: 0rpx;
	right:0rpx;
	font-size: 24rpx;
	text-align: center;
}
.status1{
	background: rgba(255,87,51,0.1);
	color: #FF5733
}
.status2{
	background: rgba(255,141,26,0.1);
	color: #FF8D1A
}
.status3{
	background: rgba(43,201,152,0.1);
	color: #2BC998
}
.status4{
	background: rgba(94,106,165,0.1);
	color: #5E6AA5
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
	flex: 3;
	font-size: 24rpx;
	font-family: AppleSystemUIFont;
	color: #5C5F66;
	line-height: 34rpx;
}
.tp-car .data .item .t2{
	text-align: right;
	flex: 2;
	font-size: 24rpx;
	font-family: AppleSystemUIFont;
	color: #010914;
	line-height: 34rpx;
}
.time-range{
	display: flex;
	flex-direction: column;
}
</style>
