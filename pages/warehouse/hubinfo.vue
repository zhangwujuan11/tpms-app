<template>
	<view class="con">
		<view class="ul">
			<view class="li">
				<text>轮毂编号</text>
				<text class="licon">{{datalist.hubNo}}</text>
			</view>
			<view class="li">
				<text>品牌</text>
				<text class="licon">{{konfun(datalist.brand)}}</text>
			</view>
			<view class="li">
				<text>孔距</text>
				<text class="licon">{{kongjufun(datalist.boltPattern)}}</text>
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
				<text>所属仓库</text>
				<text class="licon">{{datalist.warehouseName}}</text>
			</view>
			<view class="li">
				<text>型号</text>
				<text class="licon">{{xinfun(datalist.model)}}</text>
			</view>
			<view class="li">
				<text>螺纹规格</text>
				<text class="licon">{{luofun(datalist.threadSpec)}}</text>
			</view>
			<view class="li">
				<text>价格</text>
				<text class="licon">{{datalist.price}}元</text>
			</view>
			<view class="li">
				<text>尺寸</text>
				<text class="licon">{{cun(datalist.size) }}</text>
			</view>
			<view class="li">
				<text>材质</text>
				<text class="licon">{{caifun(datalist.material) }}</text>
			</view>
			<view class="li">
				<text>备注</text>
				<text class="licon">{{datalist.remark || ''}}</text>
			</view>
		</view>
		<view class="bte">
			<button @click="gotirelive" type="primary" style="width: 690upx;height: 88upx;margin-top: 32upx;background: #3c9cff;">查看轮毂生命周期</button>
		</view>
		
		<!-- 传感器 -->
		<u-popup :show="show"  mode="center" :closeOnClickOverlay="false" @close="show=false" :closeable="true" round="10px">
			<view class="bindbox">
				<view class="bindboxtitle">绑定传感器</view>
				<view>
					<text>轮毂编号</text>
					<u--input border="none" v-model="sendform.hubNo" disabled></u--input>
				</view>
				<view style="position: relative;margin-bottom: 20upx;">
					<text>传感器</text>
					<view style="background-color: white;">
						<u--input border="none" placeholder="请输入传感器ID" v-model="sendform.senderId"></u--input>
						<image @click="gocamner" src="https://tpms.5i84.cn/img/camreserch.png" style="width: 42upx;z-index:99;height: 40upx;position: absolute;right: 40upx;top:54%;"></image>
					</view>
					
				</view>
				<u-button @click="checkbind" style="margin-top: 20upx;" type="primary" text="绑定"></u-button>
			</view>
		</u-popup>
		<!-- 解绑传感器 -->
		<u-popup :show="showjieabgn"  mode="center" :closeOnClickOverlay="false" @close="showjieabgn=false" :closeable="true" round="10px">
			<view class="bindbox">
				<view class="bindboxtitle">解绑传感器</view>
				<view>
					<text>轮毂编号</text>
					<u--input border="none" v-model="sendform.hubNo" disabled></u--input>
				</view>
				<view style="margin-bottom: 20upx;">
					<text>传感器</text>
					<u--input border="none" v-model="sendform.senderId" disabled></u--input>
				</view>
				<u-button @click="checkjie" style="margin-top: 20upx;" type="primary" text="解绑"></u-button>
			</view>
		</u-popup>
		<image @click="gochange" class="gochange" src="@/static/images/gochange.png" mode=""></image>
	</view>
</template>

