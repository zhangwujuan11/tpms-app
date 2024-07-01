<template>
  <view class="content">
    <view class="test">
      <view class="text">所属组织</view>
      <input placeholder="必填" border="none" v-model="value" type="text"></input>
    </view>
    <view class="test">
      <view class="text">用户名</view>
      <input placeholder="必填" border="none" v-model="value" type="text"></input>
    </view>
    <view class="test">
      <view class="text">密码</view>
      <input placeholder="必填" border="none" v-model="value" type="text"></input>
    </view>
    <view class="test">
      <view class="text">姓名</view>
      <input placeholder="必填" border="none" v-model="value" type="text"></input>
    </view>
    <view class="test">
      <view class="text">性别</view>
      <u-picker :show="show" :columns="columns" @confirm="confirm" @cancel="cancel" closeOnClickOverlay
        @close="close" :immediateChange="true"></u-picker>
      <view style="margin-right: 32rpx;color: rgba(180, 181, 191, 1);font-size: 32rpx;" @click="show = true">请选择></view>
    </view>
    <view class="test">
      <view class="text">手机号</view>
      <input placeholder="必填" border="none" v-model="value" type="text"></input>
    </view>
    <view class="test">
      <view class="text">身份证</view>
      <input placeholder="必填" border="none" v-model="value" type="text"></input>
    </view>
    <view class="test">
      <view class="text">驾驶证</view>
      <input placeholder="必填" border="none" v-model="value" type="text"></input>
    </view>
    <view class="test">
      <view class="text">驾驶证类型</view>
      <u-picker :show="show1" :columns="columns1" @confirm="confirm1" @cancel="cancel1" closeOnClickOverlay
        @close="close1" :immediateChange="true"></u-picker>
      <view style="margin-right: 32rpx;color: rgba(180, 181, 191, 1);font-size: 32rpx;" @click="show1 = true">请选择>
      </view>
    </view>
    <view class="test" style="margin-top: 12rpx;">
      <view class="text">短信提醒</view>
      <u-switch v-model="value1" @change="change"></u-switch>
    </view>
    <view class="test">
      <view class="text">微信提醒</view>
      <u-switch v-model="value2" @change="change1"></u-switch>
    </view>
    <view class="botton">保存</view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        value: "",
        value1: "",
        value2: "",
        show: false,
        columns: [
          ['男', '女']
        ],
        show1: false,
        columns1: [
          ['男', '女']
        ],
      }
    },
    methods: {
      confirm(e) {
        console.log(e)
        this.show = false
      },
      cancel() {
        this.show = false
      },
      close() {
        this.show = false
      },
      confirm1(e) {
        console.log(e)
        this.show1 = false
      },
      cancel1() {
        this.show1 = false
      },
      close1() {
        this.show1 = false
      },
      change(e) {
        console.log('change', e);
      },
      change1(e) {
        console.log('change', e);
      },
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    padding-top: 26rpx;
  }

  .test {
    width: 100vw;
    height: 120rpx;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  input {
    width: 500rpx;
    height: 88rpx;
    text-align: right;
    padding-right: 30rpx;
  }

  .text {
    margin-left: 30rpx;
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
</style>