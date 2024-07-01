<template>
  <view :style="{ 'padding-bottom': current == 0 ? '160rpx' : '10rpx' }">
    <u-sticky bgColor="#F5F7FB">
      <u-tabs
        :list="tabsList"
        bar-width="100rpx"
        :scrollable="false"
        lineColor="#1862F5"
        :inactiveStyle="{
          color: '#8A8EA6',
        }"
        itemStyle="padding:0rpx;width:250rpx;height: 80rpx;background:white;"
        @change="change"
      ></u-tabs>
      <view v-if="current == 1">
        <view class="searbox">
          <view>
            <u--input
              inputAlign="center"
              shape="circle"
              placeholder="请输入修补单号"
              prefixIconStyle="font-size: 22px;color: #909399"
              v-model="mid"
            ></u--input>
          </view>
          <!-- <view>
            <u--input
              inputAlign="center"
              shape="circle"
              placeholder="请输入修补人"
              prefixIconStyle="font-size: 22px;color: #909399"
              v-model="maintainer"
            ></u--input>
          </view> -->
        <!-- </view> -->
        <!-- <view class="searboxtwo"> -->
          <!-- <view>
            <u--input
              inputAlign="center"
              shape="circle"
              placeholder="请输入修补单厂家"
              prefixIconStyle="font-size: 22px;color: #909399"
              v-model="manufacturer"
            ></u--input>
          </view> -->
          <view class="searchbtn" @click="searchRecords">搜索</view>
        </view>
      </view>
      <view v-if="current == 0" class="searchtire-box">
        <view class="top-left">
          <u-icon name="search" size="28" @click="selectTireNo"></u-icon>
          <superwei-combox
            class="search"
            style="width: 400rpx"
            :candidates="tireNoData"
            :isJSON="true"
            keyName="tireNo"
            placeholder="搜索轮胎号"
            @select="selectTireNo"
            @input="clearSearch"
            isAllowCreate="false"
            v-model="tireNo"
          ></superwei-combox>
        </view>
        <view class="top-right">
          <image
            @click="scan"
            style="width: 40rpx; height: 42rpx"
            src="https://tpms.5i84.cn/img/images/carlive/crams.png"
            mode=""
          ></image>
        </view>
      </view>
    </u-sticky>
    <u-checkbox-group
      v-if="current == 0"
      placement="column"
      v-model="checkList"
      @change="checkboxChange"
    >
      <view class="main-box" v-for="(item, index) of list" :key="index">
        <view class="item">
          <u-checkbox :name="item.tireNo" shape="circle" :size="22">
          </u-checkbox>
          <view class="item-right">
            <image
              :src="$util.ossImg('img/images/carlive/liimg.png')"
              style="width: 100rpx; height: 100rpx"
            ></image>
            <view class="item-right-text">
              <view class="item-right-text-no">{{ item.tireNo }}</view>
              <view class="item-right-text-company">{{
                item.companyName || ""
              }}</view>
            </view>
            <view class="item-right-text-status">{{ item.statusName }}</view>
          </view>
        </view>
        <view class="bottom">
          <view class="bottom-item">
            <view class="bottom-label">所属仓库</view>
            <view class="bottom-value">{{ item.warehouseName }}</view>
          </view>
          <view class="bottom-item">
            <view class="bottom-label">品牌</view>
            <view class="bottom-value">{{ item.tireBrandName }}</view>
          </view>
          <view class="bottom-item">
            <view class="bottom-label">花纹型号</view>
            <view class="bottom-value">{{ item.pattern }}</view>
          </view>
          <view class="bottom-item">
            <view class="bottom-label">规格</view>
            <view class="bottom-value">{{ item.specificationsName }}</view>
          </view>
        </view>
      </view>
    </u-checkbox-group>
    <view class="records" v-if="current == 1">
      <view
        v-for="(item, index) of list"
        :key="index"
        class="record"
        @click="goDetail(item.id)"
      >
        <view class="top">
          <image :src="$util.ossImg('img/grouping.png')" class="icon" />
          <view class="top-right">
            <view class="top-right-no">修补单号：{{ item.mid }}</view>
            <view class="top-right-date"
              >修补日期{{ item.maintenanceDate }}</view
            >
          </view>
        </view>
        <view class="bottom">
          <view class="bottom-item">
            <view class="bottom-label">修补人</view>
            <view class="bottom-value">{{ item.maintainer }}</view>
          </view>
          <view class="bottom-item">
            <view class="bottom-label">修补厂家</view>
            <view class="bottom-value">{{ item.manufacturer }}</view></view
          >
        </view>
      </view>
    </view>
    <view class="bottom-btn" v-if="current == 0">
      <view style="display: flex; align-items: center">
        <u-checkbox-group
          v-model="checkAll"
          placement="column"
          @change="radioChange"
        >
          <u-checkbox
            shape="circle"
            :label="radioAll.name"
            :name="radioAll.name"
            :size="22"
          >
          </u-checkbox>
        </u-checkbox-group>
        <view class="checktotal">已选{{ checkList.length }}个</view>
      </view>
      <view v-if="checkList.length > 0" @click="goAdd" class="btn"
        >修补登记</view
      >
    </view>
    <view
      v-show="is_show && list && list.length > 0"
      style="text-align: center; width: 100%; margin: 50rpx 0"
      >没有更多数据了</view
    >
    <view
    class="noimgbox"
      v-if="!list || list.length == 0">
      <image src="@/static/images/nodata.png"></image>
      暂无数据
    </view>
  </view>
