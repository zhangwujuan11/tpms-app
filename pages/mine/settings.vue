<template>
  <view class="content">
    <view class="text">单位设置</view>
    <view class="test">
      <view class="text1">气压单位</view>
      <u-picker :show="show" :columns="columns" @confirm="confirm" @cancel="cancel" closeOnClickOverlay
        @close="close" :immediateChange="true"></u-picker>
      <view style="margin-right: 32rpx;color: rgba(180, 181, 191, 1);font-size: 32rpx;" @click="show = true"
        v-if="!params.pressureUnit">请选择></view>
      <view style="margin-right: 32rpx;font-size: 32rpx;" @click="show = true" v-else>
        {{params.pressureUnit}}
      </view>
    </view>
    <view class="test">
      <view class="text1">温度单位</view>
      <u-picker :show="show1" :columns="columns1" @confirm="confirm1" @cancel="cancel1" closeOnClickOverlay
        @close="close1" :immediateChange="true"></u-picker>
      <view style="margin-right: 32rpx;color: rgba(180, 181, 191, 1);font-size: 32rpx;" @click="show1 = true"
        v-if="!params.temperatureUnit">请选择>
      </view>
      <view style="margin-right: 32rpx;font-size: 32rpx;" @click="show1 = true" v-else>{{params.temperatureUnit}}
      </view>
    </view>
    <view class="text">轮胎辅助管理-气压异常偏差百分比设置</view>
    <view class="test">
      <view class="text1">气压偏差设置</view>
      <u-picker :show="show2" :columns="columns2" @confirm="confirm2" @cancel="cancel2" closeOnClickOverlay
        @close="close2" :defaultIndex="deviationDefault" :immediateChange="true"></u-picker>
      <view style="margin-right: 32rpx;color: rgba(180, 181, 191, 1);font-size: 32rpx;" @click="show2 = true"
        v-if="!deviation">请选择>
      </view>
      <view style="margin-right: 32rpx;font-size: 32rpx;" @click="show2 = true" v-else>{{params.pressureDeviationType == 10021 ? '默认偏差(10%/6%/3%)' : '自定义气压偏差'}}
      </view>
    </view>
    <view class="test" v-if="params.pressureDeviationType == 10022">
      <view class="text1" style="margin-right: 240rpx;">自定义偏差值</view>
      <input placeholder="单位%" border="none" v-model="params.pressureDeviationSelf"></input>
      %
    </view>
    <view class="text">里程及花纹深度预警-阈值设置</view>
    <view class="test1">
      <view class="text2">剩余里程阈值</view>
      剩余<input placeholder="单位KM" border="none" v-model="params.remainingMileageThreshold"></input>
      <text style="margin-right: 30rpx;">km</text>
    </view>
    <view class="test1">
      <view class="text2">剩余花纹阈值</view>
      小于<input placeholder="单位MM" border="none" v-model="params.remainingPatternThreshold"></input>
      <text style="margin-right: 30rpx;">mm</text>
    </view>
    <view class="text">轮胎换位提醒周期设置</view>
    <view class="test1">
      <view class="text2">提醒周期</view>
      超过<input placeholder="单位月" border="none" v-model="params.alertCycle"></input>
      <text style="margin-right: 30rpx;">月</text>
    </view>
    <view class="botton" @click="Save">保存</view>
  </view>
</template>

