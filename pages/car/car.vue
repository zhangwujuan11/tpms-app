<template>
  <view class="content">
    <u-sticky bgColor="#F5F7FB">
      <!-- <u-tabs
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
      ></u-tabs> -->
      <view class="serchbox">
          <u-search v-model="carNoValue" placeholder="搜索车牌号" @custom="searchData()" @clear="clearSearch" @search="searchData()" :clearabled="true" :show-action="true" bg-color="#fff" height="76rpx"></u-search>
      </view>
      <view class="buttonbox">
        <view class="top-btn" @click="is_fleet = true"><view class="name">{{fleetName||'组织名称'}}</view><image class="down" :src="$util.ossImg('img/tirePressure/down.png')"></view>
        <view class="top-btn" @click="is_carno = true"><view class="name">{{ carNoName|| '车牌号' }}</view><image class="down" :src="$util.ossImg('img/tirePressure/down.png')"></view>
        <view class="top-btn" @click="is_version = true"><view class="name">{{ versionName||'软件版本' }}</view><image class="down" :src="$util.ossImg('img/tirePressure/down.png')"></view>
      </view>
    </u-sticky>
  <view v-if="list && list.length > 0">
    <view class="contain-item" v-for="(item,index) of list" :key="index" @click="goDetail(item.vehicleId)">
		<view class="top">
		<image :src="$util.ossImg('img/tirePressure/car.png')" class="bus-icon" />
		<view class="title">
			<view class="title-text">
				<view class="car-num">{{ item.vehicleNo }}</view>
				<view class="car-version" :style="{'background':item.systemVersion == 5001 ?'rgba(43, 201, 152, 0.1)':'rgba(24,98,245,0.1)','color':item.systemVersion == 5001 ?'#2bc998':'#1862F5'}">{{ item.systemVersion == 5001 ? "纯软件版" : "硬件版" }}</view>
			</view>
			<view class="title-info">
				<view>{{ item.fleetName }}</view>
				<!-- <view class="id">ID：{{ item.vehicleId }}</view> -->
			</view>
		</view>
		</view>
		<view class="bottom">
			<view class="box">
				<view class="label">品牌</view>
				<view class="value">{{ item.brand||"" }}</view>
			</view>
			<view class="box">
				<view class="label">车型</view>
				<view class="value">{{ item.carClassName }}</view>
			</view>
			<view class="box">
				<view class="label">累计里程</view>
				<view class="value">{{ item.totalMileage||"0" }}</view>
			</view>
			<view class="box" @click.stop="openReceiver(item)">
				<view class="label">传感器ID</view>
				<view :class="item.receiverId?'value':'valuetwo'">{{ item.receiverId? item.receiverId:"未绑定" }}</view>
			</view>
		</view>
	</view>
  </view>
      <view
      v-else
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
  <view v-show="is_show" style="text-align: center; width: 100%;margin:50rpx 0;">没有更多数据了</view>
	<image @click="goAdd(0)" :src="$util.ossImg('img/add.png')" class="add-icon" />
    <u-picker
      @cancel="is_version = false"
      :show="is_version"
      ref="uPicker"
      :columns="versionList"
      @confirm="versionConfirm"
      :immediateChange="true"
    ></u-picker>
    <u-picker
      keyName="deptName"
      @cancel="is_fleet = false"
      :show="is_fleet"
      ref="uPicker"
      :columns="fleetList"
      @confirm="fleetConfirm"
      :immediateChange="true"
    ></u-picker>
    <u-picker
      @cancel="is_carno = false"
      :show="is_carno"
      ref="uPicker"
      :columns="carNoList"
      @confirm="carNoConfirm"
      :defaultIndex="carNoDefault"
      :immediateChange="true"
    ></u-picker>

           <u-popup
      :show="receiverShow"
      :round="10"
      mode="center"
      :closeable="true"
      @close="close"
    >
      <view
        class="receiver-box"
        :style="{
          backgroundImage: 'url(' + $util.ossImg('img/background.png') + ')',
          backgroundSize: '640rpx 134rpx',
          backgroundRepeat: 'no-repeat',
        }"
      >
        <view class="title">绑定接收器ID</view>
        <view>
          <view class="label">车牌号</view>
          <u--input
            disabled
            customStyle="height:100rpx;background: #FFFFFF;width: 562rpx;border-radius: 20rpx;padding-left:22rpx;box-sizing: border-box;"
            v-model="receiverCarNo"
            border="none"
            placeholder="请输入车牌号"
          ></u--input>
        </view>
        <view class="item" style="position:relative;">
          <view class="label">接收器ID</view>
          <u--input
            :maxlength="24"
            customStyle="height:100rpx;background: #FFFFFF;width: 562rpx;border-radius: 20rpx;padding-left:22rpx;box-sizing: border-box;"
            v-model="receiverId"
            border="none"
            placeholder="请输入接收器ID"
            :disabled="chioceData.receiverId?true:false"
          ></u--input>
          <image @click="gocamner" :src="($util.ossImg('/img/camreserch.png'))" style="width: 42rpx;height: 40upx;position: absolute;right: 40rpx;top:50%;"></image>
        </view>
        <view class="btn" @click="confirmReceiver">{{ chioceData.receiverId?'解绑':'确定' }}</view>
      </view>
    </u-popup>

  </view>
