<template>
	<view class="content">
		<u-sticky bgColor="#F5F7FB">
		<view class="search">
			<u-search v-model="queryform.carNumber" placeholder="搜索车牌号" @custom="loadDatainput()" @clear="carNumber=''" @search="loadDatainput()" :clearabled="true" :show-action="true" bg-color="#fff" height="76rpx"></u-search>
		</view>
		<view class="select-list" style="padding-bottom: 20rpx;">
			<view class="item" @click="optionshow=true">{{optinane||"组织名称"}}<image class="down" src="https://tpms.5i84.cn/img/tirePressure/down.png"></view>
			<view class="item" @click="showcarlist=true">{{optacr||"车牌号"}}<image class="down" src="https://tpms.5i84.cn/img/tirePressure/down.png"></view>
			<view class="item" @click="show=true">{{optacrLabel||"车辆状态"}}<image class="down" src="https://tpms.5i84.cn/img/tirePressure/down.png"></view>
		</view>
		</u-sticky>
		<view class="tp-car-list">
			<view class="tp-car" v-for="(item, index) in carList" :key="index" @click="detail(item)">
				<view class="title">
					<view class="img"></view>
					<view>
						<view class="l1">{{item.carNumber}}</view>
						<view class="l2"><text class="text">ID：{{item.vehicle}}</text></view>
					</view>
					<view class="">
						<view  v-if="item.alarmType == 10000" class="info status3">车辆正常</view>
						<view  v-else-if="item.alarmType == 10501" class="info status4">无信号报警</view>
						<view  v-else-if="item.alarmType == 10401" class="info status2">电池电压低</view>
						<view  v-else class="info status1">报警</view>
					</view>
				</view>
				<view class="data">
					<view class="item">
						<view class="t1">所属组织</view>
						<view class="t2">{{item.fleetName}}</view>
					</view>
					<view class="item">
						<view class="t1">车型</view>
						<view class="t2">{{item.carClassName}}</view>
					</view>
					<view class="item">
						<view class="t1">GPS(km)</view>
						<view class="t2">{{item.totalMileage}}</view>
					</view>
				</view>
			</view>
			<view v-show="aa && carList" style="text-align: center; width: 100%;margin:50rpx 0;">没有更多数据了</view>
			<view v-if="!carList"  style="width: 100%; padding: 50rpx 0;display: flex;flex-direction: column;justify-content: center;align-items: center;color: #666666;">
				 <image src="@/static/images/nodata.png" mode=""></image>
				 暂无数据
			</view>
		</view>
		<u-picker :show="show" :columns="columns" keyName="label" @cancel="showonecancel" @confirm="confirm" :immediateChange="true"></u-picker>
		<u-picker :show="showcarlist" :columns="vehicleNoo" @cancel="showcarlistcancel" @confirm="confirmcar" :immediateChange="true"></u-picker>
		<u-picker  :show="optionshow" :columns="optionlist" keyName="deptName"   @cancel="showcancel" @confirm="optionconfirm" :immediateChange="true"></u-picker>
	</view>
</template>

