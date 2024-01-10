<template>
  <view class="center">
    <u-sticky bgColor="#F5F7FB">
      <view class="top">
        <view class="allocate" :style="{color:onecolor}" @click="choose(2)">单条调拨</view>
        <view class="allocate" :style="{color:allcolor}" @click="choose(3)">批量调拨</view>
      </view>
    </u-sticky>
    <view v-if="status==2">
      <view class="test" style="margin-top: 18rpx; display: flex;align-items: center; justify-content: space-between;">
        <view class="text"><text class="symbol">*</text>胎号</view>
        <view style="display:flex;align-items: center;">
            <superwei-combox
              style="width: 340rpx"
              :candidates="tireNoData"
              :isJSON="true"
              keyName="tireNo"
              placeholder="请选择胎号"
              @select="selectTireNo"
              v-model="form.tireNo"
            ></superwei-combox>
        <image @click="can" style="width: 48upx;height: 48upx;padding-right: 30rpx;"
          src="https://tpms.5i84.cn/img/images/carlive/crams.png" mode=""></image>
        </view>
      </view>
      <view class="test">
        <view class="text">所属仓库</view>
        <u-picker></u-picker>
        <view class="text1">{{form.warehouseName}}</view>
      </view>
      <view class="test">
        <view class="text"><text class="symbol">*</text>仓库分配</view>
        <u-picker :show="show" :columns="warehouse" @confirm="confirm" @cancel="cancel" closeOnClickOverlay
          @close="close" :immediateChange="true"></u-picker>
        <view class="text1" @click="show = true" style="color: #B4B5BF;" v-if="!Warehouse1">请选择></view>
        <view class="text1" @click="show = true" v-else>{{Warehouse1}}</view>
      </view>
      <view class="test">
        <view class="text">品牌</view>
        <u-picker></u-picker>
        <view class="text1">{{form.tireBrandName}}</view>
      </view>
      <view class="test">
        <view class="text">规格</view>
        <u-picker></u-picker>
        <view class="text1">{{form.specificationsName}}</view>
      </view>
      <view class="test">
        <view class="text">花纹型号</view>
        <u-picker></u-picker>
        <view class="text1">{{form.pattern}}</view>
      </view>
      <view class="test" style="display: flex;align-items: center; justify-content: space-between;">
        <view class="text">新胎花纹深度</view>
        <u-picker></u-picker>
        <view class="text1">{{form.depth}}</view>
        <text style="margin-right: 30rpx;">mm</text>
      </view>
    </view>

    <view v-else>
      <u-sticky bgColor="#F5F7FB">
        <view class="add">
          <u-icon name="plus-circle-fill" color="#2979ff" size="28" @click="add"></u-icon>
          <view class="Addrecord" style="padding-right: 400rpx;" @click="add">新增记录</view>
          <u-icon name="close-circle-fill" size="28" @click="alldel"></u-icon>
        </view>
      </u-sticky>
      <view style="padding-bottom: 148rpx;">
        <view class="card" v-for="(item,ind) in arr" :key="ind">
          <image src="https://tpms.5i84.cn/img/images/warehouse/house.png"
            style="width: 100rpx;height: 100rpx;margin-left:20upx;"></image>
          <view style="margin-left:24rpx; width: 400rpx;height: 92rpx;margin-right: 50rpx;">
            <view class="txt">{{item.tireNo}}</view>
            <view class="txt1">{{item.warehouseName}}</view>
          </view>
          <u-icon name="trash" color="#FF623A" size="28" @click="del(ind)"></u-icon>
        </view>
      </view>
    </view>

    <view v-if="status==2"
      style="position: fixed;bottom: 0;width: 100%;height: 148rpx;background-color: #fff;line-height: 148rpx;display: flex;align-items: center;">
      <view class="btn" @click="Cancel" style="background-color: #F5F7FB; color: #010914;">取消</view>
      <view class="btn" @click="Save" style="background-color: #1862F5; color: #F5F7FB;">保存</view>
    </view>

    <view v-else
      style="position: fixed;bottom: 0;width: 100%;height: 148rpx;background-color: #fff;line-height: 148rpx;display: flex;align-items: center;">
      <view class="test1" style="text-align: center;">
        <view class="text1" @click="show = true" v-if="!Warehouse2">请选择分配的仓库</view>
        <view class="text1" @click="show = true" v-else>{{Warehouse2}}</view>
        <u-picker :show="show" :columns="warehouse" @confirm="confirm" @cancel="cancel" closeOnClickOverlay
          @close="close" :immediateChange="true"></u-picker>
      </view>
      <view class="btn1" @click="open" style="background-color: #1862F5; color: #F5F7FB;">保存</view>
    </view>


    <u-popup :show="show2" background-color="#fff" mode="center" round="10">
      <view class="alladd" style="width: 640rpx;height: 944rpx;padding-left: 40rpx;background: #F5F7FB;border-radius: 20rpx;position: relative;">
        <image src="https://tpms.5i84.cn/img/images/warehouse/close.png" @click="close1"
        style="position: absolute;right: 0rpx;top:-100rpx;width: 60upx;height: 62upx;"></image>
        <view style="text-align: center;font-size: 36rpx; height: 124rpx;width: 640rpx;line-height: 124rpx;">
          新增轮胎调拨
        </view>
        <view style="color: #5C5F66;">
          <text class="symbol">*</text>胎号
          <view class="search-box" style="display: flex; align-items: center;">
            <!-- <u--input placeholder="请输入胎号" v-model="form.tireNo">
            </u--input> -->
             <superwei-combox
              style="width: 500rpx"
              :candidates="tireNoData"
              :isJSON="true"
              keyName="tireNo"
              placeholder="请选择胎号"
              @select="selectTireNo"
              v-model="form.tireNo"
            ></superwei-combox>
            <image @click="can" style="width: 48upx;height: 48upx;padding-right: 30rpx;"
              src="https://tpms.5i84.cn/img/images/carlive/crams.png" mode=""></image>
          </view>
        </view>
        <view class="one">
          <view>所属仓库</view>
          <u-picker></u-picker>
          <view>{{form.warehouseName}}</view>
        </view>
        <view class="one">
          <view>品牌</view>
          <u-picker></u-picker>
          <view>{{form.tireBrandName}}</view>
        </view>
        <view class="one">
          <view>规格</view>
          <u-picker></u-picker>
          <view>{{form.specificationsName}}</view>
        </view>
        <view class="one">
          <view>花纹型号</view>
          <u-picker></u-picker>
          <view>{{form.pattern}}</view>
        </view>
        <view class="button" @click="submit">确定</view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import superweiCombox from "@/components/superwei-combox";
  import {
    getlifecycle,
    getWarehouseList,
    batch
  } from "@/api/tirePressure.js"
