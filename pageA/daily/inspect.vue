<template>
  <view>
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
    </u-sticky>
    <view class="carbox" v-if="current == 1" style="padding: 0 20rpx">
      <view class="searbox">
        <view class="u-demo-block__content">
          <view class="search-box">
            <u-icon name="search" size="28" @click="selectTireNo"></u-icon>
            <superwei-combox
              class="search"
              :candidates="carList"
              :isJSON="true"
              keyName="name"
              placeholder="搜索车牌号"
              v-model="queryform.carnum"
              @select="selectCar"
            ></superwei-combox>
          </view>
        </view>
      </view>
      <view class="car-box" v-if="maincarbox">
        <image
          :src="$util.ossImg('img/tirePressure/car.png')"
          class="bus-icon"
        />
        <view class="right-box">
          <view class="car-no">{{ carinfoshow.vehicleNo }}</view>
          <view class="car-info">
            <text>ID： {{ carinfoshow.deviceId || "" }}</text>
            <text style="margin-left: 20rpx"
              >里程：{{ carinfoshow.distance || 0 }}km</text
            >
          </view>
        </view>
      </view>
      <view class="total-car" v-if="maincarbox">
        <view class="tire" v-for="(tire, index) in maincardata" :key="index">
          <view class="left">
            <view class="tire-item" v-for="tireleft in tire.leftTireCode">
              <view
                class="img"
                v-if="tireleft.infodata == null"
                @click="notire(tireleft)"
              ></view>
              <view
                class="lunbox2"
                v-else
                @click="havetire(tireleft.infodata)"
              ></view>
            </view>
            <view v-for="(jtem, jndex) in tire.leftTireCode" :key="jndex">
              <view class="decs" v-if="jtem.infodata">
                <view v-if="jtem.infodata">{{ jtem.positionDesc }}</view>
                <view v-if="jtem.infodata">{{ jtem.infodata.tireNo }}</view>
              </view>
            </view>
          </view>
          <view class="middle"></view>
          <view class="right">
            <view
              class="tire-item"
              v-for="tireright in tire.rightTireCode"
              :key="tireright.deviceNumber"
            >
              <view
                class="img"
                v-if="tireright.infodata == null"
                @click="notire(tireright)"
              ></view>
              <view
                class="lunbox2"
                v-else
                @click="havetire(tireright.infodata)"
              ></view>
            </view>
            <view>
              <view v-for="(xtem, xndex) in tire.rightTireCode" :key="xndex">
                <view class="decs" v-if="xtem.infodata">
                  <view v-if="xtem.infodata">{{ xtem.positionDesc }}</view>
                  <view v-if="xtem.infodata">{{ xtem.infodata.tireNo }}</view>
                </view>
              </view>
            </view>
          </view>
          <view v-if="tire.axisNumber == 0" style="width: 100%">
            <view style="display: flex; justify-content: space-around">
              <view
                v-for="its in tire.spareTireCode"
                :key="its.deviceNumber"
                class="beitaibox"
              >
                <view
                  class="img down"
                  v-if="its.infodata == null"
                  @click="notire(its)"
                ></view>
                <view
                  class="lunbox2 down"
                  v-else
                  @click="havetire(its.infodata)"
                ></view>
                <view class="decs beitaitip" v-if="its.infodata">
                  <view>{{ its.positionDesc }}</view>
                  <view>{{ its.infodata.tireNo }}</view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <!-- 挂车 -->
      <view class="car-box" v-if="trailcarbox">
        <image
          :src="$util.ossImg('img/tirePressure/car.png')"
          class="bus-icon"
        />
        <view class="right-box">
          <view class="car-no">{{ carinfoshowtwo.vehicleNo }}</view>
          <view class="car-info">
            <text>ID： {{ carinfoshowtwo.deviceId || "" }}</text>
            <text style="margin-left: 20rpx"
              >里程：{{ carinfoshowtwo.distance || 0 }}km</text
            >
          </view>
        </view>
      </view>
      <view class="total-car" v-if="trailcarbox">
        <view class="tire" v-for="(items, index) in trailcardata" :key="index">
          <view class="left">
            <view
              class="tire-item"
              v-for="tiresleft in items.leftTireCode"
              :key="tiresleft.deviceNumber"
            >
              <view
                class="img"
                v-if="tiresleft.infodata == null"
                @click="notire(tiresleft)"
              ></view>
              <view
                class="lunbox2"
                v-else
                @click="havetire(tiresleft.infodata)"
              ></view>
            </view>
            <view>
              <view v-for="(item, index) in items.leftTireCode" :key="index">
                <view class="decs" v-if="item.infodata">
                  <view v-if="item.infodata">{{ item.positionDesc }}</view>
                  <view v-if="item.infodata">{{ item.infodata.tireNo }}</view>
                </view>
              </view>
            </view>
          </view>
          <view class="middle"></view>
          <view class="right">
            <view
              class="tire-item"
              v-for="tirersight in items.rightTireCode"
              :key="tirersight.deviceNumber"
            >
              <view
                class="img"
                v-if="tirersight.infodata == null"
                @click="notire(tirersight)"
              ></view>
              <view
                class="lunbox2"
                v-else
                @click="havetire(tirersight.infodata)"
              ></view>
            </view>
            <view>
              <view v-for="(item, index) in items.rightTireCode" :key="index">
                <view class="decs" v-if="item.infodata">
                  <view v-if="item.infodata">{{ item.positionDesc }}</view>
                  <view v-if="item.infodata">{{ item.infodata.tireNo }}</view>
                </view>
              </view>
            </view>
          </view>
          <view v-if="items.axisNumber == 0" style="width: 100%">
            <view style="display: flex; justify-content: space-around">
              <view
                v-for="its in items.spareTireCode"
                :key="its.deviceNumber"
                class="beitaibox"
              >
                <view
                  class="img down"
                  v-if="its.infodata == null"
                  @click="notire(its)"
                ></view>
                <view
                  class="lunbox2 down"
                  v-else
                  @click="havetire(its.infodata)"
                ></view>
                <view class="decs beitaitip" v-if="its.infodata">
                  <view>{{ its.positionDesc }}</view>
                  <view>{{ its.infodata.tireNo }}</view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view v-if="current == 0">
      <!-- <view class="top-box">
        <image :src="$util.ossImg('img/ocr_identify.png')" class="icon" />
        <image :src="$util.ossImg('img/sensor_read.png')" class="icon" />
        <image :src="$util.ossImg('img/rfid_read.png')" class="icon" />
      </view> -->
      <u--form
        style="padding-bottom: 30rpx"
        labelPosition="left"
        :model="form"
        ref="uForm"
        label-width="250rpx"
        :label-style="{ 'font-size': '32rpx', color: '#010914' }"
      >
        <view class="content">
          <u-form-item
            label="胎号"
            prop="tireNo"
            borderBottom
            ref="item1"
            class="item1"
          >
            <superwei-combox
              style="width: 360rpx"
              :candidates="tireNoData"
              :isJSON="true"
              keyName="tireNo"
              placeholder="请选择胎号"
              @select="selectTireNo"
              class="tire-box"
              v-model="form.tireNo"
            ></superwei-combox>
            <image
              @click="scan"
              slot="right"
              :src="$util.ossImg('img/images/carlive/crams.png')"
              class="search-icon"
            />
          </u-form-item>
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
              class="tire-box"
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
              class="tire-box"
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
            <view class="text">{{ form.senderId }}</view>
          </view>
          <view class="item2">
            <view class="item1">累计里程</view>
            <view class="text">{{ form.totalMileage }}</view>
          </view>
          <view class="item2">
            <view class="item1">轮胎状态</view>
            <view class="text">{{ form.statusName }}</view>
          </view>
          <!-- <view class="item2">
            <view class="item1">安装时间</view>
            <view class="text">{{ form.installTime }}</view>
          </view> -->
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
            <view class="text">{{ form.lastInstallMileage }}Km</view>
          </view>
          <u-form-item
            label="当前里程表读数"
            borderBottom
            ref="item1"
            class="item1"
          >
            <u--input
              v-model="form.totalMileage"
              border="none"
              placeholder="请输入当前里程表读数"
              inputAlign="right"
            ></u--input>
            <view style="margin-left: 8rpx" slot="right" class="text">Km</view>
          </u-form-item>
          <u-form-item
            label="最新里程表数"
            borderBottom
            ref="item1"
            class="item1"
          >
            <u--input
              v-model="form.latestVehicleMileage"
              border="none"
              placeholder="请输入最新里程表数"
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
            prop="middleTreadDepth"
          >
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
          <u-form-item
            label="新胎花纹深度"
            borderBottom
            ref="item1"
            class="item1"
            prop="newTreadDepth"
          >
            <u--input
              v-model="form.newTreadDepth"
              border="none"
              placeholder="请输入新胎花纹深度"
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
          ></u-upload
        ></view>
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
  vehicleNo,
  cardetail,
  gettirepicture,
  caralltire,
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
      current: 0,
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
        lastInstallMileage: "",
      },
      rules: {
        tireNo: [
          { required: true, message: "胎号不能为空", trigger: "change" },
        ],
        leftTreadDepth: [
          { required: true, message: "左侧花纹不能为空", trigger: "change" },
        ],
        middleTreadDepth: [
          { required: true, message: "中间花纹不能为空", trigger: "change" },
        ],
        rightTreadDepth: [
          { required: true, message: "右侧花纹不能为空", trigger: "change" },
        ],
        newTreadDepth: [
          {
            required: true,
            message: "新胎花纹深度不能为空",
            trigger: "change",
          },
        ],
      },
      dot_show: false,
      dotList: [year, week],
      brandList: [],
      fileList1: [],
      illustrate: "",
      carList: [],
      tireNoData: [],
      specificationList: [],
      queryform: {
        vehicleId: "",
        carnum: "",
      },
      carinfoshow: {},
      maincarbox: true,
      trailcarbox: true,
      trailcardata: [],
      maincardata: [],
      carallinfo: {},
      carinfoshowtwo: {},
    };
  },
  onLoad() {
    this.getTireList();
    this.getBrand();
    this.getSpecification();
    this.getCarNo();
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules);
  },
  methods: {
    change(el) {
      this.current = el.index;
      if (el.index == 0) {
        this.$nextTick(() => {
          this.$refs.uForm.setRules(this.rules);
        });
      }
    },
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
        }
      });
    },
    selectTireNo(e) {
      this.form.tempTireNo = e.tireNo;
      this.getInspectionList();
    },
    // 扫码
    scan() {
      uni.scanCode({
        success: (res) => {
          this.form.tireNo = res.result;
          this.getInspectionList();
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
    getInspectionList() {
      for (let i = 0; i < this.tireNoData.length; i++) {
        if (this.tireNoData[i].tireNo == this.form.tempTireNo) {
          this.form = this.tireNoData[i];
          this.getTireStatus();
          break;
        }
      }
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
          status: "0",
          pressure: this.form.pressure,
          temperature: this.form.temperature,
          latestInstallationMileage: this.form.lastInstallMileage,
          latestVehicleMileage: this.form.latestVehicleMileage,
          mileageReading: this.form.totalMileage,
          leftTreadDepth: this.form.leftTreadDepth,
          middleTreadDepth: this.form.middleTreadDepth,
          rightTreadDepth: this.form.rightTreadDepth,
          checkPhotos: this.form.checkPhotos,
          issueDescription: this.form.issueDescription,
          inspector: uni.getStorageSync("username"),
          tenantId: this.form.tenantId,
          tireId: this.form.tireId,
          processingStatus: "0",
          newTreadDepth: this.form.newTreadDepth,
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
    getCarNo() {
      vehicleNo().then((res) => {
        this.carList = res.data.items.map((item) => {
          return { name: item.carNumber, value: item.vehicle };
        });
        this.queryform.carnum = res.data.items[0].carNumber;
        this.queryform.vehicleId = res.data.items[0].vehicle;
        this.loadData();
      });
    },
    // 轮位图加载
    loadData() {
      cardetail(this.queryform.vehicleId).then((info) => {
        this.carinfoshow = info.data;
      });
      gettirepicture({ id: this.queryform.vehicleId, tireStatus: 0 }).then(
        (res) => {
          this.carallinfo = res.data;
          // 判断主挂车盒子
          if (res.data.mainList != null) {
            caralltire(res.data.vehicleId).then((response) => {
              let tirePositionlist = [];
              if (response.data != null) {
                tirePositionlist = response.data.items || [];
              }
              this.maincarbox = true;
              let nwarr = res.data.mainList;
              nwarr.map((item) => {
                if (item.axisNumber != 0) {
                  // item.leftTireCode.reverse()
                  for (let i = 0; i < item.leftTireCode.length; i++) {
                    item.leftTireCode[i].infodata = null;
                    for (let j = 0; j < tirePositionlist.length; j++) {
                      if (
                        tirePositionlist[j].installPosition ==
                        item.leftTireCode[i].positionCode
                      ) {
                        item.leftTireCode[i].infodata = tirePositionlist[j];
                      }
                    }
                  }
                  // item.rightTireCode.reverse()
                  for (let i = 0; i < item.rightTireCode.length; i++) {
                    item.rightTireCode[i].infodata = null;
                    for (let j = 0; j < tirePositionlist.length; j++) {
                      if (
                        tirePositionlist[j].installPosition ==
                        item.rightTireCode[i].positionCode
                      ) {
                        item.rightTireCode[i].infodata = tirePositionlist[j];
                      }
                    }
                  }
                } else {
                  for (let i = 0; i < item.spareTireCode.length; i++) {
                    item.spareTireCode[i].infodata = null;
                    for (let j = 0; j < tirePositionlist.length; j++) {
                      if (
                        tirePositionlist[j].installPosition ==
                        item.spareTireCode[i].positionCode
                      ) {
                        item.spareTireCode[i].infodata = tirePositionlist[j];
                      }
                    }
                  }
                }
              });
              this.maincardata = nwarr;
            });
          } else {
            this.maincarbox = false;
          }

          if (res.data.trailList != null) {
            cardetail(res.data.trailVehicleId).then((info) => {
              this.carinfoshowtwo = info.data;
            });
            caralltire(res.data.trailVehicleId).then((rest) => {
              let tirePosition = [];
              if (rest.data != null) {
                tirePosition = rest.data.items || [];
              }
              this.trailcarbox = true;
              let olarr = res.data.trailList;
              olarr.map((item) => {
                if (item.axisNumber != 0) {
                  for (let i = 0; i < item.leftTireCode.length; i++) {
                    item.leftTireCode[i].infodata = null;
                    for (let j = 0; j < tirePosition.length; j++) {
                      if (
                        tirePosition[j].installPosition ==
                        item.leftTireCode[i].positionCode
                      ) {
                        item.leftTireCode[i].infodata = tirePosition[j];
                      }
                    }
                  }
                  // item.rightTireCode.reverse()
                  for (let i = 0; i < item.rightTireCode.length; i++) {
                    item.rightTireCode[i].infodata = null;
                    for (let j = 0; j < tirePosition.length; j++) {
                      if (
                        tirePosition[j].installPosition ==
                        item.rightTireCode[i].positionCode
                      ) {
                        item.rightTireCode[i].infodata = tirePosition[j];
                      }
                    }
                  }
                } else {
                  for (let i = 0; i < item.spareTireCode.length; i++) {
                    item.spareTireCode[i].infodata = null;
                    for (let j = 0; j < tirePosition.length; j++) {
                      if (
                        tirePosition[j].installPosition ==
                        item.spareTireCode[i].positionCode
                      ) {
                        item.spareTireCode[i].infodata = tirePosition[j];
                      }
                    }
                  }
                }
              });
              this.trailcardata = olarr;
            });
          } else {
            this.trailcarbox = false;
          }
        }
      );
    },
    havetire(e) {
      uni.navigateTo({
        url: `/pageA/daily/tireInspection?vehicleNo=${e.vehicleNo}&tireNo=${e.tireNo}`,
      });
    },
    notire(e) {
      console.log(this.carinfoshow);
      var carid = "";
      var carNo = "";
      if (e.positionDesc.includes("挂车")) {
        carid = this.carallinfo.trailVehicleId;
        carNo = this.carinfoshowtwo.vehicleNo;
      } else {
        carid = this.carallinfo.vehicleId;
        carNo = this.carinfoshow.vehicleNo;
      }
      uni.navigateTo({
        url: `/pageA/daily/installationInspection?id=${carid}&position=${e.positionCode}&positioncode=${e.positionDesc}&carNo=${carNo}`,
      });
    },
  },
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
    text-align: right !important;
  }
  .item1 ::v-deep .u-form-item__body {
    padding: 0rpx;
  }
  .item1 ::v-deep .uni-input-placeholder {
    text-align: right !important;
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
  z-index: 999;
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
  ::v-deep .u-icon {
    padding-left: 32rpx;
  }
}

.total-car {
  min-height: 70vh;
  background: url("https://tpms.5i84.cn/img/tirePressure/car-bg.png") 0 30rpx
    no-repeat;
  background-size: 100% 100%;
  padding-top: 100rpx;
}
.footer {
  position: fixed;
  height: 148rpx;
  background: #ffffff;
  box-shadow: 0rpx 0rpx 12rpx 0rpx #dae1f2;
  border-radius: 20rpx;
  left: 20rpx;
  bottom: 20rpx;
  right: 20rpx;
  display: flex;
  text-align: center;
}
.footer .item {
  padding-top: 30rpx;
  flex: 1;
}
.footer .item .tp-imgstyle {
  line-height: 70rpx;
}
.tp-imgstyle {
  width: 40rpx;
  height: 40rpx;
}
.total-car .tire {
  display: flex;
  margin-bottom: 40rpx;
}
.total-car .tire .left {
  flex: 4;
  text-align: center;
}
.total-car .tire .middle {
  flex: 3;
}
.total-car .tire .right {
  flex: 4;
  text-align: center;
}
.tire-item {
  width: 108rpx;
  display: inline-block;
  margin: 0 10rpx;
}
.img {
  width: 108rpx;
  height: 172rpx;
  background: url("@/static/tirePressure/baiban.png") no-repeat;
  background-size: cover;
  border-radius: 20rpx;
}
.tire-item .info {
  font-size: 24rpx;
  font-family: AppleSystemUIFont;
  color: #010914;
  line-height: 50rpx;
  height: 75px;
}
.right .img {
  width: 108rpx;
  height: 172rpx;
  background: url("@/static/tirePressure/baiban.png") no-repeat;
  background-size: cover;
  border-radius: 20rpx;
}

.left .lunbox2 {
  width: 108rpx;
  height: 172rpx;
  background: url("@/static/tirePressure/bigbule.png") no-repeat;
  background-size: 100%;
  border-radius: 20rpx;
}
.right .lunbox2 {
  width: 108rpx;
  height: 172rpx;
  background: url("@/static/tirePressure/bigbule.png") no-repeat;
  background-size: 100%;
  border-radius: 20rpx;
}
.lunbox2 {
  width: 108rpx;
  height: 172rpx;
  background: url("@/static/tirePressure/bigbule.png") no-repeat;
  background-size: 100%;
  border-radius: 20rpx;
}

.tire-detial {
  background: #f5f7fb;
}
.tire-detial .tit {
  font-size: 36rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #010914;
  line-height: 80rpx;
  text-align: center;
}
.tire-detial .main {
  margin: 20rpx;
  background: #fff;
  border-radius: 20rpx;
  padding: 30rpx 0;
}
.tire-detial .main .item {
  display: flex;
  line-height: 52rpx;
  padding: 0 36rpx;
}
.tire-detial .main .item2 {
  line-height: 72rpx;
  font-size: 28rpx;
}
.tire-detial .main .item3 {
  border-bottom: 1px dashed #ddd;
}

.tire-detial .main .item .l {
  flex: 1;
}
.tire-detial .main .item .r {
  flex: 1;
  text-align: right;
}
.popup-bottom {
  padding: 40rpx;
  background: #ffffff;
  border-radius: 20rpx 20rpx 0rpx 0rpx;
}
.btn {
  height: 88rpx;
  background: #1862f5;
  border-radius: 12rpx;
  text-align: center;
  line-height: 88rpx;
  font-size: 30rpx;
  font-family: AppleSystemUIFont;
  color: #ffffff;
}
.tp-car {
  background: #ffffff;
  border-radius: 20rpx;
  padding: 20rpx;
  padding-bottom: 30rpx;
  margin-bottom: 20rpx;
}
.tp-car .title {
  position: relative;
  padding-left: 124rpx;
}
.tp-car .title .img {
  position: absolute;
  left: 0rpx;
  top: 0px;
  width: 100rpx;
  height: 100rpx;
  background: url(https://tpms.5i84.cn/img/tirePressure/car.png);
  background-size: 100% 100%;
}
.tp-car .title .img img {
  height: 100%;
  width: 100%;
}
.tp-car .title .l1 {
  height: 48rpx;
  font-size: 32rpx;
  color: #010914;
  line-height: 46rpx;
}
.tp-car .title .l2 {
  height: 36rpx;
  font-size: 24rpx;
  font-family: AppleSystemUIFont;
  color: #5c5f66;
  line-height: 34rpx;
  margin-top: 8rpx;
}
.tp-car .title .text {
  /* margin-left: 30rpx; */
}
.tp-car .title .info {
  position: absolute;
  padding: 0 10rpx;
  height: 52rpx;
  line-height: 52rpx;
  border-radius: 8rpx;
  top: 0rpx;
  right: 0rpx;
  font-size: 24rpx;
  text-align: center;
}
.search {
  padding: 20rpx 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.select-list {
  display: flex;
}
.select-list .item {
  flex: 1;
  text-align: center;
  width: 200rpx;
  height: 68rpx;
  line-height: 68rpx;
  background: #ffffff;
  border-radius: 180rpx;
  margin: 0 10rpx;
}
.select-list .item .down {
  width: 32rpx;
  height: 32rpx;
  position: relative;
  top: 4rpx;
  margin-left: 20rpx;
}
.car-box {
  width: 710rpx;
  height: 140rpx;
  background: #ffffff;
  border-radius: 20rpx;
  margin: 0 auto;
}

.tp-car {
  background: #ffffff;
  border-radius: 20rpx;
  padding: 20rpx;
  padding-bottom: 30rpx;
  margin-bottom: 20rpx;
}
.tp-car .title {
  position: relative;
  padding-left: 124rpx;
}
.tp-car .title .img {
  position: absolute;
  left: 0rpx;
  top: 0px;
  width: 100rpx;
  height: 100rpx;
  background: url(https://tpms.5i84.cn/img/tirePressure/car.png);
  background-size: 100% 100%;
}
.tp-car .title .img img {
  height: 100%;
  width: 100%;
}
.tp-car .title .l1 {
  height: 48rpx;
  font-size: 32rpx;
  color: #010914;
  line-height: 46rpx;
}
.tp-car .title .l2 {
  height: 36rpx;
  font-size: 24rpx;
  font-family: AppleSystemUIFont;
  color: #5c5f66;
  line-height: 34rpx;
  margin-top: 8rpx;
}
.tp-car .title .text {
  /* margin-left: 30rpx; */
}
.tp-car .title .info {
  position: absolute;
  padding: 0 10rpx;
  height: 52rpx;
  line-height: 52rpx;
  border-radius: 8rpx;
  top: 0rpx;
  right: 0rpx;
  font-size: 24rpx;
  text-align: center;
}
.status1 {
  background: rgba(255, 87, 51, 0.1);
  color: #ff5733;
}
.status2 {
  background: rgba(255, 141, 26, 0.1);
  color: #ff8d1a;
}
.status3 {
  background: rgba(43, 201, 152, 0.1);
  color: #2bc998;
}
.status4 {
  background: rgba(94, 106, 165, 0.1);
  color: #5e6aa5;
}
.tp-car .data {
  background: #f5f7fb;
  border-radius: 20rpx;
  margin-top: 24rpx;
  display: flex;
}
.tp-car .data .item {
  flex: 1;
  text-align: center;
  padding: 20px 0;
}
.tp-car .data .item .t1 {
  font-size: 24rpx;
  font-family: AppleSystemUIFont;
  color: #8a8ea6;
  line-height: 34rpx;
}
.tp-car .data .item .t2 {
  margin-top: 8rpx;
  font-size: 24rpx;
  font-family: AppleSystemUIFont;
  color: #010914;
  line-height: 34rpx;
}
.tip image {
  width: 20rpx;
  height: 32rpx;
  margin-right: 8rpx;
}
.imagebox {
  font-size: 24rpx;
  display: flex;
  align-items: center;
}
.down {
  transform: rotate(90deg);
}
.decs {
  width: 100%;
  min-height: 105rpx;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0rpx 0rpx 8rpx 0rpx rgba(0, 0, 0, 0.1);
  font-size: 24rpx;
  color: #8a8ea6;
  line-height: 50rpx;
}
.beitaitip {
  padding: 0 20rpx;
  text-align: center;
}
.beitaibox {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.martop {
  margin-top: 200rpx;
}
.search ::v-deep input {
  text-align: left !important;
}
.search ::v-deep .superwei-combox {
  width: 560rpx;
}
.tire-box ::v-deep input {
  text-align: right !important;
}
</style>