<script>
	import { getVehiclesList,getAlarmType, option,carlistall } from '@/api/tirePressure'
	export default {
		data() {
			return {
				carNumber:'',
				show: false,
				columns: [],
				carList: [],
				total: 0,
				curStatus: {},
				optionlist:[],
				optionshow:false,
				optinane:'',
				queryform:{
					pageNum: 1,
					pageSize: 10,
					carNumber:'',
					fleetId:'',
					monitorStatus:''
				},
				firsttotal:0,
				aa: false,
				vehicleNoo:[],
				showcarlist:false,
				optacr:'',
				optacrLabel:''
			}
		},
		onLoad(options){
			this.loadData()
			this.loadType()
			// 所属组织哦
			option().then(res=>{
				let assay=[]
				res.data.map(item=>{
					assay.push({"deptName":item.deptName,"deptId":item.deptId})
				})
				this.optionlist.push(assay)
			})
			
			// 车牌
			carlistall().then(res=>{
				let assay=[]
				res.data.items.map(item=>{
					assay.push(item)
				})
				this.vehicleNoo.push(assay)
			})
		},
		methods: {
			loadDatainput(){
				this.queryform.pageNum=1
				this.loadData()
			},
			loadData(){
				getVehiclesList(this.queryform).then(res=>{
					if(res.code == 200){
						this.firsttotal = res.data.total
						this.carList = res.data.items
					}
				})
			},
			loadType(){
				getAlarmType().then(res=>{
					if(res.code == 200){
						let assay=[]
						res.data.map(item=>{
							assay.push({"value":item.dictValue,"label":item.dictLabel})
						})
						this.columns.push(assay)
					}
				})
				
			},
			confirm(e) {
				this.show = false
				this.curStatus = e.value[0]
				this.optacrLabel=e.value[0].label
				this.columns[0].map(item=>{
					if(item.label == e.value[0].label){
						this.queryform.monitorStatus=item.value
						this.queryform.pageNum=1
						this.queryform.pageSize=10
					}
				})
				this.loadData()
			},
			showonecancel(){
				this.show = false
				this.curStatus = ''
				this.optacrLabel=''
				this.queryform.monitorStatus=''
				this.queryform.pageNum=1
				this.queryform.pageSize=10
				this.loadData()
			},
			confirmcar(e){
				this.showcarlist=false
				this.optacr=e.value[0]
				this.queryform.carNumber=e.value[0]
				this.queryform.pageNum=1
				this.queryform.pageSize=10
				this.loadData()
			},
			showcarlistcancel(){
				this.showcarlist=false
				this.optacr=''
				this.queryform.carNumber=''
				this.queryform.pageNum=1
				this.queryform.pageSize=10
				this.loadData()
			},
			// 组织
			optionconfirm(e){
				this.optionshow=false
				this.optinane=e.value[0].deptName
				this.optionlist[0].map(item=>{
					if(item.deptName == e.value[0].deptName){
						this.queryform.fleetId=item.deptId
						this.queryform.pageNum=1
						this.queryform.pageSize=10
					}
				})
				this.loadData()
			},
			showcancel(){
				this.optinane=''
				this.optionshow = false
				this.optinane =''
				this.queryform.fleetId=''
				this.loadData()
			},
			detail(e){
				let params = {
					id: e.vehicle
				}
				uni.navigateTo({
					url: '/pageA/tirePressure/detail?item='+e.vehicle
				});
			}
		},
		onReachBottom() { //触底事件
		  if (this.queryform.pageNum * this.queryform.pageSize >= this.firsttotal) {
		    this.aa=true
		  } else {
			    this.aa=false
		    if (this.queryform.pageNum <= this.queryform.pageNum - 1) {
		      setTimeout(() => {
		        uni.hideLoading()
		      }, 500)
		    } else {
		      uni.showLoading({
		        title: '加载中'
		      });
		      this.queryform.pageNum++
				getVehiclesList(this.queryform).then(res=>{
					if(res.code == 200){
						this.carList = [...this.carList, ...res.data.items]
						this.firsttotal = res.data.total
					}
				})
		    }
		    setTimeout(() => {
		      uni.hideLoading()
		    }, 500)
		  }
		}
	}
</script>

<style>
.content {
		height: 100%;
		padding: 0 20rpx;
	}
.search{
	padding: 20rpx 0;
}
.select-list{
	display: flex;
}
.select-list .item{
	flex: 1;
	text-align: center;
	width: 200rpx;
	height: 68rpx;
	line-height: 68rpx;
	background: #FFFFFF;
	border-radius: 180rpx;
	margin: 0 10rpx;
	font-size:24rpx;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
}
.select-list .item .down{
	width: 32rpx;
	height: 32rpx;
	position: relative;
	top: 4rpx;
	margin-left: 20rpx;
}
.tp-car-list{
	margin-top: 18rpx;
}
.tp-car{
	background: #FFFFFF;
	border-radius: 20rpx;
	padding: 20rpx;
	padding-bottom: 30rpx;
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
	background: url(https://tpms.5i84.cn/img/tirePressure/car.png);
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
	/* margin-left: 30rpx; */
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
.tp-car .data{
	background: #F5F7FB;
	border-radius: 20rpx;
	margin-top: 24rpx;
	display: flex;
}
.tp-car .data .item{
	flex: 1;
	text-align: center;
	padding: 20px 0;
}
.tp-car .data .item .t1{
	font-size: 24rpx;
	font-family: AppleSystemUIFont;
	color: #8A8EA6;
	line-height: 34rpx;
}
.tp-car .data .item .t2{
	margin-top: 8rpx;
	font-size: 24rpx;
	font-family: AppleSystemUIFont;
	color: #010914;
	line-height: 34rpx;
}
</style>
