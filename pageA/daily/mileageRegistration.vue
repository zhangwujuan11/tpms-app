<template>
  <view
    class="content"
    :style="{ 'padding-bottom': current == 1 ? '148rpx' : '20rpx' }"
  >
    <u-sticky bgColor="#F5F7FB">
      <u-tabs
        :list="tabsList"
        bar-width="100rpx"
        :scrollable="false"
        :current="current"
        lineColor="#1862F5"
        :inactiveStyle="{
          color: '#8A8EA6',
        }"
        itemStyle="padding:0rpx;width:250rpx;height: 80rpx;background:white;"
        @change="change"
      ></u-tabs>
      <view class="searchbox">
        <view class="search-box">
          <u-icon name="search" size="28" @click="searchData"></u-icon>
          <superwei-combox
            class="search"
            :candidates="carList"
            :isJSON="true"
            keyName="name"
            placeholder="搜索车牌号"
            v-model="vehicleNoValue"
            @select="searchData"
            @input="clearSearch"
          ></superwei-combox>
        </view>
      </view>
    </u-sticky>
    <view v-if="current == 0">
      <view class="contain-item" v-for="(item, index) of list" :key="index">
        <view class="top">
          <image :src="$util.ossImg('img/dashboard.png')" class="bus-icon" />
          <view class="title">
            <view class="title-text">
              <view class="car-num">车牌号：{{ item.vehicleNo }}</view>
            </view>
            <view class="title-info">
              <view class="date">安装时间：{{ item.installTime }}</view>
            </view>
          </view>
          <view v-if="item.status == 20" class="repair" @click.stop="open(item)"
            >补录</view
          >
          <view v-else class="repaired">已补录</view>
        </view>
        <view class="bottom">
          <view class="bottom-item">
            <view class="bottom-label">所属组织</view>
            <view class="bottom-value">{{ item.fleetName }}</view>
          </view>
          <view class="bottom-item">
            <view class="bottom-label">胎号</view>
            <view class="bottom-value">{{ item.tireNo }}</view></view
          >
          <view class="bottom-item">
            <view class="bottom-label">轮位</view>
            <view class="bottom-value">{{
              item.installPositionDesc || ""
            }}</view>
          </view>
          <view class="bottom-item">
            <view class="bottom-label">拆卸时间</view>
            <view class="bottom-value">{{ item.uninstallTime }}</view>
          </view>
          <view class="bottom-item">
            <view class="bottom-label">运行里程</view>
            <view class="bottom-value">{{ item.operatingMileage || "" }}</view>
          </view>
        </view>
      </view>
    </view>
    <view v-if="current == 1">
      <view class="contain-item" v-for="(item, index) of list" :key="index">
        <view class="top">
          <image :src="$util.ossImg('img/dashboard.png')" class="bus-icon" />
          <view class="title">
            <view class="title-text">
              <view class="car-num">车牌号：{{ item.vehicleNo }}</view>
            </view>
            <view class="title-info">
              <view class="date">登记时间：{{ item.registerTime }}</view>
            </view>
          </view>
        </view>
        <view class="bottom">
          <view class="bottom-item">
            <view class="bottom-label">所属组织</view>
            <view class="bottom-value">{{ item.fleetName }}</view>
          </view>
          <view class="bottom-item">
            <view class="bottom-label">里程表读数</view>
            <view class="bottom-value">{{ item.mileage }}</view></view
          >
          <view class="bottom-item">
            <view class="bottom-label">状态</view>
            <view class="bottom-value">{{ item.status | status }}</view>
          </view>
          <view class="bottom-item">
            <view class="bottom-label">运行里程</view>
            <view class="bottom-value">{{ item.operatingMileage }}</view>
          </view>
        </view>
      </view>
    </view>
    <view
      v-show="is_show && list && list.length > 0"
      style="text-align: center; width: 100%; margin: 50rpx 0"
    >
      没有更多数据了
    </view>
    <view
      v-if="!list || list.length == 0"
      style="
        width: 100%;
        padding: 50rpx 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #666666;
      "
    >
      <image src="@/static/images/nodata.png"></image>
      暂无数据
    </view>
    <view class="bottom-btn" v-if="current == 1">
      <view class="btn" @click="(recordShow = true), (form = {})"
        >甩挂里程登记</view
      >
    </view>
    <u-popup
      :show="popupShow"
      :round="10"
      mode="center"
      :closeable="true"
      @close="close"
    >
      <view
        class="popup-box"
        :style="{
          backgroundImage: 'url(' + $util.ossImg('img/background.png') + ')',
          backgroundSize: '640rpx 134rpx',
          backgroundRepeat: 'no-repeat',
        }"
      >
        <view class="title">人工里程补录</view>
        <view class="item">
          <view class="label">车牌号</view>
          <view class="value">{{ additionalRecord.vehicleNo }}</view>
        </view>
        <view class="item">
          <view class="label">胎号</view>
          <view class="value">{{ additionalRecord.tireNo }}</view>
        </view>
        <view class="item" style="padding-right: 0rpx">
          <view class="label">补录时间段</view>
          <view class="value" style="text-align: left"
            >{{ additionalRecord.installTime }} 至
            {{ additionalRecord.uninstallTime }}</view
          >
        </view>
        <view class="item">
          <view class="label">补录里程数</view>
          <u--input
            style="margin-right: 10rpx"
            v-model="additionalRecord.operatingMileage"
            border="none"
            placeholder="请输入补录里程数"
          ></u--input>
          km
        </view>
        <view class="btn" @click="submit">确定</view>
      </view>
    </u-popup>

    <u-popup
      :show="recordShow"
      :round="10"
      mode="center"
      :closeable="true"
      @close="close"
    >
      <view
        class="record-box"
        :style="{
          backgroundImage: 'url(' + $util.ossImg('img/background.png') + ')',
          backgroundSize: '640rpx 134rpx',
          backgroundRepeat: 'no-repeat',
        }"
      >
        <view class="title">甩挂里程登记</view>
        <view class="tip"
          >车辆选择只能选择：里程统计方式是【以手工录入为准】的车辆</view
        >
        <view>
          <view class="label"><text class="symbol">*</text>车牌号</view>
          <superwei-combox
            :candidates="vehicleData"
            :isJSON="true"
            keyName="vehicleNo"
            placeholder="请选择车牌号"
            @select="selectVerhicleNo"
            isAllowCreate="false"
            v-model="form.vehicleNo"
            :onlySelect="true"
            filterName="vehicleNo"
          ></superwei-combox>
        </view>
        <view class="item">
          <view class="label"><text class="symbol">*</text>里程表读数</view>
          <u--input
            customStyle="height:100rpx;background: #FFFFFF;width: 562rpx;border-radius: 20rpx;padding-left:22rpx;box-sizing: border-box;"
            v-model="form.mileage"
            border="none"
            placeholder="请输入里程表读数"
          ></u--input>
        </view>
        <view class="item">
          <view class="label">状态</view>
          <view class="status-box">{{ form.status | status }}</view>
        </view>
        <view class="btn" @click="submitRecord">确定</view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import {
  registerList,
  tireRegister,
  allVehicle,
  getVehiclesDetail,
  tireRecord,
  registrationStatus,
  getplateNumber,
} from "@/api/daily.js";
import superweiCombox from "@/components/superwei-combox";
export default {
  components: {
    superweiCombox,
  },
  data() {
    return {
      tabsList: [
        {
          name: "人工里程补录",
        },
        {
          name: "甩挂里程",
        },
      ],
      current: 0,
      list: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      popupShow: false,
      recordShow: false,
      vehicleNoValue: "",
      additionalRecord: {},
      is_show: false,
      is_vehicle: false,
      vehicleData: [],
      form: {},
      carList: [],
    };
  },
  onReachBottom() {
    if (this.list.length == this.total) {
      this.is_show = true;
    } else {
      this.is_show = false;
      this.pageNum++;
      this.getList();
    }
  },
  onLoad() {
    this.getList();
    this.getVehicleNo();
    this.getCarNo();
  },
  filters: {
    status(e) {
      if (e == 10) {
        return "上挂";
      } else if (e == 20) {
        return "未补录";
      } else if (e == 21) {
        return "已补录";
      } else if (e == 11) {
        return "下挂";
      }
    },
  },
  methods: {
    change(e) {
      this.current = e.index;
      this.searchData();
    },
    open(e) {
      this.popupShow = true;
      this.additionalRecord = JSON.parse(JSON.stringify(e));
    },
    close() {
      this.popupShow = false;
      this.recordShow = false;
    },
    getList(num, size) {
      let params = {
        pageNum: num ? num : this.pageNum,
        pageSize: size ? size : this.pageSize,
        registerType: this.current == 0 ? 1 : 2,
        vehicleNo: this.vehicleNoValue,
      };
      uni.showLoading({
        title: "加载中",
      });
      registerList(params)
        .then((res) => {
          uni.hideLoading();
          if (res.code == 200) {
            this.list = size
              ? res.data.items
              : [...this.list, ...(res.data.items || [])];
            this.total = res.data.total;
          }
        })
        .catch((err) => {
          uni.showToast({
            title: `${err.message}`,
            icon: "none",
            duration: 1500,
          });
        });
    },
    searchData() {
      this.pageNum = 1;
      this.pageSize = 10;
      this.list = [];
      this.getList();
    },
    submit() {
      let flage = /^[0-9]+(.[0-9]{1,3})?$/;
      if (!flage.test(this.additionalRecord.operatingMileage)) {
        uni.showToast({
          title: "补录里程不正确",
          icon: "none",
          duration: 1000,
        });
      } else {
        this.additionalRecord.status = 21;
        tireRegister(this.additionalRecord).then((res) => {
          if (res.code == 200) {
            this.popupShow = false;
            this.getList(1, this.list.length);
            uni.showToast({
              title: "补录成功",
              icon: "none",
              duration: 1000,
            });
          }
        });
      }
    },
    getVehicleNo() {
      allVehicle({ mileageStatType: 2003 }).then((res) => {
        if (res.code == 200) {
          this.vehicleData = res.data.items;
        }
      });
    },
    selectVerhicleNo(e) {
      this.form.vehicleNo = e.vehicleNo;
      let time = new Date();
      let format = this.formatDate(time);
      getVehiclesDetail(e.vehicleId).then((res) => {
        if (res.code == 200) {
          this.form.fleetId = res.data.fleetId;
          this.form.fleetName = res.data.fleetName;
          this.form.operatingMileage = res.data.totalMileage;
          this.form.registerTime = format;
          this.form.registerType = 2;
        }
      });
      registrationStatus(e.vehicleNo).then((res) => {
        this.form.status = res.data;
        this.$forceUpdate();
      });
    },
    submitRecord() {
      if(!this.form.vehicleNo){
        uni.showToast({
          title: "车牌号不能为空",
          icon: "none",
          duration: 1500,
        });
        return;
      }
      if(!this.form.mileage){
        uni.showToast({
          title: "里程表读数不能为空",
          icon: "none",
          duration: 1500,
        });
        return;
      }
      tireRecord(this.form).then((res) => {
        if (res.code == 200) {
          this.recordShow = false;
          this.searchData();
          uni.showToast({
            title: "登记成功",
            icon: "none",
            duration: 1000,
          });
        }
      });
    },
    formatDate(value, type) {
      // 计算日期相关值
      let time = typeof value == "number" ? new Date(value) : value;
      let Y = time.getFullYear();
      let M = time.getMonth() + 1;
      let D = time.getDate();
      let h = time.getHours();
      let m = time.getMinutes();
      let s = time.getSeconds();
      let week = time.getDay();
      // 如果传递了type的话
      if (type === undefined) {
        return (
          Y +
          "-" +
          (M < 10 ? "0" + M : M) +
          "-" +
          (D < 10 ? "0" + D : D) +
          " " +
          (h < 10 ? "0" + h : h) +
          ":" +
          (m < 10 ? "0" + m : m) +
          ":" +
          (s < 10 ? "0" + s : s)
        );
      } else if (type === "week") {
        // 在quartz中 1为星期日
        return week + 1;
      }
    },
    getCarNo() {
      getplateNumber().then((res) => {
        this.carList = res.data.items.map((item) => {
          return { name: item };
        });
      });
    },
    clearSearch(e) {
      if (e == "") {
        this.searchData();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.searchbox {
  width: 710rpx;
  height: 106rpx;
  margin: 0 auto;
  margin-top: 20rpx;
  ::v-deep .u-input {
    width: 670rpx !important;
    margin: 0 auto;
    border: none;
  }
  .search-box {
    width: 710rpx;
    height: 76rpx;
    background: #ffffff;
    border-radius: 180rpx;
    display: flex;
    margin: 0 auto;
    ::v-deep .u-icon {
      padding-left: 32rpx;
    }
    .search {
      width: 550rpx;
      margin: 0 auto;
    }
    .search ::v-deep .uni-input-input {
      text-align: left;
    }
    .search ::v-deep .uni-input-placeholder {
      text-align: left;
    }
    .search ::v-deep input {
      text-align: left !important;
    }
  }
}
.contain-item {
  width: 710rpx;
  min-height: 391rpx;
  background: #ffffff;
  border-radius: 20rpx;
  margin: 0rpx auto;
  margin-bottom: 20rpx;
  padding: 20rpx;
  box-sizing: border-box;
  .bus-icon {
    width: 100rpx;
    height: 100rpx;
  }
  .top {
    display: flex;
    justify-content: space-between;
    position: relative;
  }
  .repair {
    position: absolute;
    right: 0rpx;
    width: 100rpx;
    height: 50rpx;
    line-height: 50rpx;
    background: #1862f5;
    box-shadow: 0rpx -4rpx 8rpx 0rpx rgba(0, 0, 0, 0.1);
    border-radius: 16rpx;
    font-size: 24rpx;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    text-align: center;
  }
  .repaired {
    position: absolute;
    right: 0rpx;
    width: 100rpx;
    height: 50rpx;
    line-height: 50rpx;
    background: #ffffff;
    border: #f1f1f1 solid 2rpx;
    border-radius: 16rpx;
    font-size: 24rpx;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    color: #1862f5;
    text-align: center;
  }
  .title {
    width: 546rpx;
    line-height: 50rpx;
  }
  .title-text {
    display: flex;
    align-items: center;
  }
  .car-num {
    font-size: 32rpx;
    font-family: AppleSystemUIFont;
    color: #010914;
  }
  .title-info {
    font-size: 24rpx;
    font-family: AppleSystemUIFont;
    color: #5c5f66;
    display: flex;
  }
  .date {
    font-size: 24rpx;
    font-family: AppleSystemUIFont;
    color: #5c5f66;
  }
  .bottom {
    width: 670rpx;
    min-height: 231rpx;
    background: #f5f7fb;
    border-radius: 20rpx;
    padding: 4rpx 18rpx 4rpx 20rpx;
    box-sizing: border-box;
    margin-top: 36rpx;
  }
  .bottom-item {
    display: flex;
    justify-content: space-between;
    line-height: 54rpx;
  }
  .bottom-label {
    font-size: 24rpx;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    color: #5c5f66;
  }
  .bottom-value {
    font-size: 24rpx;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    color: #010914;
  }
}
.bottom-btn {
  width: 750rpx;
  height: 148rpx;
  background: #ffffff;
  box-shadow: 0rpx -4rpx 8rpx 0rpx rgba(0, 0, 0, 0.1),
    0rpx -4rpx 8rpx 0rpx rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0rpx;
  .btn {
    width: 690rpx;
    height: 88rpx;
    line-height: 88rpx;
    text-align: center;
    margin: 0 auto;
    background: #1862f5;
    box-shadow: 0rpx -4rpx 8rpx 0rpx rgba(0, 0, 0, 0.1);
    border-radius: 12rpx;
    font-size: 30rpx;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    color: #ffffff;
  }
}
.popup-box {
  width: 640rpx;
  height: 680rpx;
  background: #f5f7fb;
  border-radius: 20rpx;
  .title {
    width: 216rpx;
    height: 54rpx;
    font-size: 36rpx;
    font-family: AppleSystemUIFont;
    color: #000000;
    margin: 36rpx auto;
  }
  .item {
    display: flex;
    justify-content: space-between;
    padding: 0rpx 46rpx;
    margin: 40rpx 0rpx;
    box-sizing: border-box;
  }
  .label {
    width: 170rpx;
  }
  .value {
    text-align: right;
    width: 400rpx;
  }
  .item ::v-deep .uni-input-placeholder {
    text-align: right;
  }
  .item ::v-deep .uni-input-input {
    text-align: right;
  }
  .btn {
    width: 562rpx;
    height: 88rpx;
    line-height: 88rpx;
    background: #1862f5;
    border-radius: 12rpx;
    font-size: 30rpx;
    font-family: AppleSystemUIFont;
    color: #ffffff;
    text-align: center;
    margin: 80rpx auto;
  }
}
.record-box {
  width: 640rpx;
  height: 908rpx;
  background: #f5f7fb;
  border-radius: 20rpx;
  padding: 36rpx;
  box-sizing: border-box;
  .title {
    width: 216rpx;
    height: 54rpx;
    font-size: 36rpx;
    font-family: AppleSystemUIFont;
    color: #000000;
    margin: 12rpx auto;
  }
  .btn {
    width: 562rpx;
    height: 88rpx;
    line-height: 88rpx;
    background: #1862f5;
    border-radius: 12rpx;
    font-size: 30rpx;
    font-family: AppleSystemUIFont;
    color: #ffffff;
    text-align: center;
    margin: 40rpx auto;
  }
  .tip {
    font-size: 28rpx;
    font-family: AppleSystemUIFont;
    color: #1862f5;
    line-height: 40rpx;
    margin-top: 40rpx;
    margin-bottom: 20rpx;
  }
  .label {
    font-size: 28rpx;
    font-family: AppleSystemUIFont;
    color: #5c5f66;
    margin-bottom: 12rpx;
  }
  .item {
    margin-top: 28rpx;
    margin-bottom: 12rpx;
  }
  .status-box {
    width: 562rpx;
    height: 100rpx;
    line-height: 100rpx;
    background: #ffffff;
    border-radius: 20rpx;
    font-size: 30rpx;
    padding-left: 20rpx;
    box-sizing: border-box;
  }
  ::v-deep .superwei-combox__input {
    height: 76rpx;
  }
  & ::v-deep input {
    text-align: left !important;
  }
  & ::v-deep .uni-input-wrapper {
    text-align: left;
  }
}
.symbol{
  color: red;
}
</style>
