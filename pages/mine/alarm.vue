<template>
  <view class="content">
    <u-sticky bgColor="#F5F7FB">
      <view style="background-color: #f4f7fd; height: 100rpx; width: 100%">
        <view class="searchbox">
          <view class="search-box">
            <u-icon name="search" size="28" @click="search"></u-icon>
            <superwei-combox
              class="search"
              :candidates="carList"
              :isJSON="true"
              keyName="name"
              placeholder="搜索车牌号"
              v-model="vehicleNo"
              @select="search"
              @input="clearSearch"
            ></superwei-combox>
          </view>
        </view>
      </view>
    </u-sticky>

    <view v-if="form && form.length > 0">
      <view class="menu-list" v-for="(item, index) in form" :key="index">
        <view class="list-cell">
          <view class="menu-item-box">
            <view style="display: flex; align-items: center">
              <image
                src="https://tpms.5i84.cn/img/jinbao.png"
                style="
                  width: 100rpx;
                  height: 102rpx;
                  margin-left: 24rpx;
                  margin-right: 24rpx;
                "
              >
              </image>
              <view style="white-space: nowrap">
                <view class="text">{{ item.vehicleNo }}</view>
                <view class="text" style="color: #5c5f66; font-size: 24rpx"
                  ><text>{{ item.reportTime | formatDate }}</text>
                </view>
              </view>
            </view>
            <view style="display: flex; flex-wrap: wrap; padding-right: 18rpx">
              <view
                v-for="(i, ind) in item.alarmLevelDesc"
                :key="ind"
                style="margin-left: 4rpx"
              >
                <view
                  class="alarm"
                  style="
                    background-color: rgba(43, 201, 152, 0.1);
                    color: rgba(43, 201, 152, 1);
                  "
                  v-if="i == '高压报警'"
                  >{{ i }}</view
                >
                <view
                  class="alarm"
                  style="
                    background-color: rgba(255, 141, 26, 0.1);
                    color: rgba(255, 141, 26, 1);
                  "
                  v-else-if="i == '低压报警'"
                  >{{ i }}</view
                >
                <view
                  class="alarm"
                  v-else
                  style="color: #808080; background-color: beige"
                  >{{ i }}</view
                >
              </view>
            </view>
          </view>
        </view>
        <view class="bottom">
          <view class="test2">
            <view class="TireNumber" style="color: rgba(138, 142, 166, 1)"
              >胎号</view
            >
            <view class="Number">{{ item.tireNumber }}</view>
          </view>
          <view class="test2">
            <view class="sensor" style="color: rgba(138, 142, 166, 1)"
              >车队</view
            >
            <view class="Number">{{ item.fleetName }}</view>
          </view>
        </view>
      </view>

      <view
        v-show="aa"
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
import { alarmType, alarmRecords } from "@/api/tirePressure.js";
import { getplateNumber } from "@/api/daily.js";
import superweiCombox from "@/components/superwei-combox";
export default {
  components: {
    superweiCombox,
  },
  data() {
    return {
      form: [],
      vehicleNo: "",
      type: [],
      pageNum: 1,
      pageSize: 10,
      total: "",
      aa: false,
      carList: [],
    };
  },
  async onLoad() {
    // const data = await alarmType()
    // console.log(data)
    // this.type = data.data
    this.getList();
    this.getCarNo();
  },
  onReachBottom() {
    if (this.form.length == this.total) {
      this.aa = true;
    } else {
      this.pageNum++;
      this.getList();
    }
  },
  filters: {
    formatDate: function (value) {
      let date = new Date(value); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear() + "-";
      let M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      let D = date.getDate() + " ";
      let h = date.getHours() + ":";
      let m = date.getMinutes() + ":";
      let s = date.getSeconds();
      return Y + M + D + h + m + s;
    },
  },
  methods: {
    async getList(num, size) {
      let params = {
        pageNum: num ? num : this.pageNum,
        pageSize: size ? size : this.pageSize,
      };
      if (this.vehicleNo) {
        params.vehicleNo = this.vehicleNo;
      }
      const data1 = await alarmRecords(params);
      this.form = size
        ? data1.data.items
        : [...this.form, ...(data1.data.items || [])];
      this.total = data1.data.total;
    },
    search() {
      this.pageNum = 1;
      this.form = [];
      this.getList();
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
      width: 490rpx;
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
.top /deep/ .u-input {
  border: 0;
}

.menu-list {
  width: 710upx;
  padding-top: 18rpx;
  min-height: 280upx;
  margin-left: 20rpx;
  background-color: #fff;
  border-radius: 20rpx;
  margin-bottom: 20rpx;
  padding-bottom: 18rpx;
  padding-right: 18rpx;
  box-sizing: border-box;
}

.menu-item-box {
  width: 710rpx;
  height: max-content;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.text {
  font-size: 32rpx;
  color: #010914;
}

.alarm {
  width: 160rpx;
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

input {
  height: 76rpx;
}

/deep/ .u-icon {
  margin-left: 34rpx;
  margin-right: 16rpx;
}
</style>