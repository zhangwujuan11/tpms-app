<template>
  <view class="content">
    <view class="Alerts">
      <view class="text">短信提醒</view>
      <u-switch v-model="value" @change="change"></u-switch>
    </view>
    <view class="Alerts">
      <view class="text">微信提醒</view>
      <u-switch v-model="value1" @change="change1"></u-switch>
    </view>
    <view class="Alerts">
      <view class="text1">提醒次数</view>
      <u-picker :show="show" :columns="columns" @confirm="confirm" @cancel="cancel" closeOnClickOverlay
        @close="close" :immediateChange="true" :defaultIndex="numberDefault"></u-picker>
      <view style="margin-right: 32rpx;color: rgba(180, 181, 191, 1);font-size: 32rpx;" @click="show = true">{{tick}}></view>
    </view>

    <view class="botton" @click="savef">保存</view>
  </view>
</template>

<script>
	import {noices,subnoices} from '@/api/system/user.js'
  export default {
    data() {
      return {
	  form:{
		  alertFrequency:null,
		  alertSoundEnabled:null,
		  id:null,
		  noSignalAlertEnabled:null,
		  smsAlertEnabled:null,
		  wechatAlertEnabled:null
	  },
        value: '',
        value1: '',
        show: false,
        columns: [
          ['1次', '2次', '3次', '4次', '5次']
        ],
		tick:"请选择",
    numberDefault: [0]
      }
    },
	onLoad() {
		noices().then(res=>{
			this.form=res.data
			if(res.data.wechatAlertEnabled == 0){
				this.value1=false
			}else{
				this.value1=true
			}
			
			if(res.data.smsAlertEnabled == 0){
				this.value=false
			}else{
				this.value=true
			}
			this.tick = res.data.alertFrequency + '次'

        for(let i = 0;i<this.columns[0].length;i++){
          if(this.columns[0][i]==this.tick){
            this.$nextTick(()=>{
            this.numberDefault=[i]
            })
            break;
          }
        }
		})
	},
    methods: {
      change(e) {
		  if(e){
			  this.form.smsAlertEnabled=1
		  }else{
			  this.form.smsAlertEnabled=0
		  }
      },
      change1(e) {
		  if(e){
			  this.form.wechatAlertEnabled=1
		  }else{
			  this.form.wechatAlertEnabled=0
		  }
      },
      confirm(e) {
		let ins=e.indexs[0]
		this.tick=this.columns[0][ins]
		this.form.alertFrequency=e.indexs[0] + 1
        this.show = false
      },
      cancel() {
        this.show = false
      },
      close() {
        this.show = false
      },
	  savef(){
		 subnoices(this.form).then(res=>{
			 if(res.code==200){
				 uni.$u.toast("修改成功")
         setTimeout(() => {
          uni.navigateBack();
         }, 500);
			 }else{
				 uni.$u.toast(res.message)
			 }
		 })
	  }
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    padding-top: 26rpx;
  }

  .Alerts {
    display: flex;
    align-items: center;
    width: 100vw;
    height: 120rpx;
    background-color: #fff;
  }

  .text {
    margin-left: 30rpx;
    margin-right: 460rpx;
    color: rgba(1, 9, 20, 1);
    font-size: 32rpx;
  }

  .text1 {
    margin-left: 30rpx;
    margin-right: 400rpx;
    color: rgba(1, 9, 20, 1);
    font-size: 32rpx;
  }

  .botton {
    width: 690rpx;
    height: 88rpx;
    margin-top: 32rpx;
    margin-left: 30rpx;
    background-color: rgba(24, 98, 245, 1);
    text-align: center;
    line-height: 88rpx;
    color: rgba(255, 255, 255, 1);
    font-size: 30rpx;
    border-radius: 12rpx;
  }
</style>