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
          label="翻新单号"
          prop="mid"
          required
          borderBottom
          ref="item1"
          class="item1"
        >
          <u--input
            v-model="form.mid"
            border="none"
            placeholder="请输入翻新单号"
            inputAlign="right"
          ></u--input>
        </u-form-item>
        <u-form-item
          label="翻新厂家"
          prop="manufacturer"
          required
          borderBottom
          ref="item1"
          class="item1"
        >
          <u--input
            v-model="form.manufacturer"
            border="none"
            placeholder="请输入翻新厂家"
            inputAlign="right"
          ></u--input>
        </u-form-item>
        <u-form-item
          label="经办人"
          prop="maintainer"
          required
          borderBottom
          ref="item1"
          class="item1"
        >
          <u--input
            v-model="form.maintainer"
            border="none"
            placeholder="请输入经办人"
            inputAlign="right"
          ></u--input>
        </u-form-item>
        <u-form-item
          label="翻新日期"
          prop="maintenanceDate"
          borderBottom
          ref="item1"
          required
          class="item1"
        >
          <uni-datetime-picker
            placeholder="请选择翻新日期时间"
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
        <view class="title">翻新轮胎明细{{ index + 1 }}</view>
        <view style="margin-top: 0rpx" class="content">
          <view class="item2">
            <view class="item1">胎号</view>
            <view class="text">{{ item.tireNo }}</view>
          </view>
          <view class="item2">
            <view class="item1">品牌</view>
            <view class="text">{{ item.tireBrandName }}</view>
          </view>
          <u-form-item label="翻新胎号" borderBottom class="item1">
            <u--input
              v-model="item.newTireNo"
              border="none"
              placeholder="请输入翻新胎号"
              inputAlign="right"
            ></u--input>
            <view style="margin-left: 8rpx" slot="right" class="text"></view>
          </u-form-item>
          <u-form-item label="花纹深度" borderBottom class="item1">
            <u--input
              v-model="item.newDepth"
              border="none"
              placeholder="请输入花纹深度"
              inputAlign="right"
            ></u--input>
            <view style="margin-left: 8rpx" slot="right" class="text"></view>
          </u-form-item>
          <u-form-item
            label="胎体品牌"
            borderBottom
            required
            class="item1"
            @click="openChioce(0, index)"
          >
            <view v-if="item.brandLabel" class="text">{{
              item.brandLabel
            }}</view>
            <view class="placeholder" v-else>请选择胎体品牌</view>
            <u-icon slot="right" name="arrow-right"></u-icon>
          </u-form-item>
          <u-form-item
            label="翻新去向"
            borderBottom
            required
            class="item1"
            @click="openChioce(1, index)"
          >
            <view v-if="item.stockStatusCn" class="text">{{
              item.stockStatusCn
            }}</view>
            <view class="placeholder" v-else>请选择翻新去向</view>
            <u-icon slot="right" name="arrow-right"></u-icon>
          </u-form-item>
          <u-form-item label="翻新金额" borderBottom required class="item1">
            <u--input
              v-model="item.cost"
              border="none"
              placeholder="请输入翻新金额"
              inputAlign="right"
            ></u--input>
            <view style="margin-left: 8rpx" slot="right" class="text"></view>
          </u-form-item>
        </view>
      </view>
      <view class="content">
        <u-form-item label="备注" borderBottom ref="item1" class="item1">
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
      keyName="label"
      @cancel="is_brand = false"
      :show="is_brand"
      ref="uPicker"
      :columns="brandData"
      @confirm="confirm($event, 0)"
      title="请选择胎体品牌"
      :immediateChange="true"
    ></u-picker>
    <u-picker
      keyName="label"
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
import { getKeyNumber, maintenanceAdd } from "@/api/daily.js";
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
        type: 5,
      },
      rules: {
        mid: [
          { required: true, message: "翻新单号不能为空", trigger: "change" },
        ],
        manufacturer: [
          { required: true, message: "翻新厂家不能为空", trigger: "change" },
        ],
        maintainer: [
          { required: true, message: "经办人不能为空", trigger: "change" },
        ],
        maintenanceDate: [
          { required: true, message: "翻新日期不能为空", trigger: "change" },
        ],
        // cost: [
        //   { required: true, message: "翻新金额不能为空", trigger: "change" },
        // ],
        // contentId: [
        //   { required: true, message: "翻新内容不能为空", trigger: "change" },
        // ],
        // stockStatus: [
        //   { required: true, message: "翻新去向不能为空", trigger: "change" },
        // ],
      },
      is_brand: false,
      stock_status: false,
      brandData: [
        [
          {
            label: "翻新胎",
            value: 92,
          },
        ],
      ],
      stockStatusData: [
        [
          {
            label: "库存翻新",
            value: 11,
          },
          {
            label: "彻底报废",
            value: 50,
          },
        ],
      ],
      currentIndex: 0,
    };
  },
  onLoad() {
    this.form.maintainer = uni.getStorageSync("username");
    this.form.tireMaintenanceDetailBos = uni.getStorageSync("renovateList");
    this.form.tireMaintenanceDetailBos.forEach((item) => {
      item.newTireNo = item.tireNo + "-1";
    });
    this.getNum();
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
          this.form.tireMaintenanceDetailBos[
            this.currentIndex
          ].newBrandId = `${e.value[0].value}`;
          this.form.tireMaintenanceDetailBos[this.currentIndex].brandLabel =
            e.value[0].label;
          this.is_brand = false;
          break;
        case 1:
          this.form.tireMaintenanceDetailBos[this.currentIndex].stockStatus =
            e.value[0].value;
          this.form.tireMaintenanceDetailBos[this.currentIndex].stockStatusCn =
            e.value[0].label;
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
            if (!this.form.tireMaintenanceDetailBos[i].newBrandId) {
              return uni.showToast({
                title: `请输入轮胎明细${i + 1}的胎体品牌`,
                icon: "none",
                duration: 2000,
              });
            } else if (!this.form.tireMaintenanceDetailBos[i].stockStatus) {
              return uni.showToast({
                title: `请输入轮胎明细${i + 1}的翻新去向`,
                icon: "none",
                duration: 2000,
              });
            } else if (
              !this.form.tireMaintenanceDetailBos[i].cost ||
              this.form.tireMaintenanceDetailBos[i].cost == ""
            ) {
              return uni.showToast({
                title: `请输入轮胎明细${i + 1}的翻新金额`,
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
              prevPage = prevPage;
              prevPage.getRenovateList(1, prevPage.list.length + 1);
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

      this.form.maintenanceDate = new Date(
        this.form.maintenanceDate
      ).toISOString();
    },
    getNum() {
      getKeyNumber().then((res) => {
        if (res.code == 200) {
          this.form.mid = res.data;
        }
      });
    },
    changeDate() {
      this.$refs.uForm.validateField("maintenanceDate");
    },
    openChioce(e, index) {
      this.currentIndex = index;
      switch (e) {
        case 0:
          this.is_brand = true;
          break;

        case 1:
          this.stock_status = true;
          break;
      }
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
  &::v-deep .uni-icons {
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