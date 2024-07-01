<template>
  <view class="content">
    <view class="test1">
      <view class="text2">胎号</view>
      <u-picker></u-picker>
      <view style="margin-right: 32rpx;font-size: 32rpx;">
        {{params.tireMaintenanceDetailBos[0].tireNo}}
      </view>
    </view>
    <view class="test1">
      <view class="text2">品牌</view>
      <u-picker></u-picker>
      <view style="margin-right: 32rpx;font-size: 32rpx;">
        {{params.tireMaintenanceDetailBos[0].tireBrandName}}
      </view>
    </view>
    <view class="test1">
      <view class="text2">规格</view>
      <u-picker></u-picker>
      <view style="margin-right: 32rpx;font-size: 32rpx;">
        {{params.tireMaintenanceDetailBos[0].specificationsName}}
      </view>
    </view>
    <view class="test1">
      <view class="text2">轮胎去向</view>
      <u-picker :show="show" :columns="columns" @confirm="confirm" @cancel="cancel" closeOnClickOverlay
        @close="close" :immediateChange="true"></u-picker>
      <view style="margin-right: 32rpx;color: rgba(180, 181, 191, 1);font-size: 32rpx;" @click="show = true"
        v-if="!params.tireMaintenanceDetailBos[0].stockStatusCn">请选择></view>
      <view style="margin-right: 32rpx;font-size: 32rpx;" @click="show = true" v-else>
        {{params.tireMaintenanceDetailBos[0].stockStatusCn}}
      </view>
    </view>
    <view class="test1" v-if="params.tireMaintenanceDetailBos[0].stockStatusCn=='报废'">
      <view class="text2">报废类型</view>
      <radio-group @change="radioChange" style="width: 500rpx;">
        <label class="radio">
          <radio value="0" />正常报废
        </label>
        <label class="radio">
          <radio value="1" />提前报废
        </label>
      </radio-group>
    </view>
    <view class="test1" v-if="params.tireMaintenanceDetailBos[0].stockStatusCn=='报废'">
      <view class="text2">是否翻新</view>
      <radio-group @change="radioChange1" style="width: 500rpx;">
        <label class="radio">
          <radio value="0" />可翻新
        </label>
        <label class="radio">
          <radio value="1" checked />不可翻新
        </label>
      </radio-group>
    </view>
    <view class="test1" v-if="scrap =='提前报废' && params.tireMaintenanceDetailBos[0].stockStatusCn=='报废'">
      <view class="text2">问题类型</view>
      <u-picker :show="show1" :columns="columns1" @confirm="confirm1" @cancel="cancel1" closeOnClickOverlay
        @close="close1" :immediateChange="true"></u-picker>
      <view style="margin-right: 32rpx;color: rgba(180, 181, 191, 1);font-size: 32rpx;" @click="show1 = true"
        v-if="!params.tireMaintenanceDetailBos[0].questionTypeCN">请选择></view>
      <view style="margin-right: 32rpx;font-size: 32rpx;" @click="show1 = true" v-else>
        {{params.tireMaintenanceDetailBos[0].questionTypeCN}}
      </view>
    </view>
    <view class="test1" v-if="scrap =='提前报废' && params.tireMaintenanceDetailBos[0].questionTypeCN == '质量问题' && params.tireMaintenanceDetailBos[0].stockStatusCn=='报废'">
      <view class="text2">质量问题</view>
      <checkbox-group style="width: 500rpx;" @change="checkboxChange">
        <label>
          <checkbox value="1" />止口裂
        </label>
        <label>
          <checkbox value="2" />止口空
        </label>
        <label>
          <checkbox value="3" />肩空
        </label>
        <label>
          <checkbox value="4" />胎面脱层
        </label>
        <label>
          <checkbox value="5" />其他
        </label>
      </checkbox-group>
    </view>
    <view class="test1" v-if="scrap =='提前报废' && params.tireMaintenanceDetailBos[0].questionTypeCN == '使用问题' && params.tireMaintenanceDetailBos[0].stockStatusCn=='报废'">
      <view class="text2">使用问题</view>
      <checkbox-group style="width: 500rpx;" @change="checkboxChange1">
        <label>
          <checkbox value="1" />胎侧损坏
        </label>
        <label>
          <checkbox value="2" />胎面损坏
        </label>
        <label>
          <checkbox value="3" />止口损坏
        </label>
        <label>
          <checkbox value="4" />偏磨
        </label>
        <label>
          <checkbox value="5" />其他
        </label>
      </checkbox-group>
    </view>
    <view class="test1">
      <view class="text2">备注</view>
      <input placeholder="请输入" border="none" v-model="params.remark"></input>
    </view>

    <view
      style="position: fixed;bottom: 0;width: 100%;height: 148rpx;background-color: #fff;line-height: 148rpx;display: flex;align-items: center;">
      <view class="btn" @click="Cancel" style="background-color: #F5F7FB; color: #010914;">取消</view>
      <view class="btn" @click="Save" style="background-color: #1862F5; color: #F5F7FB;">保存</view>
    </view>
  </view>
</template>

