<template>
  <view class="content">
	  <view class="formbox">
	  <u-form :model="form" ref="uForm" label-width="250upx" :label-style="{'font-size':'32upx','color':'#010914'}">
	  	<view class="widbox">
			<u-form-item label="轮毂编号" prop="hubNo" required  borderBottom>
				<view class="needinline" v-if="!id">
					<u--input placeholder="请输入轮毂编号" inputAlign="right" border="false" v-model="form.hubNo" ></u--input>
					<image @click="can" style="width: 48upx;height: 48upx;" src="https://tpms.5i84.cn/img/images/carlive/crams.png" mode=""></image>
				</view>
				<view v-if="id" style="text-align: right;">
					{{form.hubNo}}
				</view>
			</u-form-item>
	  		<u-form-item label="所属仓库" prop="warehouseId" required  borderBottom>
				<uni-data-select
				placeholder="请选择所属仓库"
				 v-model="form.warehouseId"
				 :localdata="columns1"
				 @change="warehouse($event)"
				   ></uni-data-select>
	  		</u-form-item>
			<u-form-item label="品牌" prop="brand" required  borderBottom>
				<uni-data-select
				placeholder="请选择品牌"
				 v-model="form.brand"
				 :localdata="columns2"
				   ></uni-data-select>
			</u-form-item>
			<u-form-item label="孔距" prop="boltPattern" required  borderBottom>
				<uni-data-select
				placeholder="请选择孔距"
				 v-model="form.boltPattern"
				 :localdata="columns3"
				   ></uni-data-select>
			</u-form-item>
			<u-form-item label="型号" prop="model" required  borderBottom>
				<uni-data-select
				placeholder="请选择型号"
				 v-model="form.model"
				 :localdata="columns4"
				   ></uni-data-select>
			</u-form-item>
			<u-form-item label="价格" prop="price" required  borderBottom>
				<u--input placeholder="请输入价格" inputAlign="right" border="false" v-model="form.price" ></u--input>
			</u-form-item>
			<u-form-item label="尺寸" prop="size" required  borderBottom>
				<uni-data-select
				placeholder="请选择尺寸"
				 v-model="form.size"
				 :localdata="columns5"
				   ></uni-data-select>
			</u-form-item>
			<u-form-item label="绑定传感器" prop="senderId" borderBottom>
				 <u--input 	placeholder="请输入传感器" inputAlign="right" border="false" v-model="form.senderId" ></u--input>
			</u-form-item>
			<u-form-item label="螺纹规格" prop="threadSpec" required  borderBottom>
				<uni-data-select
				placeholder="请选择螺纹规格"
				 v-model="form.threadSpec"
				 :localdata="columns6"
				   ></uni-data-select>
			</u-form-item>
			<u-form-item label="材质" prop="material" required  borderBottom>
				<uni-data-select
				placeholder="请选择材质"
				 v-model="form.material"
				 :localdata="columns7"
				   ></uni-data-select>
			</u-form-item>
			<u-form-item label="备注" prop="remark" borderBottom>
				 <u--input 	placeholder="请输入备注" inputAlign="right" border="false" v-model="form.remark" ></u--input>
			</u-form-item>
	  	</view>
	  </u-form>
	  </view>
	  <view style="height: 148upx;display: flex;align-items: center;background-color: white;" offsetTop="1100upx">
	  	<view class="subbtnbox">
	  		<u-button  @click="Cancel" >取消</u-button>
	  		<u-button v-if="!id" type="primary" @click="Save">保存</u-button>
	  		<u-button v-if="id" type="primary" @click="Savechange">保存</u-button>
	  		<u-button v-if="!id" class="custom-style" type="primary" @click="nextadd()">保存并下一条</u-button>
	  	</view>
	  </view>
  </view>
</template>