import {
  getTires,
} from "@/api/daily.js";
  export default {
    components: {
    superweiCombox,
  },
    data() {
      return {
        form: {},
        form1: {},
        Warehouse1: '',
        Warehouse2: '',
        show: false,
        show2: false,
        status: 2,
        onecolor: '#010914',
        allcolor: '',
        warehouse: [
          []
        ],
        params: {
          pageNum: 1,
          pageSize: 20
        },
        warehouseId: '',
        arr: [],
        tireNoData: [],
      }
    },
    async onLoad() {
      const res = await getWarehouseList({})
      this.form1 = res.data.items
      if (res.data.items.length != 0) {
        res.data.items.forEach(i => {
          this.warehouse[0].push(i.warehouseName)
        })
      }
          this.getTireList();
    },
    methods: {
      // 扫码
      can() {
        // this.params.tireNo = "NA|2307081759448191"
        uni.scanCode({
          success: (res) => {
            this.form.tireNo = res.result
            this.params.tireNo = res.result
          getlifecycle(this.params).then((result)=>{
          this.form = result.data.items[0]
          })
            this.$forceUpdate()
          },
          fail: (err) => {
            uni.showToast({
              title: "扫描失败,请稍后再试",
              icon: "none",
              duration: 1500,
            });
          },
          complete: () => {
            console.log('扫码结束')
          }
        })

      },
      selectTireNo(e) {
        this.form.tireNo = e.tireNo;
        this.params.tireNo = e.tireNo;
        getlifecycle(this.params).then((result)=>{
          this.form = result.data.items[0]
          })
      },
      choose(e) {
        this.status = e
        if (e == 2) {
          this.onecolor = '#010914'
          this.allcolor = ''
          this.form = {}
        } else {
          this.onecolor = ''
          this.allcolor = '#010914'
        }
      },
      add() {
        this.form = {}
        this.show2 = true
      },
      close1() {
        this.show2 = false
      },
      confirm(e) {
        this.Warehouse1 = e.value[0]
        this.Warehouse2 = e.value[0]
        this.form1.forEach(i => {
          if (i.warehouseName == this.Warehouse1) {
            this.warehouseId = i.id
          }
        })
        this.show = false
      },
      cancel() {
        this.show = false
      },
      close() {
        this.show = false
      },
      async Save() {
        if(!this.form.tireNo){
          return uni.showToast({
            title: '请选择轮胎',
            icon: 'none',
            duration: 1000
          });
        }

        if(!this.Warehouse1){
          return uni.showToast({
            title: '请选择仓库分配',
            icon: 'none',
            duration: 1000
          });
        }

        const res11 = await batch(this.form.tireId, this.warehouseId)
        if (res11.code == 200) {
          uni.showToast({
            title: '调拨成功',
            icon: 'none',
            duration: 1000
          });
          setTimeout(() => {
             uni.redirectTo({
             url: '/pages/warehouse/Allocate'
          });
          }, 500)
        }
      },
      submit() {
        for(let i = 0; i < this.arr.length; i++){
          if(this.arr[i].tireId == this.form.tireId){
            return uni.showToast({
              title: '该轮胎已选过',
              icon: 'none',
              duration: 1000
            });
          }
        }

        if (this.form.tireId) {
          this.arr.push(this.form)
          this.show2 = false
        }else{
          uni.showToast({
              title: '请选择胎号',
              icon: 'none',
              duration: 1000
          })
        }
      },
      // 批量提交
      async open() {
        if (this.arr.length == 0) {
          return uni.showToast({
            title: '请选择轮胎',
            icon: 'none',
            duration: 1000
          });
        }

        if(!this.Warehouse2){
          return uni.showToast({
            title: '请选择分配的仓库',
            icon: 'none',
            duration: 1000
          });
        }

        let arr2 = []
        this.arr.forEach(i => {
          arr2.push(i.tireId)
        })
        let str = arr2.join()
        const res12 = await batch(str, this.warehouseId)
        if (res12.code == 200) {
          uni.showToast({
            title: '调拨成功',
            icon: 'none',
            duration: 1000
          });
          setTimeout(() => {
            uni.hideLoading()
          }, 500)
        }
        this.clear()
      },
      //清空数据
      clear() {
        this.arr = []
      },
      // 删除产品
      del(e) {
        let arr1 = this.arr.filter((ele, index) => {
          return index !== e
        })
        this.arr = arr1
      },
      Cancel() {
        uni.navigateBack();
      },
      alldel() {
        this.arr = []
      },
      getTireList() {
      let params = {
        pageNum: 1,
        pageSize: 10000,
      };
      getTires(params).then((res) => {
        if (res.code == 200) {
          this.tireNoData = res.data.items;
        }
      });
    },
    }
  }
