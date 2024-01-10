<template>
	<view class="content">
		<!-- <u-toast ref="uToast"></u-toast>
		<view class="time">
			<view class="time-range">
				<view class="item" @click="begin">{{beginTime?formateDate2(beginTime):"开始时间"}}<image class="down" src="https://tpms.5i84.cn/img/tirePressure/down.png"></view>
				<view class="item"  @click="end">{{endTime?formateDate2(endTime):"结束时间"}}<image class="down" src="https://tpms.5i84.cn/img/tirePressure/down.png"></view>
			</view>
		</view>
		<map v-if="loadFinish" style="width: 100%; height: 100vh;" :polyline="polyline" :include-points="polyline[0].points"  :show-location="true" @markertap="getMarker" :latitude="latitude" :longitude="longitude" :markers="covers">
		</map>
		<u-datetime-picker
			@cancel="dateShow=false"
			@confirm="confirm"
			:show="dateShow"
			v-model="date"
			mode="datetime"
		></u-datetime-picker> -->
		 <web-view :src="ursl" style="width: 100%;height: 100vh;"></web-view>
	</view>
</template>
<script>
	import { getToken } from '@/utils/auth'
	import config from '@/config'
		import { getLastGpsInfo } from '@/api/tirePressure'
	  export default {
	    data() {
	      return {
	        ursl: '',
			carid:'',
			obj:{},
	      }
	    },
		onLoad(options){
			this.carid = options.item
		},
	    onShow() {
			this.loadLastData()
	    },
	    onReady() {
	      this.clearMuiBack()
	    },
		
	    methods: {
	      // 关闭mui返回
	      clearMuiBack() {
	        // #ifdef APP-PLUS
	        let currentWebview = this.$scope.$getAppWebview().children()[0]
	        //监听注入的js
	        currentWebview.addEventListener("loaded", function() {
	          currentWebview.evalJS("mui.init({keyEventBind: {backbutton: false }});");
	        });
	        // #endif
	      },
		  loadLastData(){
		  	let params = {
		  		vehicleId: this.carid,
		  	}
		  	getLastGpsInfo(params).then(res=>{
		  		if(res.code == 200){
					if(res.data){
						this.obj={
							"latitude":res.data.latitude ,
							"longitude":res.data.longitude
						}
					}else{
						this.obj={
							"latitude":26.08,
							"longitude":119.28
						}
					}
		  			
					 this.ursl = config.gpsDomain + "commgps?id="+ getToken() + '&carid='+ this.carid  
					 // this.ursl = "http://192.168.110.39:80/tire/commgps?id="+ getToken() + '&carid='+ this.carid + '&lastpo=' + JSON.stringify(this.obj) 
		  		}
		  	})
		  }
	    },
	  }
// 	import AMap from 'vue-amap';
// 	import { getGpsInfo,getLastGpsInfo } from '@/api/tirePressure'
// 	export default {
// 		data() {
// 			return {
// 				id:0, // 使用 marker点击事件 需要填写id
// 				dateShow: false,
// 				title: 'map',
// 				loadFinish: true,
// 				date:Number(new Date()),
// 				latitude: 39.909,
// 				longitude: 116.39742,
// 				visible:false,
// 				beginTime: "",
// 				endTime: "",
// 				action: "begin",
// 				covers: [],
// 				lastMaker: {},
// 				secondMaker: {},
// 				polyline: [{
// 					width: 5,
// 					points:[],
// 					arrowLine: true,
// 					dottedLine:true,
// 					color: '#28F',
// 				}],
// 			}
// 		},
// 		mounted () {
// 		},
// 		onLoad(options){
// 			this.vehicleId = options.item
// 			this.loadLastData()
// 		},
// 		methods: {
// 			loadData(){
				
