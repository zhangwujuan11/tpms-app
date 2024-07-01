<template>
	<view class="tp-deail">
			<view class="total-car" v-if="maincarbox">
				<view class="tire" v-for="(tire,index) in maincardata">
					<view class="left">
						<view class="tire-item"  v-for="(tireleft) in tire.leftTireCode">
							<view class="img" v-if="tireleft.infodata == null" ></view>
							<view class="zhegnchang"  v-else-if="tireleft.infodata.alarmLevel==10000"  @click="detail(tireleft.infodata)"></view>
							<view class="wuxinhao"  v-else-if="tireleft.infodata.alarmLevel==10501"  @click="detail(tireleft.infodata)"></view>
							<view class="jinvbao"  v-else  @click="detail(tireleft.infodata)"></view>
							<view class="info" v-if="tireleft.infodata != null">
								<!-- {{tireleft.infodata}} -->
								<view v-if="tireleft.infodata">{{tireleft.infodata.pressure}}bar</view>
								<view v-if="!tireleft.infodata">--</view>
								<view v-if="tireleft.infodata">{{tireleft.infodata.temperature}}℃</view>
								<view v-if="!tireleft.infodata">--</view>
								<view class="greefont" v-if="tireleft.infodata">冷{{tireleft.infodata.coldPressure || "0.0"}}bar</view>
								<view class="greefont" v-if="!tireleft.infodata">冷0.0bar</view>
							</view>
							<view class="info" v-if="tireleft.infodata == null"></view>
						</view>
					</view>
					<view class="middle"></view>
					<view class="right">
						<view class="tire-item"  v-for="(tireright) in tire.rightTireCode">
							<view class="img" v-if="tireright.infodata == null" ></view>
							<view class="zhegnchang"  v-else-if="tireright.infodata.alarmLevel==10000" @click="detail(tireright.infodata)"></view>
							<view class="wuxinhao"  v-else-if="tireright.infodata.alarmLevel==10501" @click="detail(tireright.infodata)"></view>
							<view class="jinvbao"  v-else @click="detail(tireright.infodata)"></view>
							<view class="info" v-if="tireright.infodata != null">
								<view v-if="tireright.infodata">{{tireright.infodata.pressure}}bar</view>
								<view v-if="!tireright.infodata">--</view>
								<view v-if="tireright.infodata">{{tireright.infodata.temperature}}℃</view>
								<view v-if="!tireright.infodata">--</view>
								<view class="greefont" v-if="tireright.infodata">冷{{tireright.infodata.coldPressure || "0.0"}}bar</view>
								<view class="greefont" v-if="!tireright.infodata">冷0.0bar</view>
							</view>
							<view class="info" v-if="tireright.infodata == null"></view>
						</view>
					</view>	
						
						<!-- 备胎 -->
						<view v-if="tire.axisNumber == 0 " style="width: 100%;margin-bottom: 100px;width: 100%;display: flex;justify-content: space-around;">
							<view v-for="(its) in tire.spareTireCode" :key="its.deviceNumber"   class="tire-item bei">
								<view class="img dowm " v-if="its.infodata == null" ></view>
								<view class="zhegnchang dowm"  v-else-if="its.infodata.alarmLevel==10000"  @click="detail(its.infodata)"></view>
								<view class="wuxinhao dowm"  v-else-if="its.infodata.alarmLevel==10501"  @click="detail(its.infodata)"></view>
								<view class="jinvbao dowm"  v-else  @click="detail(its.infodata)"></view>
								<view class="info" v-if="its.infodata != null">
									<view v-if="its.infodata">{{its.infodata.pressure}}bar</view>
									<view v-if="!its.infodata">--</view>
									<view v-if="its.infodata">{{its.infodata.temperature}}℃</view>
									<view v-if="!its.infodata">--</view>
									<view class="greefont" v-if="its.infodata">冷{{its.infodata.coldPressure || "0.0"}}bar</view>
									<view class="greefont" v-if="!its.infodata">冷0.0bar</view>
								</view>
								<view class="info" v-if="its.infodata == null"></view>
							</view>
						</view>
				</view>
			</view>
			<!-- 挂车 -->
			<view class="total-car" v-if="trailcarbox">
				<view class="tire" v-for="(items,index) in trailcardata"  :key="index">
					<view class="left">
						<view class="tire-item" v-for="(tiresleft) in items.leftTireCode" :key="tiresleft.deviceNumber" @click="detail(item)">
							<view class="img" v-if="tiresleft.infodata == null" ></view>
							<view class="zhegnchang"  v-else-if="tiresleft.infodata.alarmLevel==10000"  @click="detail(tiresleft.infodata)"></view>
							<view class="wuxinhao"  v-else-if="tiresleft.infodata.alarmLevel==10501" @click="detail(tiresleft.infodata)"></view>
							<view class="jinvbao"  v-else @click="detail(tiresleft.infodata)"></view>
							<view class="info" v-if="tiresleft.infodata != null">
								<view  v-if="tiresleft.infodata">{{tiresleft.infodata.pressure}}bar</view>
								<view v-if="!tiresleft.infodata">--</view>
								<view v-if="tiresleft.infodata">{{tiresleft.infodata.temperature}}℃</view>
								<view v-if="!tiresleft.infodata">--</view>
								<view class="greefont" v-if="tiresleft.infodata">冷{{tiresleft.infodata.coldPressure || "0.0"}}bar</view>
								<view class="greefont" v-if="!tiresleft.infodata">冷0.0bar</view>
							</view>
							<view class="info" v-if="tiresleft.infodata == null"></view>
						</view>
					</view>
					<view class="middle"></view>
					<view class="right">
						<view class="tire-item" v-for="(tirersight) in items.rightTireCode" :key="tirersight.deviceNumber" @click="detail(item)">
							<view class="img" v-if="tirersight.infodata == null" ></view>
							<view class="zhegnchang"  v-else-if="tirersight.infodata.alarmLevel==10000" @click="detail(tirersight.infodata)"></view>
							<view class="wuxinhao"  v-else-if="tirersight.infodata.alarmLevel==10501" @click="detail(tirersight.infodata)"></view>
							<view class="jinvbao"  v-else @click="detail(tirersight.infodata)"></view>
							<view class="info" v-if="tirersight.infodata != null">
								<view v-if="tirersight.infodata">{{tirersight.infodata.pressure}} bar</view>
								<view v-if="!tirersight.infodata">--</view>
								<view v-if="tirersight.infodata">{{tirersight.infodata.temperature}} ℃</view>
								<view v-if="!tirersight.infodata">--</view>
								<view class="greefont" v-if="tirersight.infodata">冷{{tirersight.infodata.coldPressure || "0.0"}}bar</view>
								<view class="greefont" v-if="!tirersight.infodata">冷0.0bar</view>
							</view>
							<view class="info" v-if="tirersight.infodata == null"></view>
						</view>
					</view>	
						<!-- 备胎 -->
						<view v-if="items.axisNumber == 0 " style="width: 100%;margin-bottom: 100px;width: 100%;display: flex;justify-content: space-around;">
							<view v-for="(its) in items.spareTireCode" :key="its.deviceNumber"   class="tire-item bei">
								<view class="img dowm " v-if="its.infodata == null" ></view>
								<view class="zhegnchang dowm"  v-else-if="its.infodata.alarmLevel==10000"  @click="detail(its.infodata)"></view>
								<view class="wuxinhao dowm"  v-else-if="its.infodata.alarmLevel==10501"  @click="detail(its.infodata)"></view>
								<view class="jinvbao dowm"  v-else  @click="detail(its.infodata)"></view>
								<view class="info" v-if="its.infodata != null">
									<view v-if="its.infodata">{{its.infodata.pressure}}bar</view>
									<view v-if="!its.infodata">--</view>
									<view v-if="its.infodata">{{its.infodata.temperature}}℃</view>
									<view v-if="!its.infodata">--</view>
									<view class="greefont" v-if="its.infodata">冷{{its.infodata.coldPressure || "0.0"}}bar</view>
									<view class="greefont" v-if="!its.infodata">冷0.0bar</view>
								</view>
								<view class="info" v-if="its.infodata == null"></view>
							</view>
						</view>
				</view>
			</view>
			<view class="footer">
				<view class="item" @click="toGps">
					<view class="l1"><image class="tp-imgstyle" src="https://tpms.5i84.cn/img/tirePressure/icon1.png"></image></view>
					<view class="l2">GPS定位</view>
				</view>
				<view class="item" @click="toRecord">
					<view class="l1"><image class="tp-imgstyle" src="https://tpms.5i84.cn/img/tirePressure/icon2.png"></image></view>
					<view class="l2">报警记录</view>
				</view>
				<view class="item" @click="toAllTires">
					<view class="l1"><image class="tp-imgstyle" src="https://tpms.5i84.cn/img/tirePressure/icon3.png"></image></view>
					<view class="l2">整车轮胎信息</view>
				</view>
			</view>
			<u-popup :show="show" mode="bottom" :round="10"  @close="close" @open="open" :closeable="true">
				<view  class="tire-detial">
					<view class="tit">单个轮胎监控信息</view>
						<view class="main">
							<view class="item item2">
								<view class="l">胎号</view>
								<view class="r">{{tireDetail.tireNo}}</view>
							</view>
							<view class="item item2 item3">
								<view class="l">当前轮位</view>
								<view class="r">{{tireDetail.installPositionDesc}}</view>
							</view>
							<view class="item" style="margin-top: 20rpx;">
								<view class="l">传感器ID</view>
								<view class="r">{{tireDetail.senderId || ''}} {{tireDetail.senderTypeDesc || ''}}</view>
							</view>
							<view class="item">
								<view class="l">当前状态</view>
								<view class="r">{{tireDetail.alarmLevelDesc.length?tireDetail.alarmLevelDesc[0]:''}}</view>
							</view>
							<!-- <view class="item">
								<view class="l">最新监控时间</view>
								<view class="r"></view>
							</view> -->
							<view class="item">
								<view class="l">安装时间</view>
								<view class="r">{{formateDate(tireDetail.installTime)}}</view>
							</view>
							<view class="item">
								<view class="l">气压</view>
								<view class="r">{{tireDetail.pressure || ''}}</view>
							</view>
							<view class="item">
								<view class="l">温度</view>
								<view class="r">{{tireDetail.temperature || ''}}</view>
							</view>
							<view class="item">
								<view class="l">电池电压</view>
								<view class="r" v-show="tireDetail.batteryVoltage">{{tireDetail.batteryVoltage}}V</view>
							</view>									
							<view class="item">
								<view class="l">品牌</view>
								<view class="r">{{tireDetail.tireBrandName || ''}}</view>
							</view>
							<view class="item">
								<view class="l">规格</view>
								<view class="r">{{tireDetail.specificationsName || ''}}</view>
							</view>
							<view class="item">
								<view class="l">花纹型号</view>
								<view class="r">{{tireDetail.pattern || ''}}</view>
							</view>
							<view class="item">
								<view class="l">累计里程</view>
								<view class="r">{{tireDetail.totalMileage || ''}}</view>
							</view>
							<view class="item">
								<view class="l">累计时长</view>
								<view class="r">{{tireDetail.totalDuration || ''}}</view>
							</view>
							<view class="item">
								<view class="l">新胎花纹深度</view>
								<view class="r">{{tireDetail.depth || ''}}</view>
							</view>
							<view class="item">
								<view class="l">初测花纹深度</view>
								<view class="r">{{tireDetail.firstDepth || ''}}</view>
							</view>
							<view class="item">
								<view class="l">实测花纹深度</view>
								<view class="r">{{tireDetail.measuredDepth || ''}}</view>
							</view>
							<view class="item">
								<view class="l">气压阈值</view>
								<view class="r">{{tireDetail.highPressureThreshold || ''}}</view>
							</view>
							<view class="item">
								<view class="l">高温阈值</view>
								<view class="r">{{tireDetail.highTemperatureThreshold || ''}}</view>
							</view>
						</view>
						<view class="popup-bottom">
							<view class="btn" @click="toCharts">查看曲线</view>
						</view>
				</view>
				</u-popup>
		</view>

