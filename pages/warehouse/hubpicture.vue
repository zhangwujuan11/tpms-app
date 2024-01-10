<template>
	<view class="tp-deail">
		<view class="search">
			<!-- <uni-data-select
			 placeholder="请选择轮胎分类"
			@change="gogogo($event)"
			  v-model="queryform.vehicleId"
			  :localdata="vehicleNoo"
			    ></uni-data-select> -->
				<superwei-combox style="width: 100%;" :candidates="vehicleNoo" :isJSON="true" keyName="name" placeholder="请选择车牌"  v-model="queryform.carnum"  @select="select3"></superwei-combox>
				<!-- <view class="top-right"
				  style="width: 120rpx;height: 68rpx;border-radius: 180rpx;right: 20rpx;text-align: center;line-height: 96rpx;">
				  <image @click="can" style="width:50rpx;height:52rpx;" src="https://tpms.5i84.cn/img/images/carlive/crams.png"
				    mode=""></image>
				</view> -->
		</view>
		<view class="car-box" v-if="maincarbox">
			<view class="tp-car">
				<view class="title">
					<view class="img"></view>
					<view class="tip">
						<view class="l1">{{carinfoshow.vehicleNo}}</view>
						<view class="l2">
							<text class="text" style="margin-right: 20upx;">ID：{{carinfoshow.deviceId || ''}}</text>
							<text class="text">里程：{{carinfoshow.distance || 0}} km</text>
						</view>
						<view style="display: flex;justify-content: space-around;margin-top: 10rpx;flex-wrap: wrap;">
							<view class="imagebox" style="color:#C8C8C8;">
								<image src="@/static/images/smallhui.png" mode=""></image> <text>未安装轮毂</text>
							</view>
							<view class="imagebox" style="color: #1862F5;">
								<image src="@/static/images/smallbule.png" mode=""></image> <text>未绑定传感器轮毂</text>
							</view>
							<view class="imagebox" style="color: #00C779;">
								<image src="@/static/images/smallgreen.png" mode=""></image> <text>已绑定传感器轮毂</text>
							</view>
							
						</view>
						
					</view>
				</view>
			</view>
		</view>
		<view class="total-car" v-if="maincarbox">
			<view class="tire" v-for="(tire,index) in maincardata" :key="index">
				<view class="left">
					<view class="tire-item"  v-for="(tireleft) in tire.leftTireCode">
						<view class="img" v-if="tireleft.infohub == null" @click="notire(tireleft.positionCode,tireleft.positionDesc)"></view>
						<view class="lunbox" v-else-if="tireleft.infohub.senderId" @click="havetire(tireleft.infohub)"></view>
						<view class="lunbox2" v-else @click="havetire(tireleft.infohub)"></view>
					</view>
					<view v-for="(item,index) in tire.leftTireCode" :key="index">
						<view class="decs" v-if="item.infohub">
							<view>{{item.positionDesc}}</view>
							<view>{{item.infohub.hubNo}}</view>
						</view>
					</view>
				</view>
				<view class="middle"></view>
				<view class="right">
					<view class="tire-item" v-for="(tireright) in tire.rightTireCode" :key="tireright.deviceNumber" >
						<view class="img" v-if="tireright.infohub == null " @click="notire(tireright.positionCode,tireright.positionDesc)"></view>
						<view class="lunbox" v-else-if="tireright.infohub.senderId" @click="havetire(tireright.infohub)"></view>
						<view class="lunbox2"  v-else @click="havetire(tireright.infohub)"></view>
					</view>
					<view >
						<view  v-for="(item,index) in tire.rightTireCode" :key="index" >
							<view class="decs" v-if="item.infohub">
								<view>{{item.positionDesc}}</view>
								<view>{{item.infohub.hubNo}}</view>
							</view>
						</view>
					</view>
				</view>	
				<view v-if="tire.axisNumber == 0 " style="width: 100%;">
					<view style="display: flex;justify-content: space-around;">
						<view v-for="(its) in tire.spareTireCode" :key="its.deviceNumber"  class="beitaibox">
							<view class="img down" v-if="its.infohub == null" @click="notire(its.positionCode,its.positionDesc)"></view>
							<view class="lunbox down"  v-else-if="its.infohub.senderId" @click="havetire(its.infohub)"></view>
							<view class="lunbox2 down"  v-else @click="havetire(its.infohub)"></view>
							<view class="decs beitaitip" v-if="its.infohub">
								<view >{{its.positionDesc}}</view>
								<view>{{its.infohub.hubNo}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 挂车 -->
		<view class="car-box" v-if="trailcarbox">
			<view class="tp-car">
				<view class="title">
					<view class="img"></view>
					<view class="tip">
						<view class="l1">{{carinfoshowtwo.vehicleNo}}</view>
						<view class="l2">
							<text class="text" style="margin-right: 20upx;">ID：{{carinfoshowtwo.deviceId || ''}}</text>
							<text class="text">里程：{{carinfoshowtwo.distance || 0}} km</text>
						</view>
						<view style="display: flex;justify-content: space-around;margin-top: 10rpx;">
							<view class="imagebox" style="color: #1862F5;">
								<image src="@/static/tirePressure/smallbule.png" mode=""></image> <text>未绑定传感器轮胎</text>
							</view>
							<view class="imagebox" style="color: #00C779;">
								<image src="@/static/tirePressure/smallgree.png" mode=""></image> <text>已绑定传感器轮胎</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="total-car" v-if="trailcarbox" >
			<view class="tire" v-for="(items,index) in trailcardata"  :key="index">
				<view class="left">
					<view class="tire-item" v-for="(tiresleft) in items.leftTireCode" :key="tiresleft.deviceNumber" >
						<view class="img"  v-if="tiresleft.infohub == null" @click="notire(tiresleft.positionCode,tiresleft.positionDesc)"></view>
						<view class="lunbox"  v-else-if="tiresleft.infohub.senderId" @click="havetire(tiresleft.infohub)"></view>
						<view class="lunbox2"  v-else @click="havetire(tiresleft.infohub)"></view>
					</view>
					<view >
						<view  v-for="(item,index) in items.leftTireCode" :key="index" >
							<view class="decs" v-if="item.infohub">
								<view>{{item.positionDesc}}</view>
								<view>{{item.infohub.hubNo}}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="middle"></view>
				<view class="right">
					<view class="tire-item" v-for="(tirersight) in items.rightTireCode" :key="tirersight.deviceNumber" >
						<view class="img"  v-if="tirersight.infohub == null" @click="notire(tirersight.positionCode,tirersight.positionDesc)"></view>
						<view class="lunbox"  v-else-if="tirersight.infohub.senderId" @click="havetire(tirersight.infohub)"></view>
						<view class="lunbox2" v-else @click="havetire(tirersight.infohub)"></view>
					</view>
					<view >
						<view  v-for="(item,index) in items.rightTireCode" :key="index" >
							<view class="decs" v-if="item.infohub">
								<view>{{item.positionDesc}}</view>
								<view>{{item.infohub.hubNo}}</view>
							</view>
						</view>
					</view>
				</view>		
				<view v-if="items.axisNumber == 0 " style="width: 100%;">
					<view style="display: flex;justify-content: space-around;">
						<view v-for="(its) in items.spareTireCode" :key="its.deviceNumber"  class="beitaibox">
							<view class="img down" v-if="its.infohub == null" @click="notire(its.positionCode,its.positionDesc)"></view>
							<view class="lunbox down"  v-else-if="its.infohub.senderId" @click="havetire(its.infohub)"></view>
							<view class="lunbox2 down"  v-else @click="havetire(its.infohub)"></view>
							<view class="decs beitaitip" v-if="its.infohub">
								<view >{{its.positionDesc}}</view>
								<view>{{its.infohub.hubNo}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getVehiclesTires,getTireDetail,getVehiclesList, vehicleNo, cardetail,gettirepicture, getallhub } from '@/api/tirePressure'
	import superweiCombox from '@/components/superwei-combox'
	export default {
		components: {
		      superweiCombox
		    },
		data() {
			return {
				id:'',
				show: false,
				tireList: [],
				carNumber:'',
				tireId: '',
				tires: [],
				carList:[],
				vehicleNoo:[],//车牌号下拉框
				queryform:{
					vehicleId:'',
					carnum:''
				},
				tireId: '',
				tires: [],
				maincarbox:true,
				maincardata:[],
				trailcarbox:true,
				trailcardata:[],
				carinfoshow:{},
				carallinfo:{},
				carinfoshowtwo:{}
			}
		},
		onLoad(option){
			if(option.id){
				this.queryform.vehicleId = option.id
				vehicleNo().then(res=>{
					res.data.items.map(item=>{
						this.vehicleNoo.push({name:item.carNumber,value:item.vehicle})
					})
					this.loadData()
				})
			}else{
				vehicleNo().then(res=>{
					res.data.items.map(item=>{
						this.vehicleNoo.push({name:item.carNumber,value:item.vehicle})
					})
					this.queryform.carnum=res.data.items[0].carNumber
					this.queryform.vehicleId=res.data.items[0].vehicle
					this.loadData()
					// this.detail(res.data.items[0].vehicleId)
				})
			}
			
		},
		methods: {
				select3(e) {
					this.queryform.vehicleId = e.value
					this.gogogo(e.value)
				},
				Rectification(){
				        this.$api.GetStaffNameList().then((res) => {
				          if (res) {
				            this.candidates = res.data
				            this.candidates.forEach((resItem, resIndex) => {
				              resItem.name=resItem.text
				              resItem.id=resItem.id
				            })
				          }
				        });
				      },
			  // 扫码
			  async can() {
				uni.scanCode({
					success: (res) => {
						this.queryform.vehicleId=res.result
						 this.$forceUpdate()
					},
					fail: (err) => {
						this.$refs.uToast.show({
							type: 'error',
							message: err,
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
						})
					},
					complete: () => {
						console.log('扫码结束')
					}
				})
			  },
			gogogo(e){
				this.loadData()
			},
			// 轮位图加载
			loadData(data){
				cardetail(this.queryform.vehicleId).then(info=>{
					this.carinfoshow=info.data
					})
				gettirepicture({id:this.queryform.vehicleId,tireStatus:0}).then(res=>{
					this.carallinfo=res.data
						// 判断主挂车盒子
						if(res.data.mainList != null){
							getallhub(res.data.vehicleId).then(response => {
								let tirePositionlist = []
								if (response.data != null) {
									tirePositionlist = response.data.items || []
								}
								this.maincarbox = true
								let nwarr = res.data.mainList
								nwarr.map(item => {
									if (item.axisNumber !=0  ) {
										// item.leftTireCode.reverse()
										for (let i = 0; i < item.leftTireCode.length; i++) {
											item.leftTireCode[i].infohub = null
											for (let j = 0; j < tirePositionlist.length; j++) {
												if (tirePositionlist[j].installPosition == item.leftTireCode[i]
													.positionCode) {
													item.leftTireCode[i].infohub = tirePositionlist[j]
												}
											}
										}
										// item.rightTireCode.reverse()
										for (let i = 0; i < item.rightTireCode.length; i++) {
											item.rightTireCode[i].infohub = null
											for (let j = 0; j < tirePositionlist.length; j++) {
												if (tirePositionlist[j].installPosition == item.rightTireCode[i].positionCode) {
													item.rightTireCode[i].infohub = tirePositionlist[j]
												}
											}
										}
									}else{
										for (let i = 0; i < item.spareTireCode.length; i++) {
											item.spareTireCode[i].infohub = null
											for (let j = 0; j < tirePositionlist.length; j++) {
												if (tirePositionlist[j].installPosition == item.spareTireCode[i].positionCode) {
													item.spareTireCode[i].infohub = tirePositionlist[j]
												}
											}
										}
									}
								})
								this.maincardata=nwarr
							})
						}else{
							this.maincarbox=false
						}
					if(res.data.trailList != null){
						cardetail(res.data.trailVehicleId).then(info=>{
						this.carinfoshowtwo=info.data
						console.log(this.carinfoshowtwo)
					})
						getallhub(res.data.trailVehicleId).then(rest => {
							let tirePosition = []
							if (rest.data != null) {
								tirePosition = rest.data.items || []
							}
							this.trailcarbox = true
							let olarr = res.data.trailList
							olarr.map(item => {
								if (item.axisNumber != 0) {
									// item.leftTireCode.reverse()
									for (let i = 0; i < item.leftTireCode.length; i++) {
										item.leftTireCode[i].infohub = null
										for (let j = 0; j < tirePosition.length; j++) {
											if (tirePosition[j].installPosition == item.leftTireCode[i]
												.positionCode) {
												item.leftTireCode[i].infohub = tirePosition[j]
											}
										}
									}
									// item.rightTireCode.reverse()
									for (let i = 0; i < item.rightTireCode.length; i++) {
										item.rightTireCode[i].infohub = null
										for (let j = 0; j < tirePosition.length; j++) {
											if (tirePosition[j].installPosition == item.rightTireCode[i]
												.positionCode) {
												item.rightTireCode[i].infohub = tirePosition[j]
											}
										}
									}
								}else{
									for (let i = 0; i < item.spareTireCode.length; i++) {
										item.spareTireCode[i].infohub = null
										for (let j = 0; j < tirePosition.length; j++) {
											if (tirePosition[j].installPosition == item.spareTireCode[i].positionCode) {
												item.spareTireCode[i].infohub = tirePosition[j]
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
			havetire(e){
				let returnid=''
				if(e.installPositionDesc.includes("挂车")){
					returnid = this.carallinfo.vehicleId || this.carallinfo.trailVehicleId
				}else{
					returnid = this.carallinfo.vehicleId
				}
				uni.setStorageSync('hubinfo',JSON.stringify(e))
				uni.navigateTo({
					url: '/pages/warehouse/hubunistall?returnid='+ returnid
				})
			},
			notire(e,i){
				let carid=''
				let returnid=''
				if(i.includes("挂车")){
					carid=this.carallinfo.trailVehicleId
					returnid = this.carallinfo.vehicleId || this.carallinfo.trailVehicleId
				}else{
					carid=this.carallinfo.vehicleId
					returnid = this.carallinfo.vehicleId
				}
				uni.navigateTo({
					url: '/pages/warehouse/hubinstall?id='+ carid + '&position=' + i + '&positioncode=' + e + '&returnid=' + returnid 
				});
			}
		}
	}
</script>

<style>
	
.tp-deail{
		height: calc(100vh - 80rpx);
		padding: 0 20rpx;
	}
.total-car{
	min-height: 50vh;
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
	flex: 4;
	text-align: center;
}
.total-car .tire .middle{
	flex: 3;
}
.total-car .tire .right{
	flex: 4;
	text-align: center;
}
.tire-item {
	width: 108rpx;
	display: inline-block;
	margin: 0 10rpx;
}
.img{
	width: 108rpx;
	height: 172rpx;
	background: url('@/static/images/bighui.png') no-repeat;
	background-size: 100%;
	border-radius: 20rpx;
}
.tire-item .info{
	font-size: 24rpx;
	font-family: AppleSystemUIFont;
	color: #010914;
	line-height: 50rpx;
	height: 75px;
}
.right  .img{
	width: 108rpx;
	height: 172rpx;
	background: url('@/static/images/bighui.png') no-repeat;
	background-size: 100%;
	border-radius: 20rpx;
}

.left  .lunbox{
	width: 108rpx;
	height: 172rpx;
	background: url('@/static/images/biggreen.png') no-repeat;
	background-size: 100%;
	border-radius: 20rpx;
}
.right .lunbox{
	width: 108rpx;
	height: 172rpx;
	background: url('@/static/images/biggreen.png') no-repeat;
	background-size: 100%;
	border-radius: 20rpx;
}
.left  .lunbox2{
	width: 108rpx;
	height: 172rpx;
	background: url('@/static/images/bigbule.png') no-repeat;
	background-size: 100%;
	border-radius: 20rpx;
}
.right  .lunbox2{
	width: 108rpx;
	height: 172rpx;
	background: url('@/static/images/bigbule.png') no-repeat;
	background-size: 100%;
	border-radius: 20rpx;
}
.lunbox2{
	width: 108rpx;
	height: 172rpx;
	background: url('@/static/images/bigbule.png') no-repeat;
	background-size: 100%;
	border-radius: 20rpx;
}
.lunbox{
	width: 108rpx;
	height: 172rpx;
	background: url('@/static/images/biggreen.png') no-repeat;
	background-size: 100%;
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
.search{
	padding: 20rpx 0;
	display: flex;
	align-items: center;
	justify-content: center;
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
}
.select-list .item .down{
	width: 32rpx;
	height: 32rpx;
	position: relative;
	top: 4rpx;
	margin-left: 20rpx;
}
.car-box {
    width: 710rpx;
    height: 140rpx;
    background: #ffffff;
    border-radius: 20rpx;
    margin: 0 auto;
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
  .tip image{
	  width: 20rpx;
	  height: 32rpx;
	  margin-right: 8rpx;
  }
  .imagebox{
	  font-size: 24rpx;
	  display: flex;
	  align-items: center;
	  margin-bottom: 15rpx;
  }
  .down {
  	transform: rotate(90deg);
  }
  .decs{
	  width: 100%;
	  min-height: 105rpx;
	  background: rgba(255,255,255,0.5);
	  box-shadow: 0rpx 0rpx 8rpx 0rpx rgba(0,0,0,0.1);
	  font-size: 24rpx;
	  color: #8A8EA6;
	  line-height: 50rpx;
  }
.beitaitip{
	 padding:0 20rpx;
	  text-align: center;
  }
  .beitaibox{
	display: flex;
	flex-direction: column;
	align-items: center;
  }
  .margint{
	  margin-top: -280rpx;
  }
</style>
