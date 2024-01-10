<template>
  <view :style="{ 'padding-bottom': this.id.length > 0 ? '' : '152rpx' }">
    <u--form
      labelPosition="left"
      :model="form"
      ref="uForm"
      label-width="250rpx"
      :label-style="{ 'font-size': '32rpx', color: '#010914' }"
    >
      <view class="content">
        <u-form-item
          label="建车类型"
          prop="truckTypeName"
          borderBottom
          ref="item1"
          required
          class="item1"
          @click="isOpenSelect(0)"
        >
          <view v-if="form.truckTypeName" class="text">{{
            form.truckTypeName
          }}</view>
          <view class="placeholder" v-else>请选择建车类型</view>
          <u-icon v-if="!this.id" slot="right" name="arrow-right"></u-icon>
        </u-form-item>
        <u-form-item
          label="所属组织"
          prop="fleetName"
          borderBottom
          ref="item1"
          required
          class="item1"
          @click="is_organization = true"
        >
          <view v-if="form.fleetName" class="text">{{ form.fleetName }}</view>
          <view class="placeholder" v-else>请选择所属组织</view>
          <u-icon slot="right" name="arrow-right"></u-icon>
        </u-form-item>
        <u-form-item
          label="车分类"
          prop="categoryName"
          borderBottom
          ref="item1"
          required
          class="item1"
          @click="isOpenSelect(2)"
        >
          <view v-if="form.categoryName" class="text">{{
            form.categoryName
          }}</view>
          <view class="placeholder" v-else>请选择车分类</view>
          <u-icon
            v-if="form.truckType == '10'"
            slot="right"
            name="arrow-right"
          ></u-icon>
        </u-form-item>
        <view v-if="form.truckType == 10 || form.truckType == 30">
          <u-form-item
            label="主车车型"
            prop="carClassName"
            borderBottom
            ref="item1"
            required
            class="item1"
            @click="car_Model = true"
          >
            <view v-if="form.carClassName" class="text">{{
              form.carClassName
            }}</view>
            <view class="placeholder" v-else>请选择主车车型</view>
            <u-icon slot="right" name="arrow-right"></u-icon>
          </u-form-item>
          <u-form-item
            label="主车车牌号"
            prop="vehicleNo"
            borderBottom
            ref="item1"
            required
            class="item1"
          >
            <u--input
              v-model="form.vehicleNo"
              border="none"
              placeholder="请输入主车车牌号"
            ></u--input>
          </u-form-item>
          <u-form-item label="发动机号" borderBottom ref="item1" class="item1">
            <u--input
              v-model="form.engineNumber"
              border="none"
              placeholder="请输入发动机号"
            ></u--input>
          </u-form-item>
        </view>
        <view v-if="form.truckType == 20 || form.truckType == 30">
          <u-form-item
            label="拖车车牌号"
            prop="trailCarNo"
            borderBottom
            ref="item1"
            required
            class="item1"
          >
            <u--input
              v-model="form.trailCarNo"
              border="none"
              placeholder="请输入拖车车牌号"
            ></u--input>
          </u-form-item>
          <u-form-item
            label="拖车轴数"
            prop="trailCarAxle"
            borderBottom
            ref="item1"
            required
            class="item1"
            @click="trail_carAxle = true"
          >
            <view v-if="form.trailCarAxle" class="text"
              >{{ form.trailCarAxle }}根轴</view
            >
            <view class="placeholder" v-else>请选择拖车轴数</view>
            <u-icon slot="right" name="arrow-right"></u-icon>
          </u-form-item>
          <u-form-item
            label="拖车显示车牌号"
            prop="trailCarNoShow"
            borderBottom
            ref="item1"
            required
            class="item1"
            @click="trail_carNoShow = true"
          >
            <view
              v-if="form.trailCarNoShow === 0 || form.trailCarNoShow === 1"
              class="text"
              >{{
                form.trailCarNoShow === 1
                  ? "显示"
                  : form.trailCarNoShow === 0
                  ? "隐藏"
                  : ""
              }}</view
            >
            <view class="placeholder" v-else>请选择拖车显示车牌号</view>
            <u-icon slot="right" name="arrow-right"></u-icon>
          </u-form-item>
        </view>
        <u-form-item label="车主" borderBottom ref="item1" class="item1">
          <u--input
            v-model="form.vehicleOwner"
            border="none"
            placeholder="请输入车主"
          ></u--input>
        </u-form-item>
        <u-form-item
          label="系统版本"
          prop="systemVersion"
          borderBottom
          ref="item1"
          required
          class="item1"
          @click="system_version = true"
        >
          <view v-if="form.systemVersion" class="text">{{
            form.systemVersion == 5001
              ? "纯软件版"
              : form.systemVersion == 5002
              ? "硬件版"
              : ""
          }}</view>
          <view class="placeholder" v-else>请选择系统版本</view>
          <u-icon slot="right" name="arrow-right"></u-icon>
        </u-form-item>
        <u-form-item
          label="动力类型"
          prop="engineTypeName"
          borderBottom
          ref="item1"
          required
          class="item1"
          @click="engine_Type = true"
        >
          <view v-if="form.engineTypeName" class="text">{{
            form.engineTypeName
          }}</view>
          <view class="placeholder" v-else>请选择动力类型</view>
          <u-icon slot="right" name="arrow-right"></u-icon>
        </u-form-item>
        <u-form-item
          label="里程统计方式"
          borderBottom
          ref="item1"
          class="item1"
          @click="isOpenSelect(1)"
        >
          <view v-if="form.mileageStatTypeName" class="text">{{
            form.mileageStatTypeName
          }}</view>
          <view class="placeholder" v-else>请选择里程统计方式</view>
          <u-icon v-if="!this.id" slot="right" name="arrow-right"></u-icon>
        </u-form-item>
        <u-form-item
          prop="totalMileage"
          label="累计里程"
          borderBottom
          ref="item1"
          class="item1"
        >
          <u--input
            v-model="form.totalMileage"
            border="none"
            placeholder="请输入累计里程"
          ></u--input>
          <view style="margin-left: 8rpx" slot="right" class="text">km</view>
        </u-form-item>
        <u-form-item
          prop="brand"
          label="车辆品牌"
          borderBottom
          ref="item1"
          class="item1"
        >
          <superwei-combox
            :candidates="brandList"
            :isJSON="true"
            keyName="paramName"
            placeholder="请选择品牌"
            v-model="form.brand"
            @select="selectBrand"
            class="tire-box"
          ></superwei-combox>
        </u-form-item>
        <view v-if="form.truckType == 20 || form.truckType == 30">
          <u-form-item
            label="拖车车型"
            prop="trailCarType"
            borderBottom
            ref="item1"
            required
            class="item1"
            @click="trail_carType = true"
          >
            <view v-if="form.trailCarType" class="text">{{
              form.trailCarTypeName
            }}</view>
            <view class="placeholder" v-else>请选择拖车车型</view>
            <u-icon slot="right" name="arrow-right"></u-icon>
          </u-form-item>
          <u-form-item
            label="智能挂甩"
            borderBottom
            ref="item1"
            class="item1"
            @click="dump_car = true"
          >
            <view
              v-if="form.dumpCar === 1 || form.dumpCar === 0"
              class="text"
              >{{
                form.dumpCar === 1 ? "是" : form.dumpCar === 0 ? "否" : ""
              }}</view
            >
            <view class="placeholder" v-else>请选择智能挂甩</view>
            <u-icon slot="right" name="arrow-right"></u-icon>
          </u-form-item>
        </view>
        <view v-if="form.truckType == 10 || form.truckType == 30">
          <u-form-item
            label="车辆自编号"
            borderBottom
            ref="item1"
            class="item1"
          >
            <u--input
              v-model="form.selfNumber"
              border="none"
              placeholder="请输入车辆自编号"
            ></u--input>
          </u-form-item>
          <u-form-item label="车架号" borderBottom ref="item1" class="item1">
            <u--input
              v-model="form.vin"
              border="none"
              placeholder="请输入车架号"
            ></u--input>
          </u-form-item>
        </view>
        <u-form-item label="线路" borderBottom ref="item1" class="item1">
          <u--input
            v-model="form.route"
            border="none"
            placeholder="请输入线路"
          ></u--input>
        </u-form-item>
        <u-form-item label="初始公里表" borderBottom ref="item1" class="item1">
          <u--input
            v-model="form.initMileage"
            border="none"
            placeholder="请输入初始公里表"
          ></u--input>
          <view style="margin-left: 8rpx" slot="right" class="text">km</view>
        </u-form-item>
      </view>
      <view class="title">车辆气压阈值设置</view>
      <view style="margin-top: 0rpx" class="content">
        <u-form-item
          label="低压阈值"
          prop="lowPressure"
          borderBottom
          ref="item1"
          required
          class="item1"
        >
          <u--input
            v-model="form.lowPressure"
            border="none"
            placeholder="请输入低压阈值"
          ></u--input>
          <view style="margin-left: 8rpx" slot="right" class="text">bar</view>
        </u-form-item>
        <u-form-item
          label="高压阈值"
          prop="highPressure"
          borderBottom
          ref="item1"
          required
          class="item1"
        >
          <u--input
            v-model="form.highPressure"
            border="none"
            placeholder="请输入高压阈值"
          ></u--input>
          <view style="margin-left: 8rpx" slot="right" class="text">bar</view>
        </u-form-item>
        <u-form-item
          label="高温阈值"
          prop="highTemperature"
          borderBottom
          ref="item1"
          required
          class="item1"
        >
          <u--input
            v-model="form.highTemperature"
            border="none"
            placeholder="请输入高温阈值"
          ></u--input>
          <view style="margin-left: 8rpx" slot="right" class="text">℃</view>
        </u-form-item>
      </view>
      <view class="title">车辆气压标准值设置</view>
      <view style="margin-top: 0rpx" class="content">
        <u-form-item
          label="标准气压值"
          prop="standardPressure"
          ref="item1"
          required
          class="item1"
        >
          <u--input
            v-model="form.standardPressure"
            border="none"
            placeholder="请输入标准气压值"
          ></u--input>
          <view style="margin-left: 8rpx" slot="right" class="text">bar</view>
        </u-form-item>
      </view>
    </u--form>
    <view v-if="id" class="editbtnbox">
      <view class="btnone" @click="cancel">取消</view>
      <view class="btntwo" @click="edit">保存</view>
    </view>
    <view class="buttonbox" v-else>
      <view class="btnone" @click="cancel">取消</view>
      <view class="btntwo" @click="submit(0)">保存</view>
      <view class="btntwo" @click="submit(1)">保存并下一条</view>
    </view>
    <u-picker
      @cancel="car_type = false"
      :show="car_type"
      ref="uPicker"
      :columns="carTypeData"
      @confirm="confirm($event, 0)"
      title="请选择建车类型"
      :immediateChange="true"
    ></u-picker>
    <u-picker
      @cancel="car_classification = false"
      :show="car_classification"
      ref="uPicker"
      :columns="classificationData"
      @confirm="confirm($event, 1)"
      title="请选择车分类"
      :defaultIndex="classificationDefault"
      :immediateChange="true"
    ></u-picker>
    <u-picker
      @cancel="system_version = false"
      :show="system_version"
      ref="uPicker"
      :columns="systemVersionData"
      @confirm="confirm($event, 2)"
      title="请选择系统版本"
      :defaultIndex="systemVersionDefault"
      :immediateChange="true"
    ></u-picker>
    <u-picker
      keyName="deptName"
      @cancel="is_organization = false"
      :show="is_organization"
      ref="uPicker"
      :columns="organizationData"
      @confirm="confirm($event, 3)"
      title="请选择所属组织"
      :defaultIndex="organizationDefault"
      :immediateChange="true"
    ></u-picker>
    <u-picker
      keyName="dictLabel"
      @cancel="car_Model = false"
      :show="car_Model"
      ref="uPicker"
      :columns="carModelData"
      @confirm="confirm($event, 4)"
      :defaultIndex="carModelDefault"
      title="请选择主车车型"
      :immediateChange="true"
    ></u-picker>
    <u-picker
      keyName="dictLabel"
      @cancel="engine_Type = false"
      :show="engine_Type"
      ref="uPicker"
      :columns="engineTypedata"
      @confirm="confirm($event, 5)"
      title="请选择动力类型"
      :defaultIndex="engineTypeDefault"
      :immediateChange="true"
    ></u-picker>
    <u-picker
      keyName="dictLabel"
      @cancel="mileage_StatType = false"
      :show="mileage_StatType"
      ref="uPicker"
      :columns="mileageStatTypeData"
      @confirm="confirm($event, 6)"
      title="请选择里程统计方式"
      :immediateChange="true"
    ></u-picker>
    <u-picker
      keyName="label"
      @cancel="trail_carAxle = false"
      :show="trail_carAxle"
      ref="uPicker"
      :columns="trailCarAxleData"
      @confirm="confirm($event, 8)"
      title="请选择拖车轴数"
      :defaultIndex="trailCarAxleDefault"
      :immediateChange="true"
    ></u-picker>
    <u-picker
      keyName="label"
      @cancel="trail_carNoShow = false"
      :show="trail_carNoShow"
      ref="uPicker"
      :columns="trailCarNoShowData"
      @confirm="confirm($event, 9)"
      title="请选择拖车显示车牌号"
      :defaultIndex="trailCarNoShowDefault"
      :immediateChange="true"
    ></u-picker>
    <u-picker
      keyName="dictLabel"
      @cancel="trail_carType = false"
      :show="trail_carType"
      ref="uPicker"
      :columns="trailCarTypeData"
      @confirm="confirm($event, 10)"
      title="请选择拖车车型"
      :defaultIndex="trailCarTypeDefault"
      :immediateChange="true"
    ></u-picker>
    <u-picker
      keyName="label"
      @cancel="dump_car = false"
      :show="dump_car"
      ref="uPicker"
      :columns="dumpCarData"
      @confirm="confirm($event, 11)"
      title="请选择智能挂甩"
      :defaultIndex="dumpCarDefault"
      :immediateChange="true"
    ></u-picker>
  </view>
