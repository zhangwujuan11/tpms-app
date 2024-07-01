<template>
	<view class="content">
		<view class="topshow">
			<image src="https://tpms.5i84.cn/img/index/indeximage.png" mode="widthFix"></image>
		</view>
		<view class="text-area">
			<view class="ul" style="background: url(https://tpms.5i84.cn/img/index/index-ba.png) no-repeat;
			background-size: 100% 100%;">
				<view class="li text-bottom" @click="goTirePressure">
					<image src="https://tpms.5i84.cn/img/index/jiankong.png" mode=""></image>
					胎压监控
				</view>
				<view class="li text-bottom" @click="gotirelist">
					<image src="https://tpms.5i84.cn/img/index/ruku.png" mode=""></image>
					轮胎入库
				</view>
				<view class="li text-bottom"  @click="gotiretable">
					<image src="https://tpms.5i84.cn/img/index/liebiao.png" mode=""></image>
					轮胎列表
				</view>
				<!-- <view class="li" @click="goband">
					<image src="https://tpms.5i84.cn/img/index/chuanganqi.png" mode=""></image>
					绑定传感器
				</view> -->
				<view class="li text-bottom" @click="goband">
					 <image src="https://tpms.5i84.cn/img/hub/lunguruku.png"></image>
					轮毂入库
				</view>
				<view class="li"  @click="goinstall">
					<image src="https://tpms.5i84.cn/img/index/anzhuang.png" mode=""></image>
					轮胎装卸
				</view>
				<view class="li" @click="gotirechange">
					<image src="https://tpms.5i84.cn/img/index/huangwei.png" mode=""></image>
					轮胎换位
				</view>
				<view class="li" @click="Jump('/pages/warehouse/Pending')">
					<!-- <view class="li" @click="Jump('/pages/warehouse/Pending')"> -->
					  <image src="https://tpms.5i84.cn/img/hub/luntaidaichuli.png"></image>
					  轮胎待处理
					<!-- </view> -->
				</view>
				<view class="li" @click="Jump('/pageA/daily/inspect')">
					<image src="https://tpms.5i84.cn/img/index/jiancha.png" mode=""></image>
					轮胎检查
				</view>
			</view>
		</view>
		<view class="alarm">
			<view class="alarmbox">
				<image src="https://tpms.5i84.cn/img/index/span.png"></image>
				<text>胎温胎压报警</text>
			</view>
			<view class="alarmcon">
				<view class="alarmconbox" @click="Jump('/pageA/tirePressure/lowPressure')">
					<view class="alarmconboxleft">
						{{lefttwo.lowPressureCount}}
						<text>低压报警车辆</text>
					</view>
					<image src="https://tpms.5i84.cn/img/index/diya.png"></image>
				</view>
				<view class="alarmconbox"  @click="Jump('/pageA/tirePressure/highPressure')">
					<view class="alarmconboxleft">
						{{lefttwo.highPressureCount}}
						<text>高压报警车辆</text>
					</view>
					<image src="https://tpms.5i84.cn/img/index/gaoya.png" mode=""></image>
				</view>
				<view class="alarmconbox" @click="Jump('/pageA/tirePressure/highTemperature')">
					<view class="alarmconboxleft">
						{{lefttwo.highTemperatureCount}}
						<text>高温报警车辆</text>
					</view>
					<image src="https://tpms.5i84.cn/img/index/gaowen.png" mode=""></image>
				</view>
				<view class="alarmconbox" @click="Jump('/pageA/tirePressure/noSignal')">
					<view class="alarmconboxleft">
						{{lefttwo.noSignCount}}
						<text>无信号报警车辆</text>
					</view>
					<image src="https://tpms.5i84.cn/img/index/xinhao.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="alarm">
			<view class="alarmbox">
				<image src="https://tpms.5i84.cn/img/index/span.png"></image>
				<text>车辆情况</text>
			</view>
			<view class="alarmcon">
				<view class="penfive" style="background:url(https://tpms.5i84.cn/img/index/qingkuanone.png) no-repeat;background-size: 100% 100%;">
					<text>在线车辆</text>
					<text>{{onlineCount.onlineCount}}辆</text>
				</view>
				<view class="penfive" style="background:url(https://tpms.5i84.cn/img/index/buzaixian.png) no-repeat;background-size: 100% 100%;">
					<text>不在线车辆</text>
					<text>{{onlineCount.offLineCount}}辆</text>
				</view>
			</view>
		</view>

		<view class="alarm" style="padding-bottom: 42upx;">
			<view class="alarmbox">
				<image src="https://tpms.5i84.cn/img/index/span.png"></image>
				<text>轮胎情况</text>
			</view>
			<view class="alarmcon">
				<view class="penfive" style="background:url(https://tpms.5i84.cn/img/index/yizhuang.png) no-repeat;background-size: 100% 100%;">
					<text>已装车轮胎</text>
					<text>{{rightone.installCount}}条</text>
				</view>
				<view class="penfive" style="background:url(https://tpms.5i84.cn/img/index/weizhuangche.png) no-repeat;background-size: 100% 100%;">
					<text>未装车轮胎</text>
					<text>{{rightone.unInstallCount}}条</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { indexcount,nohavedata,install } from '@/api/'
	export default {
		data() {
			return {
				show: false,
				title: 'Hello',
				onlineCount:{},
				lefttwo:{},
				rightone:{}
			}
		},
		onLoad() {
			indexcount().then(res=>{
				this.onlineCount=res.data
			})
			nohavedata().then(res=>{
				this.lefttwo=res.data
			})
			install().then(res=>{
				this.rightone=res.data
			})
		},
		methods: {
			Jump(e) {
			  uni.navigateTo({
			    url: e
			  })
			},
			gotirelist(){
				uni.navigateTo({
					url:'/pageA/carlive/tirelist/tirelist'
				})
			},
			// 轮胎列表
			gotiretable(){
				uni.navigateTo({
					url:'/pageA/carlive/tiretable/tiretable'
				})
			},
			goTirePressure(){
				uni.navigateTo({
					url:'/pageA/tirePressure/index'
				})
			},
			// 轮毂入库
			goband(){
				uni.navigateTo({
					url:'/pages/warehouse/storage'
				})
			},
			//轮胎拆装
			goinstall(){
				uni.navigateTo({
					url:'/pageA/carlive/tireinstall/tireinstall'
				})
			},
			// 轮胎换位
			gotirechange(){
				uni.navigateTo({
					url:'/pageA/carlive/tirechange/tirechange'
				})
			}
		}
	}