<script>
  import {
    getWarehouseList,
    getlifecycle,
    getKey,
    paramType,
    hub
  } from "@/api/tirePressure.js"
  import { hubinfo, hunchange } from '@/api/carlive'
  export default {
    data() {
      return {
        columns1: [],
		columns2:[],
		columns3:[],
		columns4:[],
		columns5:[],
		columns6:[],
		columns7:[],
		form:{
			warehouseId:'',
		},
		rules: {
			boltPattern: [{ required: true, message: "孔距不能为空", trigger: "blur" }],
			brand: [{ required: true, message: "品牌不能为空", trigger: "blur" }],
			companyId: [{ required: true, message: "所属组织不能为空", trigger: "blur" }],
			compatibleVehicle: [{ required: true, message: "兼容车型不能为空", trigger: "blur" }],
			hubNo: [{ required: true, message: "轮毂编号不能为空", trigger: "blur" }],
			material: [{ required: true, message: "材质不能为空", trigger: "blur" }],
			model: [{ required: true, message: "型号不能为空", trigger: "blur" }],
			price: [
				{ required: true,type:'number', message: "价格不能为空", trigger: "blur" },
				{
					pattern:/^\d+(\.\d+)?$/,
					message: "价格格式不正确",
					trigger: "blur"}
				],
			size: [
				{ required: true, message: "尺寸不能为空", trigger: "blur" },
				],
			threadSpec: [{ required: true, message: "螺纹规格不能为空", trigger: "blur" }],
			warehouseId: [{ required: true, message: "所属仓库不能为空", trigger: "blur" }],
		},
		id:''
      }
    },
	// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	},
	onLoad(option) {
		if(option.id){
			this.id=option.id
			hubinfo(option.id).then(res=>{
				this.form=res.data
			})
		}
	   // 仓库
		getWarehouseList({}).then(res=>{
			if (res.data.items.length != 0) {
				 res.data.items.map(item => {
					this.columns1.push({text:item.warehouseName,value:item.id})
				 })
			   }
		})
		// 品牌
		paramType("tire_brand_param").then(res=>{
			if (res.data.length != 0) {
			  res.data.map(item => {
			    this.columns2.push({text:item.paramName,value:item.paramCode})
			  })
			}
		})
		// 孔距
		paramType("tire_pitch_row_param").then(res=>{
			if (res.data.length != 0) {
			  res.data.map(item => {
			    this.columns3.push({text:item.paramName,value:item.paramCode})
			  })
			}
		})
		// 型号
		paramType("tire_model_param").then(res=>{
			if (res.data.length != 0) {
			  res.data.map(item => {
			    this.columns4.push({text:item.paramName,value:item.paramCode})
			  })
			}
		})
		// 尺寸
		paramType("tire_size_param").then(res=>{
			if (res.data.length != 0) {
			  res.data.map(item => {
			    this.columns5.push({text:item.paramName,value:item.paramCode})
			  })
			}
		})
		// 螺纹规格
		paramType("tire_thread_specification_param").then(res=>{
			if (res.data.length != 0) {
			  res.data.map(item => {
			    this.columns6.push({text:item.paramName,value:item.paramCode})
			  })
			}
		})
		// 材质
		paramType("hub_material_param").then(res=>{
			if (res.data.length != 0) {
			  res.data.map(item => {
			    this.columns7.push({text:item.paramName,value:item.paramCode})
			  })
			}
		})
    },
    methods: {
		// 仓库数据处理
		warehouse(val){
			this.columns1.map(item=>{
				if(item.value == val){
					this.form.warehouseName=item.text
				}
			})
		},
		// 扫码
		can(){
			uni.scanCode({
				success: (res) => {
					this.form.hubNo=res.result
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
		// 取消
		Cancel(){
			uni.redirectTo({
				url: '/pages/warehouse/hub'
			})
		},
		// 保存
		Save(){
			this.$refs.uForm.validate().then(res => {
				hub(this.form).then(ress=>{
					if(ress.code == 200){
						uni.$u.toast('轮毂入库成功')
						setTimeout(() => {
							uni.redirectTo({
								url: '/pages/warehouse/hub'
							})}, 1000);
						
					}else{
						uni.$u.toast(ress.message)
					}
				})
			}).catch(errors => {
				uni.$u.toast('校验失败,请完整填写表单')
			})
		},
		// 修改
		Savechange(){
			this.$refs.uForm.validate().then(res => {
				hunchange(this.form).then(ress=>{
					if(ress.code == 200){
						uni.$u.toast('轮毂修改成功')
						setTimeout(() => {
							uni.redirectTo({
								url: '/pages/warehouse/hub'
							})}, 1000);
						
					}else{
						uni.$u.toast(ress.message)
					}
				})
			}).catch(errors => {
				uni.$u.toast('校验失败,请完整填写表单')
			})
		},
		// 保存并下一条
		nextadd(){
			this.$refs.uForm.validate().then(res => {
				hub(this.form).then(res=>{
					if(res.code == 200){
						uni.$u.toast('轮毂入库成功')
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
			this.form.warehouseId=''
			this.form.brand=''
			this.form.hubNo=''
			this.form.senderId=''
			this.form.material=''
			this.form.boltPattern=''
			this.form.model=''
			this.form.price=''
			this.form.size=''
			this.form.threadSpec=''
			this.form.remark=''
			this.$refs.uForm.clearValidate()
		},
    }
  }
</script>

<style lang="scss" scoped>
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
	/deep/.subbtnbox .u-button{
		width: 25% !important;
	}
	/deep/.subbtnbox .u-button:nth-child(3){
		width: auto !important;
	}
	/deep/.u-radio-group--column{
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
	}
	/deep/.uni-select__input-text{
		text-align: right !important;
	}
	/deep/.u-form-item__body__right__message{
		text-align: right;
	}
</style>