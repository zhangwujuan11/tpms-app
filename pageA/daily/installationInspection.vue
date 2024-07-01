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
          <u-form-item label="车牌号" ref="item1" class="item1">
            <view class="text">{{ carInfo.carNo }}</view>
          </u-form-item>
        </view>
        <view class="content">
          <u-form-item
            required
            label="胎号"
            prop="tireNo"
            borderBottom
            ref="item1"
            class="item1"
          >
            <u--input
              v-model="form.tireNo"
              border="none"
              placeholder="请输入胎号"
              inputAlign="right"
              style="padding: 12rpx 18rpx"
            ></u--input>
            <image
              @click="scan"
              slot="right"
              :src="$util.ossImg('img/images/carlive/crams.png')"
              class="search-icon"
            />
          </u-form-item>
          <u-form-item label="轮位" borderBottom ref="item1" class="item1">
            <view class="text">{{ carInfo.positioncode }}</view>
          </u-form-item>
          <u-form-item label="轮胎分类" prop="category" required borderBottom>
            <uni-data-select
              placeholder="请选择轮胎分类"
              @change="gogogo($event)"
              v-model="form.category"
              :localdata="tireclass"
            ></uni-data-select>
          </u-form-item>
          <u-form-item
            label="轮胎状态"
            prop="stockStatus"
            required
            borderBottom
          >
            <uni-data-select
              placeholder="请选择轮胎状态"
              v-model="form.stockStatus"
              :localdata="tirestatu"
            ></uni-data-select>
          </u-form-item>
          <u-form-item
            label="所属仓库"
            prop="warehouseId"
            required
            borderBottom
          >
            <uni-data-select
              placeholder="请选择所属仓库"
              @change="warehousechange($event)"
              v-model="form.warehouseId"
              :localdata="houselist"
            ></uni-data-select>
          </u-form-item>
          <u-form-item label="品牌" prop="tireBrandId" required borderBottom>
            <uni-data-select
              placeholder="请选择品牌"
              v-model="form.tireBrandId"
              :localdata="pinpai"
              @change="brandr($event)"
            ></uni-data-select>
          </u-form-item>
          <u-form-item
            label="规格"
            prop="specificationsId"
            required
            borderBottom
          >
            <uni-data-select
              placeholder="请选择规格"
              v-model="form.specificationsId"
              :localdata="guige"
              @change="specificati($event)"
            ></uni-data-select>
          </u-form-item>
          <u-form-item label="花纹型号" prop="patternId" required borderBottom>
            <uni-data-select
              placeholder="请选择花纹型号"
              v-model="form.patternId"
              :localdata="xinhao"
              @change="brandrxinhao($event)"
            ></uni-data-select>
          </u-form-item>
          <u-form-item label="绑定传感器" prop="senderId" borderBottom>
            <u--input
              placeholder="请输入传感器"
              border="false"
              inputAlign="right"
              v-model="form.senderId"
            ></u--input>
            <image
              @click="senderIdScan"
              slot="right"
              :src="$util.ossImg('img/images/carlive/crams.png')"
              class="search-icon"
            />
          </u-form-item>
          <u-form-item label="单价" prop="price" required borderBottom>
            <u--input
              border="false"
              inputAlign="right"
              placeholder="单位元"
              v-model="form.price"
            ></u--input>
          </u-form-item>
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
          <u-form-item
            label="当前里程表读数"
            borderBottom
            ref="item1"
            class="item1"
            prop="mileageReading"
            required
          >
            <u--input
              v-model="form.mileageReading"
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
            prop="left"
            required
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
            prop="center"
            required
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
            prop="right"
            required
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
            prop="depth"
            required
          >
            <u--input
              v-model="form.depth"
              border="none"
              placeholder="请输入新胎花纹深度"
              inputAlign="right"
            ></u--input>
            <view style="margin-left: 8rpx" slot="right" class="text">mm</view>
          </u-form-item>
          <u-form-item
            label="初测花纹深度"
            prop="firstDepth"
            ref="item1"
            class="item1"
            required
            borderBottom
          >
            <u--input
              border="none"
              placeholder="请输入初测花纹深度"
              v-model="form.firstDepth"
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
        <view class="btn1">取消</view>
        <view class="btn2" @click="save">保存</view>
      </view>
    </view>
    <image
      class="record-icon"
      :src="$util.ossImg('img/check_record.png')"
      @click="goInspectionList"
    ></image>
  </view>
