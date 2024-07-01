<template>
	<view class="con">
		<view class="ul">
			<!-- <view class="li">
				<text>所属组织</text>
				<text class="licon">{{datalist}}</text>
			</view> -->
			<view class="li">
				<text>车牌号</text>
				<text class="licon">{{datalist.vehicleNo || '-'}}</text>
			</view>
			<view class="li">
				<text>轮位</text>
				<text class="licon">{{datalist.installPositionDesc || '-'}}</text>
			</view>
		</view>
		<text class="ultitle">基本信息</text>
		<view class="ul">
			<view class="li">
				<text>胎号</text>
				<text class="licon">{{datalist.tireNo}}</text>
			</view>
			<view class="li">
				<text>自编号</text>
				<text class="licon">{{datalist.insideTireNo || ''}}</text>
			</view>
			<view class="li">
				<text>品牌</text>
				<text class="licon">{{datalist.tireBrandName|| ''}}</text>
			</view>
			<view class="li">
				<text>分类</text>
				<text class="licon">{{ flttrefenl(datalist.category) }}</text>
			</view>
			<view class="li">
				<text>传感器ID</text>
				<view style="display: flex;">
					{{datalist.senderId || ''}}
					<view class="licon" style="display: flex;align-items: center;" v-if="datalist.senderId" @click="jiebangs"><view style="color:#1862F5;margin-left: 12upx;">解绑</view></view>
					<view class="licon" style="color:#1862F5" v-if="!datalist.senderId" @click="bangdings">绑定</view>
				</view>
			</view>
			<view class="li">
				<text>规格</text>
				<text class="licon">{{datalist.specificationsName}}</text>
			</view>
			<view class="li">
				<text>花纹型号</text>
				<text class="licon" style="text-align: right;">{{datalist.pattern}}</text>
			</view>
			<view class="li">
				<text>新胎花纹深度</text>
				<text class="licon">{{datalist.depth||0}}mm</text>
			</view>
			<view class="li">
				<text>初测花纹深度</text>
				<text class="licon">{{datalist.firstDepth||0}}mm</text>
			</view>
			<view class="li">
				<text>实测花纹深度</text>
				<text class="licon">{{datalist.measuredDepth||0}}mm</text>
			</view>
		</view>
		<text class="ultitle">轮胎里程及状态</text>
		<view class="ul">
			<view class="li" >
				<text>最新公里表读数</text>
				<text class="licon">{{ datalist.lastInstallMileage || '0'}} km</text>
			</view>
			<view class="li" >
				<text>累计里程</text>
				<text class="licon">{{ datalist.totalMileage || '0'}}km</text>
			</view>
			<view class="li" >
				<text>单价</text>
				<text class="licon"> ￥{{ datalist.price || '0'}}</text>
			</view>
			<view class="li" >
				<text>累计时长</text>
				<text class="licon">{{ datalist.totalDuration || '0'}} h</text>
			</view>
			<view class="li" >
				<text>状态</text>
				<text class="licon">{{ flttre(datalist.stockStatus)}}</text>
			</view>
		</view>
		<text class="ultitle">其他信息</text>
		<view class="ul">
			<view class="li">
				<text>RFID标签号</text>
				<view style="display: flex;">
					{{datalist.rfidCode || ''}}
					<view class="licon" style="display: flex;align-items: center;" v-if="datalist.rfidCode" @click="jiebangsrfid"><view style="color:#1862F5;margin-left: 12upx;">解绑</view></view>
					<view class="licon" style="color:#1862F5" v-if="!datalist.rfidCode" @click="bangdingsrfid">绑定</view>
				</view>
			</view>
			<view class="li">
				<text>供应商</text>
				<text class="licon">{{datalist.manufacturer||''}}</text>
			</view>
			<view class="li">
				<text>所属仓库</text>
				<text class="licon">{{datalist.warehouseName||''}}</text>
			</view>
			<view class="li">
				<text>安装时间</text>
				<text class="licon">{{datalist.installTime||''}}</text>
			</view>
			<view class="li">
				<text>入库时间</text>
				<text class="licon">{{datalist.createTime||''}}</text>
			</view>
			<view class="li">
				<text>DOT</text>
				<text class="licon">{{datalist.dot||''}}</text>
			</view>
			<view class="li">
				<text>质保期</text>
				<text class="licon">{{datalist.expireDate||''}}</text>
			</view>
			<view class="li">
				<text>速度级别</text>
				<text class="licon">{{datalist.speedLevel||''}}</text>
			</view>
			<view class="li">
				<text>载重指数</text>
				<text class="licon">{{datalist.loadIndex||''}}</text>
			</view>
		</view>
		<view class="bte">
			<button @click="gotirelive" type="primary" style="width: 690upx;height: 88upx;margin-top: 32upx;background: #3c9cff;">查看轮胎生命周期</button>
		</view>
		
		<!-- 传感器 -->
		<u-popup :show="show"  mode="center" :closeOnClickOverlay="false" @close="show=false" :closeable="true" round="10px">
			<view class="bindbox" style="display: flex;flex-direction: column;">
				<view class="bindboxtitle">绑定传感器</view>
				<view>
					<text>胎号</text>
					<u--input border="none" v-model="sendform.tireNo" disabled></u--input>
				</view>
				<view style="position: relative;">
					<text>传感器</text>
					<view style="background-color: white;">
						<u--input border="none" placeholder="请输入传感器ID" v-model="sendform.senderId"></u--input>
						<image @click="gocamner" src="https://tpms.5i84.cn/img/camreserch.png" style="width: 42upx;height: 40upx;position: absolute;right: 40upx;top:60%;z-index: 99;"></image>
					</view>
				</view>
				<view>
					<text>绑定方式</text>
					<uni-data-select
					 placeholder="请选择"
					  v-model="sendform.senderType"
					  :localdata="tireclass"
					 ></uni-data-select>
				</view>
				<view style="margin-top: 20rpx;">
					<u-button @click="checkbind" type="primary" text="绑定"></u-button>
				</view>
			</view>
		</u-popup>
		<!-- 解绑传感器 -->
		<u-popup :show="showjieabgn"  mode="center" :closeOnClickOverlay="false" @close="showjieabgn=false" :closeable="true" round="10px">
			<view class="bindbox" style="display: flex;flex-direction: column;">
				<view class="bindboxtitle">解绑传感器</view>
				<view>
					<text>胎号</text>
					<u--input border="none" v-model="sendform.tireNo" disabled></u--input>
				</view>
				<view>
					<text>传感器</text>
					<u--input border="none" v-model="sendform.senderId" disabled></u--input>
				</view>
				<view >
					<text>绑定方式</text>
					<uni-data-select
					disabled
					 placeholder="请选择"
					  v-model="sendform.senderType"
					  :localdata="tireclass"
					 ></uni-data-select>
				</view>
				<view style="margin-top: 20rpx;">
					<u-button @click="checkjie" type="primary" text="解绑"></u-button>
				</view>
			</view>
		</u-popup>
		<image @click="gochange" class="gochange" src="@/static/images/gochange.png" mode=""></image>
		
		<!-- rfid -->
		<u-popup :show="showjieabgnrfid"  mode="center" :closeOnClickOverlay="false" @close="showjieabgnrfid=false" :closeable="true" round="10px">
			<view class="bindbox" style="display: flex;flex-direction: column;">
				<view class="bindboxtitle">{{rfidtitle}}</view>
				<view>
					<text>胎号</text>
					<u--input border="none" v-model="sendrfidform.tireNo" disabled></u--input>
				</view>
				<view >
					<text>RFID编码</text>
					<view style="background-color: white;">
						<u--input border="none" v-model="sendrfidform.rfidCode" :disabled='datalist.rfidCode'></u--input>
					</view>
				</view>
				<view style="margin-top: 20rpx;">
					<u-button v-if="datalist.rfidCode" @click="checkjierfid" type="primary" text="解绑"></u-button>
					<u-button v-if="!datalist.rfidCode" @click="cherfid" type="primary" text="绑定"></u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import { tirelistinfo, bangding, jiebang,jiebangrfid,bangdingrfid } from '@/api/carlive'
	import { getDicts } from "@/api/system/dict/data";
	export default {
		data(){
			return{
				datalist:{},
				show:false,//传感器绑定
				showjieabgn:false,
				tireclass:[],//绑定方式
				sendform:{},
				ztcalss:[],
				fenlei:[],
				sendrfidform:{},
				showjieabgnrfid:false,
				rfidtitle:''
			}
		},
	    onLoad: function (option) {
			this.sendform.tireId=option.id
			this.sendrfidform.tireId=option.id
			this.getlist()
	    },
		mounted() {
			this.tireclass=[]
			getDicts("lifecycle_tire_sendertype").then(response => {
					response.data.map(item=>{
					this.tireclass.push({text:item.dictLabel,value:item.dictValue})
			 	})
			})
			getDicts("lifecycle_tire_status").then(response => {
				this.ztcalss=response.data
			})
			getDicts("lifecycle_tire_category").then(response => {
				this.fenlei=response.data
			})
		},
		methods:{
			getlist(){
				tirelistinfo(this.sendform.tireId).then(res=>{
					this.datalist=res.data
				})
			},
			// 绑定传感器
			bangdings(){
				this.sendform.tireNo=this.datalist.tireNo
				this.show=true
			},
			bangdingsrfid(){
				this.rfidtitle='绑定RFID标签'
				this.sendrfidform.tireNo=this.datalist.tireNo
				this.showjieabgnrfid=true
			},
			// 传感器扫码
			gocamner(){
				uni.scanCode({
					success: (res) => {
						this.sendform.senderId=res.result
						 this.$forceUpdate()
					},
					fail: (err) => {
						console.log(err)
					},
					complete: () => {
						console.log('扫码结束')
					}
				})
			},
			// 确定绑定
			checkbind(){
				if(this.sendform.senderId == null ||this.sendform.senderId == ""){
					uni.$u.toast("请输入传感器ID")
				}else if(this.sendform.senderType == null ||this.sendform.senderType == ""){
					uni.$u.toast("请选择绑定方式")
				}else{
					bangding(this.sendform).then(res=>{
						if(res.code == 200){
							uni.$u.toast("绑定成功")
							this.show=false
							this.sendform.senderId=''
							this.sendform.senderType=''
							this.getlist()
						}
					}).catch(error => {
						uni.$u.toast(error)
					})
				}
			},
			cherfid(){
				if(this.sendrfidform.rfidCode == null ||this.sendrfidform.rfidCode == ""){
					uni.$u.toast("请输入RFID")
				}else{
					bangdingrfid({
						code:this.sendrfidform.rfidCode,
						tireid:this.sendrfidform.tireId
					}).then(res=>{
						if(res.code == 200){
							uni.$u.toast("绑定成功")
							this.showjieabgnrfid=false
							this.sendrfidform.rfidCode=''
							this.getlist()
						}
					}).catch(error => {
						uni.$u.toast(error)
					})
				}
			},
			// 解绑传感器
			jiebangs(){
				this.sendform.tireNo=this.datalist.tireNo
				this.sendform.senderId=this.datalist.senderId
				this.sendform.senderType=this.datalist.senderType
				this.showjieabgn=true
			},
			jiebangsrfid(){
				this.rfidtitle='解绑RFID标签'
				this.sendrfidform.tireNo=this.datalist.tireNo
				this.sendrfidform.rfidCode=this.datalist.rfidCode
				this.showjieabgnrfid=true
			},
			// 确定解绑
			checkjie(){
				jiebang(this.sendform.tireId).then(res=>{
					if(res.code == 200){
							uni.$u.toast("解绑成功")
							this.showjieabgn=false
							this.sendform.senderId=''
							this.sendform.senderType=''
							this.getlist()
					}else{
						uni.$u.toast(res.message)
					}
				}).catch(error => {
						uni.$u.toast(error)
					})
			},
			checkjierfid(){
				jiebangrfid(this.sendrfidform.tireId).then(res=>{
					if(res.code == 200){
							uni.$u.toast("解绑成功")
							this.showjieabgnrfid=false
							this.sendrfidform.rfidCode=''
							this.getlist()
					}else{
						uni.$u.toast(res.message)
					}
				}).catch(error => {
						uni.$u.toast(error)
					})
			},
			// 生命周期
			gotirelive(){
				uni.navigateTo({
					url:'/pageA/carlive/tirelive/tirelive?id=' + this.sendform.tireId
				})
			},
			// 修改页面
			gochange(){
				uni.navigateTo({
					url:'/pageA/carlive/tirelist/tirelist?id=' + this.sendform.tireId
				})
			},
			flttre(e){
				for(let i=0;i<this.ztcalss.length;i++){
					if(this.ztcalss[i].dictValue == e){
						return this.ztcalss[i].dictLabel
					}
				}
			},
			flttrefenl(e){
				for(let i=0;i<this.fenlei.length;i++){
					if(this.fenlei[i].dictValue == e){
						return this.fenlei[i].dictLabel
					}
				}
			}
		}
	}

