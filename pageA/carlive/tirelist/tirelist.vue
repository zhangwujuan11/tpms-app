<template>
	<view class="content">
		<view class="formbox">
			<u-form :model="form" ref="uForm" label-width="250upx" :label-style="{'font-size':'32upx','color':'#010914'}">
				<view class="widbox">
					<u-form-item label="胎号" prop="tireNo" required  borderBottom>
						<view class="needinline" v-if="!sendform.tireId">
							<u--input border="false" placeholder="胎号" v-model="form.tireNo" inputAlign="right"></u--input>
							<image @click="can" style="width: 48upx;height: 48upx;" src="https://tpms.5i84.cn/img/images/carlive/crams.png" mode=""></image>
						</view>
						<view v-if="sendform.tireId" style="text-align: right;">
							{{form.tireNo}}
						</view>
					</u-form-item>
					<u-form-item label="自编号" prop="insideTireNo" borderBottom  v-if="!sendform.tireId">
						 <u--input placeholder="请输入自编号" border="false"  inputAlign="right" v-model="form.insideTireNo" ></u--input>
					</u-form-item>
					<u-form-item label="轮胎分类" prop="category" required borderBottom  v-if="!sendform.tireId">
						 <uni-data-select
						 placeholder="请选择轮胎分类"
						@change="gogogo($event)"
						  v-model="form.category"
						  :localdata="tireclass"
						    ></uni-data-select>
					</u-form-item>
					<u-form-item label="轮胎状态" prop="stockStatus" required borderBottom  v-if="!sendform.tireId">
						 <uni-data-select
							placeholder="请选择轮胎状态"
						      v-model="form.stockStatus"
						      :localdata="tirestatu"
						    ></uni-data-select>
					</u-form-item>
					<u-form-item label="所属仓库" prop="warehouseId" required borderBottom>
						 <uni-data-select
						 placeholder="请选择所属仓库"
						 @change="warehousechange($event)"
						  v-model="form.warehouseId"
						  :localdata="houselist"
						 ></uni-data-select>
					</u-form-item>
					<u-form-item label="绑定传感器" prop="senderId" borderBottom>
						 <u--input 	placeholder="请输入传感器" border="false"  inputAlign="right" v-model="form.senderId" ></u--input>
					</u-form-item>
					<u-form-item label="绑定RFID" prop="rfidCode" borderBottom>
						 <u--input placeholder="请输入绑定RFID" border="false" inputAlign="right" v-model="form.rfidCode" ></u--input>
					</u-form-item>
					<u-form-item label="DOT" prop="dot" borderBottom>
						 <u--input placeholder="请输入DOT" border="false" inputAlign="right" v-model="form.dot" ></u--input>
					</u-form-item>
					<u-form-item label="品牌" prop="tireBrandId" required borderBottom>
						 <uni-data-select
						  placeholder="请选择品牌"
						  v-model="form.tireBrandId"
						  :localdata="pinpai"
						  @change="brandr($event)"
						    ></uni-data-select>
					</u-form-item>
					<u-form-item label="质保期" prop="expireDate" borderBottom @click="datashow=true"  right-icon="arrow-right">
						<u--input placeholder="请选择质保期" disabled="disabled"  inputAlign="right" disabledColor="white" border="false" v-model="form.expireDate"></u--input>
						 <u-datetime-picker
						 ref="datetimePicker"
							:show="datashow"
							:formatter="formatter"
							mode="date"
							@cancel="datashow=false;form.expireDate=''"
							@confirm="confirmdata"
						></u-datetime-picker>
					</u-form-item>
					<u-form-item label="规格" prop="specificationsId" required borderBottom>
						<uni-data-select
						placeholder="请选择规格"
						v-model="form.specificationsId"
						:localdata="guige"
						@change="specificati($event)"
						></uni-data-select>
					</u-form-item>
					<u-form-item label="花纹型号" prop="patternId" required borderBottom>
						<uni-data-select
						 placeholder="请选择花纹型号"
						 v-model="form.patternId"
						 :localdata="xinhao"
						 @change="brandrxinhao($event)"
						   ></uni-data-select>
						<!-- <u--input border="false"  placeholder="请输入花纹型号" v-model="form.pattern" ></u--input> -->
					</u-form-item>
					<u-form-item label="速度级别" prop="speedLevel" borderBottom>
						<u--input border="false"  inputAlign="right"  placeholder="请输入速度级别" v-model="form.speedLevel" ></u--input>
					</u-form-item>
					<u-form-item label="载重指数" prop="loadIndex" borderBottom>
						<u--input border="false"  inputAlign="right" placeholder="请输入载重指数" v-model="form.loadIndex" ></u--input>
					</u-form-item>
					<u-form-item label="单价" prop="price" required borderBottom>
						<view class="cettyu">
							<u--input border="false"  inputAlign="right" placeholder="请输入单价" v-model="form.price" ></u--input>元
						</view>
					</u-form-item>
					<u-form-item label="新胎花纹深度" prop="depth" required borderBottom>
						<view class="cettyu">
							<u--input border="false"  inputAlign="right" placeholder="请输入新胎花纹深度" v-model="form.depth" ></u--input>mm
						</view>
					</u-form-item>
					<u-form-item label="初测花纹深度" prop="firstDepth" required borderBottom>
						<view class="cettyu">
							<u--input border="false"  inputAlign="right" placeholder="请输入初测花纹深度" v-model="form.firstDepth" ></u--input>mm
						</view>
					</u-form-item>	
					<u-form-item label="累计里程" prop="totalMileage" borderBottom>
						<view class="cettyu">
							<u--input border="false"  inputAlign="right" placeholder="请输入累计里程" v-model="form.totalMileage" ></u--input>km
						</view>
					</u-form-item>
					<u-form-item label="供应商" prop="manufacturer" borderBottom>
							<uni-data-select
							placeholder="请选择供应商"
							v-model="form.manufacturer"
							:localdata="gongyings"
							@change="gongyings($event)"
							></uni-data-select>
					</u-form-item>
					<u-form-item label="累计时长" prop="totalDuration" borderBottom>
						<view class="cettyu">
							<u--input border="false"  inputAlign="right" placeholder="请输入累计时长" v-model="form.totalDuration" ></u--input>h
						</view>
					</u-form-item>
				</view>
			</u-form>
		</view>
		<view style="height: 148upx;display: flex;align-items: center;background-color: white;" offsetTop="1100upx">
			<view class="subbtnbox">
				<u-button @click="resetno">取消</u-button>
				<u-button v-if="!sendform.tireId" type="primary" @click="submit">保存</u-button>
				<u-button v-if="sendform.tireId" type="primary" @click="Savechange">保存</u-button>
				<u-button v-if="!sendform.tireId" class="custom-style" type="primary" @click="nextadd()">保存并下一条</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import { getDicts } from "@/api/system/dict/data";
	import {listDept, warehouselist, getTireBands, getSpecifications, addtire,getpatternmodel, tirelistinfo, updateTire,supperlist} from '@/api/carlive.js'
	export default {
		data() {
			return {
				sendform:{},
				form: {name: '',feedid:''},
				rules: {
					tireNo: [{ required: true, message: "胎号不能为空", trigger: "blur" }],
					category: [{ required: true, message: "轮胎类别不能为空", trigger: "blur" }],
					warehouseId: [{ required: true, message: "仓库名称不能为空", trigger: "blur" }],
					tireId: [{ required: true, message: "品牌不能为空", trigger: "blur" }],
					patternId: [{ required: true, message: "花纹型号不能为空", trigger: "blur" }],
					price: [{ required: true, message: "单价不能为空", trigger: "blur" , type: 'number' },
						{pattern:/^(0|([1-9][0-9]*))(\.[\d]{1,2})?$/,message: "单价格式不正确",trigger: "blur"}],
					depth:[{ required: true,message: "新胎花纹深度不能为空", trigger: "blur" , type: 'number'},
						{pattern:/^\d+(\.\d+)?$/,message: "新胎花纹深度格式不正确",trigger: "blur" }],
					totalMileage:[{pattern:/^\d+(\.\d+)?$/,message: "累计里程格式不正确",trigger: "blur"}],
					totalDuration:[{pattern:/^\d+(\.\d+)?$/,message: "累计时长格式不正确",trigger: "blur"}],
					stockStatus:[{ required: true, message: "轮胎状态不能为空", trigger: "blur" }],
					specificationsId:[{ required: true, message: "规格不能为空", trigger: "blur" }],
					firstDepth:[{ required: true, message: "初测花纹深度不能为空", trigger: "blur" , type: 'number'},
						{pattern:/^\d+(\.\d+)?$/,message: "初测花纹深度不能为负数",trigger: "blur"}],
					tireBrandId: [{ required: true, message: "品牌不能为空", trigger: "blur" }]
				},
				expireDate:{//保质期控件
					show:false,
					mode: 'single'
				},
				show: false,
				columns: [],
				tireclass:[],//轮胎分类
				tirestatu:[],//轮胎状态
				houselist:[],//所属仓库
				pinpai:[],//品牌
				guige:[],//规格
				datashow:false,
				xinhao:[],
				gongyings:[]
			};
		},
		onLoad: function (option) {
			if(option.id){
				tirelistinfo(option.id).then(res=>{
					this.form=res.data
					this.form.warehouseId = this.form.warehouseId.toString() 
					this.form.patternId = this.form.patternId.toString() 
				})
			}
			this.sendform.tireId=option.id
		},
		methods: {
			submit() {
				this.$refs.uForm.validate().then(res => {
					addtire(this.form).then(res=>{
						if(res.code == 200){
							uni.$u.toast('轮胎入库成功')
							uni.navigateTo({
								url:'/pageA/carlive/tiretable/tiretable'
							})
						}else{
							uni.$u.toast(res.message)
						}
					})
				}).catch(errors => {
					uni.$u.toast('校验失败,请完整填写表单')
				})
			},
			Savechange(){
				this.$refs.uForm.validate().then(res => {
					updateTire(this.form).then(res=>{
						if(res.code == 200){
							uni.$u.toast('轮胎修改成功')
							uni.navigateTo({
								url:'/pageA/carlive/tiretable/tiretable'
							})
						}else{
							uni.$u.toast(res.message)
						}
					})
				}).catch(errors => {
					uni.$u.toast('校验失败,请完整填写表单')
				})
			},
			
			 formatter(type, value) {
				if (type === 'year') {
					return `${value}年`
				}
				if (type === 'month') {
					return `${value}月`
				}
				if (type === 'day') {
					return `${value}日`
				}
				return value
			},
			
			// 保存并下一条
			nextadd(){
				this.$refs.uForm.validate().then(res => {
					addtire(this.form).then(res=>{
						if(res.code == 200){
							uni.$u.toast('轮胎入库成功')
							this.reset()
						}else{
							uni.$u.toast(res.message)
						}
					})
				}).catch(errors => {
					uni.$u.toast('校验失败,请完整填写表单')
				})
			},
			// 重置表单
			reset(){
				//this.$refs.uForm.resetFields()
				this.form.tireNo=''
				this.form.insideTireNo=''
				this.form.category=''
				this.form.stockStatus=''
				this.form.warehouseId=''
				this.form.senderId=''
				this.form.rfidCode=''
				this.form.tireBrandId=''
				this.form.expireDate=''
				this.form.specificationsId=''
				this.form.pattern=''
				this.form.speedLevel=''
				this.form.loadIndex=''
				this.form.price=''
				this.form.depth=''
				this.form.firstDepth=''
				this.form.totalMileage=''
				this.$refs.uForm.clearValidate()
			},
			gogogo(e){
				this.form.stockStatus=''
				if(e == 0){
						this.tirestatu=[{text:"库存全新胎",value:'10'}]
					}else if(e== 3){
						this.tirestatu=[{text:"库存翻新胎",value:'11'}]
					}else{
						this.tirestatu=[
							{text:"待用胎",value:'15'},
							{text:"待修补",value:'30'}
						]
					}
					this.$forceUpdate()
			},
			// 仓库名称
			warehousechange(val){
				this.houselist.map(item=>{
					if(item.value == val){
						this.form.warehouseName=item.text
					}
				})
			},
			brandrxinhao(val){
				this.xinhao.map(item=>{
					if(item.value == val){
						this.form.pattern=item.text
					}
				})
			},
			// 规格数据处理
			specificati(val){
				this.guige.map(item=>{
					if(item.value == val){
						this.form.specificationsName=item.text
					}
				})
			},
			// 品牌数据处理
			brandr(val){
				this.pinpai.map(item=>{
					if(item.value == val){
						this.form.tireBrandName=item.text
					}
				})
			},
			// 扫码
			can(){
				uni.scanCode({
					success: (res) => {
						this.form.tireNo=res.result
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
			confirmdata(e){
				 const timeFormat = uni.$u.timeFormat
				 let ttime=timeFormat(e.value, 'yyyy-mm-dd')
				this.form.expireDate=ttime
				this.datashow=false
			},
			resetno(){
				this.reset()
				uni.navigateTo({
					url:'/pageA/carlive/tiretable/tiretable'
				})
			}
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.uForm.setRules(this.rules);
			this.$refs.datetimePicker.setFormatter(this.formatter)
		},
		mounted() {
			listDept().then(res=>{
				this.columns=res.data
			})
			getDicts("lifecycle_tire_category").then(response => {
				response.data.map(item=>{
					this.tireclass.push({text:item.dictLabel,value:item.dictValue})
				})
			  })
			// 仓库下拉框数据
			warehouselist({pageNum:1,pageSize:10000}).then(res=>{
				this.houselist=res.data.items.map(item=>{
					return {
						value:item.id,
						text:item.warehouseName
					}
				})
			})
			
			// 供应商
			supperlist({pageNum:1,pageSize:100000}).then(res=>{
				this.gongyings=res.data.items.map(item=>{
					return {
						value:item.supplierName,
						text:item.supplierName
					}
				})
			})
			
			// 品牌
			getTireBands().then(res=>{
				this.pinpai=res.data.map(item=>{
					return {
						value:item.paramId,
						text:item.paramName
					}
				})
			})
			
			// 花纹型号
			getpatternmodel().then(res=>{
				this.xinhao=res.data.map(item=>{
					return {
						value:item.paramId,
						text:item.paramName
					}
				})
			})
			// 规格
			getSpecifications().then(res=>{
				this.guige=res.data.map(item=>{
					return {
						value:item.paramId,
						text:item.paramName
					}
				})
			})
		}
	};
</script>

<style scope>
	.content {
		background:#F5F7FB;
		height: 100%;
		width: 100%;
	}
	.formbox{
		width: 100%;
		display: flex;
		justify-content: center;
		margin: 20upx 0;
		background-color: white;
	}
	.widbox{
		width:690upx;
	}
	/deep/.uni-select{
		border: none !important;
	    }
	.needinline{
		display: flex;
		align-items: center;
		text-align: right;
		}
	/deep/.u-sticky__content{
		width: 100%;
	}
	.subbtnbox{
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	/deep/.uni-select__input-placeholder{
		color: rgb(192, 196, 204) !important;
		font-size: 32upx  !important;
	}
	.subbtnbox .u-button{
		width: 25% !important;
	}
	.subbtnbox .u-button:nth-child(3){
		width: auto !important;
	}
	/deep/.u-radio-group--column{
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
	}
	.uni-select__input-text{
		text-align: right;
	}
	.cettyu{
		display: flex;
		align-items: center;
	}
	/deep/.u-form-item__body__right__message{
		text-align: right;
	}
</style>
