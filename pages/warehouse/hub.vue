<template>
	<view class="content">
		<u-sticky bgColor="#F5F7FB">
			<view style="display: flex;flex-direction: column;flex: 1 auto;">
				<view style="width: 100%;display: flex;justify-content: center;">
					<view style="display: flex;justify-content: space-between;margin: 30upx 0;align-items: center;width: 710upx;">
						 <view class="dwoclass">
							<u--input
							   placeholder="轮毂号"
							   border="false"
							   v-model="queryform.hubNo"
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
					 :columns="[warelist]"
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
							{{showtext|| '所属仓库'}}
							<u-icon size="10" name="arrow-down"></u-icon>
						</u-button>
						<u-button class="custom-style" @click="showzt = true"  shape="circle">
							{{showzttext|| '状态'}}
							<u-icon size="10" name="arrow-down"></u-icon>
						</u-button>
						<u-button class="custom-style" @click="showkb = true"  shape="circle">
							{{showkbtext|| '材质'}}
							<u-icon size="10" name="arrow-down"></u-icon>
						</u-button>
						<!-- <u-button class="custom-style" @click="moreserch = !moreserch"  shape="circle">
							<u-icon size="14" name="hourglass"></u-icon>
							筛选
						</u-button> -->
					</view>
				</view>
				</u-form>
			</view>
			
			
		</u-sticky>
		<view class="tablecon">
			<view class="tableul">
				<view class="tableli" v-for="(item,index) in tabledate" @click="gotirelistinfo(item)">
					<view class="litop">
						<image src="@/static/images/hub.png" mode="" style="width: 100upx;height: 100upx;"></image>
						<view style="height: 96upx;display: flex;flex-direction: column;width: 400upx;justify-content: space-between">
							<view class="tireno">{{item.hubNo}}</view>
							<view class="zhu">
								<text style="margin-right: 20upx;">{{item.warehouseName}} </text>
								<text>安装状态：{{ flttre(item.install) }}</text>
							</view>
						</view>
					</view>
					<view class="lidown">
						<view class="downcon">
							<view class="dowcontitle">品牌</view>
							<view class="dowconcon">
								{{konfun(item.brand)}}
							</view>
						</view>	
						<view class="downcon">
							<view class="dowcontitle">规格</view>
							<view class="dowconcon">
								{{luofun(item.threadSpec)}}
							</view>
						</view>	
						
						<view class="downcon">
							<view class="dowcontitle">材质</view>
							<view class="dowconcon">
								{{ caifun(item.material) }}
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
	import { hublist, soucollist, warehouselist, getTireBands, getSpecifications } from '@/api/carlive'
	export default {
			data() {
				return {
					queryform:{
						hubNo:'',
						pageNum:1,
						pageSize:10
					},
					total:0,
					tabledate:[],
					kongju:[],
					guige:[],
					caizhi:[],
					show: false,
					showzt:false,
					showkb:false,
					warelist:[],
					ztcalss:[
						{value:0,text:"已上车"},
						{value:1,text:"未上车"},
					],
					kbcalss:[],
					showtext:'',
					showzttext:'',
					showkbtext:'',
					is_show:false
			}
		},
			methods: {
				getList(){
					hublist(this.queryform).then(res=>{
						if(res.code == 200){
							this.total=res.data.total
							this.tabledate=res.data.items
						}
					})
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
				// 所属仓库确定
				sureChoose(e) {
					this.queryform.warehouseId=e.value[0].value
					this.showtext=e.value[0].text
					this.queryform.pageNum=1
					this.queryform.pageSize=10
					this.getList()
					this.show = false
				},
				showcancel(){
					this.queryform.warehouseId=''
					this.showtext=''
					this.queryform.pageNum=1
					this.queryform.pageSize=10
					this.getList()
					this.show = false
				},
				// 轮毂安装状态选择确定
				sureChoosetwo(e){
					this.queryform.install=e.value[0].value
					this.showzttext=e.value[0].text
					this.queryform.pageNum=1
					this.queryform.pageSize=10
					this.getList()
					this.showzt = false
				},
				showztcancel(){
					this.queryform.install=''
					this.showzttext=''
					this.queryform.pageNum=1
					this.queryform.pageSize=10
					this.getList()
					this.showzt = false
				},
				// 材质选择确定
				sureChoosethree(e){
					this.queryform.material=e.value[0].value
					this.showkbtext=e.value[0].text
					this.queryform.pageNum=1
					this.queryform.pageSize=10
					this.getList()
					this.showkb = false
				},
				showkbcancel(){
					this.queryform.material=''
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
							this.queryform.hubNo=res.result
							this.queryform.pageNum=1
							this.queryform.pageSize=10
							this.getList()
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
				flttre(e){
					if(e == 0 ){
						return '已上车'
					}else{
						return '未上车'
					}
				},
				//轮毂详情
				gotirelistinfo(e){
					uni.navigateTo({
						url:'/pages/warehouse/hubinfo?id=' + e.id
					})
				}
			},
			mounted() {
				// 品牌下拉框
				soucollist({paramType:"tire_brand_param"}).then(res=>{
					this.kongju=res.data
				})
				soucollist({paramType:"tire_thread_specification_param"}).then(res=>{
					this.guige=res.data
				})
				soucollist({paramType:"hub_material_param"}).then(res=>{
					this.caizhi=res.data
					this.kbcalss=res.data.map(item=>{
						return {
							value:item.paramCode,
							text:item.paramName
						}
					})
				})
				// 仓库下拉框数据
				warehouselist().then(res=>{
						this.warelist=res.data.items.map(item=>{
						return {
							value:item.id,
							text:item.warehouseName
						}
					})
				})
				this.getList()
			},
			onBackPress(e) {
					uni.switchTab({
						url: '/pages/hub/hub'
					});
					return true;
				},
			onUnload() {
			    //#ifdef MP-WEIXIN
			    wx.reLaunch({
			      url: '/pages/hub/hub'
			    })
			    //#endif
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
						hublist(this.queryform).then(res=>{
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
	 width:240upx !important;
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
	/* display: flex; */
	/* padding: 5px 0;
	height: 45rpx; */
}
/* .dwoclass .u-input{
	width: 50%;
}
.dwoclass .u-input:nth-child(2){
	border-radius: 0;
	border-left: 1px solid #DADCE6;
} */
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