// 				let params = {
// 					vehicleId: this.vehicleId,
// 					startTime: this.beginTime,
// 					endTime: this.endTime
// 				}
// 				getGpsInfo(params).then(res=>{
// 					if(res.code == 200){
// 						this.loadFinish=false
// 						if(res.data.items&&res.data.items.length>0){
// 							let data = res.data.items
// 							this.id+=1
// 							let poinatt=[]
// 							for(let i=0;i<res.data.total;i++){
// 								let obj = {
// 									id:i+1,
// 									latitude: res.data.items[i].latitude,
// 									longitude:  res.data.items[i].longitude,
// 									iconPath: 'https://tpms.5i84.cn/img/tirePressure/location.png',
// 									"callout": {
// 										"content": `<div class='callout'><div><span>车牌号:</span><span class='l'>${res.data.items[i].vehicleNo}</span></div><div><span>设备ID:</span><span class='l'>${res.data.items[i].vehicleId}</span></div><div><span>电源:</span><span class='l'>${res.data.items[i].gpsPowerTypeDesc}</span></div><div><span>掉电状态:</span><span class='l'>${res.data.items[i].gpsPowerStateDesc}</span></div><div><span>日期:</span><span class='l'>${this.formateDate(res.data.items[i].gpsReportDate)}</span></div></div>`,
// 										"borderRadius": 5,
// 										"padding": 7,
// 										"bgColor": "#FFFFFF",
// 										"display": "BYCLICK",
// 									}
// 								}
// 								this.covers.push(obj)
// 								poinatt.push({latitude: res.data.items[i].latitude,longitude:  res.data.items[i].longitude,})
// 							}
// 							this.loadFinish=true
// 							this.polyline[0].points=poinatt
// 						}else{
// 							this.$refs.uToast.show({message:"没有相关数据"})
// 						}
// 					}
// 				})
// 			},
			// loadLastData(){
			// 	let params = {
			// 		vehicleId: this.carid,
			// 	}
			// 	getLastGpsInfo(params).then(res=>{
			// 		if(res.code == 200){
			// 			this.obj={
			// 				"latitude":res.data.latitude,
			// 				"longitude":res.data.longitude
			// 			}
						// this.latitude = res.data.latitude
						// this.longitude = res.data.longitude
						// let date = this.formateDate(res.data.gpsReportDate)
						// let html = `<div class='callout'><div><span>车牌号:</span><span class='l'>${res.data.vehicleNo}</span></div><div><span>设备ID:</span><span class='l'>${res.data.vehicleId}</span></div><div><span>电源:</span><span class='l'>${res.data.gpsPowerTypeDesc}</span></div><div><span>掉电状态:</span><span class='l'>${res.data.gpsPowerStateDesc}</span></div><div><span>日期:</span><span class='l'>${date}</span></div></div>`
						// let obj = {
						// 	id:this.id,
						// 	latitude: res.data.latitude,
						// 	longitude: res.data.longitude,
						// 	iconPath: 'https://tpms.5i84.cn/img/tirePressure/location.png',
						// 	"callout": {
						// 		"content": html,
						// 		"borderRadius": 5,
						// 		"display": "BYCLICK",
						// 		"padding": 7,
						// 		"bgColor": "#FFFFFF"
						// 	}
						// }
						// this.lastMaker = obj
			// 			// this.covers.push(obj)
			// 		}
			// 	})
			// },
// 			formateDate2(e){
// 				function addZero(number) {
// 				  return number < 10 ? `0${number}` : number;
// 				}
// 				const date = new Date(e);
// 				const year = date.getFullYear();
// 				const month = date.getMonth() + 1;
// 				const day = date.getDate();
// 				return `${year}-${addZero(month)}-${addZero(day)}`;
// 			},
// 			formateDate(e){
// 				function addZero(number) {
// 				  return number < 10 ? `0${number}` : number;
// 				}
// 				const date = new Date(e);
// 				const year = date.getFullYear();
// 				const month = date.getMonth() + 1;
// 				const day = date.getDate();
// 				const hours = date.getHours();
// 				const minutes = date.getMinutes();
// 				const seconds = date.getSeconds();
// 				return `${year}-${addZero(month)}-${addZero(day)} ${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
// 			},
// 			begin(){
// 				this.action = "begin"
// 				this.dateShow = true
// 			},
// 			end(){
// 				this.action = "end"
// 				this.dateShow = true
// 			},
// 			confirm(e) {
// 				this.dateShow = false
// 				if(this.action == "begin"){
// 					this.beginTime= e.value
// 				}
// 				if(this.action == "end"){
// 					this.endTime= e.value
// 				}
// 				if(this.beginTime && this.endTime){
// 					this.loadData()
// 				}
// 			},
// 			getMarker(e){
// 				console.log(6666)
// 			}
// 		}
	// }
</script>

<style scoped>
.content {
		height: 100%;
		position: relative;
}
.time {
	width: 100%;
	position: fixed;
	top: 100rpx;
	left: 0;
	z-index: 999;
	right: 20rpx;
	
}
.time image{
	width: 24rpx;
	height: 24rpx;
}
.time .time-range{
	width: 100%;
	display: flex;
	justify-content: space-around;
}
.time .time-range .item{
	padding: 10rpx 28rpx;
	background-color: white;
	border-radius: 40rpx;
}
.callout{
	color: red
}
/deep/.amap-overlay-text-container{
	text-align: left !important;
	line-height: 60rpx !important;
}

</style>
