<template>
  <view>
    <u-sticky bgColor="#F5F7FB" style="height: 210rpx">
      <view class="searchtire-box" style="padding-top: 20rpx">
        <view class="top-left">
          <u-icon name="search" size="28"></u-icon>
          <superwei-combox
            class="search"
            :candidates="tireNoData"
            :isJSON="true"
            keyName="tireNo"
            placeholder="选择轮胎号"
            @select="selectTireNo"
            @input="clearSearch"
            isAllowCreate="false"
            v-model="tireNo"
          ></superwei-combox>
        </view>
      </view>
      <view class="top">
        <view class="top-box">
          <view class="top-item">
            <u-button
              class="custom-style"
              shape="circle"
              @click="is_opendate = true"
            >
              {{ realOpenDate ? realOpenDate : "开始时间" }}
              <u-icon size="10" name="arrow-down"></u-icon>
            </u-button>
          </view>
          <u-icon
            name="close-circle"
            color="rgb(153, 153, 153)"
            size="20"
            v-if="realOpenDate"
            @click="clearOpenDate"
          ></u-icon>
        </view>
        <view class="top-box">
          <view class="top-item"
            ><u-button
              class="custom-style"
              shape="circle"
              @click="is_enddate = true"
              >{{ realEndDate ? realEndDate : "结束时间" }}

              <u-icon size="10" name="arrow-down"></u-icon>
            </u-button>
          </view>
          <u-icon
            name="close-circle"
            color="rgb(153, 153, 153)"
            size="20"
            v-if="realEndDate"
            @click="clearEndDate"
          ></u-icon>
        </view>
      </view>
    </u-sticky>
    <view class="content" v-if="list && list.length > 0">
      <view
        v-for="(item, index) of list"
        :key="index"
        class="content-item"
        @click="goDetail(item)"
      >
        <view class="item-top">
          <image
            :src="$util.ossImg('img/images/carlive/liimg.png')"
            style="width: 100rpx; height: 100rpx"
          ></image>
          <view class="item-top-right">
            <view class="top-no">{{ item.tireNo }}</view>
            <view class="top-time">检查时间：{{ item.inspectionTime }}</view>
          </view>
        </view>
        <view class="item-bottom">
          <view class="item1">
            <view class="label">品牌</view>
            <view class="text">{{ item.brand }}</view>
          </view>
          <view class="item1">
            <view class="label">规格</view>
            <view class="text">{{ item.specification }}</view>
          </view>
          <view class="item1">
            <view class="label">新胎花纹深度</view>
            <view class="text">{{ item.newTreadDepth }}</view>
          </view>
          <view class="item1">
            <view class="label">左侧花纹深度</view>
            <view class="text">{{ item.leftTreadDepth }}</view>
          </view>
          <view class="item1">
            <view class="label">中间花纹深度</view>
            <view class="text">{{ item.middleTreadDepth }}</view>
          </view>
          <view class="item1">
            <view class="label">右侧花纹深度</view>
            <view class="text">{{ item.rightTreadDepth }}</view>
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
    <u-datetime-picker
      @cancel="is_opendate = false"
      @confirm="beginSelect"
      :show="is_opendate"
      v-model="openDate"
      mode="date"
    ></u-datetime-picker>
    <u-datetime-picker
      @cancel="is_enddate = false"
      @confirm="endSelect"
      :show="is_enddate"
      v-model="endDate"
      mode="date"
    ></u-datetime-picker>
  </view>
</template>

