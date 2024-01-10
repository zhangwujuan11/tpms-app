<template>
  <view style="padding-bottom: 166rpx">
    <view class="content">
      <view class="item2">
        <view class="item1">修补单号</view>
        <view class="text">{{ form.mid }}</view>
      </view>
      <view class="item2">
        <view class="item1">修补厂家</view>
        <view class="text">{{ form.manufacturer }}</view>
      </view>
      <view class="item2">
        <view class="item1">修补人</view>
        <view class="text">{{ form.maintainer }}</view>
      </view>
      <view class="item2">
        <view class="item1">修补日期</view>
        <view class="text">{{ form.maintenanceDate }}</view>
      </view>
    </view>
    <view v-if="form.tireMaintenanceDetailArrayResponse">
      <view
        v-for="(item, index) of form.tireMaintenanceDetailArrayResponse.items"
        :key="index"
      >
        <view class="title">修补轮胎明细{{ index + 1 }}</view>
        <view style="margin-top: 0rpx" class="content">
          <view class="item2">
            <view class="item1">胎号</view>
            <view class="text">{{ item.tireNo }}</view>
          </view>
          <view class="item2">
            <view class="item1">品牌</view>
            <view class="text">{{ item.tireBrandName || "" }}</view>
          </view>
          <view class="item2">
            <view class="item1">规格</view>
            <view class="text">{{ item.specificationsName }}</view>
          </view>
          <view class="item2">
            <view class="item1">花纹</view>
            <view class="text">{{ item.pattern }}</view>
          </view>
          <view class="item2">
            <view class="item1">修补内容</view>
            <view class="text">{{ item.content }}</view>
          </view>
          <view class="item2" style="border: none">
            <view class="item1">修补去向</view>
            <view class="text">{{ item.stockStatusCn }}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="content">
      <view class="item2" style="border: none">
        <view class="item1">备注</view>
        <view class="text">{{ form.remark || "" }}</view>
      </view>
    </view>
    <view class="buttonbox">
      <view class="sum"
        >总费用：￥<text style="font-size: 48rpx">{{
          form.totalCost
        }}</text></view
      >
    </view>
  </view>
</template>

<script>
import { maintenance } from "@/api/daily.js";
export default {
  data() {
    return {
      form: {},
    };
  },
  onLoad(option) {
    if (option.id) {
      this.getMaintenanceDetail(option.id);
    }
  },
  methods: {
    getMaintenanceDetail(e) {
      maintenance(e).then((res) => {
        if (res.code == 200) {
          this.form = res.data;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  background: #ffffff;
  padding: 0rpx 30rpx;
  margin-top: 20rpx;
  .text {
    font-size: 32rpx;
    font-family: AppleSystemUIFont;
    color: #010914;
  }
  .item2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 120rpx;
    line-height: 120rpx;
    border-bottom: #eaebec 1px solid;
  }
}
.title {
  font-size: 28rpx;
  font-family: AppleSystemUIFont;
  color: #8a8ea6;
  line-height: 68rpx;
  margin-left: 30rpx;
}
.buttonbox {
  width: 750rpx;
  height: 148rpx;
  background: #ffffff;
  padding: 30rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0rpx;
  box-sizing: border-box;
  box-shadow: 0rpx -4rpx 8rpx 0rpx rgba(0, 0, 0, 0.05),
    0rpx -4rpx 8rpx 0rpx rgba(0, 0, 0, 0.05);
  .sum {
    font-size: 28rpx;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    color: #5c5f66;
  }
}
</style>