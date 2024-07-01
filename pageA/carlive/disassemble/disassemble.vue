<template>
	<view class="con">
		<view class="ul">
			<view class="li">
				<text>车牌号</text>
				<text class="licon">{{form.vehicleNo}}</text>
			</view>
			<view class="li">
				<text>轮位</text>
				<text class="licon">{{form.installPositionDesc}}</text>
			</view>
		</view>
		<text class="ultitle">基本信息</text>
		<view class="formbox">
			<u-form :model="form" ref="uForm" label-width="250upx"
				:label-style="{'font-size':'32upx','color':'#010914'}">
				<view class="widbox">
					<u-form-item label="胎号" prop="tireNo" borderBottom>
						<view class="needinline" slot="right">
							{{form.tireNo}}
						</view>
					</u-form-item>
					<u-form-item label="拆去方向" prop="stockStatus" borderBottom>
						<uni-data-select slot="right" placeholder="请选择" @change="selecstockStatusCn" style="width: 400rpx;text-align: right;"
							v-model="form.tireMaintenanceBo.tireMaintenanceDetailBos[0].stockStatus"
							:localdata="stockStatuslass"></uni-data-select>
					</u-form-item>
					<view v-if="form.tireMaintenanceBo.tireMaintenanceDetailBos[0].stockStatus == 50">
						<u-form-item label="报废类型" prop="scrappingType" borderBottom>
							<radio-group @change="radioChange">
								<label class="uni-list-cell uni-list-cell-pd">
									<radio value="0" color="#3c9cff"/>
									<view>正常报废</view>
								</label>
								<label class="uni-list-cell uni-list-cell-pd">
									<radio value="1" color="#3c9cff"/>
									<view>提前报废</view>
								</label>
							</radio-group>
						</u-form-item>
						<u-form-item label="是否翻新" prop="scrappingType" borderBottom>
							<radio-group @change="radioChangefx">
								<label class="uni-list-cell uni-list-cell-pd">
									<radio value="0" color="#3c9cff"/>
									<view>可翻新</view>
								</label>
								<label class="uni-list-cell uni-list-cell-pd">
									<radio value="1" color="#3c9cff"/>
									<view>不可翻新</view>
								</label>
							</radio-group>
						</u-form-item>
					</view>
					<u-form-item label="问题类型" v-if="form.tireMaintenanceBo.tireMaintenanceDetailBos[0].scrappingType == '1'" prop="questionType" borderBottom>
						<uni-data-select slot="right" placeholder="请选择"   style="width: 400rpx;text-align: right;" @change="proplemchange($event)"
							v-model="form.tireMaintenanceBo.tireMaintenanceDetailBos[0].questionType"
							:localdata="questionTypeclass"></uni-data-select>
					</u-form-item>
					
					<u-form-item label="质量问题" v-if="form.tireMaintenanceBo.tireMaintenanceDetailBos[0].questionType == 'lifecycle_tire_quality_problem' && form.tireMaintenanceBo.tireMaintenanceDetailBos[0].scrappingType == '1'" prop="questionType" borderBottom>
						<checkbox-group class="uni-list" @change="questionContentone" >
							<label class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in radioItems" :key="index">
								<view>
									<checkbox :value="`${item.value},${item.name}`" color="#3c9cff" :checked="one"></checkbox>
								</view>
								<view>
									<label class="label-2-text" :for="item.name">
										<text>{{item.name}}</text>
									</label>
								</view>
							</label>
						</checkbox-group>
					</u-form-item>
					<u-form-item label="使用问题" v-if="form.tireMaintenanceBo.tireMaintenanceDetailBos[0].questionType == 'lifecycle_tire_use_problem' && form.tireMaintenanceBo.tireMaintenanceDetailBos[0].scrappingType == '1'" prop="questionType" borderBottom>
						<checkbox-group class="uni-list" @change="questionContentwo">
							<label class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in radioItemtwo" :key="index">
								<view>
									<checkbox :value="`${item.value},${item.name}`" color="#3c9cff" :checked="one"></checkbox>
								</view>
								<view>
									<label class="label-2-text" :for="item.name">
										<text>{{item.name}}</text>
									</label>
								</view>
							</label>
						</checkbox-group>
					</u-form-item>


					<u-form-item label="自编号" prop="insideTireNo" borderBottom>
						<u--input placeholder="请输入自编号" border="false" inputAlign="right" v-model="form.insideTireNo"></u--input>
					</u-form-item>
					<u-form-item label="传感器" prop="senderId" borderBottom>
						<view slot="right">
							{{form.senderId || ''}}
							<text v-if="form.senderId" class="fontclick" @click="jiebangs">解绑</text>
							<text v-if="form.senderId == null" class="fontclick" @click="bangdings">绑定</text>
						</view>
					</u-form-item>
					<u-form-item label="品牌" prop="tireBrandName" borderBottom>
						<text slot="right">{{form.tireMaintenanceBo.tireMaintenanceDetailBos[0].tireBrandName}}</text>
					</u-form-item>
					<u-form-item label="花纹型号" prop="pattern" borderBottom>
						<text slot="right">{{form.tireMaintenanceBo.tireMaintenanceDetailBos[0].pattern}}</text>
					</u-form-item>
					<u-form-item label="新胎花纹深度" prop="depth" borderBottom>
						<text slot="right">{{form.depth|| '0'}}mm</text>
					</u-form-item>
					<u-form-item label="拆卸费用" prop="cost" borderBottom>
						<view style="display: flex;justify-content: flex-end;align-items: center;">
							<u--input placeholder="请输入拆卸费用" inputAlign="right" border="false" v-model="form.tireMaintenanceBo.tireMaintenanceDetailBos[0].cost"></u--input>
							元
						</view>
						
					</u-form-item>
					<u-form-item label="安装时间" prop="createTime" borderBottom>
						<text slot="right">{{form.installTime}}</text>
					</u-form-item>
					<u-form-item label="规格" prop="specificationsName" borderBottom>
						<text slot="right">{{form.tireMaintenanceBo.tireMaintenanceDetailBos[0].specificationsName}}</text>
					</u-form-item>
					<u-form-item label="轮胎分类" prop="category" borderBottom>
						<view class="noicon">
							<uni-data-select style="width: 400rpx;text-align: right;" disabled
								v-model="form.category" emptyTips="0"
								:localdata="categorylist">
							</uni-data-select>
						</view>
					</u-form-item>
					<u-form-item label="上次实测花纹深度" prop="measuredDepth" borderBottom>
						<text slot="right">{{form.measuredDepth || '0'}}mm</text>
					</u-form-item>
					<u-form-item label="本次实测花纹深度" prop="indexDepth" borderBottom>
						<view style="display: flex;justify-content: flex-end;align-items: center;">
							<u--input placeholder="请输入" inputAlign="right" border="false" v-model="form.indexDepth"></u--input>
							mm
						</view>
					</u-form-item>
					<u-form-item label="本次拆卸时里程表读数" prop="readMileage" borderBottom>
						<view style="display: flex;justify-content: flex-end;align-items: center;">
							<u--input placeholder="请输入"  inputAlign="right" border="false" v-model="form.readMileage"></u--input>
							km
						</view>
					</u-form-item>
					<u-form-item label="初测花纹深度" prop="firstDepth" borderBottom>
						<text slot="right">{{form.firstDepth || '0'}}mm</text>
					</u-form-item>
					<u-form-item label="当前里程表读数" prop="lastInstallMileage" borderBottom>
						<text slot="right">{{form.lastInstallMileage || '0'}}km</text>
					</u-form-item>
					<u-form-item label="累计里程" prop="totalMileage" borderBottom>
						<text slot="right">{{form.totalMileage || '0'}}km</text>
					</u-form-item>
					<u-form-item label="操作单位" borderBottom>
						<text slot="right">{{depinfo.deptName}}</text>
					</u-form-item>
					<u-form-item label="操作人" borderBottom>
						<text slot="right">{{userdata.userName}}</text>
					</u-form-item>
				</view>
			</u-form>
		</view>
		<!-- <text class="ultitle">请选择三张图片上传，分别是车牌号，胎号，公里表</text>
		<view class="ul imguplode">
			<view class="uni-form-item uni-column">
				<image class="cramchekimg" @click="checkimg" src="@/static/images/chepaiimg.png"></image>
				<image v-if="form.brandImg" :src="form.brandImg" class="cramchekimg" style="margin-left: 10upx;">
				</image>
			</view>

			<view class="uni-form-item uni-column">
				<image class="cramchekimg" @click="checkimg" src="@/static/images/taiahiimg.png"></image>
				<image v-if="form.brandImg" :src="form.brandImg" class="cramchekimg" style="margin-left: 10upx;">
				</image>
			</view>
			<view class="uni-form-item uni-column">
				<image class="cramchekimg" @click="checkimg" src="@/static/images/gongliimg.png"></image>
				<image v-if="form.brandImg" :src="form.brandImg" class="cramchekimg" style="margin-left: 10upx;">
				</image>
			</view>
		</view>
		<text class="ultitle">手写签名处</text> -->
		<view style="background-color: white;margin-top: 20rpx;">
			<!-- <view class="title">
				<view class="content" @click="finish"> 签字确认 </view>
				<view class="clear" @click="clear">清屏</view>
				<view @click="revocation">回退</view>
			</view>
			<canvas style="overscroll-behavior:contain; -ms-scroll-chaining:contain" class="mycanvas" id="mycanvas"
				canvas-id="mycanvas" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend"></canvas>
				 -->
		</view>
		<view class="bte">
			<button style="margin-top: 32upx;width: 48%;" @click="quxiao">取消</button>
			<button @click="gotirelive" type="primary" style="margin-top: 32upx;width: 48%;background: #3c9cff;">确定拆卸</button>
		</view>

		<!-- 传感器 -->
		<u-popup :show="show" mode="center" :closeOnClickOverlay="false" @close="show=false" :closeable="true"
			round="10px">
			<view class="bindbox">
				<view class="bindboxtitle">绑定传感器</view>
				<view>
					<text>胎号</text>
					<u--input border="none" v-model="sendform.tireNo" disabled></u--input>
				</view>
				<view style="position: relative;margin-bottom: 20upx;">
					<text>传感器</text>
					<view style="background-color: white;">
						<u--input border="none" placeholder="请输入传感器ID" v-model="sendform.senderId"></u--input>
						<image @click="gocamner" src="https://tpms.5i84.cn/img/camreserch.png"
							style="width: 42upx;height: 40upx;position: absolute;right: 40upx;top:54%;"></image>
					</view>
					
				</view>
				<view style="margin-bottom: 20upx;">
					<text>绑定方式</text>
					<uni-data-select placeholder="请选择" v-model="sendform.senderType"
						:localdata="tireclass"></uni-data-select>
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
					<text>胎号</text>
					<u--input border="none" v-model="sendform.tireNo" disabled></u--input>
				</view>
				<view style="position: relative;">
					<text>传感器</text>
					<u--input border="none" v-model="sendform.senderId" disabled></u--input>
				</view>
				<view style="margin-bottom: 20upx;">
					<text>绑定方式</text>
					<uni-data-select disabled placeholder="请选择" v-model="sendform.senderType"
						:localdata="tireclass"></uni-data-select>
				</view>
				<u-button @click="checkjie" style="margin-top: 20upx;" type="primary" text="解绑"></u-button>
			</view>
		</u-popup>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {  bangding, jiebang,  sendidType, tireinstall, stockStatus_tire, getKeyFX, getKeyWX, tiredetail, zhili, shiyong } from '@/api/carlive'
	import { cardetail, tireinfo } from '@/api/tirePressure'
	import { getDicts } from "@/api/system/dict/data";
	import config from '@/config'
	import superweiCombox from '@/components/superwei-combox'
	import { user } from "@/api/tirePressure.js"
	// import {
	//   toast,
	//   showConfirm,
	//   tansParams
	// } from '@/utils/common'
	export default {
		filters:{
			installPosition(e){
					var row = e[0]
					var tirePosition = e[1]==0?"左":"右"
					var num = e[2]
					let str = row+"轴"+tirePosition+num
					return str
			}
		},
		components: {
			superweiCombox
		},
		data() {
			return {
				mess:'',
				one:false,
				vehicleId: '',
				show: false, //传感器绑定
				showjieabgn: false,
				tireclass: [], //绑定方式
				sendform: {},
				carinfoshow: {
					position: ''
				},
				userdata:{},
				form: {
					tireMaintenanceBo: {
						maintainer: '',
						maintenanceDate: '',
						manufacturer: '',
						mid: '',
						tenantId: '',
						tireMaintenanceDetailBos: [{
							"scrappingType": ''
						}]
					}
				},
				expireDate: { //保质期控件
					show: false,
					mode: 'single'
				},
				show: false,
				columns: [],
				houselist: [], //所属仓库
				pinpai: [], //品牌
				guige: [], //规格
				datashow: false,
				stockStatuslass: [],
				questionTypeclass:[
					{text: "质量问题",value: "lifecycle_tire_quality_problem"},
					{text: "使用问题",value:"lifecycle_tire_use_problem"}
				],
				questionContent:[],
				questionContentt:[],
				radioItems:[],
				radioItemtwo:[],


				ctx: '', //绘图图像
				points: [], //路径点集合
				tempPoint: [], //用来存放当前画纸上的轨迹点
				paths: [], //存储所有绘制路径,
				screenWidth: '', //屏幕宽度
				screenHeight: '', //屏幕高度
				returnid:'',
				categorylist:[],
				depinfo:{}
			}
		},
		onLoad(option) {
			getDicts('lifecycle_tire_category').then(res=>{
				res.data.map(item=>{
					this.categorylist.push({
						text: item.dictLabel,
						value:  item.dictValue
					})
				})
			})
			this.returnid=option.returnid
			var date = new Date();
			date.getFullYear();
			let mothod = ''
			let day = ''
			if (date.getMonth() < 10) {
				mothod = "0" + (date.getMonth() + 1)
			} else {
				mothod = date.getMonth() + 1
			}
			if (date.getDate() < 10) {
				day = "0" + date.getDate();
			} else {
				day = date.getDate();
			}
			tireinfo(option.tireid).then(res=>{
				this.form.installPosition= res.data.installPosition
				this.form.vehicleNo = res.data.vehicleNo
				this.form.installPositionDesc = res.data.installPositionDesc
				this.form.createTime = res.data.createTime
				this.form.depth = res.data.depth
				this.form.tireId = res.data.tireId
				this.form.tireNo = res.data.tireNo
				this.form.insideTireNo = res.data.insideTireNo
				this.form.senderId = res.data.senderId
				this.form.senderType = res.data.senderType
				this.form.vehicleId = res.data.vehicleId
				this.form.category = res.data.category
				this.form.firstDepth=res.data.firstDepth
				this.form.lastInstallMileage=res.data.lastInstallMileage
				this.form.measuredDepth=res.data.measuredDepth
				this.form.totalMileage=res.data.totalMileage
				this.form.installTime=res.data.installTime
				this.form.tireMaintenanceBo.tireMaintenanceDetailBos[0].pattern = res.data.pattern
				this.form.tireMaintenanceBo.tireMaintenanceDetailBos[0].specificationsName = res.data.specificationsName
				this.form.tireMaintenanceBo.tireMaintenanceDetailBos[0].tireBrandName = res.data.tireBrandName
				this.form.tireMaintenanceBo.tireMaintenanceDetailBos[0].tireId = res.data.tireId
				this.form.tireMaintenanceBo.maintainer = uni.getStorageSync('storage_data').vuex_name
				this.form.tireMaintenanceBo.maintenanceDate = date.getFullYear() + '-' + mothod + '-' + day
			})
			
				stockStatus_tire().then(res => {
					if (res.code == 200) {
						res.data.map(item => {
							this.stockStatuslass.push({
								text: item.dictLabel,
								value: item.dictValue
							})
						})
					}
				})
			sendidType().then(res => {
				res.data.map(item => {
					this.tireclass.push({
						text: item.dictLabel,
						value: item.dictValue
					})
				})
			})
			
			// 质量问题列表
			zhili().then(res=>{
				res.data.map(item=>{
					this.radioItems.push({
						name:item.dictLabel,
						value:item.dictValue
					})
				})
			})
			
			// 使用问题列表
			shiyong().then(res=>{
				res.data.map(item=>{
					this.radioItemtwo.push({
						name:item.dictLabel,
						value:item.dictValue
					})
				})
			})
			
			user().then(res=>{
				this.userdata = res.data
				this.depinfo=res.data.dept
			})
		},
		methods: {
			// 问题类型改变
			proplemchange(e){
				this.one=false
			},
			questionContentwo(val){
				let arr=[]
				let arrt=[]
				this.form.tireMaintenanceBo.tireMaintenanceDetailBos[0].questionContent=''
				this.form.tireMaintenanceBo.tireMaintenanceDetailBos[0].questionContentCN=''
				val.detail.value.map(item=>{
					let [id,name] = item.split(',')
					arr.push(id)
					arrt.push(name)
				})
				this.form.tireMaintenanceBo.tireMaintenanceDetailBos[0].questionContent=arr.toString()
				this.form.tireMaintenanceBo.tireMaintenanceDetailBos[0].questionContentCN=arrt.toString()
			},
			questionContentone(val){
				let arr=[]
				let arrt=[]
				this.form.tireMaintenanceBo.tireMaintenanceDetailBos[0].questionContent=''
				this.form.tireMaintenanceBo.tireMaintenanceDetailBos[0].questionContentCN=''
				val.detail.value.map(item=>{
					let [id,name] = item.split(',')
					arr.push(id)
					arrt.push(name)
				})
				this.form.tireMaintenanceBo.tireMaintenanceDetailBos[0].questionContent=arr.toString()
				this.form.tireMaintenanceBo.tireMaintenanceDetailBos[0].questionContentCN=arrt.toString()
			},
			// 报废类型确定
			radioChange(evt) {
				this.form.tireMaintenanceBo.tireMaintenanceDetailBos[0].scrappingType = evt.detail.value
			},
			// 是否翻新
			radioChangefx(e){
				this.form.tireMaintenanceBo.tireMaintenanceDetailBos[0].isRenovate = e.detail.value
			},
			// 拆去方向选择
			selecstockStatusCn(e) {
				if (e == 50) {
					getKeyFX().then(res => {
						this.form.tireMaintenanceBo.mid = res.data
					})
					this.form.tireMaintenanceBo.type = 2
				} else {
					this.form.tireMaintenanceBo.tireMaintenanceDetailBos[0].scrappingType=''
					this.form.tireMaintenanceBo.tireMaintenanceDetailBos[0].isRenovate=''
					this.form.tireMaintenanceBo.tireMaintenanceDetailBos[0].questionType=''
					getKeyWX().then(resd => {
						this.form.tireMaintenanceBo.mid = resd.data
					})
					this.form.tireMaintenanceBo.type = 1
				}
				this.stockStatuslass.find((item) => {
					if (item.value === e) {
						this.form.tireMaintenanceBo.tireMaintenanceDetailBos[0].stockStatusCn = item.text
					}
				})
			},






			// 选中车胎，获取车胎信息
			select3(e) {
				this.form = e.value
			},
			// 扫码
			async can() {
				uni.scanCode({
					success: (res) => {
						this.queryform.vehicleId = res.result
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
			checkimg() {
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
					error: function(e) {
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
			bangdings() {
				this.sendform.tireNo = this.form.tireNo
				this.sendform.tireId = this.form.tireId
				this.sendform.senderId = ''
				this.sendform.senderType = ''
				this.show = true
			},
			// 确定绑定
			checkbind() {
				if (this.sendform.senderId == null || this.sendform.senderId == "") {
					uni.$u.toast("请输入传感器ID")
				} else if (this.sendform.senderType == null || this.sendform.senderType == "") {
					uni.$u.toast("请选择绑定方式")
				} else {
					bangding(this.sendform).then(res => {
						if (res.code == 200) {
							uni.$u.toast("绑定成功")
							this.form.senderId = this.sendform.senderId
							this.form.senderType = this.sendform.senderType
							this.show = false
							this.sendform.senderId = ''
							this.sendform.senderType = ''
						}
					})
				}
			},
			// 解绑传感器
			jiebangs() {
				this.sendform.tireNo = this.form.tireNo
				this.sendform.senderId = this.form.senderId
				this.sendform.senderType = this.form.senderType
				this.sendform.tireId = this.form.tireId
				this.showjieabgn = true
			},
			// 确定解绑
			checkjie() {
				jiebang(this.sendform.tireId).then(res => {
					if (res.code == 200) {
						uni.$u.toast("解绑成功")
						this.showjieabgn = false
						this.sendform.senderId = ''
						this.sendform.senderType = ''
						this.form.senderId = null
					} else {
						this.$refs.uToast.show({
							type: 'default',
							title: '默认主题',
							message: res.message
						})
					}
				})
			},
			// 确定拆卸
			gotirelive() {
				let meeslins = this.form.measuredDepth
				if (!this.form.tireMaintenanceBo.tireMaintenanceDetailBos[0].stockStatus) {
					uni.$u.toast('请选择拆去方向')
					return false
				} else if (this.form.tireMaintenanceBo.tireMaintenanceDetailBos[0].stockStatus == 50 && !this.form
					.tireMaintenanceBo.tireMaintenanceDetailBos[0].scrappingType) {
					uni.$u.toast('请选择报废类型')
					return false
				} else if (this.form.tireMaintenanceBo.tireMaintenanceDetailBos[0].stockStatus == 50 && this.form
					.tireMaintenanceBo.tireMaintenanceDetailBos[0].isRenovate == undefined) {
					uni.$u.toast('请选择是否翻新')
					return false
				} else if (this.form.tireMaintenanceBo.tireMaintenanceDetailBos[0].scrappingType == "1" && !this.form
					.tireMaintenanceBo.tireMaintenanceDetailBos[0].questionType) {
					uni.$u.toast('请选择问题类型')
					return false
				} else if (this.form.tireMaintenanceBo.tireMaintenanceDetailBos[0].scrappingType == "1"  &&
					!this.form.tireMaintenanceBo.tireMaintenanceDetailBos[0].questionContent) {
					uni.$u.toast('请选择问题')
					return false
				} else if (this.form.tireMaintenanceBo.tireMaintenanceDetailBos[0].cost < 0) {
					uni.$u.toast('拆卸费用不能为负数')
					return false
				} else if (this.form.indexDepth > meeslins) {
					this.$refs.uToast.show({
						type: 'default',
						title: '默认主题',
						message: '对不起，上次实测花纹深度是【' + meeslins + 'mm】您本次输入的实测花纹深度不能大于上次的实测花纹深度',
					})
					return false
				} else {
					this.form.depth=this.form.indexDepth
					this.form.tireMaintenanceBo.totalCost = this.form.tireMaintenanceBo.tireMaintenanceDetailBos[0].cost
					this.form.tireMaintenanceBo.tireMaintenanceDetailBos[0].tireId = this.form.tireId
					tiredetail(this.form).then(res => {
						if (res.code == 200) {
							uni.$u.toast("轮胎拆卸成功")
							uni.redirectTo({
								url: '/pageA/carlive/tireinstall/tireinstall?id=' + this.returnid
							})
						} 
					}).catch(error=>{
						this.$refs.uToast.show({
							type: 'default',
							title: '默认主题',
							message: error,
						})
					})
				}
			},
			quxiao() {
				uni.redirectTo({
					url: '/pageA/carlive/tireinstall/tireinstall?id=' + this.returnid
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

	.fontclick {
		color: #1862F5;
		margin-left: 15rpx;
	}

	/deep/.formbox .uni-input-input {
		text-align: right;
	}

	/deep/.formbox .uni-input-placeholder {
		text-align: right;
	}

	/deep/.u-form-item__body__left__content__label {
		font-size: 25rpx !important;
	}

	uni-radio-group,uni-checkbox-group {
		display: flex;
	}
	.uni-list-cell-pd{
		padding: 0 20rpx;
	}
	.uni-list-cell::after{
		background-color: transparent;
	}
	.uni-list:after{
		background-color: transparent;
	}
	/deep/.bindbox .u-input__content__field-wrapper__field{
		padding:8rpx
	}
	radio-group, checkbox-group{
		display: flex;
	}
	/deep/.noicon .uni-icons{
		display: none;
	}
</style>