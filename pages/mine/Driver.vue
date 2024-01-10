<template>
  <view class="content">
    <view style="background-color: #f4f7fd;position: fixed;top: 0;z-index: 999;height: 100rpx;width: 100%;">
      <view class="top"
        style="position: fixed;top: 20rpx;background-color: #fff;width: 100%;width: 710rpx;height: 76rpx;border-radius: 180rpx;margin-left: 20rpx;">
        <u-input placeholder="输入姓名/电话进行搜索" prefixIcon="search" v-model="searchtext" prefixIconStyle="font-size: 50rpx"
          @blur="search" />
      </view>
    </view>
    <view style=" margin-top: 120rpx;">
      <view class="text">
        <image src="https://tpms.5i84.cn/img/fenzu2.png"
          style="width: 80rpx;height: 80rpx;margin-left: 30rpx;margin-right: 18rpx;">
        </image>
        <view style="margin-right: 240rpx;">
          <view class="text1">林辉</view>
          <view class="text1" style="font-size: 24rpx;color: rgba(138, 142, 166, 1);">1545566545566</view>
        </view>
        <u-icon name="trash" color="#888eb2" size="28"></u-icon>
        <view class="Unbinding">
          解绑
        </view>
      </view>
      <view class="text">
        <image src="https://tpms.5i84.cn/img/fenzu2.png"
          style="width: 80rpx;height: 80rpx;margin-left: 30rpx;margin-right: 18rpx;">
        </image>
        <view style="margin-right: 240rpx;">
          <view class="text1">林辉</view>
          <view class="text1" style="font-size: 24rpx;color: rgba(138, 142, 166, 1);">1545566545566</view>
        </view>
        <u-icon name="trash" color="#888eb2" size="28"></u-icon>
        <view class="Unbinding">
          解绑
        </view>
      </view>
      <view class="text">
        <image src="https://tpms.5i84.cn/img/fenzu2.png"
          style="width: 80rpx;height: 80rpx;margin-left: 30rpx;margin-right: 18rpx;">
        </image>
        <view style="margin-right: 240rpx;">
          <view class="text1">林辉</view>
          <view class="text1" style="font-size: 24rpx;color: rgba(138, 142, 166, 1);">1545566545566</view>
        </view>
        <u-icon name="trash" color="#888eb2" size="28"></u-icon>
        <view class="Unbinding">
          解绑
        </view>
      </view>
      <view class="text">
        <image src="https://tpms.5i84.cn/img/fenzu2.png"
          style="width: 80rpx;height: 80rpx;margin-left: 30rpx;margin-right: 18rpx;">
        </image>
        <view style="margin-right: 240rpx;">
          <view class="text1">林辉</view>
          <view class="text1" style="font-size: 24rpx;color: rgba(138, 142, 166, 1);">1545566545566</view>
        </view>
        <u-icon name="trash" color="#888eb2" size="28"></u-icon>
        <view class="Unbinding">
          解绑
        </view>
      </view>
      <view class="text">
        <image src="https://tpms.5i84.cn/img/fenzu2.png"
          style="width: 80rpx;height: 80rpx;margin-left: 30rpx;margin-right: 18rpx;">
        </image>
        <view style="margin-right: 240rpx;">
          <view class="text1">林辉</view>
          <view class="text1" style="font-size: 24rpx;color: rgba(138, 142, 166, 1);">1545566545566</view>
        </view>
        <u-icon name="trash" color="#888eb2" size="28"></u-icon>
        <view class="Unbinding">
          解绑
        </view>
      </view>
    </view>

    <view class="one" @click="add">
      <u-icon name="plus-circle-fill" color="#2979ff" size="75"></u-icon>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {
      add() {
        uni.navigateTo({
          url: "/pages/mine/addDriver"
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .top /deep/ .u-input {
    border: 0;
  }

  .text {
    width: 100vw;
    height: 141.15rpx;
    background-color: #fff;
    display: flex;
    align-items: center;
    border-bottom: 2rpx solid rgba(245, 247, 251, 1);
  }

  .text1 {
    font-size: 32rpx;
    color: #010914;
  }

  .Unbinding {
    width: 100rpx;
    height: 50rpx;
    border-radius: 180rpx;
    background-color: rgba(24, 98, 245, 0.10);
    color: rgba(24, 98, 245, 1);
    text-align: center;
    line-height: 50rpx;
    margin-left: 16rpx;
  }

  .one /deep/ .u-icon {
    position: fixed;
    right: 38rpx;
    bottom: 400rpx;
  }
</style>