</script>

<style lang="scss" scoped>
  .top {
    width: 100vw;
    height: 88rpx;
    background-color: #fff;
    display: flex;
    justify-content: center;
  }

  .allocate {
    width: 50vw;
    height: 88rpx;
    line-height: 88rpx;
    padding-left: 126rpx;
    font-size: 30rpx;
    color: #8A8EA6;
  }

  .test {
    display: flex;
    align-items: center;
    background-color: #fff;
    width: 100vw;
    height: 120rpx;
  }



  /deep/ .input-placeholder {
    text-align: right;
    // margin-right: 40rpx;
  }

  /deep/ .u-text__value {
    font-size: 32rpx
  }

  .text {
    margin-left: 30rpx;
  }
  .symbol{
    color: red;
  }

  .text1 {
    margin-right: 28rpx;
  }

  .btn {
    width: 332rpx;
    height: 88rpx;
    text-align: center;
    line-height: 88rpx;
    margin-left: 30rpx;
    border-radius: 12rpx;
  }

  .btn1 {
    width: 260rpx;
    height: 88rpx;
    text-align: center;
    line-height: 88rpx;
    margin-left: 30rpx;
    border-radius: 12rpx;
  }

  .test1 {
    display: flex;
    align-items: center;
    background-color: #fff;
    width: 409.56rpx;
    height: 88rpx;
    border: 1px solid #D8DBE2;
    margin-left: 30rpx;
    border-radius: 12rpx;
  }

  .test1 .text1 {
    margin-left: 30rpx;
  }

  .test1 .text2 {
    margin-right: 28rpx;
    color: #B4B5BF;
  }

  .add {
    width: 100vw;
    height: 120rpx;
    background-color: #fff;
    display: flex;
    align-items: center;
  }

  .Addrecord {
    color: #1862F5;
    font-size: 32rpx
  }

  .add /deep/ .u-icon__icon {
    margin-left: 20rpx;
    margin-right: 14rpx;
  }

  .card {
    display: flex;
    align-items: center;
    // justify-content: space-between;
    width: 710upx;
    height: 140upx;
    margin: 20upx;
    background: #FFFFFF;
    border-radius: 20upx;
    font-size: 24upx;
    color: gray;
  }

  .bigtxt {
    margin-right: 24rpx;
    font-size: 32upx;
    color: black;
  }

  .txt {
    // margin-top: 14upx;
    color: #010914;
    font-size: 32rpx
  }

  .txt1 {
    margin-top: 14upx;
    color: #5C5F66;
    font-size: 24rpx
  }

  .card /deep/ .u-icon__icon {}

  .alladd /deep/.u-input {
    width: 562rpx;
    height: 88rpx;
    background: #FFFFFF;
    border-radius: 20upx;
    margin-top: 12upx;
    margin-bottom: 28rpx;
  }

  .alladd .button {
    width: 600rpx;
    height: 88rpx;
    background-color: #1862F5;
    color: white;
    text-align: center;
    line-height: 88rpx;
    margin-top: 30rpx;
    border-radius: 12rpx;
  }

  .alladd /deep/ .input-placeholder {
    text-align: left;
    // margin-right: 40rpx;
  }

  // .alladd .one /deep/ .input-placeholder {
  //   color: #5C5F66;
  // }

  .alladd .one {
    background-color: #EDF1F7;
    width: 562rpx;
    height: 100rpx;
    border-radius: 20rpx;
    line-height: 100rpx;
    margin-bottom: 28rpx;
    color: #5C5F66;
    padding-left: 22rpx;
    padding-right: 22rpx;
    font-size: 28rpx;
    display: flex;
    align-items: center;
  }

  input {
    width: 500rpx;
    height: 88rpx;
    text-align: right;
    padding-right: 30rpx;
  }

  ::v-deep .uni-input-placeholder{
    text-align: right;
  }
  ::v-deep .uni-input-input{
    text-align: right;
  }
  .search-box{
    width: 604rpx;
    height: 100rpx;
    background: #FFFFFF;
    border-radius: 20rpx;
    margin-bottom: 28rpx;
    margin-top: 10rpx;
  }
</style>