</template>

<script>
import {
  getfleetList,
  getplateNumber,
  getVehicleList,
  vehiclesBinds,
} from "@/api/daily.js";
export default {
  data() {
    return {
      tabsList: [
        {
          name: "全部车辆",
        },
        {
          name: "不在线车辆",
        },
        {
          name: "在线车辆",
        },
      ],
      // current: 0,
      is_version: false,
      is_fleet: false,
      is_carno: false,
      versionList: [["全部", "硬件版", "纯软件版"]],
      fleetList: [],
      carNoList: [],
      fleetName: "",
      carNoName: "",
      versionName: "",
      carNoValue: "",
      pageNum: 1,
      pageSize: 10,
      total: 0,
      is_show: false,
      list: [],
      versionType: "",
      receiverShow: false,
      receiverCarNo: "",
      receiverId: "",
      chioceData: {},
      carNoDefault: [0],
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
    this.getcarList();
    this.getPlateNumberList();
    this.getList();
  },
  methods: {
    // change(index) {
    //   console.log(index);
    // },
    versionConfirm(e) {
      this.versionName = e.value[0];
      this.is_version = false;
      switch (this.versionName) {
        case "硬件版":
          this.versionType = "5002";
          break;
        case "纯软件版":
          this.versionType = "5001";
          break;
        default:
          this.versionType = "";
          break;
      }
      this.searchData();
    },
    fleetConfirm(e) {
      this.fleetName = e.value[0].deptName;
      this.fleetId = e.value[0].id;
      this.is_fleet = false;
      this.searchData();
    },
    carNoConfirm(e) {
      if (e.value[0] == "全部") {
        this.carNoValue = "";
        this.carNoName = "全部";
      } else {
        this.carNoValue = e.value[0];
        this.carNoName = e.value[0];
      }
      this.is_carno = false;
      this.searchData();
    },
    goDetail(id) {
      uni.navigateTo({
        url: `/pageA/vehicle/detail?id=${id}`,
      });
    },
    goAdd() {
      uni.navigateTo({
        url: `/pageA/vehicle/edit`,
      });
    },
    getcarList() {
      getfleetList().then((res) => {
        if (res.code == 200) {
          this.fleetList = [res.data];
          this.fleetList[0].unshift({ deptName: "全部", id: null });
        }
      });
    },
    getPlateNumberList() {
      getplateNumber().then((res) => {
        if (res.code == 200) {
          this.carNoList = [res.data.items];
          this.carNoList[0].unshift("全部");
        }
      });
    },
    getList(num, size) {
      let params = {
        pageNum: num ? num : this.pageNum,
        pageSize: size ? size : this.pageSize,
        mainNumber: this.carNoValue,
        fleetId: this.fleetId,
        versionType: this.versionType,
      };

      uni.showLoading({
        title: "加载中",
      });
      getVehicleList(params)
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
    openReceiver(e) {
      this.receiverCarNo = e.vehicleNo;
      this.chioceData = e;
      this.receiverId = e.receiverId || "";
      this.receiverShow = true;
    },
    close() {
      this.receiverShow = false;
      this.receiverId = "";
      this.chioceData = {};
    },
    // 传感器扫码
    gocamner() {
      uni.scanCode({
        success: (res) => {
          this.receiverId = res.result;
          this.$forceUpdate();
        },
        fail: (err) => {
          this.$refs.uToast.show({
            type: "error",
            message: err,
            iconUrl: "https://cdn.uviewui.com/uview/demo/toast/error.png",
          });
        },
        complete: () => {
          console.log("扫码结束");
        },
      });
    },
    confirmReceiver() {
      let params = {
        id: this.chioceData.vehicleId,
        data: {
          bindStatus: this.chioceData.receiverId ? "1" : "0",
          receiverId: this.receiverId,
        },
      };
      vehiclesBinds(params).then((res) => {
        if (res.code == 200) {
          this.receiverShow = false;
          this.getList(1, this.list.length);
          uni.showToast({
            title: this.chioceData.receiverId ? "解绑成功" : "绑定成功",
            icon: "none",
            duration: 1000,
          });
          this.receiverId = "";
          this.chioceData = {};
        }
      });
    },
    clearSearch() {
      this.carNoValue = "";
      this.carNoName = "";
      this.carNoDefault = [0];
      this.searchData();
    },
  },
};
</script>

<style lang="scss" scoped>
.serchbox {
  width: 710rpx;
  height: 106rpx;
  margin: 0 auto;
  padding-top: 20rpx;
}
.buttonbox {
  width: 672rpx;
  display: flex;
  justify-content: space-between;
  height: 84rpx;
  margin: 0 auto;
  .top-btn {
    width: 200rpx;
    height: 68rpx;
    background: #ffffff;
    border-radius: 180rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24rpx;
    font-family: AppleSystemUIFont;
    color: #010914;
  }
  .down {
    width: 24rpx;
    height: 24rpx;
    margin-left: 12rpx;
  }
  .name {
    max-width: 166rpx;
  }
}
.contain-item {
  width: 710rpx;
  min-height: 280rpx;
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
  .car-version {
    width: 120rpx;
    height: 38rpx;
    border-radius: 8rpx;
    font-size: 20rpx;
    font-family: AppleSystemUIFont;
    text-align: center;
    line-height: 38rpx;
    position: absolute;
    right: 200rpx;
  }
  .title-info {
    font-size: 24rpx;
    font-family: AppleSystemUIFont;
    color: #5c5f66;
    display: flex;
    .id {
      margin-left: 40rpx;
    }
  }
  .bottom {
    width: 670rpx;
    height: 120rpx;
    background: #f5f7fb;
    border-radius: 20rpx;
    margin-top: 18rpx;
    display: flex;
    align-items: center;
    .box {
      width: 168rpx;
      height: 80rpx;
      text-align: center;
    }
    .label {
      font-size: 24rpx;
      font-family: AppleSystemUIFont;
      color: #8a8ea6;
      margin-bottom: 8rpx;
    }
    .value {
      font-size: 24rpx;
      font-family: AppleSystemUIFont;
      color: #010914;
      white-space: nowrap; /* 将文本在同一行显示 */
text-overflow: ellipsis; /* 当文本超出容器长度时显示省略号 */
overflow: hidden;
    }
    .valuetwo {
      font-size: 24rpx;
      font-family: AppleSystemUIFont;
      color: #ff5733;
    }
  }
}
.add-icon {
  width: 112rpx;
  height: 112rpx;
  position: fixed;
  right: 38rpx;
  top: 980rpx;
  z-index: 999;
}

.receiver-box {
  width: 640rpx;
  height: 610rpx;
  background: #f5f7fb;
  border-radius: 20rpx;
  padding: 36rpx;
  box-sizing: border-box;
  .title {
    width: 220rpx;
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
  ::v-deep .uni-select {
    border: none !important;
    background: #ffffff;
    height: 100rpx;
  }
  ::v-deep .uni-select__input-placeholder {
    font-size: 28rpx;
    font-family: AppleSystemUIFont;
    color: #b4b5bf !important;
  }
}
</style>
