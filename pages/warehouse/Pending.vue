<template>
  <view class="content">
    <u-sticky bgColor="#F5F7FB">
      <view
        style="
          background-color: #f4f7fd;
          height: 100rpx;
          width: 730rpx;
          display: flex;
          align-items: center;
          justify-content: space-between;
        "
      >
        <view
          class="top-left"
          style="
            background-color: #fff;
            width: 570rpx;
            height: 76rpx;
            border-radius: 180rpx;
            margin-left: 20rpx;
            display: flex;
            align-items: center;
          "
        >
          <u-icon name="search" size="28" @click="selectTireNo"></u-icon>
          <superwei-combox
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
        <view
          class="top-right"
          style="
            background-color: #fff;
            width: 120rpx;
            height: 76rpx;
            border-radius: 180rpx;
            right: 20rpx;
            text-align: center;
            line-height: 96rpx;
          "
        >
          <image
            @click="scan"
            style="width: 40rpx; height: 42rpx"
            src="https://tpms.5i84.cn/img/images/carlive/crams.png"
            mode=""
          ></image>
        </view>
      </view>
    </u-sticky>
    <view style="margin-top: 10rpx" v-if="list && list.length > 0">
      <view
        class="menu-list"
        v-for="(item, index) in list"
        :key="index"
        @click="godispose(item)"
      >
        <view class="list-cell">
          <view class="menu-item-box">
            <image
              src="https://tpms.5i84.cn/img/images/carlive/liimg.png"
              style="
                width: 100rpx;
                height: 102rpx;
                margin-left: 24rpx;
                margin-right: 24rpx;
              "
            >
            </image>
            <view>
              <view
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  width: 520rpx;
                "
              >
                <view class="text">{{ item.tireNo }}</view>
                <view
                  class="alarm"
                  style="
                    background-color: rgba(24, 98, 245, 0.1);
                    color: #1862f5;
                  "
                >
                  {{ item.stockStatus }}
                </view>
              </view>
              <view class="text" style="color: #5c5f66; font-size: 24rpx"
                ><text>{{ item.warehouseName }}</text>
              </view>
            </view>
          </view>
        </view>
        <view class="bottom">
          <view class="test2">
            <view class="TireNumber" style="color: rgba(138, 142, 166, 1)"
              >品牌</view
            >
            <view class="Number">{{ item.tireBrandName }}</view>
          </view>
          <view class="test2">
            <view class="sensor" style="color: rgba(138, 142, 166, 1)"
              >规格</view
            >
            <view class="Number">{{ item.specificationsName }}</view>
          </view>
        </view>
      </view>
      <view
        v-show="is_show"
        style="
          text-align: center;
          width: 100%;
          margin-top: 100rpx;
          padding-bottom: 100rpx;
        "
        >没有更多数据了
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
  </view>
</template>

<script>
import { getlifecycle, getTires } from "@/api/tirePressure.js";
import superweiCombox from "@/components/superwei-combox";
export default {
  components: {
    superweiCombox,
  },
  data() {
    return {
      form: {},
      searchtext: "",
      total: "",
      list: [],
      pageNum: 1,
      pageSize: 10,
      is_show: false,
      tireNo: "",
      tireNoData: [],
    };
  },
  onShow() {
    this.getList();
    this.getTireList();
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
  methods: {
    getList(num, size) {
      let params = {
        pageNum: num ? num : this.pageNum,
        pageSize: size ? size : this.pageSize,
        stockStatus: 55,
        tireNo: this.tireNo,
      };
      getTires(params).then((res) => {
        this.list = res.data.items;
        if (res.data.total != 0) {
          this.list.forEach((i) => {
            i.stockStatus = "待处理";
          });
        }
        this.total = res.data.total;
      });
    },
    selectTireNo(e) {
      this.tireNo = e.tireNo;
      this.pageNum = 1;
      this.pageSize = 10;
      this.list = [];
      this.getList();
    },
    // 扫码
    scan() {
      uni.scanCode({
        success: (res) => {
          this.params.tireNo = res.result;
          getlifecycle(this.params).then((data) => {
            this.form = data.data.items[0];
          });
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
    godispose(e) {
      uni.navigateTo({
        url: "/pages/warehouse/dispose?tireNo=" + e.tireNo,
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
  },
};
</script>

<style lang="scss" scoped>
.top-left /deep/ .u-input {
  border: 0;
  width: 570rpx;
}

.menu-list {
  width: 710upx;
  padding-top: 18rpx;
  height: 280upx;
  margin-left: 20rpx;
  background-color: #fff;
  border-radius: 20rpx;
  margin-bottom: 20rpx;
}

.menu-item-box {
  width: 710rpx;
  height: 102rpx;
  display: flex;
  align-items: center;
}

.text {
  font-size: 32rpx;
  color: #010914;
}

.alarm {
  width: 88rpx;
  height: 52rpx;
  border-radius: 8rpx;
  font-size: 24rpx;
  text-align: center;
  line-height: 52rpx;
}

.bottom {
  width: 670rpx;
  height: 120rpx;
  background-color: rgba(245, 247, 251, 1);
  margin-left: 20rpx;
  margin-top: 20rpx;
  border-radius: 20rpx;
  display: flex;
  align-items: center;
}

.test2 {
  width: 335rpx;
  height: 80rpx;
  text-align: center;
  font-size: 24rpx;
  padding-top: 20rpx;
}

.Number {
  color: rgba(1, 9, 20, 1);
}

/deep/ .u-icon {
  margin-left: 34rpx;
  margin-right: 16rpx;
}
</style>