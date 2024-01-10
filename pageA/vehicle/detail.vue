<template>
  <view>
    <view class="content">
      <view class="item">
        <view class="label">建车类型</view>
        <view class="text">{{ vehicleData.truckTypeName }}</view>
      </view>
      <view class="item">
        <view class="label">所属组织</view>
        <view class="text">{{ vehicleData.fleetName }}</view>
      </view>
      <view class="item">
        <view class="label">车分类</view>
        <view class="text">{{ vehicleData.categoryName }}</view>
      </view>
      <view v-if="vehicleData.truckType == 10 || vehicleData.truckType == 30">
        <view class="item">
          <view class="label">主车车型</view>
          <view class="text">{{ vehicleData.carClassName }}</view>
        </view>
        <view class="item">
          <view class="label">主车车牌号</view>
          <view class="text">{{ vehicleData.vehicleNo }}</view>
        </view>
        <view class="item">
          <view class="label">发动机号</view>
          <view class="text">{{ vehicleData.engineNumber || "" }}</view>
        </view>
      </view>
      <view v-if="vehicleData.truckType == 20 || vehicleData.truckType == 30">
        <view class="item">
          <view class="label">拖车车牌号</view>
          <view class="text">{{ vehicleData.trailCarNo }}</view>
        </view>
        <view class="item">
          <view class="label">拖车轴数</view>
          <view class="text">{{ vehicleData.trailCarAxle }}根轴</view>
        </view>
        <view class="item">
          <view class="label">拖车显示车牌号</view>
          <view class="text">{{
            vehicleData.trailCarNoShow == 0 ? "隐藏" : "显示"
          }}</view>
        </view>
      </view>
      <view class="item">
        <view class="label">车主</view>
        <view class="text">{{ vehicleData.vehicleOwner || "" }}</view>
      </view>
      <view class="item">
        <view class="label">系统版本</view>
        <view class="text">{{
          vehicleData.systemVersion == 5001 ? "纯软件版" : "硬件版"
        }}</view>
      </view>
      <view class="item">
        <view class="label">动力类型</view>
        <view class="text">{{ vehicleData.engineTypeName }}</view>
      </view>
      <view class="item">
        <view class="label">里程统计方式</view>
        <view class="text">{{ vehicleData.mileageStatTypeName }}</view>
      </view>
      <view class="item">
        <view class="label">累计里程</view>
        <view class="text">{{ vehicleData.totalMileage || "0" }}km</view>
      </view>
      <view class="item">
        <view class="label">车辆品牌</view>
        <view class="text">{{ vehicleData.brand || "" }}</view>
      </view>
      <view v-if="vehicleData.truckType == 20 || vehicleData.truckType == 30">
        <view class="item">
          <view class="label">拖车车型</view>
          <view class="text">{{ vehicleData.trailCarTypeName }}</view>
        </view>
        <view class="item">
          <view class="label">智能挂甩</view>
          <view class="text">{{
            vehicleData.dumpCar == 1
              ? "是"
              : vehicleData.dumpCar == 0
              ? "否"
              : ""
          }}</view>
        </view>
      </view>
      <view v-if="vehicleData.truckType == 10 || vehicleData.truckType == 30">
        <view class="item">
          <view class="label">车辆自编号</view>
          <view class="text">{{ vehicleData.selfNumber || "" }}</view>
        </view>
        <view class="item">
          <view class="label">车架号</view>
          <view class="text">{{ vehicleData.vin || "" }}</view>
        </view>
      </view>
      <view class="item">
        <view class="label">线路</view>
        <view class="text">{{ vehicleData.route || "" }}</view>
      </view>
      <view class="item">
        <view class="label">初始公里表</view>
        <view class="text">{{ vehicleData.initMileage || "0" }}km</view>
      </view>
    </view>
    <view class="title">车辆气压阈值设置</view>
    <view style="margin-top: 0rpx" class="content">
      <view class="item">
        <view class="label">低压阈值</view>
        <view class="text">{{ vehicleData.lowPressure }}bar</view>
      </view>
      <view class="item">
        <view class="label">高压阈值</view>
        <view class="text">{{ vehicleData.highPressure }}bar</view>
      </view>
      <view class="item">
        <view class="label">高温阈值</view>
        <view class="text">{{ vehicleData.highTemperature }}℃</view>
      </view>
    </view>
    <view class="title">车辆气压标准值设置</view>
    <view style="margin-top: 0rpx" class="content">
      <view class="item">
        <view class="label">标准气压值</view>
        <view class="text">{{ vehicleData.standardPressure }}bar</view>
      </view>
    </view>
    <image
      @click="goEdit"
      :src="$util.ossImg('img/edit.png')"
      class="edit-icon"
    />
  </view>
</template>

<script>
import { getVehiclesDetail } from "@/api/daily.js";
export default {
  data() {
    return {
      id: null,
      vehicleData: {
        truckType: 10,
      },
    };
  },
  onLoad(option) {
    if (option.id) {
      this.id = option.id;
      this.getDetails();
    }
  },
  methods: {
    goEdit() {
      uni.navigateTo({
        url: `/pageA/vehicle/edit?id=${this.id}`,
      });
    },
    getDetails() {
      getVehiclesDetail(this.id).then((res) => {
        if (res.code == 200) {
          this.vehicleData = res.data;
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
  .item {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 120rpx;
    line-height: 120rpx;
    border-bottom: 1px solid #f3f4f6;
  }
  .label {
    font-size: 32rpx;
    font-family: AppleSystemUIFont;
    color: #010914;
  }
  .text {
    font-size: 32rpx;
    font-family: AppleSystemUIFont;
    color: #5c5f66;
  }
}
.title {
  font-size: 28rpx;
  font-family: AppleSystemUIFont;
  color: #8a8ea6;
  line-height: 68rpx;
  margin-left: 30rpx;
}
.edit-icon {
  width: 112rpx;
  height: 112rpx;
  position: fixed;
  right: 38rpx;
  top: 980rpx;
  z-index: 999;
}
</style>