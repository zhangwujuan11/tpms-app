<template>
	<view class="con">
		<view class="ul">
			<view class="li">
				<text>车牌号</text>
				<text class="licon">{{carinfoshow.vehicleNo}}</text>
			</view>
			<view class="li">
				<text>轮位</text>
				<text class="licon">{{carinfoshow.position}}</text>
			</view>
		</view>
		<text class="ultitle">基本信息</text>
		<view class="formbox">
			<u-form :model="form" ref="uForm" label-width="280upx"
				:label-style="{'font-size':'32upx','color':'#010914'}">
				<view class="widbox">
					<u-form-item label="轮毂编号" prop="hubNo" required borderBottom>
						<view class="needinline">
							<superwei-combox style="width: 80%;" :candidates="chetai" :isJSON="true" keyName="name"   v-model="form.hubNo"  @select="select3"></superwei-combox>
							<image @click="can" style="width: 48upx;height: 48upx;"
								src="https://tpms.5i84.cn/img/images/carlive/crams.png" mode=""></image>
						</view>
					</u-form-item>
					<u-form-item label="传感器" prop="senderId" borderBottom>
						<view slot="right">
							<text v-if="form.senderId" class="fontclick" @click="jiebangs"><text style="color: black;">{{form.senderId || ''}}</text>解绑</text>
							<text v-if="form.senderId == null" class="fontclick" @click="bangdings">绑定</text>
						</view>
					</u-form-item>
					<u-form-item label="品牌" prop="brand" borderBottom>
						<text slot="right">{{ konfun(form.brand)}}</text>
					</u-form-item>
					<u-form-item label="型号" prop="model" borderBottom>
						<text slot="right">{{xinfun(form.model) }}</text>
					</u-form-item>
					<u-form-item label="孔距" prop="boltPattern" borderBottom>
						<text slot="right">{{kongjufun(form.boltPattern) }}</text>
					</u-form-item>
					<u-form-item label="尺寸" prop="size" borderBottom>
						<text slot="right">{{cun(form.size)}}</text>
					</u-form-item>
					<u-form-item label="仓库名称" prop="pattern" borderBottom>
						<text slot="right">{{form.warehouseName}}</text>
					</u-form-item>
					<u-form-item label="螺纹规格" prop="threadSpec" borderBottom>
						<text slot="right">{{ luofun(form.threadSpec) }}</text>
					</u-form-item>
					<u-form-item label="安装费用" prop="installFee"  borderBottom>
						<u--input placeholder="请输入安装费用" border="false" inputAlign="right" v-model="form.installFee"></u--input>
					</u-form-item>
				</view>
			</u-form>
		</view>
		<view style="background-color: white;margin-top: 20rpx;">
		</view>
		<view class="bte">
			<button style="margin-top: 32upx;width: 48%;" @click="quxiao">取消</button>
			<button @click="gotirelive" type="primary" style="margin-top: 32upx;width: 48%;background: #3c9cff;">确定安装</button>
		</view>

		<!-- 传感器 -->
		<u-popup :show="show" mode="center" :closeOnClickOverlay="false" @close="show=false" :closeable="true"
			round="10px">
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
						<image @click="gocamner" src="https://tpms.5i84.cn/img/camreserch.png"
							style="width: 42upx;height: 40upx;position: absolute;right: 40upx;top:51%;"></image>
					</view>
					
				</view>
				<u-button @click="checkbind" style="margin-top: 20upx;" type="primary" text="绑定"></u-button>
			</view>
		</u-popup>
		<!-- 解绑传感器 -->
		<u-popup :show="showjieabgn" mode="center" :closeOnClickOverlay="false" @close="showjieabgn=false"
			:closeable="true" round="10px">
			<view class="bindbox">
				<view class="bindboxtitle">解绑传感器</view>
				<view>
					<text>轮毂编号</text>
					<u--input border="none" v-model="sendform.hubNo" disabled></u--input>
				</view>
				<view style="position: relative;margin-bottom: 20upx;">
					<text>传感器</text>
					<u--input border="none" v-model="sendform.senderId" disabled></u--input>
				</view>
				<u-button @click="checkjie" style="margin-top: 20upx;" type="primary" text="解绑"></u-button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import { tirelistinfo, sendhubid, hublist, sendidType, huninstall, soucollist } from '@/api/carlive'
	import { cardetail } from '@/api/tirePressure'
	import { getDicts } from "@/api/system/dict/data";
	import config from '@/config'
	import superweiCombox from '@/components/superwei-combox'
	export default {
		components: {
		      superweiCombox
		    },
		data() {
			return {
				vehicleId:'',
				show: false, //传感器绑定
				showjieabgn: false,
				sendform: {},
				carinfoshow: {
					position: ''
				},
				chetai:[],

				form: {
					name: '',
					feedid: '',
					senderId:''
				},
				expireDate: { //保质期控件
					show: false,
					mode: 'single'
				},
				show: false,
				columns: [],
				houselist: [], //所属仓库
				kongju:[],
				kongjus:[],
				guige:[],
				caizhi:[],
				xinhao:[],
				chicun:[],
				datashow: false,



				ctx: '', //绘图图像
				points: [], //路径点集合
				tempPoint: [], //用来存放当前画纸上的轨迹点
				paths: [], //存储所有绘制路径,
				screenWidth: '', //屏幕宽度
				screenHeight: '', //屏幕高度
				returnid:""
			}
		},
		onLoad(option) {
			this.returnid=option.returnid
			this.vehicleId=option.id
			this.installPosition = option.positioncode
			this.installPositionDesc = option.position
			cardetail(option.id).then(info => {
				this.carinfoshow = info.data
				this.carinfoshow.position = option.position
			})
			hublist({isUseVehicle: 0,install: 1,  pageNum:1,pageSize:100000}).then(res=>{
				if(res.code == 200){
					res.data.items.map(item=>{
						this.chetai.push({name:item.hubNo,value:item})
					})
				}
			})
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
			// 创建canvas
			this.createCanvas();
			// 获取设备宽高
			uni.getSystemInfo({
				success: (e) => {
					this.screenWidth = e.screenWidth * 0.65;
					this.screenHeight = e.screenHeight * 0.97;
				},
			})
		},
		methods: {
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
			// 选中车胎，获取车胎信息
			select3(e) {
				this.form=e.value
				console.log(this.form)
			},
			// 扫码
			async can() {
				uni.scanCode({
					success: (res) => {
						this.queryform.vehicleId=res.result
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
			
			
			checkimg () {
			  var _self = this;
			  uni.chooseImage({
			    count: 1,
			    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			    sourceType: ['album', 'camera'], //从相册选择
			    success: res => {
			      // wx.getFileSystemManager().readFile({
			      // 	filePath: res.tempFilePaths[0], //选择图片返回的相对路径
			      // 	encoding: 'base64', //编码格式
			      // 	success: res => { //成功的回调
			      // 	}
			      // })
			      uni.uploadFile({
			        url: config.baseUrl + 'ry/common/upload',
			        filePath: res.tempFilePaths[0],
			        name: 'file',
			        header: {
			          Authorization: "Bearer " + uni.getStorageSync('userInfo').token,
			        },
			        success: (uploadFileRes) => {
			          let imgValue = JSON.parse(uploadFileRes.data)
			          this.$set(this.form, 'brandImg', imgValue.url)
			        }
			      });
			    },
			    error: function (e) {
			      console.log('error', e);
			    }
			  });
			},
			//清空画布
			clear() {
				this.ctx.clearRect(0, 0, this.screenWidth, this.screenHeight);
				this.ctx.draw();
				this.tempPoint = [];
			},
			//完成绘画并保存到本地
			finish() {
				if (this.tempPoint.length === 0) {
					this.$refs.uToast.show({
						type: 'default',
						title: '请签字确认！',
					});
				} else {
					uni.canvasToTempFilePath({
							canvasId: 'mycanvas',
							quality: 1,
							success: (res) => {
								// 将首次绘制完成的内容进行旋转处理
								this.rotat(res.tempFilePath);
							},
							complete: (com) => {},
						},
						this,
					);
				}
			},
			rotat(e) {
				console.log(e)
				const that = this;
				let rotatCtx = uni.createCanvasContext('rotatCanvas', this); //创建绘图对象
				// 重新定位中心点
				rotatCtx.translate(
					0,
					(this.screenWidth * this.screenWidth) / this.screenHeight,
				);
				// 将画布逆时针旋转90度
				rotatCtx.rotate((270 * Math.PI) / 180);
				// 将签字图片绘制进入Canvas
				rotatCtx.drawImage(
					e,
					0,
					0,
					(this.screenWidth * this.screenWidth) / this.screenHeight,
					this.screenWidth,
				);
				// 保存后旋转后的结果
				rotatCtx.draw(true);
				// 延迟500ms进行文件上传操作
				setTimeout(() => {
					// 生成图片并回调
					uni.canvasToTempFilePath({
							canvasId: 'rotatCanvas',
							quality: 1,
							success: (val) => {
								// 这里做保存后的操作
								console.log(val.tempFilePath);
							},
							fail: (err) => {
								console.log(err);
							},
							complete: (com) => {},
						},
						this,
					);
				}, 500);
			},
			draw() {
				let point1 = this.points[0];
				let point2 = this.points[1];
				this.points.shift();
				this.ctx.moveTo(point1.X, point1.Y);
				this.ctx.lineTo(point2.X, point2.Y);
				this.ctx.stroke();
				this.ctx.draw(true);
			},
			// 回退一步
			revocation() {
				if (this.paths.length > 0) {
					// 每次回退之前清空一次
					this.ctx.clearRect(0, 0, this.screenWidth, this.screenHeight);
					this.ctx.draw();
					let w = Math.floor(this.screenWidth);
					let h = Math.floor(this.screenHeight);
					// 回退的操作其实就是将之前存在栈中的绘画路径删除最后一项
					const imgData = this.paths.pop();
					//删除之后执行uni.canvasPutImageData重新绘制canvas
					uni.canvasPutImageData({
							canvasId: 'mycanvas',
							x: 0,
							y: 0,
							width: this.screenWidth,
							height: this.screenHeight,
							data: imgData,
							success: (res) => {
								// 每后退一步，将存起来的点删除最后一个
								this.tempPoint.pop();
							},
						},
						// *-*-*-*-*-*-此处必须加this-*-*-*-*-*-*
						this,
					);
				}
			},
			//创建并显示画布
			createCanvas() {
				this.ctx = uni.createCanvasContext('mycanvas', this); //创建绘图对象
				//设置画笔样式
				this.ctx.lineWidth = 2;
				this.ctx.lineCap = 'round';
				this.ctx.lineJoin = 'round';
			},
			//触摸开始，获取到起点
			touchstart(e) {
				let startX = e.changedTouches[0].x;
				let startY = e.changedTouches[0].y;
				let startPoint = {
					X: startX,
					Y: startY,
				};
				this.points.push(startPoint);
				this.tempPoint.push(startPoint); //每次开始触摸时记录一次，用作判断是否有签名
				// 每次触摸开始，开启新的路径
				this.ctx.beginPath();
				// 每次触摸开始，调用uniapp内置的uni.canvasGetImageData将当前画布进行保存
				uni.canvasGetImageData({
						canvasId: 'mycanvas',
						x: 0,
						y: 0,
						width: this.screenWidth,
						height: this.screenHeight,
						success: (res) => {
							// console.log(res.data instanceof Uint8ClampedArray); // true
							// 将返回的data存在栈中，后续用来清除
							this.paths.push(res.data);
						},
					},
					// *-*-*-*-*-*-此处必须加this-*-*-*-*-*-*
					this,
				);
				event.preventDefault()
			},
			//触摸移动，获取到路径点
			touchmove(e) {
				let moveX = e.changedTouches[0].x;
				let moveY = e.changedTouches[0].y;
				let movePoint = {
					X: moveX,
					Y: moveY,
				};
				this.points.push(movePoint); //存点
				let len = this.points.length;
				if (len >= 2) {
					this.draw(); //绘制路径
				}
			},
			// 触摸结束，将未绘制的点清空防止对后续路径产生干扰
			touchend() {
				this.points = [];
			},

			// 绑定传感器
			
			// 传感器扫码
			gocamner() {
				uni.scanCode({
					success: (res) => {
						this.sendform.senderId = res.result
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
			bangdings() {
				this.sendform.hubNo = this.form.hubNo
				this.sendform.id=this.form.id
				this.sendform.senderId=''
				this.sendform.bindStatus=0
				this.show = true
			},
			// 确定绑定
			checkbind(){
				if(this.sendform.senderId == null ||this.sendform.senderId == ""){
					uni.$u.toast("请输入传感器ID")
				}else{
					sendhubid(this.sendform).then(res=>{
						if(res.code == 200){
							uni.$u.toast("绑定成功")
							this.form.senderId=this.sendform.senderId
							this.show=false
							this.sendform.senderId=null
							
						}
					}).catch(error => {
						uni.$u.toast(error)
					})
				}
			},
			// 解绑传感器
			jiebangs(){
				this.sendform.hubNo=this.form.hubNo
				this.sendform.senderId=this.form.senderId
				this.showjieabgn=true
			},
			// 确定解绑
			checkjie(){
				this.sendform.bindStatus=1
				this.sendform.id=this.form.id
				this.sendform.hubId=this.form.id
				sendhubid(this.sendform).then(res=>{
					if(res.code == 200){
							uni.$u.toast("解绑成功")
							this.showjieabgn=false
							this.sendform.senderId=''
							this.form.senderId=null
					}else{
						uni.$u.toast(res.message)
					}
				}).catch(error => {
						uni.$u.toast(error)
					})
			},
			// 确定安装
			gotirelive() {
				if(!this.form.hubNo){
					uni.$u.toast("请选择轮毂")
					return false
				}else{
					let obj={
						hubId:this.form.id,
						installFee:this.form.installFee,
						installPositionDesc:this.installPositionDesc,
						installPosition:this.installPosition,
						vehicleId:this.vehicleId
					}
					huninstall(obj).then(res=>{
						if(res.code ==200){
							uni.$u.toast("安装成功")
							uni.redirectTo({
								url: '/pages/warehouse/hubpicture?id=' + this.returnid
							})
						}
					}).catch(error => {
						uni.$u.toast(error)
					})
				}
				
			},
			quxiao(){
				uni.redirectTo({
					url: '/pages/warehouse/hubpicture?id=' + this.returnid
				})
			}
		}
	}
</script>

<style scoped>
	.ul {
		width: 100%;
		background-color: white;
		padding: 36upx 30upx;
		margin-top: 24upx;
		box-sizing: border-box;
		margin-bottom: 14upx;
	}

	.ul .li {
		border-bottom: 2upx solid #F3F4F6;
		width: 100%;
		height: 120upx;
		line-height: 120upx;
		display: flex;
		justify-content: space-between;
	}

	.ul .li .licon {
		color: #5C5F66;
	}

	.ultitle {
		font-size: 28upx;
		color: #8A8EA6;
		padding-left: 20upx;
	}

	.bte {
		width: 100%;
		background-color: #F5F7FB;
		display: flex;
		justify-content: space-around;
	}

	.bindbox {
		padding: 40upx 50upx;
		box-sizing: border-box;
		width: 640upx;
		border-radius: 20upx;
		background: linear-gradient(180deg, rgba(24, 98, 245, 0.2)8%, #F5F7FB 88%);
	}

	.bindboxtitle {
		font-size: 36upx;
		text-align: center;
	}

	.bindbox text {
		color: #5C5F66;
		font-size: 28upx;
		display: block;
		margin-bottom: 12upx;
		margin-top: 18upx;
	}

	/deep/.uni-select {
		border: none !important;
		border-bottom: 0px;
		background-color: white;
		/* line-height: 100upx;
		height: 100upx; */
	}

	.u-input {
		background-color: white;
		/* 	line-height: 100upx;
		height: 100upx; */
		text-indent: 22upx;
	}

	.content {
		background: #F5F7FB;
		height: 100%;
		width: 100%;
	}

	.formbox {
		width: 100%;
		display: flex;
		justify-content: center;
		margin: 20upx 0;
		background-color: white;
	}

	.widbox {
		width: 690upx;
	}

	/deep/.uni-select {
		border: none !important;
	}

	.needinline {
		display: flex;
		align-items: center;
	}

	/deep/.u-sticky__content {
		width: 100%;
	}

	.subbtnbox {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	/deep/.uni-select__input-placeholder {
		color: rgb(192, 196, 204) !important;
		font-size: 32upx !important;
	}

	.subbtnbox .u-button {
		width: 25% !important;
	}

	.subbtnbox .u-button:nth-child(3) {
		width: auto !important;
	}

	/deep/.u-radio-group--column {
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
	}

	.imguplode {
		display: flex;
		justify-content: space-around;
	}

	.imguplode .uni-form-item {
		width: 30%;
	}

	/deep/.cramchekimg {
		width: 200rpx;
		height: 200rpx;
	}

	.mycanvas {
		width: 100%;
		height: 500rpx;
	}
	.fontclick{
		color: #1862F5;
		margin-left: 15rpx;
	}
	/deep/.formbox .uni-input-input {
	  text-align: right;
	}
	/deep/.formbox .uni-input-placeholder {
	  text-align: right;
	}
</style>