<script>
	import { hubinfo, soucollist, sendhubid } from '@/api/carlive'
	import { getDicts } from "@/api/system/dict/data";
	export default {
		data(){
			return{
				datalist:{},
				kongju:[],
				kongjus:[],
				guige:[],
				caizhi:[],
				xinhao:[],
				chicun:[],
				show:false,//传感器绑定
				showjieabgn:false,
				// tireclass:[],//绑定方式
				sendform:{},
			}
		},
	    onLoad: function (option) {
			this.sendform.hubId=option.id
			this.getlist()
	    },
		mounted() {
			soucollist({paramType:"tire_model_param"}).then(res=>{
				this.xinhao=res.data
			})
			soucollist({paramType:"tire_pitch_row_param"}).then(res=>{
				this.kongjus=res.data
			})
			soucollist({paramType:"tire_brand_param"}).then(res=>{
				this.kongju=res.data
			})
			soucollist({paramType:"tire_thread_specification_param"}).then(res=>{
				this.guige=res.data
			})
			soucollist({paramType:"hub_material_param"}).then(res=>{
				this.caizhi=res.data
			})
			soucollist({paramType:"tire_size_param"}).then(res=>{
				this.chicun=res.data
			})
			// getDicts("lifecycle_tire_sendertype").then(response => {
			// 		response.data.map(item=>{
			// 		this.tireclass.push({text:item.dictLabel,value:item.dictValue})
			//  	})
			// })
		},
		methods:{
			getlist(){
				hubinfo(this.sendform.hubId).then(res=>{
					this.datalist=res.data
				})
			},
			kongjufun(row){
				var typelable = '';
				for (var i = 0; i < this.kongjus.length; i++) {
					if (row === this.kongjus[i].paramCode) {
						typelable =  this.kongjus[i].paramName;
					}
				}
				return typelable;
			},
			xinfun(row){
				var typelable = '';
				for (var i = 0; i < this.xinhao.length; i++) {
					if (row === this.xinhao[i].paramCode) {
						typelable =  this.xinhao[i].paramName;
					}
				}
				return typelable;
			},
			konfun(row){
				 var typelable = '';
				for (var i = 0; i < this.kongju.length; i++) {
					if (row === this.kongju[i].paramCode) {
						typelable =  this.kongju[i].paramName;
					}
				}
				return typelable;
			},
			luofun(row){
				 var typelable = '';
					for (var i = 0; i < this.guige.length; i++) {
						if (row === this.guige[i].paramCode) {
							typelable =  this.guige[i].paramName;
						}
					}
					return typelable;
			},
			caifun(row){
				 var typelable = '';
					for (var i = 0; i < this.caizhi.length; i++) {
						if (row === this.caizhi[i].paramCode) {
							typelable =  this.caizhi[i].paramName;
						}
					}
					return typelable;
			},
			cun(row){
				 var typelable = '';
					for (var i = 0; i < this.chicun.length; i++) {
						if (row === this.chicun[i].paramCode) {
							typelable =  this.chicun[i].paramName;
						}
					}
					return typelable;
			},
			// 绑定传感器
			bangdings(){
				this.sendform.hubNo=this.datalist.hubNo
				this.show=true
			},
			// 传感器扫码
			gocamner(){
				uni.scanCode({
					success: (res) => {
						this.sendform.senderId=res.result
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
			// 确定绑定
			checkbind(){
				if(this.sendform.senderId == null ||this.sendform.senderId == ""){
					uni.$u.toast("请输入传感器ID")
				}else{
					this.sendform.bindStatus=0
					this.sendform.id=this.sendform.hubId
					sendhubid(this.sendform).then(res=>{
						if(res.code == 200){
							uni.$u.toast("绑定成功")
							this.show=false
							this.sendform.senderId=''
							this.getlist()
						}
					})
				}
			},
			// 解绑传感器
			jiebangs(){
				this.sendform.hubNo=this.datalist.hubNo
				this.sendform.senderId=this.datalist.senderId
				this.showjieabgn=true
			},
			// 确定解绑
			checkjie(){
				this.sendform.bindStatus=1
				this.sendform.id=this.sendform.hubId
				sendhubid(this.sendform).then(res=>{
					if(res.code == 200){
							uni.$u.toast("解绑成功")
							this.showjieabgn=false
							this.sendform.senderId=''
							this.getlist()
					}else{
						uni.$u.toast(res.message)
					}
				})
			},
			// 生命周期
			gotirelive(){
				uni.navigateTo({
					url:'/pages/warehouse/hublive?id=' + this.sendform.hubId
				})
			},
			// 修改页面
			gochange(){
				uni.navigateTo({
					url:'/pages/warehouse/storage?id=' + this.sendform.hubId
				})
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
		width:180upx;
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
		line-height: 100upx;
		height: 100upx;
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