</script>

<style>
	.content {
		background: linear-gradient(180deg, #DBEAFF 0%, #F5F7FB 100%);
		height: 100%;
	}

	.topshow {
		height: 176upx;
	}

	.topshow image {
		width: 100%;
		height: 350upx;
		position: absolute;
		top: 0upx;
	}

	.text-area {
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.ul {
		width: 710upx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		background-size: 100% 100%;
		padding: 32upx 42upx;
		box-sizing: border-box;
	}

	.ul .li {
		width: 135upx;
		height: 136upx;
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
		font-size: 24upx;
	}

	.text-bottom{
		margin-bottom: 24rpx;
	}
	.ul .li image {
		width: 68upx;
		height: 68upx;
		margin-bottom: 20rpx;
	}

	.alarm {
		width: 100%;
		justify-content: center;
		display: flex;
		align-items: center;
		flex-flow: column;
		margin-top: 38upx;
	}

	.alarmbox {
		width: 710upx;
		display: flex;
		align-items: center;
		margin-bottom: 24upx;
	}

	.alarmbox image {
		width: 8upx;
		height: 36upx;
		margin-right: 12upx;
	}

	.alarmcon {
		width: 710upx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		align-items: center;
	}

	.alarmconbox {
		width: 344upx;
		height: 140upx;
		background-color: white;
		border-radius: 20upx;
		display: flex;
		justify-content: space-between;
		padding: 22upx 24upx;
		box-sizing: border-box;
		margin-bottom: 20upx;
	}

	.alarmconbox image {
		width: 74upx;
		height: 74upx;
	}

	.alarmconboxleft {
		font-size: 40upx;
		color: #010914;
	}

	.alarmconboxleft text {
		font-size: 24upx;
		color: #8A8EA6;
		display: block;
	}

	.penfive {
		width: 342upx;
		height: 130upx;
		display: flex;
		justify-content: space-between;
		font-size: 28upx;
		color: white;
		padding: 44upx 20upx;
		box-sizing: border-box;
	}
</style>
