<template>
  <view style="padding-bottom: 166rpx">
    <view class="content">
      <view class="item">
        <view class="item1">胎号</view>
        <view class="text">{{ form.tireNo }}</view>
      </view>
      <view class="item">
        <view class="item1">车牌号</view>
        <view class="text">{{ form.vehicleNo || '--'}}</view>
      </view>
      <view class="item">
        <view class="item1">品牌</view>
        <view class="text">{{ form.brand || '--'}}</view>
      </view>
      <view class="item">
        <view class="item1">规格</view>
        <view class="text">{{ form.specification || '--'}}</view>
      </view>
      <view class="item">
        <view class="item1">花纹型号</view>
        <view class="text">{{ form.treadModel || '--'}}</view>
      </view>
      <view class="item">
        <view class="item1">当前累计里程</view>
        <view class="text">{{ form.mileageReading || '--'}}</view>
      </view>
      <view class="item">
        <view class="item1">当前里程表读数</view>
        <view class="text">{{ form.latestInstallationMileage || '--'}}</view>
      </view>
      <view class="item">
        <view class="item1">检查人</view>
        <view class="text">{{ form.inspector || '--'}}</view>
      </view>
      <view class="item">
        <view class="item1">检查时间</view>
        <view class="text">{{ form.inspectionTime || '--'}}</view>
      </view>
      <view class="item">
        <view class="item1">新胎花纹深度</view>
        <view class="text">{{ form.newTreadDepth || '--'}}</view>
      </view>
      <view class="item">
        <view class="item1">左侧花纹</view>
        <view class="text">{{ form.leftTreadDepth || '--'}}</view>
      </view>
      <view class="item">
        <view class="item1">中间花纹</view>
        <view class="text">{{ form.middleTreadDepth || '--'}}</view>
      </view>
      <view class="item" style="border: none">
        <view class="item1">右侧花纹</view>
        <view class="text">{{ form.rightTreadDepth || '--'}}</view>
      </view>
    </view>
    <view class="title" v-if="form.checkPhotos">上传图片</view>
    <view class="img-box" v-if="form.checkPhotos">
      <u-album :urls="form.checkPhotos.split(',')" multipleSize="106"></u-album>
    </view>
    <view class="title">问题说明</view>
    <view class="remark" style="margin-top: 0rpx;;">
        <view class="text">{{ form.issueDescription|| ''}}</view>
    </view>
  </view>
</template>

<script>
import { inspectionDetail } from "@/api/daily.js";
export default {
  data() {
    return {
      form: {},
    };
  },
  onLoad(option) {
    this.getInspectionDetail(option.id);
  },
  methods: {
    getInspectionDetail(id) {
      inspectionDetail(id).then((res) => {
        this.form = res.data;
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
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 120rpx;
    line-height: 120rpx;
    border-bottom: #eaebec 1px solid;
  }
}
.img-box {
  background: #ffffff;
  display: flex;
  justify-content: space-around;
  padding: 30rpx;
}
.title {
  font-size: 28rpx;
  font-family: AppleSystemUIFont;
  color: #8a8ea6;
  line-height: 60rpx;
  margin-left: 30rpx;
}
.remark{
  background: #ffffff;
  padding: 20rpx 10rpx;
}
</style>