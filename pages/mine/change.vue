<template>
  <view class="content">
    <view class="test">
      <view class="text">原始密码</view>
      <input placeholder="请输入旧密码" border="none" v-model="oldPassword" :password="showPassword"></input>
    </view>
    <view class="test">
      <view class="text">新密码</view>
      <input placeholder="请输入新密码" border="none" v-model="newPassword" :password="showPassword"></input>
    </view>
    <view class="test">
      <view class="text">确认密码</view>
      <input placeholder="请确认新密码" border="none" v-model="newpassword1" :password="showPassword"></input>
    </view>

    <view class="botton" @click="save">保存</view>
  </view>
</template>

<script>
  import {
    updatePwd
  } from "@/api/tirePressure.js"
  import {
    toast,
  } from '@/utils/common'
  import store from '@/store'
  export default {
    data() {
      return {
        oldPassword: "",
        newPassword: "",
        newpassword1: "",
        showPassword: true,
      }
    },
    methods: {
      async save() {
        if (this.oldPassword == "") {
          return uni.showToast({
            title: "请输入旧密码",
            icon: 'none',
          });
        }else if(this.newPassword == ""){
          return uni.showToast({
            title: "请输入新密码",
            icon: 'none',
          });
        }else if(this.newpassword1 == ""){
          return uni.showToast({
            title: "请确认新密码",
            icon: 'none',
          });
        }
        if (this.newPassword.length < 6) {
          return uni.showToast({
            title: "密码长度不能小于6位",
            icon: 'none',
          });
        }

        if (this.newPassword == this.newpassword1) {
          let params = {
            oldPassword: this.oldPassword,
            newPassword: this.newPassword,
          }
          const data = await updatePwd(params)
          if (data.code == 200) {
            uni.showToast({
              title: '修改成功'
            })
            setTimeout(() => {
             store.dispatch('LogOut').then(res => {
              uni.reLaunch({
                url: '/pages/login'
              })
            })
            }, 500);
          }
        } else {
          return toast('两次新密码不一致')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    padding-top: 26rpx;
  }

  .test {
    width: 100vw;
    height: 120rpx;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  input {
    width: 500rpx;
    height: 88rpx;
    text-align: right;
    padding-right: 30rpx;
  }

  .text {
    margin-left: 30rpx;

    font-size: 32rpx;
    &::before{
      content: '*';
      color: red;
    }
  }

  .botton {
    width: 690rpx;
    height: 88rpx;
    background-color: rgba(24, 98, 245, 1);
    color: #fff;
    font-size: 30rpx;
    margin-left: 30rpx;
    border-radius: 12rpx;
    text-align: center;
    line-height: 88rpx;
    margin-top: 32rpx;
  }
</style>