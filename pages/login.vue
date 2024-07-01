<template>
  <view class="normal-login-container">
    <view class="logo-content align-center justify-center flex">
      <image style="width: 360rpx;height: 360rpx;" :src="globalConfig.appInfo.logo" mode="widthFix">
      </image>
      <!-- <text class="title">胎压端登录</text> -->
    </view>
    <view class="login-form-content">
      <view class="input-item flex align-center">
        <view class="iconfont icon-user icon"></view>
        <input v-model="loginForm.username" class="input" type="text" placeholder="请输入账号" maxlength="30" />
      </view>
      <view class="input-item flex align-center">
        <view class="iconfont icon-password icon"></view>
        <input v-model="loginForm.password" type="password" class="input" placeholder="请输入密码" maxlength="20" />
      </view>
      <!-- <view class="input-item flex align-center" style="width: 60%;margin: 0px;" v-if="captchaEnabled">
        <view class="iconfont icon-code icon"></view>
        <input v-model="loginForm.code" type="number" class="input" placeholder="请输入验证码" maxlength="4" />
        <view class="login-code"> 
          <image :src="codeUrl" @click="getCode" class="login-code-img"></image>
        </view>
      </view> -->
      <view class="action-btn">
		<u-button type="primary"  @click="handleLogin" class="login-btn cu-btn block bg-blue lg round" text="登录"></u-button>
      </view>
      <view class="reg text-center" v-if="register">
        <text class="text-grey1">没有账号？</text>
        <text @click="handleUserRegister" class="text-blue">立即注册</text>
      </view>
      <view class="xieyi text-center">
        <u-checkbox-group v-model="remember" placement="column">
          <u-checkbox
            :customStyle="{ marginBottom: '8px' }"
            :key="0"
            label="是否记住账号密码"
            name="1" 
            labelColor="#333" 
            labelSize="14"
          >
          </u-checkbox>
        </u-checkbox-group>
        <view style="display: flex;">
          <u-checkbox-group v-model="agree" placement="column">
            <u-checkbox name="1"> </u-checkbox>
          </u-checkbox-group>

          <text class="text-grey1" style="white-space: nowrap;">我已阅读并同意</text>
          <text @click="handleUserAgrement" class="text-blue"  style="white-space: nowrap;"
            >《用户协议》</text
          >
          <text @click="handlePrivacy" class="text-blue"  style="white-space: nowrap;">《隐私协议》</text>
        </view>
      </view>
    </view>
     <u-toast ref="uToast"></u-toast>
  </view>
</template>

<script>
  import { getCodeImg } from '@/api/login'

  export default {
    data() {
      return {
        codeUrl: "",
        captchaEnabled: true,
        // 用户注册开关
        register: false,
        globalConfig: getApp().globalData.config,
        loginForm: {
          username: "",
          password: "",
          // code: "",
          uuid: ''
        },
        remember: [],
        agree: []
      }
    },
    created() {
      // this.getCode()
    },
    onLoad() {
      this.isRemember()
    },
    methods: {
      // 用户注册
      handleUserRegister() {
        this.$tab.redirectTo(`/pages/register`)
      },
      // 隐私协议
      handlePrivacy() {
        let site = this.globalConfig.appInfo.agreements[0]
        uni.navigateTo({ url:`/pages/common/webview/index?title=${site.title}&url=${site.url}` })
      },
      // 用户协议
      handleUserAgrement() {
        let site = this.globalConfig.appInfo.agreements[1]
        uni.navigateTo({ url:`/pages/common/webview/index?title=${site.title}&url=${site.url}` })
      },
      // 获取图形验证码
      // getCode() {
      //   getCodeImg().then(res => {
      //     this.captchaEnabled = res.captchaEnabled === undefined ? true : res.captchaEnabled
      //     if (this.captchaEnabled) {
      //       this.codeUrl = 'data:image/gif;base64,' + res.img
      //       this.loginForm.uuid = res.uuid
      //     }
      //   })
      // },
      // 登录方法
      async handleLogin() {
      if (this.agree[0] != '1') {
        uni.showToast({
          title: "您还未阅读并同意此协议",
          icon: "none",
          duration: 1000,
        });
      } else if (this.loginForm.username === "") {
        uni.showToast({
          title: "请输入您的账号",
          icon: "none",
          duration: 1000,
        });
      } else if (this.loginForm.password === "") {
        uni.showToast({
          title: "请输入您的密码",
          icon: "none",
          duration: 1000,
        });
      }
		// else if (this.loginForm.code === "" && this.captchaEnabled) {
  //         this.$modal.msgError("请输入验证码")
  //       } 
		else {
			uni.showLoading({
					lock: true, //同v-loading的修饰符
					text: '登录中，请耐心等待...', //加载文案
					background: 'rgba(10,29,69,0.8)', //背景色
					spinner: 'el-icon-loading', //加载图标
				})
          // this.$modal.msgSuccess("登录中，请耐心等待...")
          this.pwdLogin()
        }
      },
      // 密码登录
      async pwdLogin() {
        this.$store.dispatch('Login', this.loginForm).then(() => {
          this.loginSuccess()
        }).catch(() => {
          if (this.captchaEnabled) {
            // this.getCode()
          }
        })
      },
      // 登录成功后，处理函数
      loginSuccess(result) {
        // 设置用户信息
        this.$store.dispatch('GetInfo').then(res => {
      uni.setStorageSync("username", this.loginForm.username);
        if (this.remember[0] == "1") {
          let temp = {
            username: this.loginForm.username,
            password: this.loginForm.password,
          };
          uni.setStorageSync("loginInfo", temp);
        } else {
          uni.removeStorageSync("loginInfo");
        }
			uni.reLaunch({
				url: '/pages/index'
			})
        })
      },
      isRemember() {
        let temp = uni.getStorageSync("loginInfo");
        if (temp) {
          this.remember = ["1"];
          this.loginForm.username = temp.username;
          this.loginForm.password = temp.password;
        } else {
          this.remember = [];
        }
      },
    }
  }
</script>

<style lang="scss">
  page {
    background-color: #ffffff;
  }

  .normal-login-container {
    width: 100%;

    .logo-content {
      width: 100%;
      font-size: 21px;
      padding-top: 15%;
	  display: flex;
	  justify-content: center;
	  align-items: center;
		
      image {
        border-radius: 4px;
      }

      .title {
        margin-left: 10px;
      }
    }

    .login-form-content {
      text-align: center;
      margin: 20px auto;
      margin-top: 15%;
      width: 80%;

      .input-item {
        margin: 20px auto;
        background-color: #f5f6f7;
        height: 45px;
        border-radius: 20px;
		display: flex;
		align-items: center;
        .icon {
          font-size: 38rpx;
          margin-left: 10px;
          color: #999;
        }

        .input {
          width: 100%;
          font-size: 14px;
          line-height: 20px;
          text-align: left;
          padding-left: 15px;
        }

      }

      .login-btn {
        margin-top: 40px;
        height: 45px;
      }
      
      .reg {
        margin-top: 15px;
      }
      
      .xieyi {
        color: #333;
        margin-top: 20px;
		font-size: 14px;
      }
      
      .login-code {
        height: 38px;
        float: right;
      
        .login-code-img {
          height: 38px;
          position: absolute;
          margin-left: 10px;
          width: 200rpx;
        }
      }
    }
  }
.text-blue{
	color: #3c96f3;
}
</style>
