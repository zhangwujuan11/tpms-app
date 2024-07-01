<template>
  <view class="content">
    <view style="background-color: #f4f7fd;position: fixed;top: 0;z-index: 999;height: 200rpx;width: 100%;">
      <view class="top"
        style="position: fixed;top: 20rpx;background-color: #fff;width: 710rpx;height: 76rpx;border-radius: 180rpx;margin-left: 20rpx;display: flex;align-items: center;padding-left: 20rpx;margin-right: 20rpx;">
        <u-icon name="search" color="rgba(138, 142, 166, 1)" size="28" @click="search"
          style="margin-right: 10rpx;"></u-icon>
        <input placeholder="请输入品牌/规格/组织进行搜索" v-model="vehicleNo" style="width: 100%;"/>
      </view>
      <view class="condition">
        <view class="text" style="margin-right: 30rpx;">
          <u-picker :show="show" :columns="warehouse" @confirm="confirm" @cancel="cancel" closeOnClickOverlay
            @close="close" :immediateChange="true"></u-picker>
          <view class="test" @click="show = true">所属仓库</view>
        </view>
        <view class="text">
          <picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange" fields="month">
            <view class="uni-input" v-if="!date">月度</view>
            <view class="uni-input" v-else>{{date}}</view>
          </picker>
        </view>
      </view>
    </view>

    <view class="body" style="margin-top: 220rpx;">

    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        show: false,
        warehouse: [
          []
        ],
        Warehouse1: '',
        date: '',
        vehicleNo: "",
        startDate: "",
        endDate: ""
      }
    },
    methods: {
      confirm(e) {
        this.Warehouse1 = e.value[0]
        // this.form1.forEach(i => {
        //   if (i.warehouseName == this.Warehouse1) {
        //     this.warehouseId = i.id
        //   }
        // })
        this.show = false
      },
      cancel() {
        this.show = false
      },
      close() {
        this.show = false
      },
      bindDateChange(e) {
        console.log(e)
        this.date = e.detail.value
      }
    }
  }
</script>

<style lang="scss" scoped>
  .condition {
    background-color: #f4f7fd;
    width: 100vw;
    height: 68rpx;
    position: fixed;
    top: 120rpx;
    display: flex;
    align-items: center;
    padding-left: 30rpx;
  }

  .text {
    width: 330rpx;
    height: 68rpx;
    background-color: #fff;
    border-radius: 180rpx;
  }

  .test {
    width: 330rpx;
    height: 68rpx;
    text-align: center;
    line-height: 68rpx;
    font-size: 24rpx;
    color: #010914;
  }

  .text .uni-input {
    width: 330rpx;
    height: 68rpx;
    text-align: center;
    line-height: 68rpx;
    padding: 0;
    border-radius: 180rpx;
  }

  .body {
    width: 710rpx;
    height: 600rpx;
    background-color: #fff;
    margin-left: 20rpx;
    border-radius: 20rpx;
  }
</style>