<script>
  import {
    parameter,
    actions
  } from "@/api/tirePressure.js"
  export default {
    data() {
      return {
        show: false,
        columns: [
          ['bar', 'kPa']
        ],
        show1: false,
        columns1: [
          ['摄氏度℃', '华氏度℉']
        ],
        show2: false,
        columns2: [
          ['默认偏差(10%/6%/3%)', '自定义气压偏差']
        ],
        deviation: '自定义气压偏差',
        params: {
          pressureUnit: '',
          pressureUnitType: '',
          temperatureUnit: '',
          temperatureUnitType: '',
          pressureDeviationSelf: '',
          pressureDeviationType: '',
          remainingMileageThreshold: '',
          remainingPatternThreshold: '',
          alertCycle: '',
        },
        deviationDefault: [0]
      }
    },
    async onLoad() {
      this.getList()
    },
    methods: {
      confirm(e) {
        this.params.pressureUnit = e.value[0]
        if (this.params.pressureUnit == "bar") {
          this.params.pressureUnitType = 10001
        } else {
          this.params.pressureUnitType = 10002
        }
        this.show = false
      },
      cancel() {
        this.show = false
      },
      close() {
        this.show = false
      },
      confirm1(e) {
        this.params.temperatureUnit = e.value[0]
        if (this.params.temperatureUnit == "摄氏度℃") {
          this.params.temperatureUnitType = 10011
        } else {
          this.params.temperatureUnitType = 10012
        }
        this.show1 = false
      },
      cancel1() {
        this.show1 = false
      },
      close1() {
        this.show1 = false
      },
      confirm2(e) {
        this.deviation = e.value[0]
        if (this.deviation == "默认偏差(10%/6%/3%)") {
          this.params.pressureDeviationType = 10021
        } else {
          this.params.pressureDeviationType = 10022
        }
        this.show2 = false
      },
      cancel2() {
        this.show2 = false
      },
      close2() {
        this.show2 = false
      },
      async Save() {
        const res = await actions(this.params)
        if (res.code == 200) {
          uni.showToast({
            title: '保存成功',
            icon: "none",
            duration: 1000,
          })
          setTimeout(() => {
            uni.navigateBack({
              data: 1
            })
          }, 1000)
        } else {
          return uni.showToast({
            title: '保存失败',
            icon: "none",
            duration: 1000,
          })
        }
      },
      async getList() {
        const data = await parameter()
        this.params.pressureUnit = data.data.pressureUnit
        this.params.temperatureUnit = data.data.temperatureUnit
        this.params.remainingPatternThreshold = data.data.remainingPatternThreshold
        this.params.remainingMileageThreshold = data.data.remainingMileageThreshold
        this.params.alertCycle = data.data.alertCycle
        this.params.pressureUnitType = data.data.pressureUnitType
        this.params.temperatureUnitType = data.data.temperatureUnitType
        this.params.pressureDeviationSelf = data.data.pressureDeviationSelf
        this.params.pressureDeviationType = data.data.pressureDeviationType
		    this.params.id = data.data.id

        //气压偏差弹窗默认高亮值
        if(data.data.pressureDeviationType == 10021){
          this.deviationDefault = [0]
        }else if(data.data.pressureDeviationType == 10022){
          this.deviationDefault = [1]
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .text {
    width: 100vw;
    height: 80rpx;
    color: rgba(138, 142, 166, 1);
    font-size: 24rpx;
    line-height: 80rpx;
    padding-left: 30rpx;
  }

  .test {
    display: flex;
    align-items: center;
    width: 100vw;
    height: 120rpx;
    background-color: #fff;
  }

  .test1 {
    width: 100vw;
    height: 120rpx;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  input {
    width: 200rpx;
    height: 88rpx;
    text-align: right;
    padding-right: 30rpx;
  }

  .text2 {
    margin-left: 30rpx;
    font-size: 32rpx;
  }

  .text1 {
    margin-left: 30rpx;
    // margin-right: 400rpx;
    color: rgba(1, 9, 20, 1);
    font-size: 32rpx;
  }

  .botton {
    width: 690rpx;
    height: 88rpx;
    margin-top: 32rpx;
    margin-left: 30rpx;
    background-color: rgba(24, 98, 245, 1);
    text-align: center;
    line-height: 88rpx;
    color: rgba(255, 255, 255, 1);
    font-size: 30rpx;
    border-radius: 12rpx;
  }

  /deep/ .u-input {
    border: 0;
  }

  /deep/ .u-text__value {
    color: rgba(1, 9, 20, 1);
  }

  /deep/ .input-placeholder {
    text-align: right;
  }
</style>