</template>

<script>
import superweiCombox from "@/components/superwei-combox";
import {
  getVehiclesDetail,
  getfleetList,
  carClass,
  carPower,
  gaucarClass,
  editVehicles,
  addVehicles,
  queryParamType,
} from "@/api/daily.js";
export default {
  components: {
    superweiCombox,
  },
  data() {
    return {
      id: "",
      form: {
        truckType: "",
        truckTypeName: "主车",
        vehicleNo: "",
        fleetName: "",
        categoryName: "",
        carClassName: "",
        systemVersion: "",
        truckType: "10",
        vehicleOwner: "",
        engineTypeName: "",
        mileageStatType: "2001",
        mileageStatTypeName: "以GPS为准",
        totalMileage: "",
        brand: "",
        selfNumber: "",
        vin: "",
        route: "",
        initMileage: "",
        lowPressure: "6.9",
        highPressure: "11.6",
        highTemperature: "90",
        standardPressure: "9",
        trailCarAxle: "",
        trailCarNo: "",
        trailCarNoShow: "",
        trailCarType: "",
        dumpCar: "",
        mileageType: "2001",
      },
      rules: {
        truckTypeName: [
          { required: true, message: "建车类型不能为空", trigger: "change" },
        ],
        vehicleNo: [
          { required: true, message: "主车车牌号不能为空", trigger: "blur" },
        ],
        fleetName: [
          { required: true, message: "所属组织不能为空", trigger: "blur" },
        ],
        categoryName: [
          { required: true, message: "车分类不能为空", trigger: "blur" },
        ],
        carClassName: [
          { required: true, message: "主车车型不能为空", trigger: "blur" },
        ],
        systemVersion: [
          {
            required: true,
            type: "number",
            message: "系统版本不能为空",
            trigger: "blur",
          },
        ],
        engineTypeName: [
          { required: true, message: "动力类型不能为空", trigger: "blur" },
        ],
        trailCarNo: [
          { required: true, message: "拖车车牌号不能为空", trigger: "blur" },
        ],
        trailCarAxle: [
          {
            required: true,
            type: "number",
            message: "拖车轴数不能为空",
            trigger: "blur",
          },
        ],
        trailCarNoShow: [
          {
            required: true,
            type: "number",
            message: "拖车显示车牌号不能为空",
            trigger: "blur",
          },
        ],
        trailCarType: [
          {
            required: true,
            type: "number",
            message: "拖车车型不能为空",
            trigger: "blur",
          },
        ],
        lowPressure: [
          {
            required: true,
            type: "number",
            message: "低压阈值不能为空",
            trigger: "blur",
          },
          {
            pattern: /^[+-]?(0|([1-9]\d*))(\.\d+)?$/,
            message: "低压阈值格式不正确",
            trigger: "blur",
          },
        ],
        highPressure: [
          {
            required: true,
            type: "number",
            message: "高压阈值不能为空",
            trigger: "blur",
          },
          {
            pattern: /^[+-]?(0|([1-9]\d*))(\.\d+)?$/,
            message: "高压阈值格式不正确",
            trigger: "blur",
          },
        ],
        highTemperature: [
          {
            required: true,
            type: "number",
            message: "高温阈值不能为空",
            trigger: "blur",
          },
          {
            pattern: /^[+-]?(0|([1-9]\d*))(\.\d+)?$/,
            message: "高温阈值格式不正确",
            trigger: "blur",
          },
        ],
        standardPressure: [
          {
            required: true,
            type: "number",
            message: "标准气压值不能为空",
            trigger: "blur",
          },
          {
            pattern: /^[+-]?(0|([1-9]\d*))(\.\d+)?$/,
            message: "标准气压值格式不正确",
            trigger: "blur",
          },
        ],
        totalMileage: [
          {
            pattern: /^[+-]?(0|([1-9]\d*))(\.\d+)?$/,
            message: "累计里程格式不正确",
            trigger: "blur",
          },
        ],
      },
      car_type: false,
      is_organization: false,
      car_classification: false,
      car_Model: false,
      system_version: false,
      engine_Type: false,
      mileage_StatType: false,
      trail_carAxle: false,
      trail_carNoShow: false,
      trail_carType: false,
      dump_car: false,
      carTypeData: [["主车", "挂车", "主挂一体"]],
      classificationData: [["客车", "卡车", "工程车"]],
      systemVersionData: [["硬件版", "纯软件版"]],
      carModelData: [[]],
      organizationData: [[]],
      engineTypedata: [[]],
      mileageStatTypeData: [
        [
          { dictLabel: "以GPS为准", dictValue: 2001 },
          { dictLabel: "以拆装公里表为准", dictValue: 2002 },
          { dictLabel: "以手工录入为准", dictValue: 2003 },
        ],
      ],
      trailCarAxleData: [
        [
          {
            label: "1根轴",
            value: 1,
          },
          {
            label: "2根轴",
            value: 2,
          },
          {
            label: "3根轴",
            value: 3,
          },
          {
            label: "4根轴",
            value: 4,
          },
        ],
      ],
      trailCarNoShowData: [
        [
          {
            label: "隐藏",
            value: 0,
          },
          {
            label: "显示",
            value: 1,
          },
        ],
      ],
      trailCarTypeData: [[]],
      dumpCarData: [
        [
          {
            label: "是",
            value: 1,
          },
          {
            label: "否",
            value: 0,
          },
        ],
      ],
      brandList: [],
      organizationDefault: [0],
      classificationDefault: [0],
      carModelDefault: [0],
      systemVersionDefault: [0],
      engineTypeDefault: [0],
      trailCarAxleDefault: [0],
      trailCarNoShowDefault: [0],
      trailCarTypeDefault: [0],
      dumpCarDefault: [0],
    };
  },
  onLoad(option) {
    if (option.id) {
      uni.setNavigationBarTitle({
        title: "车辆详情编辑",
      });
      this.id = option.id;
      this.initMileage = "0";
      this.totalMileage = "0";
      this.getDetails().then(() => {
        this.getcarList();
        this.getCarClass();
        this.getCarPower();
        this.getGaucarClass();
        this.queryBrand();
      });
    } else {
      this.getcarList();
      this.getCarClass();
      this.getCarPower();
      this.getGaucarClass();
      this.queryBrand();
      uni.setNavigationBarTitle({
        title: "新增车辆",
      });
    }
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules);
  },
  methods: {
    confirm(e, type) {
      switch (type) {
        case 0:
          if (e.indexs[0] == 0) {
            this.form.truckType = "10";
            this.form.category = null;
            this.form.categoryName = "";
          } else if (e.indexs[0] == 1) {
            this.form.truckType = "20";
            this.form.category = 50;
            this.form.categoryName = "卡车";
          } else if (e.indexs[0] == 2) {
            this.form.truckType = "30";
            this.form.category = 50;
            this.form.categoryName = "卡车";
          }
          this.form.truckTypeName = e.value[0];
          this.car_type = false;
          break;
        case 1:
          if (e.value[0] == "客车") {
            this.form.category = 40;
          } else if (e.value[0] == "卡车") {
            this.form.category = 50;
          } else if (e.value[0] == "工程车") {
            this.form.category = 60;
          }
          this.form.categoryName = e.value[0];
          this.car_classification = false;
          break;
        case 2:
          if (e.value[0] == "硬件版") {
            this.form.systemVersion = 5002;
          } else if (e.value[0] == "纯软件版") {
            this.form.systemVersion = 5001;
          }
          this.system_version = false;
          break;
        case 3:
          this.form.fleetId = e.value[0].id;
          this.form.fleetName = e.value[0].deptName;
          this.is_organization = false;
          break;
        case 4:
          this.form.carClass = e.value[0].dictValue;
          this.form.carClassName = e.value[0].dictLabel;
          this.car_Model = false;
          break;
        case 5:
          this.form.engineType = e.value[0].dictValue;
          this.form.engineTypeName = e.value[0].dictLabel;
          this.engine_Type = false;
          break;
        case 6:
          this.form.mileageStatType = e.value[0].dictValue;
          this.form.mileageStatTypeName = e.value[0].dictLabel;
          this.mileage_StatType = false;
          break;
        case 8:
          this.form.trailCarAxle = e.value[0].value;
          this.trail_carAxle = false;
          break;
        case 9:
          this.form.trailCarNoShow = e.value[0].value;
          this.trail_carNoShow = false;
          break;
        case 10:
          this.form.trailCarTypeName = e.value[0].dictLabel;
          this.form.trailCarType = e.value[0].dictValue;
          this.trail_carType = false;
          break;
        case 11:
          this.form.dumpCar = e.value[0].value;
          this.dump_car = false;
          break;
      }
    },
    getcarList() {
      getfleetList().then((res) => {
        if (res.code == 200) {
          this.organizationData = [res.data];
          for (let i = 0; i < res.data.length; i++) {
            if (this.form.fleetId == res.data[i].id) {
              this.$nextTick(() => {
                this.organizationDefault = [i];
              });
              break;
            }
          }
        }
      });
    },
    getDetails() {
      return new Promise((resolve, reject) => {
        getVehiclesDetail(this.id)
          .then((res) => {
            if (res.code == 200) {
              this.form = res.data;
              resolve(res);
              //判断车分类弹窗默认值
              if (res.data.category == 40) {
                this.classificationDefault = [0];
              } else if (res.data.category == 50) {
                this.classificationDefault = [1];
              } else if (res.data.category == 60) {
                this.classificationDefault = [2];
              }

              //判断系统版本弹窗默认高亮值
              if (res.data.systemVersion == 5002) {
                this.systemVersionDefault = [0];
              } else if (res.data.systemVersion == 5001) {
                this.systemVersionDefault = [1];
              }

              //拖车轴数弹窗默认值
              if (res.data.trailCarAxle == 1) {
                this.trailCarAxleDefault = [0];
              } else if (res.data.trailCarAxle == 2) {
                this.trailCarAxleDefault = [1];
              } else if (res.data.trailCarAxle == 3) {
                this.trailCarAxleDefault = [2];
              } else if (res.data.trailCarAxle == 4) {
                this.trailCarAxleDefault = [3];
              }

              if (res.data.trailCarNoShow == 0) {
                this.trailCarNoShowDefault = [0];
              } else if (res.data.trailCarNoShow == 1) {
                this.trailCarNoShowDefault = [1];
              }

              if (this.form.dumpCar == 1) {
                this.dumpCarDefault = [0];
              } else if (this.form.dumpCar == 0) {
                this.dumpCarDefault = [1];
              }
            } else {
              reject(res);
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    getCarClass() {
      carClass().then((res) => {
        if (res.code == 200) {
          this.carModelData = [res.data];
          for (let i = 0; i < res.data.length; i++) {
            if (this.form.carClass == res.data[i].dictValue) {
              this.$nextTick(() => {
                this.carModelDefault = [i];
              });
              break;
            }
          }
        }
      });
    },
    getCarPower() {
      carPower().then((res) => {
        if (res.code == 200) {
          this.engineTypedata = [res.data];
          for (let i = 0; i < res.data.length; i++) {
            if (this.form.engineType == res.data[i].dictValue) {
              this.$nextTick(() => {
                this.engineTypeDefault = [i];
              });
              break;
            }
          }
        }
      });
    },
    getGaucarClass() {
      gaucarClass().then((res) => {
        if (res.code == 200) {
          this.trailCarTypeData = [res.data];
          for (let i = 0; i < res.data.length; i++) {
            if (this.form.trailCarType == res.data[i].dictValue) {
              this.$nextTick(() => {
                this.trailCarTypeDefault = [i];
              });
              break;
            }
          }
        }
      });
    },
    edit() {
      this.$refs.uForm
        .validate()
        .then((res) => {
          editVehicles(this.form).then((res) => {
            if (res.code == 200) {
              uni.showToast({
                title: "修改成功",
                icon: "none",
                duration: 1000,
              });
              setTimeout(() => {
                const pages = getCurrentPages();
                const prevPage = pages[pages.length - 3];
                if (prevPage && prevPage.getList) {
                  prevPage.getList(1, prevPage.list.length + 1);
                }
                uni.navigateBack({
                  delta: 2,
                });
              }, 1000);
            }
          });
        })
        .catch((err) => {
          uni.showToast({
            title: `${err[0].message}`,
            icon: "none",
            duration: 2000,
          });
        });
    },
    submit(type) {
      this.$refs.uForm
        .validate()
        .then((res) => {
          addVehicles(this.form).then((res) => {
            if (res.code == 200) {
              uni.showToast({
                title: "新增成功",
                icon: "none",
                duration: 1000,
              });
              if (type == 0) {
                setTimeout(() => {
                  const pages = getCurrentPages();
                  const prevPage = pages[pages.length - 2];
                  if (prevPage && prevPage.getList) {
                    prevPage.getList(1, prevPage.list.length + 1);
                  }
                  uni.navigateBack({
                    delta: 2,
                  });
                }, 500);
              } else if (type == 1) {
                setTimeout(() => {
                  const pages = getCurrentPages();
                  const prevPage = pages[pages.length - 3];
                  if (prevPage && prevPage.getList) {
                    prevPage.getList(1, prevPage.list.length + 1);
                  }
                  uni.redirectTo({
                    url: `/pageA/vehicle/edit`,
                  });
                }, 500);
              }
            }
          });
        })
        .catch((err) => {
          uni.showToast({
            title: `${err[0].message}`,
            icon: "none",
            duration: 2000,
          });
        });
    },
    cancel() {
      uni.navigateBack({
        delta: 2,
      });
    },
    isOpenSelect(e) {
      if (!this.id) {
        if (e == 0) {
          this.car_type = true;
        } else if (e == 1) {
          this.mileage_StatType = true;
        }
      }
      if (e == 2 && this.form.truckType == "10") {
        this.car_classification = true;
      }
    },
    queryBrand() {
      queryParamType("vehicle_brand_param").then((res) => {
        if (res.code == 200) {
          this.brandList = res.data;
        }
      });
    },
    selectBrand(e) {
      this.form.brand = e.paramName;
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
  ::v-deep .u-form-item__body__right {
    line-height: 58rpx;
  }
  & ::v-deep .u-form-item__body__right__content__slot {
    flex-direction: row-reverse;
  }
  & ::v-deep .uni-input-input {
    text-align: right !important;
  }
  & ::v-deep .u-form-item__body {
    padding: 0rpx;
  }
  &::v-deep .uni-input-placeholder {
    text-align: right !important;
  }
  & ::v-deep input {
    text-align: right !important;
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
    color: #5c5f66;
  }
  .placeholder {
    font-size: 30rpx;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    color: #c4c5cd;
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
  z-index: 999;
  .u-button {
    width: 220rpx;
    height: 88rpx;
    box-shadow: 0rpx -4rpx 8rpx 0rpx rgba(0, 0, 0, 0.05);
    border-radius: 12rpx;
  }
  .btnone {
    background: #f5f7fb;
    box-shadow: 0rpx -4rpx 8rpx 0rpx rgba(0, 0, 0, 0.05);
    font-size: 30rpx;
    font-family: AppleSystemUIFont;
    color: #010914;
    border: none;
    width: 220rpx;
    height: 88rpx;
    line-height: 88rpx;
    text-align: center;
    font-size: 30rpx;
  }
  .btntwo {
    background: #1862f5;
    box-shadow: 0rpx -4rpx 8rpx 0rpx rgba(0, 0, 0, 0.05);
    border-radius: 12rpx;
    border: none;
    width: 220rpx;
    height: 88rpx;
    line-height: 88rpx;
    text-align: center;
    color: #f5f7fb;
    font-size: 30rpx;
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
  z-index: 999;
  .btnone {
    width: 334rpx;
    height: 88rpx;
    background: #ffffff;
    border-radius: 12rpx;
    font-size: 30rpx;
    font-family: AppleSystemUIFont;
    color: #010914;
    border: none;
    line-height: 88rpx;
    text-align: center;
    font-size: 30rpx;
  }
  .btntwo {
    width: 332rpx;
    height: 88rpx;
    background: #1862f5;
    border-radius: 12rpx;
    border: none;
    line-height: 88rpx;
    text-align: center;
    color: #f5f7fb;
    font-size: 30rpx;
  }
}
.tire-box ::v-deep input {
  text-align: right !important;
}
::v-deep .uni-input-placeholder {
  font-size: 30rpx;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  color: #c4c5cd;
}
</style>