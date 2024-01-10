<template>
	<view class="content">
		<u-sticky bgColor="#F5F7FB">
			<view style="display: flex;flex-direction: column;flex: 1 auto;">
				<u-form :model="queryform" >
						<u-tabs
						:list="list" 
						bar-width="100upx" 
						:is-scroll="false" 
						:current="current" 
						lineColor="#1862F5"
						:inactiveStyle="{ color: '#8A8EA6'}"
						itemStyle="width:50%;padding-left: 15px; padding-right: 15px; height: 40px;background:white;box-sizing: border-box;"
						@change="change"></u-tabs>
						<view style="width: 100%;display: flex;justify-content: center;">
							<view style="display: flex;justify-content: space-between;margin: 30upx 0;align-items: center;width: 710upx;">
								<!-- <uni-combox class="dwoclass" @input="getList" :border="false"   v-model="queryform.tireNo" :candidates="chetai"  placeholder="轮胎号"></uni-combox> -->
								 <view class="dwoclass">
								 	<u--input
								 	   placeholder="轮胎号"
								 	   border="false"
								 	   v-model="queryform.tireNo"
								 		shape="circle"
								 	   @change="getList"
								 	 ></u--input>
								 </view>
								<view style="background-color: white;border-radius: 180upx;padding:14upx 38upx;box-sizing: border-box;" @click="can">
									<image src="https://tpms.5i84.cn/img/images/carlive/saoma.png" mode="" style="width: 42upx;height: 40upx;"></image>
								</view>
							</view>
						</view>
				<view>
					 <u-picker 
					 @cancel="showcancel"  
					 :show="show" 
					 ref="uPicker" 
					 :columns="[tireclass]"
					 @confirm= "sureChoose" 
					 :immediateChange="true"
					  ></u-picker>
					  <u-picker
					  @cancel="showztcancel"  
					  :show="showzt" 
					  :columns="[ztcalss]"
					  @confirm= "sureChoosetwo" 
					  :immediateChange="true"
					   ></u-picker>
					   <u-picker
					   @cancel="showkbcancel"  
					   :show="showkb" 
					   :columns="[kbcalss]"
					   @confirm= "sureChoosethree"
					   :immediateChange="true"
					    ></u-picker>
					<view class="buttonbox">
						<u-button class="custom-style" @click="show = true" shape="circle">
							{{showtext||'轮胎分类'}}
							<u-icon size="10" name="arrow-down"></u-icon>
						</u-button>
						<u-button class="custom-style" @click="showzt = true"  shape="circle">
							{{showztext||'轮胎状态'}}
							<u-icon size="10" name="arrow-down"></u-icon>
						</u-button>
						<u-button class="custom-style" @click="showkb = true"  shape="circle">
							{{showkbtext||'捆绑状态'}}
							<u-icon size="10" name="arrow-down"></u-icon>
						</u-button>
						<u-button class="custom-style" @click="moreserch = !moreserch"  shape="circle">
							<u-icon size="14" name="hourglass"></u-icon>
							筛选
						</u-button>
					</view>
				</view>
				</u-form>
				<!-- 京东菜单 -->
				<view class="main" v-show="moreserch">
						<view class="container">
							<scroll-view class='nav_left' scroll-y='true'>
								<block v-for="(item,index) in cateItems" v-bind:key="index">
									<view :class="curNav==item.cate_id?'active':''" class="nav_left_items"
										@click="switchRightTab(item.cate_id,index)">{{item.cate_name}}</view>
								</block>
							</scroll-view>
							<scroll-view class="nav_right" scroll-y="true">
								<view v-show="cateItems[0].children.length>0 && curIndex == 0">
								<u-radio-group v-model="moredata[0].name">
									<block v-for="(item,index) in cateItems[0].children" v-bind:key="index">
										<view class="nav_right_items">
											    <u-radio
											      :customStyle="{marginBottom: '8px'}"
											      :key="index"
											      :label="item.text"
											      :name="item.text"
											    >
											</u-radio>
										</view>
									</block>
									</u-radio-group>
								</view>
								<view v-show="cateItems[1].children.length>0 && curIndex == 1">
								<u-radio-group v-model="moredata[1].name">
									<block v-for="(item,index) in cateItems[1].children" v-bind:key="index">
										<view class="nav_right_items">
											    <u-radio
											      :customStyle="{marginBottom: '8px'}"
											      :key="index"
											      :label="item.text"
											      :name="item.text"
											    >
											</u-radio>
										</view>
									</block>
									</u-radio-group>
								</view>
								<view v-show="cateItems[2].children.length>0 && curIndex == 2">
								<u-radio-group v-model="moredata[2].name">
									<block v-for="(item,index) in cateItems[2].children" v-bind:key="index">
										<view class="nav_right_items">
											    <u-radio
											      :customStyle="{marginBottom: '8px'}"
											      :key="index"
											      :label="item.text"
											      :name="item.text"
											    >
											</u-radio>
										</view>
									</block>
									</u-radio-group>
								</view>
							</scroll-view>
						</view>
						<view style="display: flex;justify-content: space-around;">
							<u-button  text="重置" @click="resetarray"></u-button>
							<u-button type="primary" text="确定" @click="jinmenu"></u-button>
						</view>
					</view>
			</view>
			
			
		</u-sticky>
		<view class="tablecon">
			<view class="tableul">
				<view class="tableli" v-for="(item,index) in tabledate" @click="gotirelistinfo(item)">
					<view class="litop">
						<image src="https://tpms.5i84.cn/img/images/carlive/liimg.png" mode="" style="width: 100upx;height: 100upx;"></image>
						<view style="height: 96upx;display: flex;flex-direction: column;width: 400upx;justify-content: space-between;width:calc(100% - 110upx)">
							<view class="tireno">{{item.tireNo}}</view>
							<view class="zhu">
								<text style="margin-right: 20upx;">{{item.warehouseName}}</text>
								<text>状态：{{ flttre(item.stockStatus) }}</text>
							</view>
						</view>
					</view>
					<view class="lidown">
						<view class="downcon">
							<view class="dowcontitle">品牌</view>
							<view class="dowconcon">
								{{item.tireBrandName}}
							</view>
						</view>	
						<view class="downcon">
							<view class="dowcontitle">规格</view>
							<view class="dowconcon">
								{{item.specificationsName}}
							</view>
						</view>	
						
						<view class="downcon">
							<view class="dowcontitle">累计里程(km)</view>
							<view class="dowconcon">
								{{item.totalMileage || "0"}}
							</view>
						</view>	
						
						<view class="downcon">
							<view class="dowcontitle">传感器ID</view>
							<view class="dowconcon">
								<text v-if="item.senderId">
									{{item.senderId}}
								</text>
								<text v-else style="color: #FF5733;">
									未绑定
								</text>
							</view>
						</view>	
					</view>
				</view>
			</view>
		</view>
		<view  v-show="is_show && tabledate" style="text-align: center; width: 100%; padding: 50rpx 0;" >
			没有更多数据了
		</view>
		<view v-if="!tabledate"  style="width: 100%; padding: 50rpx 0;display: flex;flex-direction: column;justify-content: center;align-items: center;color: #666666;">
			 <image src="@/static/images/nodata.png" mode=""></image>
			 暂无数据
		</view>
	</view>