<script>
import superweiCombox from "@/components/superwei-combox";
import { inspectionList, getTires } from "@/api/daily.js";
export default {
  components: {
    superweiCombox,
  },
  data() {
    return {
      tireNoData: [],
      openDate: Number(new Date()),
      endDate: Number(new Date()),
      is_opendate: false,
      is_enddate: false,
      list: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      is_show: false,
      realOpenDate: "",
      realEndDate: "",
      tireNo: "",
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
    this.getTireList();
  },
  methods: {
    goDetail(e) {
      uni.navigateTo({
        url: "/pageA/daily/inspectionDetail?id=" + e.id,
      });
    },
    getList() {
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        tireNo: this.tireNo,
        startTime: this.realOpenDate,
        endTime: this.realEndDate,
      };
      inspectionList(params).then((res) => {
        this.list = [...this.list, ...(res.data.items || [])];
        this.total = res.data.total;
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
    clearSearch(e) {
      if (e == "") {
        this.tireNo = e;
        this.pageNum = 1;
        this.pageSize = 10;
        this.list = [];
        this.getList();
      }
    },
    selectTireNo(e) {
      this.tireNo = e.tireNo;
      this.pageNum = 1;
      this.pageSize = 10;
      this.list = [];
      this.getList();
    },
    // 将时间戳转换为日期对象
    timestampToDate(timestamp) {
      var date = new Date(timestamp);
      var year = date.getFullYear();
      var month = date.getMonth() + 1; // 月份从 0 开始
      var day = date.getDate();

      return `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`;
    },
    beginSelect(e) {
      this.is_opendate = false;
      this.realOpenDate = this.timestampToDate(e.value);
      this.pageNum = 1;
      this.pageSize = 10;
      this.list = [];
      this.getList();
    },
    endSelect(e) {
      this.is_enddate = false;
      this.realEndDate = this.timestampToDate(e.value);
      this.pageNum = 1;
      this.pageSize = 10;
      this.list = [];
      this.getList();
    },
    clearOpenDate() {
      this.realOpenDate = "";
      this.pageNum = 1;
      this.pageSize = 10;
      this.list = [];
      this.getList();
    },
    clearEndDate() {
      this.realEndDate = "";
      this.pageNum = 1;
      this.pageSize = 10;
      this.list = [];
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped>
.top {
  width: 660rpx;
  height: 68rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0rpx auto;
  .top-box {
    display: flex;
  }
  .top-item {
    width: 300rpx;
    height: 68rpx;
    background: #ffffff;
    border-radius: 180rpx;
    ::v-deep .u-button {
      font-size: 24rpx;
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      color: #010914;
    }
    .custom-style {
      border: none;
    }
  }
  ::v-deep .superwei-combox {
    height: 56rpx;
    background: #ffffff;
    border-radius: 180rpx;
  }
  .top-item ::v-deep .uni-input-placeholder {
    font-size: 24rpx;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    color: #010914;
  }
  .top-item ::v-deep .uni-icons {
    display: none;
  }
}
.searchtire-box {
  background-color: #f4f7fd;
  height: 100rpx;
  width: 660rpx;
  // display: flex;
  // align-items: center;
  // justify-content: space-between;
  margin: 0 auto;
  .top-left {
    background-color: #fff;
    width: 660rpx;
    height: 76rpx;
    border-radius: 180rpx;
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
  .search {
    width: 500rpx;
  }
  .search ::v-deep input {
    text-align: left !important;
  }
  .search ::v-deep .uni-input-placeholder {
    text-align: left;
  }
}
.content {
  .content-item {
    width: 710rpx;
    min-height: 492rpx;
    background: #ffffff;
    border-radius: 20rpx;
    margin: 20rpx auto;
    padding: 20rpx;
    box-sizing: border-box;
  }
  .item-top {
    display: flex;
    justify-content: space-between;
  }
  .item-top-right {
    width: 540rpx;
    height: 100rpx;
    line-height: 50rpx;
  }
  .top-no {
    font-size: 32rpx;
    font-family: AppleSystemUIFont;
    color: #010914;
  }
  .item-top-right {
    font-size: 24rpx;
    font-family: AppleSystemUIFont;
    color: #5c5f66;
  }
  .item-bottom {
    width: 670rpx;
    min-height: 332rpx;
    background: #f5f7fb;
    border-radius: 20rpx;
    margin-top: 20rpx;
    padding: 18rpx;
    box-sizing: border-box;
    .item1 {
      line-height: 50rpx;
      display: flex;
      justify-content: space-between;
    }
    .label {
      font-size: 24rpx;
      font-family: AppleSystemUIFont;
      color: #5c5f66;
    }
    .text {
      font-size: 24rpx;
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      color: #010914;
    }
  }
}
</style>