<script>
  import {
    getKey,
    maintenance,
    getTires
  } from "@/api/tirePressure.js"
  export default {
    data() {
      return {
        show: false,
        columns: [
          ['待用', '待修补', '报废']
        ],
        show1: false,
        columns1: [
          ['质量问题', '使用问题']
        ],
        params: {
          tireMaintenanceDetailBos: [{
            questionContent: []
          }]
        },
        params1: {
          tireNo: ''
        },
        scrap: ''
      }
    },
    async onLoad(e) {
      this.params1.tireNo = e.tireNo
      const res = await getTires(this.params1)
      this.params.tireMaintenanceDetailBos = res.data.items
      const data = await getKey("WX")
      this.params.mid = data.data
      this.params.type = 3
    },
    methods: {
      confirm(e) {
        this.params.tireMaintenanceDetailBos[0].stockStatusCn = e.value[0]
        if (this.params.tireMaintenanceDetailBos[0].stockStatusCn == "待修补") {
          this.params.tireMaintenanceDetailBos[0].stockStatus = 30
        } else if (this.params.tireMaintenanceDetailBos[0].stockStatusCn == "待用") {
          this.params.tireMaintenanceDetailBos[0].stockStatus = 15
        } else {
          this.params.tireMaintenanceDetailBos[0].stockStatus = 50
        }
        this.show = false
      },
      cancel() {
        this.show = false
      },
      close() {
        this.show = false
      },
      confirm1(e) {
        this.params.tireMaintenanceDetailBos[0].questionTypeCN = e.value[0]
        if (this.params.tireMaintenanceDetailBos[0].questionTypeCN == '质量问题') {
          this.params.tireMaintenanceDetailBos[0].questionType = 'lifecycle_tire_quality_problem'
        } else {
          this.params.tireMaintenanceDetailBos[0].questionType = 'lifecycle_tire_use_problem'
        }
        this.show1 = false
      },
      cancel1() {
        this.show1 = false
      },
      close1() {
        this.show1 = false
      },
      async Save() {
        if(!this.params.tireMaintenanceDetailBos[0].isRenovate){
        this.params.tireMaintenanceDetailBos[0].isRenovate = "1"
        }
        if (this.params.tireMaintenanceDetailBos[0].stockStatusCn == null) {
          return uni.showToast({
            title: '请选择轮胎去向',
            icon: "none",
            duration: 1000,
          })
        }
        if(this.params.tireMaintenanceDetailBos[0].stockStatus == 50 && !this.params.tireMaintenanceDetailBos[0].scrappingType){
          return uni.showToast({
            title: '请选择报废类型',
            icon: "none",
            duration: 1000,
          })
        }
        const data1 = await maintenance(this.params)
        if (data1.code == 200) {
          uni.showToast({
            title: '保存成功',
            icon: "none",
            duration: 1000,
          })
          setTimeout(() => {
            const pages = getCurrentPages();
            const prevPage = pages[pages.length - 2];
            if (prevPage && prevPage.getList) {
            prevPage.getList(1, prevPage.list.length + 1);
            }
            uni.navigateBack({
              data: 1
            })
          }, 1000)
        }
      },
      radioChange(e) {
        this.params.tireMaintenanceDetailBos[0].scrappingType = e.detail.value
        if (this.params.tireMaintenanceDetailBos[0].scrappingType == 1) {
          this.scrap = "提前报废"
        }else{
          this.scrap = "正常报废"
        }
      },
      radioChange1(e) {
        this.params.tireMaintenanceDetailBos[0].isRenovate = e.detail.value
      },
      checkboxChange(e) {
        let arr = []
        let arr1 = []
        e.detail.value.forEach(i => {
          arr.push(i)
        })
        arr.forEach(i => {
          if (i == 1) {
            arr1.push('止口裂')
          } else if (i == 2) {
            arr1.push('止口空')
          } else if (i == 3) {
            arr1.push('肩空')
          } else if (i == 2) {
            arr1.push('胎面脱层')
          } else {
            arr1.push('其他')
          }
        })
        let str = arr.join()
        let str1 = arr1.join()
        this.params.tireMaintenanceDetailBos[0].questionContent = str
        this.params.tireMaintenanceDetailBos[0].questionContentCN = str1
      },
      checkboxChange1(e) {
        let arr = []
        let arr1 = []
        e.detail.value.forEach(i => {
          arr.push(i)
        })
        arr.forEach(i => {
          if (i == 1) {
            arr1.push('胎侧损坏')
          } else if (i == 2) {
            arr1.push('胎面损坏')
          } else if (i == 3) {
            arr1.push('止口损坏')
          } else if (i == 2) {
            arr1.push('偏磨')
          } else {
            arr1.push('其他')
          }
        })
        let str = arr.join()
        let str1 = arr1.join()
        this.params.tireMaintenanceDetailBos[0].questionContent = str
        this.params.tireMaintenanceDetailBos[0].questionContentCN = str1
      },
      Cancel() {
        uni.navigateBack({
          data: 1
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    padding-top: 20rpx;
  }

  .test1 {
    width: 100vw;
    height: 120rpx;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  input {
    width: 200rpx;
    height: 88rpx;
    text-align: right;
    padding-right: 30rpx;
  }

  .text2 {
    margin-left: 30rpx;
    font-size: 32rpx;
  }

  .btn {
    width: 332rpx;
    height: 88rpx;
    text-align: center;
    line-height: 88rpx;
    margin-left: 30rpx;
    border-radius: 12rpx;
  }
</style>