</template>

<script>
	import { getDicts } from "@/api/system/dict/data";
	import {tirelist, warehouselist, getTireBands, getSpecifications } from '@/api/carlive'
	
	export default {
			data() {
				return {
					chetai:[],//胎号下拉框
					queryform:{
						tireNo:'',
						pageNum:1,
						pageSize:10,
						isUse:'0'
					},
					total:0,
					tabledate:[],
					moreserch:false,
					list: [{
						name: '可用轮胎',
						value:'0'
						
					}, {
						name: '报废轮胎',
						value:'-1'
					}],
					current: 0,
					show: false,
					showzt:false,
					showkb:false,
					tireclass:[],//轮胎分类下拉框
					ztcalss:[],//轮胎状态下拉款
					kbcalss:[
						{text:"已绑定传感器",value:"1"},
						{text:"未绑定传感器",value:"0"}
					],
					cateItems: [{
							"children": [],
							"cate_name": "所属仓库",
							"cate_id": 0
						},
						{
							"children": [],
							"cate_name": "轮胎品牌",
							"cate_id": 1
						},
						{
							"children": [],
							"cate_name": "规格",
							"cate_id": 2
						}
					],
			curNav: 0,
			curIndex: 0,
			moredata:[{name:''},{name:''},{name:''}],
			showtext:'',
			showztext:'',
			showkbtext:'',
			 is_show: false,
			}
		},
		onBackPress(e) {
				uni.switchTab({
					url: '/pages/hub/hub'
				});
				return true;
			},
		// onLoad(option){
		// 	if(option.isUseVehicle && option.isUseVehicle == 0){
		// 		this.queryform.isUseVehicle=0
		// 		uni.setNavigationBarTitle({
		// 			title:'未装车轮胎'
		// 		})
		// 		this.getList()
		// 	}else if(option.isUseVehicle && option.isUseVehicle == 1){
		// 		this.queryform.isUseVehicle=1
		// 		uni.setNavigationBarTitle({
		// 			title:'已装车轮胎'
		// 		})
		// 		this.getList()
		// 	}else{
		// 		uni.setNavigationBarTitle({
		// 			title:'轮胎列表'
		// 		})
		// 		this.getList()
		// 	}
		// },
		methods: {
			getList(){
				tirelist(this.queryform).then(res=>{
					if(res.code == 200){
						this.total=res.data.total
						this.tabledate=res.data.items
					}
				})
			},
			switchRightTab(id, index) {
				this.curNav = id;
				this.curIndex = index;
				this.$forceUpdate()
			},
			resetarray(){
				this.moredata[0].name=''
				this.moredata[1].name=''
				this.moredata[2].name=''
				this.queryform.warehouseId=''
				this.queryform.tireBrandId=''
				this.queryform.specificationsId=''
			},
			// 是否可用轮胎切换
			change(val) {
				this.queryform.warehouseId=''
				this.queryform.tireBrandId=''
				this.queryform.specificationsId=''
				this.queryform.isUse=val.value
				this.queryform.category=''
				this.queryform.stockStatus=''
				this.queryform.pageNum=1
				this.queryform.pageSize=10
				this.getList()
			},
			// 轮胎分类选择确定
			sureChoose(e) {
				this.queryform.category=e.value[0].value
				this.showtext=e.value[0].text
				this.queryform.pageNum=1
				this.queryform.pageSize=10
				this.getList()
				this.show = false
			},
			// 轮胎分类选择取消
			showcancel(){
				this.queryform.category=''
				this.showtext=''
				this.queryform.pageNum=1
				this.queryform.pageSize=10
				this.getList()
				this.show = false
			},
			// 轮胎状态选择确定
			sureChoosetwo(e){
				this.queryform.stockStatus=e.value[0].value
				this.showztext=e.value[0].text
				this.queryform.pageNum=1
				this.queryform.pageSize=10
				this.getList()
				this.showzt = false
			},
			showztcancel(){
				this.queryform.stockStatus=''
				this.showztext=''
				this.queryform.pageNum=1
				this.queryform.pageSize=10
				this.getList()
				this.showzt = false
				
			},
			// 捆绑状态选择确定
			sureChoosethree(e){
				this.queryform.sensorStatus=e.value[0].value
				this.showkbtext=e.value[0].text
				this.queryform.pageNum=1
				this.queryform.pageSize=10
				this.getList()
				this.showkb = false
			},
			showkbcancel(){
				this.queryform.sensorStatus=''
				this.showkbtext=''
				this.queryform.pageNum=1
				this.queryform.pageSize=10
				this.getList()
				this.showkb = false
			},
			// 扫码
			can(){
				uni.scanCode({
					success: (res) => {
						this.queryform.tireNo=res.result
						this.getList()
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
			jinmenu(){
				this.cateItems[0].children.map(item=>{
					if(item.text == this.moredata[0].name){
						this.queryform.warehouseId=item.value
					}
				})
				this.cateItems[1].children.map(item=>{
					if(item.text == this.moredata[1].name){
						this.queryform.tireBrandId=item.value
					}
				})
				this.cateItems[2].children.map(item=>{
					if(item.text == this.moredata[2].name){
						this.queryform.specificationsId=item.value
					}
				})
				this.getList()
				this.moreserch=false
			},
			flttre(e){
				for(let i=0;i<this.ztcalss.length;i++){
					if(this.ztcalss[i].value == e){
						return this.ztcalss[i].text
					}
				}
			},
			// 轮胎详情
			gotirelistinfo(e){
				uni.navigateTo({
					url:'/pageA/carlive/tirelistinfo/tirelistinfo?id=' + e.tireId
				})
			}
		},
		mounted() {
			// 轮胎分类
			getDicts("lifecycle_tire_category").then(response => {
				response.data.map(item=>{ 
					this.tireclass.push({text:item.dictLabel,value:item.dictValue})
				})
			  })
			  
			  // 轮胎状态
			  getDicts("lifecycle_tire_status").then(response => {
				response.data.map(item=>{
					this.ztcalss.push({text:item.dictLabel,value:item.dictValue})
				})
				})
			// tirelist({pageNum:1,pageSize:10000}).then(res=>{
			// 	if(res.code == 200){
			// 		res.data.items.map(item=>{
			// 			this.chetai.push(item.tireNo)
			// 		})
			// 	}
			// })
			
			// 仓库下拉框数据
			warehouselist({pageNum:1,pageSize:10000}).then(res=>{
					this.cateItems[0].children=res.data.items.map(item=>{
					return {
						value:item.id,
						text:item.warehouseName
					}
				})
			})
			
			// 品牌
			getTireBands().then(res=>{
				this.cateItems[1].children=res.data.map(item=>{
					return {
						value:item.paramId,
						text:item.paramName
					}
				})
			})
			// 规格
			getSpecifications().then(res=>{
				this.cateItems[2].children=res.data.map(item=>{
					return {
						value:item.paramId,
						text:item.paramName
					}
				})
			})
			this.getList()
		},
		watch:{
			moreserch(val){
				if(val){
					event.preventDefault();
				}
			}
		},
		onReachBottom() { //触底事件
			if (this.queryform.pageNum * this.queryform.pageSize >= this.total) {
				this.is_show = true;
			} else {
				this.is_show = false;
				if (this.queryform.pageNum <= this.queryform.pageNum - 1) {
					setTimeout(() => {
						uni.hideLoading()
					}, 500)
				} else {
					uni.showLoading({
						title: '加载中'
					});
					this.queryform.pageNum++
					tirelist(this.queryform).then(res=>{
						if(res.code == 200){
							this.total=res.data.total
							this.tabledate=[...this.tabledate,...res.data.items]
						}
					})
				}
				setTimeout(() => {
					uni.hideLoading()
				}, 500)
			}
		}
	}
	</script>

<style scoped>
u-tabs{
	width: 100%;
}
.serchbox{
	width: 100%;
	display: flex;
	justify-content: center;
	height: 106upx;
	margin-top: 20upx;
}
.buttonbox{
	width: 100%;
	display: flex;
	justify-content: space-around;
	height: 84upx;
	font-size: 24upx;
}
/deep/.u-icon--right{
	font-size: 24upx !important;
}
/deep/.u-button--circle{
	font-size: 24upx !important;
	display: flex !important;
	align-items: center !important;
	justify-content: space-around !important;
	 width:180upx !important;
	 height: 68upx !important;
	 /* marign-right:18upx; */
}
/deep/.u-button--normal{
	font-size: 24upx !important;
}
/deep/.dwoclass{
	text-align: center;
	border: none;
	width: 574upx;
	background-color: white;
	border-radius: 180upx;
}
/deep/.uni-select__input-placeholder{
	color: #010914;
	text-align: center;
}


	/* 搜索栏 */
	.main{
		width: 100%;
		height: 100vh;
		background-color:rgba(0,0,0,0.5);
	/* 	position: fixed;
		z-index: 989; */
	}
	.main .search {
		width: 100%;
		padding: 20rpx 0rpx;
		background: #c40f14;
	}

	.main .search .search-input {
		display: flex;
		justify-content: center;
		height: 80rpx;
		line-height: 80rpx;
		width: 90%;
		margin: auto;
		border-radius: 10rpx;
		background: white;
		color: #a9a9a9;
	}

	.main .search .search-input .search-img {
		width: 40rpx;
		height: 40rpx;
		display: table-cell;
		text-align: center;
		vertical-align: middle;
		margin-right: 10rpx;
		margin-top: 10rpx;
	}

	.main .search .search-input .search-img image {
		width: 100%;
		height: 100%;
	}
	/* 分类 */
	.container {
		display: flex;
		justify-content: space-between;
		width: 100%;
		background-color: #FFF;
	}

	.nav_left {
		width: 25%;
		height: 100%;
		background:#F5F7FB;
		text-align: center;
	}

	.nav_left .nav_left_items {
		height: 100rpx;
		line-height: 100rpx;
		font-size: 28rpx;
	}

	.nav_left .nav_left_items:last-child {
		margin-bottom: 150rpx;

	}

	.nav_left .nav_left_items.active {
		position: relative;
		background: #FFF;
		color:#1862F5;
	}

	.nav_left .nav_left_items.active::before {
		display: inline-block;
		width: 6rpx;
		height: 60rpx;
		background:#1862F5;
		content: '';
		position: absolute;
		top: 20rpx;
		left: 0;
	}

	.nav_right {
		width: 75%;
		height: 100%;
	}

	.nav_right .nav_right_items {
		float: left;
		width: 33.33%;
		text-align: center;
		padding: 20rpx 0;
	}

	.nav_right .nav_right_items:last-child {
		margin-bottom: 150rpx;

	}

	.nav_right .nav_right_items image {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
	}

	.nav_right .nav_right_items text {
		display: block;
		margin-top: 10rpx;
		font-size: 28rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: #737373;
	}

	.nocate {
		padding: 100rpx;
		text-align: center;
	}

	.nocate image {
		width: 70rpx;
		height: 70rpx;
	}

	.nocate text {
		font-size: 28rpx;
		display: block;
		color: #BBB;
	}

	/*隐藏滚动条*/
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}
	/deep/.u-radio-group--row{
		flex-wrap: wrap;
		padding: 28upx;
	}
	/deep/.nav_right .nav_right_items{
		width: auto;
		margin-right: 30upx;
	}
	.tablecon{
		width: 100%;
		display: flex;
		justify-content: center;
	}
	.tablecon .tableul{
		width: 710upx;
	}
	.tablecon .tableul .tableli{
		margin-top: 20upx;
		background-color: white;
		border-radius: 20upx;
		padding: 20upx;
	}
	 .tableli .litop{
		 width: 524upx;
		 display: flex;
		 align-items: center;
		 justify-content: space-between;
		 height: 100upx;
		 width: 100%;
	 }
	 .tireno{
		 font-size: 32upx;
		 color: #010914 ;
		 display: block;
	 }
	  .litop .zhu{
		  font-size: 24upx;
		  color: #5C5F66;
	  }
	  .lidown{
		  width: 670upx;
		  background: #F5F7FB;
		  border-radius: 20upx;
		  height: 120upx;
		  display: flex;
		  justify-content: space-around;
		  align-items: center;
		  margin-top: 32upx;
	  }
	  .downcon{
		  display: flex;
		  flex-direction: column;
		  align-items: center;
		  justify-content: center;
		 width: 25%;
	  }
	  .downcon .dowcontitle{
		  font-size: 24upx;
		  color:#8A8EA6;
		    line-height: 34upx;
			margin-bottom: 8upx;
	  }
	  .downcon .dowconcon{
		  font-size: 24upx;
		  color:#010914;
		  width: 100%;
		    line-height: 34upx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space:nowrap;
			text-align: center;
	  }
	  /deep/.buttonbox .u-button--circle{
	  		  flex: 1;
	  		  text-align: center;
	  		  width: 200rpx;
	  		  height: 68rpx;
	  		  line-height: 68rpx;
	  		  background: #FFFFFF;
	  		  border-radius: 180rpx;
	  		  margin: 0 10rpx;
	  		  font-size:24rpx;
	  		  white-space: nowrap;
	  		  text-overflow: ellipsis;
	  		  overflow: hidden;
	  }
</style>
