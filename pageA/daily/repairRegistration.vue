<template>
  <view style="padding-bottom: 152rpx">
    <u--form
      labelPosition="left"
      :model="form"
      ref="uForm"
      label-width="250rpx"
      :label-style="{ 'font-size': '32rpx', color: '#010914' }"
    >
      <view class="content">
        <u-form-item
          label="修补单号"
          prop="mid"
          required
          borderBottom
          ref="item1"
          class="item1"
        >
          <u--input
            v-model="form.mid"
            border="none"
            placeholder="请输入修补单号"
            inputAlign="right"
          ></u--input>
        </u-form-item>
        <u-form-item
          label="修补厂家"
          prop="manufacturer"
          required
          borderBottom
          ref="item1"
          class="item1"
        >
          <u--input
            v-model="form.manufacturer"
            border="none"
            placeholder="请输入修补厂家"
            inputAlign="right"
          ></u--input>
        </u-form-item>
        <u-form-item
          label="修补人"
          prop="maintainer"
          required
          borderBottom
          ref="item1"
          class="item1"
        >
          <u--input
            v-model="form.maintainer"
            border="none"
            placeholder="请输入修补人"
            inputAlign="right"
          ></u--input>
        </u-form-item>
        <u-form-item
          label="修补日期"
          prop="maintenanceDate"
          ref="item1"
          required
          class="item1"
        >
          <uni-datetime-picker
            placeholder="请选择修补日期时间"
            class="date-box"
            :border="false"
            v-model="form.maintenanceDate"
            :clear-icon="false"
            @change="changeDate"
          />
          <u-icon slot="right" name="arrow-right"></u-icon>
        </u-form-item>
      </view>
      <view v-for="(item, index) of form.tireMaintenanceDetailBos" :key="index">
        <view class="title">修补轮胎明细{{ form.tireMaintenanceDetailBos.length == 1 ? '': index + 1 }}</view>
        <view class="content">
          <view class="item2">
            <view class="item1">胎号</view>
            <view class="text">{{ item.tireNo }}</view>
          </view>
          <view class="item2">
            <view class="item1">品牌</view>
            <view class="text">{{ item.tireBrandName }}</view>
          </view>
          <view class="item2">
            <view class="item1">规格</view>
            <view class="text">{{ item.specificationsName }}</view>
          </view>
          <view class="item2">
            <view class="item1">花纹</view>
            <view class="text">{{ item.pattern }}</view>
          </view>
          <u-form-item label="修补金额" borderBottom required class="item1">
            <u--input
              v-model="item.cost"
              border="none"
              placeholder="请输入修补金额"
              inputAlign="right"
            ></u--input>
            <view style="margin-left: 8rpx" slot="right" class="text"></view>
          </u-form-item>
          <u-form-item
            label="修补内容"
            borderBottom
            required
            class="item1"
            @click="openChioce(0, index)"
          >
            <view v-if="item.content" class="text">{{ item.content }}</view>
            <view class="placeholder" v-else>请选择修补内容</view>
            <u-icon slot="right" name="arrow-right"></u-icon>
          </u-form-item>
          <u-form-item
            label="修补去向"
            required
            class="item1"
            @click="openChioce(1, index)"
          >
            <view v-if="item.stockStatusCn" class="text">{{
              item.stockStatusCn
            }}</view>
            <view class="placeholder" v-else>请选择修补去向</view>
            <u-icon slot="right" name="arrow-right"></u-icon>
          </u-form-item>
        </view>
      </view>
      <view class="content" style="margin-top: 20rpx">
        <u-form-item label="备注" ref="item1" class="item1">
          <u--input
            v-model="form.remark"
            border="none"
            placeholder="请输入备注"
            inputAlign="right"
          ></u--input>
          <view style="margin-left: 8rpx" slot="right" class="text"></view>
        </u-form-item>
      </view>
    </u--form>
    <view class="buttonbox">
      <view class="sum"
        >总费用：￥<text style="font-size: 48rpx">{{ sum }}</text></view
      >
      <view @click="submit" class="btn">保存</view>
    </view>
    <u-picker
      keyName="dictLabel"
      @cancel="is_content = false"
      :show="is_content"
      ref="uPicker"
      :columns="contentData"
      @confirm="confirm($event, 0)"
      title="请选择修补内容"
      :immediateChange="true"
    ></u-picker>
    <u-picker
      keyName="dictLabel"
      @cancel="stock_status = false"
      :show="stock_status"
      ref="uPicker"
      :columns="stockStatusData"
      @confirm="confirm($event, 1)"
      title="请选择修补去向"
      :immediateChange="true"
    ></u-picker>
  </view>