</script>

<style scoped>
	.con{
		padding-bottom: 180upx;
	}
	.ul{
		width: 100%;
		background-color: white;
		padding: 36upx 30upx;
		margin-top: 24upx;
		box-sizing: border-box;
		margin-bottom: 14upx;
	}
	.ul .li{
		border-bottom: 2upx solid #F3F4F6;
		width: 100%;
		height: 120upx;
		line-height: 120upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.ul .li text:nth-child(1){
		display: block;
		width:230upx;
	}
	.ul .li .licon{
		color: #5C5F66;
		font-size: 28rpx;
		line-height: 36upx;
	}
	.ultitle{
		font-size: 28upx;
		color: #8A8EA6;
		padding-left: 20upx;
	}
	.bte{
		width: 100%;
		height:146upx;
		background-color:#F5F7FB;
		position: fixed;
		bottom: 0;
	}
	.bindbox{
		padding: 40upx 50upx;
		box-sizing: border-box;
		width: 640upx;
		border-radius: 20upx;
		background:linear-gradient(180deg, rgba(24,98,245,0.2)8%, #F5F7FB  88%);
	}
	.bindboxtitle{
		font-size: 36upx;
		text-align: center;
	}
	.bindbox text{
		color: #5C5F66;
		font-size: 28upx;
		display: block;
		margin-bottom: 12upx;
		margin-top: 18upx;
	}
	/deep/.uni-select{
		border: none !important;
		border-bottom:0px;
		background-color: white;
		/* line-height: 50upx;
		height: 50upx; */
	}
	.u-input{
		background-color: white;
		line-height: 100upx;
		height: 100upx;
		text-indent: 22upx;
	}
	.gochange{
			width: 112rpx;
			height: 112rpx;
			position: fixed;
			bottom:240rpx;
			right: 0;
		}
		/deep/.bindbox .u-input__content__field-wrapper__field{
			padding:8rpx
		}
	</style>