</template>

<script>
import { getTires, maintenanceList, tireStatus } from "@/api/daily.js";
import superweiCombox from "@/components/superwei-combox";
export default {
  components: {
    superweiCombox,
  },
  data() {
    return {
      tabsList: [
        {
          name: "待修补轮胎",
        },
        {
          name: "修补记录",
        },
      ],
      current: 0,
      list: [],
      radioAll: { label: "all", name: "全选" },
      checkList: [],
      checkAll: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      searchTireNo: "",
      tireNoData: [],
      mid: "",
      // maintainer: "",
      // manufacturer: "",
      is_show: false,
      tireNo: "",
    };
  },
  onLoad() {
    this.getRepairableList();
    this.getTireList();
  },
  onReachBottom() {
    if (this.list.length == this.total) {
      this.is_show = true;
    } else {
      this.is_show = false;
      this.pageNum++;
      if (this.current == 0) {
        this.getRepairableList();
      } else if (this.current == 1) {
        this.getRecordList();
      }
    }
  },
  methods: {
    change(el) {
      this.pageNum = 1;
      this.pageSize = 10;
      this.list = [];
      this.current = el.index;
      switch (this.current) {
        case 0:
          this.getRepairableList();
          break;
        case 1:
          this.getRecordList();
          break;
      }
    },
    checkboxChange(e) {
      this.checkList = e;
      if (this.checkList.length != this.list.length) {
        this.checkAll = [];
      } else if (this.checkList.length == this.list.length) {
        this.checkAll = ["全选"];
      }
    },
    radioChange(e) {
      if (e[0] == "全选") {
        let temp = [];
        this.list.forEach((item) => {
          temp.push(item.tireNo);
        });
        this.checkList = temp;
      } else {
        this.checkList = [];
      }
    },
    goAdd() {
      let temp = [];
      this.checkList.forEach((item) => {
        this.list.forEach((ptem) => {
          if (item == ptem.tireNo) {
            temp.push(ptem);
          }
        });
      });
      uni.setStorageSync("maintenanceList", temp);
      uni.navigateTo({
        url: "/pageA/daily/repairRegistration",
      });
    },
    goDetail(e) {
      uni.navigateTo({
        url: "/pageA/daily/maintenanceDetail?id=" + e,
      });
    },
    getRepairableList(num, size) {
      let params = {
        pageNum: num ? num : this.pageNum,
        pageSize: size ? size : this.pageSize,
        stockStatus: "30",
        tireNo: this.tireNo,
      };

      uni.showLoading({
        title: "加载中",
      });
      getTires(params)
        .then((res) => {
          uni.hideLoading();
          if (res.code == 200) {
            this.list = size
              ? res.data.items
              : [...this.list, ...(res.data.items || [])];
            this.total = res.data.total;
            this.getTireStatus();
            this.checkAll = [];
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
    getTireList() {
      let params = {
        pageNum: 1,
        pageSize: 10000,
      };
      getTires(params).then((res) => {
        if (res.code == 200) {
          this.tireNoData = res.data.items;
        }
      });
    },
    selectTireNo(e) {
      this.tireNo = e.tireNo;
      this.pageNum = 1;
      this.pageSize = 10;
      this.list = [];
      this.getRepairableList();
    },
    clearSearch(e) {
      if (e == "") {
        this.tireNo = e;
        this.pageNum = 1;
        this.pageSize = 10;
        this.list = [];
        this.getRepairableList();
      }
    },
    // 扫码
    scan() {
      uni.scanCode({
        success: (res) => {
          this.tireNo = res.result;
          this.pageNum = 1;
          this.pageSize = 10;
          this.list = [];
          this.getRepairableList();
          this.$forceUpdate();
        },
        fail: (err) => {
          uni.showToast({
            title: "扫描失败,请稍后再试",
            icon: "none",
            duration: 1500,
          });
        },
        complete: () => {
          console.log("扫码结束");
        },
      });
    },
    getRecordList(num, size) {
      let params = {
        pageNum: num ? num : this.pageNum,
        pageSize: size ? size : this.pageSize,
        vehicleNo: null,
        tireNo: null,
        tireBrandId: null,
        specificationsId: null,
        type: 4,
        mid: this.mid,
        // maintainer: this.maintainer,
        // manufacturer: this.manufacturer,
      };

      uni.showLoading({
        title: "加载中",
      });
      maintenanceList(params)
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
    searchRecords() {
      this.pageNum = 1;
      this.pageSize = 10;
      this.list = [];
      this.getRecordList();
    },
    getTireStatus() {
      tireStatus().then((res) => {
        if (res.code == 200) {
          this.list.forEach((item) => {
            for (let i = 0; i < res.data.length; i++) {
              if (item.stockStatus == res.data[i].dictValue) {
                this.$set(item, "statusName", res.data[i].dictLabel);
                break;
              }
            }
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.searbox {
  width: 100%;
  height: 90rpx;
  margin-top: 20rpx;
  display: flex;
  justify-content: space-between;
  padding: 0rpx 20rpx;
  box-sizing: border-box;
  ::v-deep .u-input {
    width: 490rpx;
    height: 76rpx !important;
    margin: 0 auto;
    border: none;
    padding: 0rpx !important;
    background: white;
  }
  .searchbtn {
    width: 200rpx;
    background: white;
    height: 76rpx;
    border-radius: 100rpx;
    text-align: center;
    line-height: 76rpx;
    background: #007dff;
    border-radius: 36rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 28rpx;
  }
}
// .searboxtwo {
//   width: 100%;
//   height: 76rpx;
//   display: flex;
//   justify-content: space-between;
//   padding: 0rpx 20rpx;
//   box-sizing: border-box;
//   ::v-deep .u-input {
//     height: 76rpx !important;
//     margin: 0 auto;
//     border: none;
//     padding: 0rpx !important;
//     background: white;
//   }
// }
.searchtire-box {
  background-color: #f4f7fd;
  height: 100rpx;
  width: 730rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .top-left {
    background-color: #fff;
    width: 570rpx;
    height: 76rpx;
    border-radius: 180rpx;
    margin-left: 20rpx;
    display: flex;
    align-items: center;
  }
  .top-right {
    background-color: #fff;
    width: 120rpx;
    height: 76rpx;
    border-radius: 180rpx;
    right: 20rpx;
    text-align: center;
    line-height: 96rpx;
  }
  ::v-deep .u-icon {
    margin-left: 34rpx;
    margin-right: 16rpx;
  }
  .search ::v-deep input {
    text-align: left !important;
  }
  .search ::v-deep .uni-input-placeholder {
    text-align: left;
  }
}
.main-box {
  width: 710rpx;
  min-height: 274rpx;
  background: #ffffff;
  border-radius: 20rpx;
  margin: 20rpx auto;
  padding: 16rpx 20rpx 16rpx 20rpx;
  box-sizing: border-box;
  .item {
    height: 100rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .item-right {
    line-height: 50rpx;
    width: 600rpx;
    display: flex;
    justify-content: space-between;
  }
  .item-right-text {
    width: 390rpx;
  }
  .item-right-text-no {
    font-size: 32rpx;
    font-family: AppleSystemUIFont;
    color: #010914;
  }
  .item-right-text-company {
    font-size: 24rpx;
    font-family: AppleSystemUIFont;
    color: #5c5f66;
  }
  .item-right-text-status {
    min-width: 78rpx;
    height: 52rpx;
    background: rgba(24, 98, 245, 0.1);
    border-radius: 8rpx;
    font-size: 24rpx;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    color: #1862f5;
    text-align: center;
    padding: 0rpx 10rpx;
    white-space: nowrap;
  }
  .bottom {
    width: 670rpx;
    min-height: 120rpx;
    background: #f5f7fb;
    border-radius: 20rpx 20rpx 0rpx 0rpx;
    margin-top: 18rpx;
    padding: 20rpx 0rpx;
    box-sizing: border-box;
    display: flex;
    .bottom-item {
      width: 25%;
      text-align: center;
    }
    .bottom-label {
      font-size: 24rpx;
      font-family: AppleSystemUIFont;
      color: #8a8ea6;
    }
    .bottom-value {
      font-size: 24rpx;
      font-family: AppleSystemUIFont;
      color: #010914;
    }
  }
}
.bottom-btn {
  position: fixed;
  bottom: 0rpx;
  padding: 30rpx;
  box-sizing: border-box;
  width: 750rpx;
  height: 148rpx;
  background: #ffffff;
  box-shadow: 0rpx -4rpx 8rpx 0rpx rgba(0, 0, 0, 0.1),
    0rpx -4rpx 8rpx 0rpx rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  .checktotal {
    font-size: 24rpx;
    font-family: AppleSystemUIFont;
    color: #5c5f66;
    margin-left: 8rpx;
  }
  .btn {
    width: 420rpx;
    height: 88rpx;
    line-height: 88rpx;
    text-align: center;
    background: #1862f5;
    box-shadow: 0rpx -4rpx 8rpx 0rpx rgba(0, 0, 0, 0.1);
    border-radius: 12rpx;
    margin: 0rpx;
    font-size: 30rpx;
    color: #ffffff;
  }
}

.records {
  .record {
    width: 710rpx;
    min-height: 292rpx;
    background: #ffffff;
    border-radius: 20rpx;
    margin: 20rpx auto;
    padding: 20rpx;
    box-sizing: border-box;
  }
  .icon {
    width: 100rpx;
    height: 100rpx;
  }
  .top {
    display: flex;
    justify-content: space-between;
  }
  .top-right {
    width: 540rpx;
    line-height: 50rpx;
  }
  .top-right-no {
    font-size: 32rpx;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    color: #010914;
  }
  .top-right-date {
    font-size: 24rpx;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    color: #5c5f66;
  }
  .bottom {
    width: 670rpx;
    min-height: 132rpx;
    background: #f5f7fb;
    border-radius: 20rpx;
    padding: 4rpx 18rpx 4rpx 20rpx;
    box-sizing: border-box;
    margin-top: 36rpx;
  }
  .bottom-item {
    display: flex;
    justify-content: space-between;
    line-height: 66rpx;
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
.noimgbox{
    width: 100%;
    padding: 50rpx 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #666666;
}
</style>