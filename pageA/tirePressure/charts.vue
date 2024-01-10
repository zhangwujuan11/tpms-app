<template>
	<view class="content">
		<!-- <view class="search" style="justify-content: left;">
			<view class="text">轮位选择：</view>
			<view  class="time-range" >
				<view class="select" @click="show=true">{{positionName}}</view>
			</view>
		</view>
		<view class="search">
			<view class="text">报警日期：</view>
			<view  style="flex: 1;">
				<view class="time-range">
					<view class="item input" @click="begin">{{beginTime?formateDate(beginTime):"开始时间"}}</view> 
					<view class="item input"  @click="end">{{endTime?formateDate(endTime):"结束时间"}}</view>
				</view>
			</view>
		</view>
		<view class="charts">
			<view class="tit">胎压趋势图</view>
			<canvas id="mychart" canvas-id="mychart"  style="width: 100%; height: 300px;" :canvas-type="canvasType"></canvas>
		</view>
		<view class="charts">
			<view class="tit tit2">胎温趋势图</view>
			<canvas id="mychart2" canvas-id="mychart2" style="width: 100%; height: 300px;" :canvas-type="canvasType"></canvas>
		</view>
		<u-datetime-picker
			@cancel="dateShow=false"
			@confirm="confirm"
			:show="dateShow"
			v-model="date"
			mode="datetime"
		></u-datetime-picker>
		<u-picker :show="show" :columns="columns" keyName="label" @cancel="show=false" @confirm="confirm2"></u-picker> -->
		<web-view :src="ursl" style="width: 100%;height: 100vh;"></web-view>
	</view>
</template>

<script>
	import { getPressureCurve } from '@/api/tirePressure'
	import { getToken } from '@/utils/auth'
	import config from '@/config'
	export default {
		data() {
			return {
				show: false,
				canvasType: '2d',
				id:'',
				tires: [],
				records: [],
				dateShow: false,
				date:Number(new Date()),
				beginTime: "",
				endTime: "",
				action: "begin",
				columns: [
				],
				positionName: '',
				positionId:'',
				ursl: '',
			}
		},
		onLoad(options){
			this.carid = options.item
			this.position=options.position
		},
		onShow() {
			this.loadLastData()
		},
		methods: {
			loadLastData(){
				let params = {
					vehicleId: this.carid,
				}
				this.ursl = config.gpsDomain + "commechart?id="+ getToken() + '&carid='+ this.carid + '&position='+ this.position
				 // this.ursl = "http://192.168.110.39:80/tire/commechart?id="+ getToken() + '&carid='+ this.carid + '&position='+ this.position
			},
			confirm(e) {
				this.show = false
			},
			loadData(){
				let params = {
					curveType: 1,
					endTime: this.formateDate2(this.endTime),
					position: this.positionId+"",
					startTime: this.formateDate2(this.beginTime),
					vehicleId: this.id,
				}
				let params2 = {
					curveType: 2,
					endTime: this.formateDate2(this.endTime),
					position: this.positionId+"",
					startTime: this.formateDate2(this.beginTime),
					vehicleId: this.id,
				}
				getPressureCurve(params).then(res=>{
					if(res.code==200){
						this.setChart(res.data)
					}
				})
				getPressureCurve(params2).then(res=>{
					if(res.code==200){
						this.setChart2(res.data)
					}
				})
			},
			setChart(e){
				const ctx = document.getElementById('mychart')
				const chart = echarts.init(ctx)
				const legend = []
				let yaxisSeries = []
				for (let key in e.yaxisSeries) {
					legend.push(e.yaxisSeries[key].legendName)
					yaxisSeries.push(
						{
						  name: e.yaxisSeries[key].legendName,
						  type: 'line',
						  data: e.yaxisSeries[key].progressList
						}
					)
				}
				var option = {
				  tooltip: {
				    trigger: 'axis',
				    axisPointer: {
				      type: 'cross'
				    }
				  },
				  grid: {
				      left: '5%',
				      right: '3%',
				      bottom: '3%',
				      containLabel: true
				  },
				  toolbox: {
				    feature: {
				      dataView: { show: true, readOnly: false },
				    }
				  },
				  legend: {
				    data: legend
				  },
				  xAxis: [
				    {
				      type: 'category',
				      axisTick: {
				        alignWithLabel: true
				      },
				      // prettier-ignore
				      data: e.xaxis
				    }
				  ],
				  yAxis: [
				    {
				      type: 'value',
				      name: '温度',
				      position: 'left',
				      alignTicks: true,
				      axisLine: {
				        show: true,
				      },
				      axisLabel: {
				        formatter: '{value} °C'
				      }
				    }
				  ],
				  series: yaxisSeries
				};
				chart.setOption(option)
				window.addEventListener('resize', function () {
					chart.resize();
				});
			},
			setChart2(e){
				const ctx = document.getElementById('mychart2')
				const chart = echarts.init(ctx)
				const legend = []
				let yaxisSeries = []
				for (let key in e.yaxisSeries) {
					legend.push(e.yaxisSeries[key].legendName)
					yaxisSeries.push(
						{
						  name: e.yaxisSeries[key].legendName,
						  type: 'line',
						  data: e.yaxisSeries[key].progressList
						}
					)
				}
				var option = {
				  tooltip: {
				    trigger: 'axis',
				    axisPointer: {
				      type: 'cross'
				    }
				  },
				  grid: {
				      left: '5%',
				      right: '3%',
				      bottom: '3%',
				      containLabel: true
				  },
				  toolbox: {
				    feature: {
				      dataView: { show: true, readOnly: false },
				    }
				  },
				  legend: {
				    data: legend
				  },
				  xAxis: [
				    {
				      type: 'category',
				      axisTick: {
				        alignWithLabel: true
				      },
				      // prettier-ignore
				      data: e.xaxis
				    }
				  ],
				  yAxis: [
				    {
				      type: 'value',
				      name: '温度',
				      position: 'left',
				      alignTicks: true,
				      axisLine: {
				        show: true,
				      },
				      axisLabel: {
				        formatter: '{value} °C'
				      }
				    }
				  ],
				  series: yaxisSeries
				};
				chart.setOption(option)
				window.addEventListener('resize', function () {
					chart.resize();
				});
				
			},
			formateDate(e){
				function addZero(number) {
				  return number < 10 ? `0${number}` : number;
				}
				const date = new Date(e);
				const year = date.getFullYear();
				const month = date.getMonth() + 1;
				const day = date.getDate();
				return `${year}-${addZero(month)}-${addZero(day)}`;
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
					this.loadData()
				}
				
			},
			confirm2(e) {
				this.positionId = e.value[0].id
				this.positionName = e.value[0].label
				this.show = false
				if(this.beginTime && this.endTime){
					this.loadData()
				}
			},
			formateDate2(e){
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
		}
	}
</script>

<style scoped>
</style>
