<template>
  <view class="content">
    <view class="top-box">
      <view class="serchbox">
        <u-icon name="search" size="28"></u-icon>
        <superwei-combox
          class="search"
          :candidates="carNoList"
          :isJSON="true"
          keyName="name"
          placeholder="搜索车牌号"
          @select="selectCar"
          @input="emptySearch"
        ></superwei-combox>
      </view>
    </view>
    <view style="padding-top: 60px" v-if="list && list.length > 0">
      <view
        class="contain-item"
        v-for="(item, index) of list"
        :key="index"
        @click="goDetail(item.vehicle)"
      >
        <view class="top">
          <image
            :src="$util.ossImg('img/tirePressure/car.png')"
            class="bus-icon"
          />
          <view class="title">
            <view class="title-text">
              <view class="car-num">{{ item.carNumber }}</view>
              <!-- <view class="car-version">{{ item.carClassName }}</view> -->
            </view>
            <view class="title-info">
              <view>{{ item.fleetName }}</view>
              <view class="id">ID：{{ item.vehicle }}</view>
            </view>
          </view>
        </view>
        <view class="bottom">
          <view class="box">
            <view class="label">车型</view>
            <view class="value">{{ item.carClassName }}</view>
          </view>
          <view class="box">
            <view class="label">报警类型</view>
            <view class="value">高压报警车辆</view>
          </view>
        </view>
      </view>
      <view
        v-show="is_show"
        style="text-align: center; width: 100%; margin: 50rpx 0"
        >没有更多数据了</view
      >
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
  </view>
</template>

<script>
import superweiCombox from "@/components/superwei-combox";
import { getplateNumber, tireMonitorList } from "@/api/daily.js";
export default {
  components: {
    superweiCombox,
  },
  data() {
    return {
      carNoList: [],
      carNoValue: "",
      pageNum: 1,
      pageSize: 10,
      total: 0,
      is_show: false,
      list: [],
      versionType: "",
      receiverCarNo: "",
      receiverId: "",
      chioceData: {},
      carNumber: "",
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
    this.getPlateNumberList();
    this.getList();
  },
  methods: {
    goDetail(id) {
      uni.navigateTo({
        url: `/pageA/tirePressure/detail?item=${id}`,
      });
    },
    getPlateNumberList() {
      getplateNumber().then((res) => {
        if (res.code == 200) {
          this.carNoList = res.data.items.map((item) => {
            return { name: item };
          });
        }
      });
    },
    getList() {
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        monitorStatus: "10201",
        carNumber: this.carNumber,
      };

      uni.showLoading({
        title: "加载中",
      });
      tireMonitorList(params)
        .then((res) => {
          uni.hideLoading();
          if (res.code == 200) {
            this.list = [...this.list, ...(res.data.items || [])];
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
    selectCar(e) {
      this.carNumber = e.name;
      this.list = [];
      this.pageNum = 1;
      this.pageSize = 1;
      this.getList();
    },
    emptySearch(e) {
      if (e == "") {
        this.list = [];
        this.pageNum = 1;
        this.pageSize = 1;
        this.carNumber = "";
        this.getList();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.top-box {
  width: 750rpx;
  height: 116rpx;
  position: fixed;
  margin: 0 auto;
  background-color: #f5f7fb;
  z-index: 99;
  .serchbox {
    width: 710rpx;
    height: 80rpx;
    margin: 0 auto;
    margin-top: 20rpx;
    background: #ffffff;
    border-radius: 180rpx;
    display: flex;
    justify-content: space-around;
    & ::v-deep input {
      text-align: left !important;
    }
    .search {
      width: 480rpx;
    }
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
    background: rgba(43, 201, 152, 0.1);
    border-radius: 8rpx;
    font-size: 20rpx;
    font-family: AppleSystemUIFont;
    color: #2bc998;
    text-align: center;
    line-height: 38rpx;
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
</style>