</template>

<script>
import uniDatetimePicker from "@/pageA/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.vue";
import {
  getKey,
  getTireRepair,
  getStockStatus,
  maintenanceAdd,
} from "@/api/daily.js";
export default {
  components: {
    uniDatetimePicker,
  },
  data() {
    return {
      id: "",
      form: {
        mid: "",
        manufacturer: "",
        maintainer: "",
        maintenanceDate: "",
        remark: "",
        tireMaintenanceDetailBos: [],
        type: 4,
      },
      rules: {
        mid: [
          {
            type: "string",
            required: true,
            message: "修补单号不能为空",
            trigger: "change",
          },
        ],
        manufacturer: [
          {
            type: "string",
            required: true,
            message: "修补厂家不能为空",
            trigger: "change",
          },
        ],
        maintainer: [
          {
            type: "string",
            required: true,
            message: "修补人不能为空",
            trigger: "change",
          },
        ],
        maintenanceDate: [
          {
            type: "string",
            required: true,
            message: "修补日期不能为空",
            trigger: "change",
          },
        ],
        // cost: [
        //   { required: true, message: "修补金额不能为空", trigger: "change" },
        // ],
        // contentId: [
        //   { required: true, message: "修补内容不能为空", trigger: "change" },
        // ],
        // stockStatus: [
        //   { required: true, message: "修补去向不能为空", trigger: "change" },
        // ],
      },
      is_content: false,
      stock_status: false,
      contentData: [],
      stockStatusData: [],
      currentIndex: 0,
    };
  },
  onLoad() {
    this.form.maintainer = uni.getStorageSync("username");
    this.form.tireMaintenanceDetailBos = uni.getStorageSync("maintenanceList");
    this.getNum();
    this.getRepairContent();
    this.getStockDestination();
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules);
  },
  computed: {
    sum() {
      var count = 0;
      this.form.tireMaintenanceDetailBos.forEach((item) => {
        count += Number(item.cost || 0);
      });
      return count;
    },
  },
  methods: {
    confirm(e, type) {
      switch (type) {
        case 0:
          this.form.tireMaintenanceDetailBos[this.currentIndex].content =
            e.value[0].dictLabel;
          this.form.tireMaintenanceDetailBos[this.currentIndex].contentId =
            e.value[0].dictValue;
          this.is_content = false;
          break;
        case 1:
          this.form.tireMaintenanceDetailBos[this.currentIndex].stockStatusCn =
            e.value[0].dictLabel;
          this.form.tireMaintenanceDetailBos[this.currentIndex].stockStatus =
            e.value[0].dictValue;
          this.stock_status = false;
          break;
      }
    },
    submit() {
      this.form.totalCost = this.sum;
      this.$refs.uForm
        .validate()
        .then((res) => {
          for (var i = 0; i < this.form.tireMaintenanceDetailBos.length; i++) {
            if (
              !this.form.tireMaintenanceDetailBos[i].cost ||
              this.form.tireMaintenanceDetailBos[i].cost == ""
            ) {
              return uni.showToast({
                title: `请输入轮胎明细${i + 1}的修补金额`,
                icon: "none",
                duration: 2000,
              });
            } else if (!this.form.tireMaintenanceDetailBos[i].content) {
              return uni.showToast({
                title: `请输入轮胎明细${i + 1}的修补内容`,
                icon: "none",
                duration: 2000,
              });
            } else if (!this.form.tireMaintenanceDetailBos[i].stockStatusCn) {
              return uni.showToast({
                title: `请输入轮胎明细${i + 1}的修补去向`,
                icon: "none",
                duration: 2000,
              });
            }
          }

          this.form.maintenanceDate = new Date(
            this.form.maintenanceDate
          ).toISOString();

          maintenanceAdd(this.form).then((res) => {
            if (res.code == 200) {
              const pages = getCurrentPages();
              let prevPage = pages[pages.length - 2];
              // #ifdef MP-WEIXIN
              prevPage = prevPage.$vm;
              // #endif
              prevPage.getRepairableList(1, prevPage.list.length + 1);
              prevPage.checkList = [];
              uni.navigateBack();
              setTimeout(() => {
                uni.showToast({
                  title: "保存成功",
                  icon: "success",
                  duration: 2000,
                });
              }, 500);
            }
          });
        })
        .catch((err) => {
          return uni.showToast({
            title: `${err[0].message}`,
            icon: "none",
            duration: 2000,
          });
        });
    },
    getNum() {
      getKey().then((res) => {
        if (res.code == 200) {
          this.form.mid = res.data;
        }
      });
    },
    getRepairContent() {
      getTireRepair().then((res) => {
        if (res.code == 200) {
        res.data =  res.data.filter((item)=>{
            return item.cssClass!== 'null'
          })
          this.contentData = [res.data];
        }
      });
    },
    getStockDestination() {
      getStockStatus().then((res) => {
        if (res.code == 200) {
            res.data =  res.data.filter(item=>{
            return item.dictValue!=30
          })
          this.stockStatusData = [res.data];
        }
      });
    },
    openChioce(e, index) {
      this.currentIndex = index;
      switch (e) {
        case 0:
          this.is_content = true;
          break;

        case 1:
          this.stock_status = true;
          break;
      }
    },
    changeDate() {
      this.$refs.uForm.validateField("maintenanceDate");
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  background: #ffffff;
  padding: 0rpx 30rpx;
  .item {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 120rpx;
    line-height: 120rpx;
    border-bottom: 1px solid #f3f4f6;
  }
  & ::v-deep .u-form-item__body {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 120rpx;
    line-height: 120rpx;
    padding: 0rpx;
  }
  & ::v-deep .u-form-item__body__left__content__required {
    top: 46rpx !important;
  }
  & ::v-deep .u-form-item__body__right__content__slot {
    flex-direction: row-reverse;
    align-items: flex-end;
  }
  & ::v-deep .uni-date__x-input {
    text-align: right;
  }
  .item1 ::v-deep .uni-input-input {
    text-align: right;
  }
  .item1 ::v-deep .u-form-item__body {
    padding: 0rpx;
  }
  .item1 ::v-deep .uni-input-placeholder {
    text-align: right;
  }
  & /deep/ .u-form-item__body__right__message {
    text-align: right;
  }
  .label {
    font-size: 32rpx;
    font-family: AppleSystemUIFont;
    color: #010914;
  }
  .text {
    font-size: 32rpx;
    font-family: AppleSystemUIFont;
    color: #010914;
  }
  .placeholder {
    font-size: 30rpx;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    color: #c4c5cd;
  }
  & ::v-deep .uni-icons {
    display: none;
  }
  .date-box ::v-deep .uni-date-x {
    text-align: right;
    font-size: 32rpx;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
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
  z-index: 19;
  .u-button {
    width: 420rpx;
    height: 88rpx;
    box-shadow: 0rpx -4rpx 8rpx 0rpx rgba(0, 0, 0, 0.05);
    border-radius: 12rpx;
  }
  .sum {
    font-size: 28rpx;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    color: #5c5f66;
  }
  .btn {
    background: #1862f5;
    box-shadow: 0rpx -4rpx 8rpx 0rpx rgba(0, 0, 0, 0.05);
    border-radius: 12rpx;
    border: none;
    font-size: 30rpx;
    color: #ffffff;
    width: 420rpx;
    height: 88rpx;
    line-height: 88rpx;
    text-align: center;
  }
}
.editbtnbox {
  width: 750rpx;
  height: 148rpx;
  padding: 30rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  .btnone {
    width: 334rpx;
    height: 88rpx;
    background: #ffffff;
    border-radius: 12rpx;
    font-size: 30rpx;
    font-family: AppleSystemUIFont;
    color: #010914;
    border: none;
  }
  .btntwo {
    width: 332rpx;
    height: 88rpx;
    background: #1862f5;
    border-radius: 12rpx;
    border: none;
  }
}
</style>