</template>

<script>
import superweiCombox from "@/components/superwei-combox";
import { getDicts } from "@/api/system/dict/data";
import config from "@/config";
import {
  warehouselist,
  getSpecifications,
  getTireBands,
  getpatternmodel,
  addtire,
  tireinstall,
  inspectionAdd,
} from "@/api/daily.js";
export default {
  components: {
    superweiCombox,
  },
  data() {
    return {
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
        category: [
          { required: true, message: "轮胎类别不能为空", trigger: "blur" },
        ],
        stockStatus: [
          { required: true, message: "轮胎状态不能为空", trigger: "blur" },
        ],
        warehouseId: [
          { required: true, message: "仓库名称不能为空", trigger: "blur" },
        ],
        tireBrandId: [
          { required: true, message: "品牌不能为空", trigger: "blur" },
        ],
        specificationsId: [
          { required: true, message: "规格不能为空", trigger: "blur" },
        ],
        patternId: [
          { required: true, message: "花纹型号不能为空", trigger: "blur" },
        ],
        mileageReading: [
          { required: true, message: "里程表读数不能为空", trigger: "blur" },
        ],
        price: [
          {
            required: true,
            type: "number",
            message: "单价不能为空",
            trigger: "blur",
          },
        ],
        firstDepth: [
          {
            required: true,
            type: "number",
            message: "初测花纹深度不能为空",
            trigger: "change",
          },
          {
            pattern: /^\d+(\.\d+)?$/,
            message: "初测花纹深度不能为负数",
            trigger: "blur",
          },
        ],
        depth: [
          {
            required: true,
            type: "number",
            message: "新花纹深度不能为空",
            trigger: "blur",
          },
          {
            pattern: /^\d+(\.\d+)?$/,
            message: "花纹深不能为负数",
            trigger: "blur",
          },
        ],
      },
      fileList1: [],
      carNo: "",
      tireclass: [], //轮胎分类
      tirestatu: [], //轮胎状态
      houselist: [],
      pinpai: [], //品牌
      guige: [], //规格
      xinhao: [],
      carInfo: {},
    };
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules);
  },
  onLoad(option) {
    this.carInfo = option;
    this.form.vehicleNo = option.carNo;
    this.form.installPositionDesc = option.positioncode;
    this.form.installPosition = option.position;
    this.form.vehicleId = option.id;
    this.getClass();
    this.getWareHouse();
    this.getBrands();
    this.getSpecificationsList();
    this.getPatter();
  },
  methods: {
    selectBrand(e) {
      this.form.brand = e.value;
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
          url: `${config.baseUrl}/common/upload`, //
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
      this.carNo = e.value;
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
    gogogo(e) {
      this.form.stockStatus = "";
      if (e == 0) {
        this.tirestatu = [{ text: "库存全新胎", value: "10" }];
      } else if (e == 3) {
        this.tirestatu = [{ text: "库存翻新胎", value: "11" }];
      } else {
        this.tirestatu = [
          { text: "待用胎", value: "15" },
          { text: "待修补", value: "30" },
        ];
      }
      this.$forceUpdate();
    },
    getClass() {
      getDicts("lifecycle_tire_category").then((res) => {
        this.tireclass = res.data.map((item) => {
          return { text: item.dictLabel, value: item.dictValue };
        });
      });
    },
    warehousechange(val) {
      this.houselist.forEach((item) => {
        if (item.value == val) {
          this.form.warehouseName = item.text;
        }
      });
    },
    getWareHouse() {
      warehouselist({ pageNum: 1, pageSize: 10000 }).then((res) => {
        this.houselist = res.data.items.map((item) => {
          return {
            value: item.id,
            text: item.warehouseName,
          };
        });
      });
    },
    // 品牌数据处理
    brandr(val) {
      this.pinpai.map((item) => {
        if (item.value == val) {
          this.form.tireBrandName = item.text;
        }
      });
    },
    getBrands() {
      getTireBands().then((res) => {
        this.pinpai = res.data.map((item) => {
          return {
            value: item.paramId,
            text: item.paramName
          };
        });
      });
    },
    specificati(val) {
      this.guige.map((item) => {
        if (item.value == val) {
          this.form.specificationsName = item.text;
        }
      });
    },
    getSpecificationsList() {
      getSpecifications().then((res) => {
        this.guige = res.data.map((item) => {
          return {
            value: item.paramId,
            text: item.paramName,
          };
        });
      });
    },
    brandrxinhao(val) {
      this.xinhao.map((item) => {
        if (item.value == val) {
          this.form.pattern = item.text;
        }
      });
    },
    getPatter() {
      getpatternmodel().then((res) => {
        this.xinhao = res.data.map((item) => {
          return {
            value: item.paramId,
            text: item.paramName,
          };
        });
      });
    },
    save() {
      this.$refs.uForm
        .validate()
        .then((res) => {
          // updateTire(this.form).then(res=>{
          // 	if(res.code == 200){
          // 		uni.$u.toast('轮胎修改成功')
          // 		uni.navigateTo({
          // 			url:'/pageA/carlive/tiretable/tiretable'
          // 		})
          // 	}else{
          // 		uni.$u.toast(res.message)
          // 	}
          // })
          this.addTire().then((resfirst) => {
            this.form.tireId = resfirst.data.tireId;
            this.tireInstall().then((ressecond) => {
              this.inspect();
            });
          });
        })
        .catch((error) => {
          console.log(error);
          uni.$u.toast("校验失败,请完整填写表单");
        });
    },
    addTire() {
      return new Promise((resolve, reject) => {
		 let obj =JSON.parse(JSON.stringify(this.form)) 
		  delete obj.installPosition
		  delete obj.installPositionDesc
        addtire(obj)
          .then((res) => {
            if (res.code == 200) {
              resolve(res);
            } else {
              uni.$u.toast(res.message);
            }
          })
          .catch((err) => {
            uni.$u.toast(err);
          });
      });
    },
    tireInstall() {
      return new Promise((resolve, reject) => {
        tireinstall(this.form)
          .then((res) => {
            if (res.code == 200) {
              resolve(res);
            } else {
              uni.$u.toast(res.message);
            }
          })
          .catch((err) => {
            uni.$u.toast(err);
          });
      });
    },
    inspect() {
      if (this.fileList1.length > 0) {
        this.form.checkPhotos = this.fileList1.map((item) => {
          return item.url;
        });
        this.form.checkPhotos = this.form.checkPhotos.join(",");
      }
      this.form.processingStatus = "0";
      this.form.inspector = uni.getStorageSync("username");
      this.form.inspectionTime = new Date().toISOString();
      this.form.specification = this.form.specificationsName;
      this.form.brand = this.form.tireBrandName;
      this.form.treadModel = this.form.pattern;
      this.form.newTreadDepth = this.form.depth;
      this.form.status = "0";
      inspectionAdd(this.form)
        .then((res) => {
          if (res.code == 200) {
            const pages = getCurrentPages();
            let prevPage = pages[pages.length - 2];
            // #ifdef MP-WEIXIN
            prevPage = prevPage.$vm;
            // #endif
            prevPage.loadData();
            uni.navigateBack();
            setTimeout(() => {
              uni.showToast({
                title: "检查成功",
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
    },
    scan() {
      uni.scanCode({
        success: (res) => {
          this.form.tireNo = res.result;
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
    senderIdScan() {
      uni.scanCode({
        success: (res) => {
          this.form.senderId = res.result;
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
  & ::v-deep .u-form-item__body__left__content__required {
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
    text-align: right;
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
}
.search {
  width: 90%;
  margin: 0 auto;
  border-radius: 180rpx;
}

::v-deep .uni-select {
  border: none;
  text-align: right;
}
::v-deep .uni-select__input-text {
  font-size: 30rpx;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
}
</style>