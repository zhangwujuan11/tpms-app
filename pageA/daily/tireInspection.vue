<template>
  <view>
    <view>
      <u--form
        style="padding-bottom: 30rpx"
        labelPosition="left"
        :model="form"
        ref="uForm"
        label-width="250rpx"
        :label-style="{ 'font-size': '32rpx', color: '#010914' }"
      >
        <view class="content">
          <view class="item2">
            <view class="item1">车牌号</view>
            <view class="text">{{ form.vehicleNo }}</view>
          </view>
          <view class="item2">
            <view class="item1">胎号</view>
            <view class="text">{{ form.tireNo }}</view>
          </view>
          <view class="item2">
            <view class="item1">轮位</view>
            <view class="text">{{ form.installPositionDesc }}</view>
          </view>
          <!-- <u-form-item label="轮位" borderBottom ref="item1" class="item1">
            <view class="text"></view>
          </u-form-item> -->
          <u-form-item
            label="品牌"
            prop="maintainer"
            borderBottom
            ref="item1"
            class="item1"
          >
            <superwei-combox
              :candidates="brandList"
              :isJSON="true"
              keyName="paramName"
              placeholder="请选择品牌"
              v-model="form.tireBrandName"
              @select="selectBrand"
              :onlySelect="true"
            ></superwei-combox>
          </u-form-item>
          <u-form-item
            label="规格"
            prop="maintainer"
            borderBottom
            ref="item1"
            class="item1"
          >
            <superwei-combox
              :candidates="specificationList"
              :isJSON="true"
              keyName="paramName"
              placeholder="请选择规格"
              v-model="form.specificationsName"
              @select="selectSpecification"
              :onlySelect="true"
            ></superwei-combox>
          </u-form-item>
          <!-- <u-form-item
            label="Dot"
            prop="stockStatus"
            borderBottom
            ref="item1"
            class="item1"
            @click="dot_show = true"
          >
            <view v-if="form.year" class="text"
              >{{ form.year }}年{{ form.week }}周</view
            >
            <view class="placeholder" v-else>请选择Dot</view>
            <u-icon slot="right" name="arrow-right"></u-icon>
          </u-form-item> -->
          <u-form-item label="速度级别" borderBottom ref="item1" class="item1">
            <u--input
              v-model="form.speedLevel"
              border="none"
              placeholder="请输入速度级别"
              inputAlign="right"
            ></u--input>
            <view style="margin-left: 8rpx" slot="right" class="text"></view>
          </u-form-item>
          <u-form-item label="载重指数" borderBottom ref="item1" class="item1">
            <u--input
              v-model="form.loadIndex"
              border="none"
              placeholder="请输入载重指数"
              inputAlign="right"
            ></u--input>
            <view style="margin-left: 8rpx" slot="right" class="text"></view>
          </u-form-item>
          <u-form-item label="花纹型号" borderBottom ref="item1" class="item1">
            <u--input
              v-model="form.pattern"
              border="none"
              placeholder="请输入花纹型号"
              inputAlign="right"
            ></u--input>
            <view style="margin-left: 8rpx" slot="right" class="text"></view>
          </u-form-item>
          <view class="item2">
            <view class="item1">传感器ID</view>
            <view class="text">{{ form.senderId || '--'}}</view>
          </view>
          <view class="item2">
            <view class="item1">累计里程</view>
            <view class="text">{{ form.totalMileage || '0'}}</view>
          </view>
          <view class="item2">
            <view class="item1">轮胎状态</view>
            <view class="text">{{ form.statusName }}</view>
          </view>
          <view class="item2">
            <view class="item1">安装时间</view>
            <view class="text">{{ form.installTime }}</view>
          </view>
          <!-- <view class="item2">
            <view class="item1">读取的编号</view>
            <view class="text">{{ form.serialNumber }}</view>
          </view> -->
          <!-- <view class="item2">
            <view class="item1">电压</view>
            <view class="text">{{ form.voltage }}V</view>
          </view> -->
          <u-form-item label="压力" borderBottom ref="item1" class="item1">
            <u--input
              v-model="form.pressure"
              border="none"
              placeholder="请输入压力"
              inputAlign="right"
            ></u--input>
            <view style="margin-left: 8rpx" slot="right" class="text">bar</view>
          </u-form-item>
          <u-form-item label="温度" borderBottom ref="item1" class="item1">
            <u--input
              v-model="form.temperature"
              border="none"
              placeholder="请输入温度"
              inputAlign="right"
            ></u--input>
            <view style="margin-left: 8rpx" slot="right" class="text">°C</view>
          </u-form-item>
          <view class="item2">
            <view class="item1">安装时里程表读数</view>
            <view class="text">{{ form.lastInstallMileage  || '0'}}Km</view>
          </view>
          <u-form-item
            label="当前里程表读数"
            borderBottom
            ref="item1"
            class="item1">
            <u--input
              v-model="form.latestInstallationMileage"
              border="none"
              placeholder="请输入当前里程表读数"
              inputAlign="right"
            ></u--input>
            <view style="margin-left: 8rpx" slot="right" class="text">Km</view>
          </u-form-item>
          <u-form-item
            label="左侧花纹"
            borderBottom
            ref="item1"
            class="item1"
            prop="leftTreadDepth"
          >
            <u--input
              v-model="form.leftTreadDepth"
              border="none"
              placeholder="请输入左侧花纹"
              inputAlign="right"
            ></u--input>
            <view style="margin-left: 8rpx" slot="right" class="text">mm</view>
          </u-form-item>
          <u-form-item
            label="中间花纹"
            borderBottom
            ref="item1"
            class="item1"
            prop="middleTreadDepth">
            <u--input
              v-model="form.middleTreadDepth"
              border="none"
              placeholder="请输入中间花纹"
              inputAlign="right"
            ></u--input>
            <view style="margin-left: 8rpx" slot="right" class="text">mm</view>
          </u-form-item>
          <u-form-item
            label="右侧花纹"
            borderBottom
            ref="item1"
            class="item1"
            prop="rightTreadDepth"
          >
            <u--input
              v-model="form.rightTreadDepth"
              border="none"
              placeholder="请输入右侧花纹"
              inputAlign="right"
            ></u--input>
            <view style="margin-left: 8rpx" slot="right" class="text">mm</view>
          </u-form-item>
        </view>
        <view class="title">请上传图片(最多不超过三张)</view>
        <view class="content" style="padding: 28rpx">
          <u-upload
            :fileList="fileList1"
            @afterRead="afterRead"
            @delete="deletePic"
            name="1"
            multiple
            :maxCount="3"
            :width="106"
            :height="106"
          ></u-upload>
		</view>
        <view class="title">问题说明</view>
        <view class="content">
          <u--textarea
            height="106"
            v-model="form.issueDescription"
            placeholder="请输入问题说明"
            border="none"
            maxlength="200"
          ></u--textarea>
        </view>
      </u--form>
      <view class="bottom">
        <view class="btn1" @click="cancel">取消</view>
        <view class="btn2" @click="save">保存</view>
      </view>
    </view>
    <image
      class="record-icon"
      :src="$util.ossImg('img/check_record.png')"
      @click="goInspectionList"
    ></image>
    <u-picker
      keyName="label"
      @cancel="dot_show = false"
      :show="dot_show"
      ref="uPicker"
      :columns="dotList"
      @confirm="confirm($event, 0)"
      :defaultIndex="[22, 0]"
      :immediateChange="true"
    ></u-picker>
  </view>