</template>

<script>
	import { getVehiclesTires,getTireDetail,gettirepicture,getalltire } from '@/api/tirePressure'
	export default {
		data() {
			return {
				show: false,
				tireList: [],
				tireDetail: {
					alarmLevelDesc:[]
				},
				tireId: '',
				tires: [],
				maincarbox:true,
				maincardata:[],
				
				trailcarbox:true,
				trailcardata:[]
				
			}
		},
		onLoad(options){
			this.id = options.item
			this.getpicture()
			this.loadData()
		},
		methods: {
			// 轮位图加载
			getpicture(data){
				// carid.value=data
				// lastpointer(carid.value).then(datas=>{
				// 	let obj=[
				// 		datas.data.longitude,datas.data.latitude
				// 	]
				// 	readlocotion(obj).then(datast=>{
				// 		addressinfo.value =datast.data.regeocode.addressComponent.province+" " + datast.data.regeocode.addressComponent.city+" " + datast.data.regeocode.addressComponent.district
				// 	})
				// })
				
				// getcarinfo(data).then(yds=>{
				// 	carclickinfo.value=yds.data
				// })
				gettirepicture({id:this.id,tireStatus:0}).then(res=>{
						// 判断主挂车盒子
						if(res.data.mainList != null){
							getalltire(res.data.vehicleId).then(response=>{
								let tirePositionlist=[]
								if(response.data != null){
									tirePositionlist=response.data.items
								}
								this.maincarbox=true
								let nwarr=res.data.mainList
								nwarr.map(item=>{
									if(item.axisNumber != 0){
										// item.leftTireCode.reverse()
										for (let i = 0; i < item.leftTireCode.length; i++) {
											item.leftTireCode[i].infodata=null
											for (let j = 0; j <  tirePositionlist.length; j++) {
												if(tirePositionlist[j].tirePosition== item.leftTireCode[i].positionCode){
													item.leftTireCode[i].infodata=tirePositionlist[j]
												}
										}
									 }
										// item.rightTireCode.reverse()
										for (let i = 0; i < item.rightTireCode.length; i++) {
												item.rightTireCode[i].infodata=null
												for (let j = 0; j <  tirePositionlist.length; j++) {
													if(tirePositionlist[j].tirePosition== item.rightTireCode[i].positionCode){
														item.rightTireCode[i].infodata=tirePositionlist[j]
													}
											}
										}
									}else{
										for (let i = 0; i < item.spareTireCode.length; i++) {
											item.spareTireCode[i].infodata = null
											for (let j = 0; j < tirePositionlist.length; j++) {
												if (tirePositionlist[j].tirePosition == item.spareTireCode[i].positionCode) {
													item.spareTireCode[i].infodata = tirePositionlist[j]
												}
											}
										}
									}
								})
								this.maincardata=nwarr
								console.log(this.maincardata)
								})
						}else{
							this.maincarbox=false
						}
					
					
					if(res.data.trailList != null){
						getalltire(res.data.trailVehicleId).then(rest=>{
							let tirePosition =[]
							if(rest.data != null){
								tirePosition=rest.data.items
							}
							this.trailcarbox=true
							let olarr=res.data.trailList
							console.log(olarr)
							olarr.map(item=>{
								if(item.axisNumber != 0){
									// item.leftTireCode.reverse()
									for (let i = 0; i < item.leftTireCode.length; i++) {
										item.leftTireCode[i].infodata=null
										for (let j = 0; j < tirePosition.length; j++) {
											if(tirePosition[j].tirePosition== item.leftTireCode[i].positionCode){
												item.leftTireCode[i].infodata=tirePosition[j]
											}
									}
									}
									// item.rightTireCode.reverse()
									for (let i = 0; i < item.rightTireCode.length; i++) {
											item.rightTireCode[i].infodata=null
											for (let j = 0; j <  tirePosition.length; j++) {
												if(tirePosition[j].tirePosition== item.rightTireCode[i].positionCode){
													item.rightTireCode[i].infodata=tirePosition[j]
												}
										}
									}
								}else{
										for (let i = 0; i < item.spareTireCode.length; i++) {
											item.spareTireCode[i].infodata = null
											for (let j = 0; j < tirePosition.length; j++) {
												if (tirePosition[j].tirePosition == item.spareTireCode[i].positionCode) {
													item.spareTireCode[i].infodata = tirePosition[j]
												}
											}
										}
									}
							})
							this.trailcardata=olarr
							})
					}else{
						this.trailcarbox=false
					}
				})
			},
			
			
			loadData(){
				getVehiclesTires(this.id).then(res=>{
					if(res.code == 200){
						let list = res.data.items
						this.tires = list
						let tires = []
						for(let i=0;i<list.length;i++){
							let item = list[i]
							let code = item.tirePosition+''
							let firstCode = code.slice(0,1)
							let secondCode = code.slice(1,2)
							let index = firstCode-1
							if(secondCode == '0'){
								tires[index] = tires[index] || {}
								tires[index].left = tires[index].left || []
								tires[index].left.push(item)
							}
							else if(secondCode == '1'){
								tires[index] = tires[index] || {}
								tires[index].right = tires[index].right || []
								tires[index].right.push(item)
							}
						}
						this.tireList = tires
					}
				})
			},
			detail(e){
				this.tireId = e.tireId
				getTireDetail(e.tireId).then(res=>{
					if(res.code == 200){
						this.show = true
						this.tireDetail = res.data
					}
				})
			},
			confirm(e) {
				this.show = false
			},
			close(){
				this.show = false
			},
			open(){
				this.show = true
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
			toAllTires(){
				uni.navigateTo({
					url: '/pageA/tirePressure/allTire?item='+this.id
				});
			},
			toRecord(){
				uni.navigateTo({
					url: '/pageA/tirePressure/record?item='+this.id
				});
			},
			toGps(){
				uni.navigateTo({
					url: '/pageA/tirePressure/gps?item='+this.id
				});
			},
			toCharts(){
				uni.navigateTo({
					url: '/pageA/tirePressure/charts?item='+this.id + '&position=' + this.tireDetail.installPosition
				});
			},
		}
	}
</script>

<style scoped>
	
.tp-deail{
		height: calc(100vh - 80rpx);
		padding: 0 20rpx;
	}
.total-car{
	min-height: 70vh;
	background: url("https://tpms.5i84.cn/img/tirePressure/car-bg.png")  0 30rpx no-repeat;
	background-size: 100% 100%;
	padding-top: 100rpx;
}
.footer{
	position: fixed;
	height: 148rpx;
	background: #FFFFFF;
	box-shadow: 0rpx 0rpx 12rpx 0rpx #DAE1F2;
	border-radius: 20rpx;
	left: 20rpx;
	bottom: 20rpx;
	right: 20rpx;
	display: flex;
	text-align: center;
}
.footer .item{
	padding-top: 30rpx;
	flex: 1;
}
.footer .item .tp-imgstyle{
	line-height: 70rpx;
}
.tp-imgstyle{
	width: 40rpx;
	height: 40rpx;
}
.total-car .tire{
	display: flex;
	margin-bottom: 40rpx;
}
.total-car .tire .left{
	display: flex;
	flex: 4;
	text-align: center;
	justify-content: center;
}
.total-car .tire .middle{
	flex: 3;
}
.total-car .tire .right{
	display: flex;
	flex: 4;
	text-align: center;
	justify-content: center;
}
.tire-item {
	width: 108rpx;
	display: inline-block;
	margin: 0 10rpx;
}
.tire-item .img{
	width: 108rpx;
	height: 172rpx;
	background: linear-gradient(90deg, #1862F5 0%, rgba(255,255,255,0) 100%);
	border-radius: 20rpx;
}
.tire-item .info{
	font-size: 24rpx;
	font-family: AppleSystemUIFont;
	color: #010914;
	line-height: 50rpx;
	height: 75px;
}
.right .tire-item .img{
	width: 108rpx;
	height: 172rpx;
	background: linear-gradient(270deg, #1862F5 0%, rgba(255,255,255,0) 100%);
	border-radius: 20rpx;
}

.left .tire-item .wuxinhao{
	width: 108rpx;
	height: 172rpx;
	background: linear-gradient(90deg, #6672AA  0%, rgba(255,255,255,0) 100%);
	border-radius: 20rpx;
}
.right .tire-item .wuxinhao{
	width: 108rpx;
	height: 172rpx;
	background: linear-gradient(270deg, #6672AA  0%, rgba(255,255,255,0) 100%);
	border-radius: 20rpx;
}

.left .tire-item .zhegnchang{
	width: 108rpx;
	height: 172rpx;
	background: linear-gradient(90deg,#2FCA99  0%, rgba(255,255,255,0) 100%);
	border-radius: 20rpx;
}
.right .tire-item .zhegnchang{
	width: 108rpx;
	height: 172rpx;
	background: linear-gradient(270deg, #2FCA99  0%, rgba(255,255,255,0) 100%);
	border-radius: 20rpx;
}

.left .tire-item .jinvbao{
	width: 108rpx;
	height: 172rpx;
	background: linear-gradient(90deg,#FE5734  0%, rgba(255,255,255,0) 100%);
	border-radius: 20rpx;
}

.right .tire-item .jinvbao{
	width: 108rpx;
	height: 172rpx;
	background: linear-gradient(270deg, #FE5734  0%, rgba(255,255,255,0) 100%);
	border-radius: 20rpx;
}
.tire-detial{
	background: #F5F7FB;
}
.tire-detial .tit{
	font-size: 36rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #010914;
	line-height: 80rpx;
	text-align: center;
	
}
.tire-detial .main{
	margin: 20rpx;
	background: #fff;
	border-radius: 20rpx;
	padding: 30rpx 0;
}
.tire-detial .main .item{
	display: flex;
	line-height: 52rpx;
	padding: 0 36rpx;
}
.tire-detial .main .item2{
	line-height: 72rpx;
	font-size: 28rpx;
}
.tire-detial .main .item3{
	border-bottom: 1px dashed #ddd;
}

.tire-detial .main .item .l{
	flex: 1;
}
.tire-detial .main .item .r{
	flex: 1;
	text-align: right;
}
.popup-bottom{
	padding: 40rpx;
	background: #FFFFFF;
	border-radius: 20rpx 20rpx 0rpx 0rpx;
}
.btn{
	height: 88rpx;
	background: #1862F5;
	border-radius: 12rpx;
	text-align: center;
	line-height: 88rpx;
	font-size: 30rpx;
	font-family: AppleSystemUIFont;
	color: #FFFFFF;
}
.dowm{
	 transform: rotate(90deg);
}
.bei .jinvbao{
	width: 108rpx;
	height: 172rpx;
	background: linear-gradient(90deg,#FE5734  0%, rgba(255,255,255,0) 100%);
	border-radius: 20rpx;
}
.bei .zhegnchang{
	width: 108rpx;
	height: 172rpx;
	background: linear-gradient(90deg,#2FCA99  0%, rgba(255,255,255,0) 100%);
	border-radius: 20rpx;
}
.bei .wuxinhao{
	width: 108rpx;
	height: 172rpx;
	background: linear-gradient(90deg, #6672AA  0%, rgba(255,255,255,0) 100%);
	border-radius: 20rpx;
}

</style>
