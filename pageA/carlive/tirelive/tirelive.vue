<template>
	<view class="ul">
		<view class="li" v-for="(item,index) in tabledatacar" :key="index">
			<view class="timeline">
				<image src="https://tpms.5i84.cn/img/time.png" style="width: 42upx;height: 40upx;"></image>
				{{item.updateTime}}
			</view>
			<view class="liconbox">
				<view class="licon">
					<text>{{item.type}}</text>
					<blockquote>胎号：{{item.tireNo}}</blockquote>
					<blockquote>车牌号：{{item.vehicleNo || ''}}</blockquote>
					<blockquote>传感器ID/RFID：{{item.rfidCode || ''}}</blockquote>
					<blockquote>操作人：{{item.updateBy}}</blockquote>
				</view>
			</view>
		</view>
		<!-- <view class="li">
			<view class="timeline">
				<image src="https://tpms.5i84.cn/img/time.png" style="width: 42upx;height: 40upx;"></image>
				2023-04-25 14:32:07
			</view>
			<view class="liconbox">
				<view class="licon">
					<text>轮胎入库</text>
					<blockquote>胎号：NA/465465465754</blockquote>
					<blockquote>车牌号：闽A14544K</blockquote>
					<blockquote>传感器：6666</blockquote>
					<blockquote>操作人：admin</blockquote>
				</view>
			</view>
		</view>
		<view class="li">
			<view class="timeline">
				<image src="https://tpms.5i84.cn/img/time.png" style="width: 42upx;height: 40upx;"></image>
				2023-04-25 14:32:07
			</view>
			<view class="liconbox">
				<view class="licon">
					<text>轮胎入库</text>
					<blockquote>胎号：NA/465465465754</blockquote>
					<blockquote>车牌号：闽A14544K</blockquote>
					<blockquote>传感器：6666</blockquote>
					<blockquote>操作人：admin</blockquote>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	import { gethistorylist } from '@/api/carlive'
	
	export default {
		data() {
			return {
				tabledatacar:[]
			}
		},
		onLoad: function (option) {
			gethistorylist({
				tid: option.id,
				pageNum:1,
				pageSize:100000
			}).then(res => {
				this.tabledatacar = res.data.items
			})
		},
		methods: {
		}
	}
</script>

<style>
	.ul{
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.ul .timeline{
		display: flex;
		align-items: center;
		font-size: 24upx;
	}
	.ul .timeline image{
		margin-right: 10upx;
	}
	.li{
		width: 666upx;
		margin-top: 36upx;
	}
	.li .liconbox{
		margin:20upx 0 0 20upx;
		border-left: 1px solid #E6E6E6 ;
		padding: 24upx 32upx;
		box-sizing: border-box;
	}
	.li .liconbox .licon{
		display: flex;
		flex-direction: column;
		background-color: white;
		border-radius: 20upx;
		padding: 30upx;
		box-sizing: border-box;
		font-size: 28upx;
		color: #5C5F66;
		line-height: 50upx;
	}
	.li .liconbox .licon text{
		color: black;
		font-size: 32upx;
		line-height: 60upx;
	}
</style>