</template>
<script>
import superweiCombox from "@/components/superwei-combox";
import config from "@/config";
import {
  getTires,
  queryParamType,
  inspectionAdd,
  tireStatus,
} from "@/api/daily.js";
export default {
  components: {
    superweiCombox,
  },
  data() {
    const year = [];
    const week = [];
    for (var i = 2001; i < 2100; i++) {
      year.push({
        label: i + "年",
        value: i,
      });
    }
    for (var i = 1; i < 55; i++) {
      week.push({
        label: i < 10 ? "0" + i + "周" : i + "周",
        value: i,
      });
    }
    return {
      tabsList: [
        {
          name: "按轮胎检查",
        },
        {
          name: "按车辆检查",
        },
      ],
      form: {
        tireNo: "",
        manufacturer: "",
        maintainer: "",
        dateTime: "",
        cost: "",
        contentId: "",
        stockStatus: "",
        remark: "",
        brand: "",
      },
      rules: {
        leftTreadDepth: [
          { required: true, message: "左侧花纹不能为空", trigger: "change" },
        ],
        middleTreadDepth: [
          { required: true, message: "中间花纹不能为空", trigger: "change" },
        ],
        rightTreadDepth: [
          { required: true, message: "右侧花纹不能为空", trigger: "change" },
        ],
      },
      dot_show: false,
      dotList: [year, week],
      brandList: [],
      fileList1: [],
      illustrate: "",
      specificationList: [],
    };
  },
  onLoad(option) {
    this.form.tireNo = option.tireNo;
    this.form.vehicleNo = option.vehicleNo;
    this.getTireList();
    this.getBrand();
    this.getSpecification();
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules);
  },
  methods: {
    confirm(e, type) {
      switch (type) {
        case 0:
          this.form.year = e.value[0].value;
          this.form.week = e.value[1].value;
          this.dot_show = false;
          break;
      }
    },
    selectBrand(e) {
      this.form.brand = e.paramName;
    },
    selectSpecification(e) {
      this.form.specification = e.paramName;
    },
    // 删除图片
    deletePic(event) {
      this[`fileList${event.name}`].splice(event.index, 1);
    },
    // 新增图片
    async afterRead(event) {
      // 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
      let lists = [].concat(event.file);
      let fileListLen = this[`fileList${event.name}`].length;
      lists.map((item) => {
        this[`fileList${event.name}`].push({
          ...item,
          status: "uploading",
          message: "上传中",
        });
      });
      for (let i = 0; i < lists.length; i++) {
        const result = await this.uploadFilePromise(lists[i].url);
        let item = this[`fileList${event.name}`][fileListLen];
        this[`fileList${event.name}`].splice(
          fileListLen,
          1,
          Object.assign(item, {
            status: "success",
            message: "",
            url: result,
          })
        );
        fileListLen++;
      }
    },
    uploadFilePromise(url) {
      return new Promise((resolve, reject) => {
        let a = uni.uploadFile({
          url: `${config.baseUrl}/common/upload`, // 仅为示例，非真实的接口地址
          filePath: url,
          name: "file",
          formData: {
            user: "test",
          },
          header: {
            Authorization: "Bearer " + uni.getStorageSync("App-Token"),
          },
          success: (res) => {
            if (JSON.parse(res.data).code == 200) {
              setTimeout(() => {
                resolve(JSON.parse(res.data).url);
              }, 1000);
            }
          },
        });
      });
    },
    selectCar(e) {
      this.queryform.vehicleId = e.value;
      this.loadData();
    },
    go() {
      uni.navigateTo({
        url: "/pageA/daily/installationInspection",
      });
    },
    goInspectionList() {
      uni.navigateTo({
        url: "/pageA/daily/inspectionList",
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
          this.getInspectionList();
        }
      });
    },
    getBrand() {
      queryParamType("tpms_tire_brand_param").then((res) => {
        if (res.code == 200) {
          this.brandList = res.data;
        }
      });
    },
    getSpecification() {
      queryParamType("tire_specification_param").then((res) => {
        if (res.code == 200) {
          this.specificationList = res.data;
        }
      });
    },
    cancel() {
      uni.navigateBack();
    },
    save() {
      this.$refs.uForm.validate().then(() => {
        if (this.fileList1.length > 0) {
          this.form.checkPhotos = this.fileList1.map((item) => {
            return item.url;
          });
          this.form.checkPhotos = this.form.checkPhotos.join(",");
        }
        this.form.inspectionTime = new Date().toISOString();
        let params = {
          inspectionTime: this.form.inspectionTime,
          tireNo: this.form.tireNo,
          brand: this.form.tireBrandName,
          specification: this.form.specificationsName,
          speedLevel: this.form.speedLevel,
          loadIndex: this.form.loadIndex,
          treadModel: this.form.pattern,
          senderId: this.form.senderId,
          status: this.form.stockStatus,
          pressure: this.form.pressure,
          temperature: this.form.temperature,
          latestInstallationMileage: this.form.latestInstallationMileage,
          leftTreadDepth: this.form.leftTreadDepth,
          middleTreadDepth: this.form.middleTreadDepth,
          rightTreadDepth: this.form.rightTreadDepth,
          checkPhotos: this.form.checkPhotos,
          issueDescription: this.form.issueDescription,
          inspector: uni.getStorageSync("username"),
          tenantId: this.form.tenantId,
          tireId: this.form.tireId,
          processingStatus: "0",
          vehicleNo: this.form.vehicleNo,
          mileageReading: "0",
          newTreadDepth: this.form.depth
        };
        inspectionAdd(params)
          .then((res) => {
            if (res.code == 200) {
              uni.navigateBack();
              setTimeout(() => {
                uni.showToast({
                  title: "保存成功",
                  icon: "success",
                  duration: 2000,
                });
              }, 500);
            }
          })
          .catch((err) => {
            return uni.showToast({
              title: `${err}`,
              icon: "none",
              duration: 2000,
            });
          });
      });
    },
    getTireStatus() {
      tireStatus().then((res) => {
        if (res.code == 200) {
          for (let i = 0; i < res.data.length; i++) {
            if (this.form.stockStatus == res.data[i].dictValue) {
              this.$set(this.form, "statusName", res.data[i].dictLabel);
              break;
            }
          }
        }
      });
    },
    getInspectionList() {
      for (let i = 0; i < this.tireNoData.length; i++) {
        if (this.tireNoData[i].tireNo == this.form.tireNo) {
          this.form = JSON.parse(JSON.stringify(this.tireNoData[i]));
          this.getTireStatus();
          break;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.searbox {
  width: 100%;
  height: 106rpx;
  margin-top: 20rpx;
  ::v-deep .u-input {
    width: 670rpx !important;
    margin: 0 auto;
    border: none;
  }
}
.carbox {
  .car-box {
    width: 710rpx;
    height: 140rpx;
    background: #ffffff;
    border-radius: 20rpx;
    margin: 0 auto;
    padding: 20rpx;
    box-sizing: border-box;
    margin-top: 20rpx;
    display: flex;
    justify-content: space-between;
  }
  .right-box {
    width: 540rpx;
    height: 100rpx;
    line-height: 50rpx;
  }
  .car-no {
    font-size: 32rpx;
    font-family: AppleSystemUIFont;
    color: #010914;
  }
  .car-info {
    font-size: 24rpx;
    font-family: AppleSystemUIFont;
    color: #5c5f66;
  }
  .bus-icon {
    width: 100rpx;
    height: 100rpx;
  }
  .tire-icon {
    width: 108rpx;
    height: 172rpx;
  }
  .tire-gang {
    width: 173rpx;
    height: 49rpx;
  }
  .search ::v-deep .uni-input-input {
    text-align: left;
  }
  .search ::v-deep .uni-input-placeholder {
    text-align: left;
  }
}
.top-box {
  display: flex;
  padding: 28rpx 28rpx 30rpx 28rpx;
  box-sizing: border-box;
  justify-content: space-between;
  .icon {
    width: 218rpx;
    height: 192rpx;
  }
}

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
  .item1 ::v-deep .u-form-item__body__left__content__required {
    top: 46rpx !important;
  }
  .item1 ::v-deep .u-form-item__body__right__content__slot {
    flex-direction: row-reverse;
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
  .item1 ::v-deep input {
    text-align: right !important;
  }
  & /deep/ .u-form-item__body__right__message {
    text-align: right;
  }
  .search-icon {
    width: 48rpx;
    height: 48rpx;
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
  .date-box ::v-deep .uni-icons {
    display: none;
  }
  .date-box ::v-deep .uni-date-x {
    text-align: right;
    font-size: 30rpx;
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
  ::v-deep .u-form-item__body__right {
    line-height: 58rpx;
  }
  ::v-deep .uni-input-placeholder {
    font-size: 30rpx;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    color: #b4b5bf;
  }
}
.title {
  margin-top: 10rpx;
  font-size: 28rpx;
  font-family: AppleSystemUIFont;
  color: #8a8ea6;
  line-height: 40rpx;
  margin-left: 30rpx;
}
::v-deep .u-textarea {
  padding: 0rpx;
}
.bottom {
  width: 750rpx;
  height: 148rpx;
  background: #ffffff;
  box-shadow: 0rpx -4rpx 8rpx 0rpx rgba(0, 0, 0, 0.05),
    0rpx -4rpx 8rpx 0rpx rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-around;
  align-items: center;
  .btn1 {
    width: 334rpx;
    height: 88rpx;
    line-height: 88rpx;
    text-align: center;
    background: #f5f7fb;
    box-shadow: 0rpx -4rpx 8rpx 0rpx rgba(0, 0, 0, 0.05);
    border-radius: 12rpx;
    font-size: 30rpx;
    font-family: AppleSystemUIFont;
    color: #010914;
  }
  .btn2 {
    width: 332rpx;
    height: 88rpx;
    line-height: 88rpx;
    text-align: center;
    background: #1862f5;
    box-shadow: 0rpx -4rpx 8rpx 0rpx rgba(0, 0, 0, 0.05);
    border-radius: 12rpx;
    font-size: 30rpx;
    font-family: AppleSystemUIFont;
    color: #f5f7fb;
  }
}
.record-icon {
  width: 144rpx;
  height: 144rpx;
  position: fixed;
  right: 0rpx;
  top: 800rpx;
  z-index:99;
}
.search {
  width: 550rpx;
  margin: 0 auto;
}
.search-box {
  width: 710rpx;
  height: 76rpx;
  background: #ffffff;
  border-radius: 180rpx;
  display: flex;
  margin: 0 auto;
}

::v-deep .superwei-combox__input {
  text-align: right !important;
}
</style>