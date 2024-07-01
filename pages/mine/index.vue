<template>
  <view class="mine-container" style="background-image: url(https://tpms.5i84.cn/img/fenzu8.png);">
    <!--顶部个人信息栏-->
    <view class="header-section"  @click="handleAbout0">
      <image v-if="form.avatar && basurl" :src="basurl+form.avatar" style="width: 140rpx;height: 140rpx;margin-left:20rpx;color: #CCCCCC;"></image>
	  <image v-else src="@/static/user.png" style="width: 140rpx;height: 140rpx;margin-left:20rpx;color: #CCCCCC;"></image>
      <view style="margin-left:30rpx; ">
        <view class="txt">{{ deptinfo.deptName }}</view>
        <view class="txt1">{{ form.userName }}</view>
      </view>
    </view>

    <view class="menu-list">
		<view class="list-cell list-cell-arrow" @click="handleAbout0">
		  <view class="menu-item-box">
		    <image src="https://tpms.5i84.cn/img/fenzu1.png"
		      style="width: 54rpx;height: 54rpx;margin-left: 24rpx;margin-right: 24rpx;">
		    </image>
		    <view class="text" style="margin-right: 440rpx;">我的信息</view>
		    <image src="https://tpms.5i84.cn/img/fenzu7.png" style="width: 32rpx;height: 34rpx;"></image>
		  </view>
		</view>
      <view class="list-cell list-cell-arrow" @click="handleToEditInfo">
        <view class="menu-item-box">
          <image src="https://tpms.5i84.cn/img/fenzu6.png"
            style="width: 54rpx;height: 54rpx;margin-left: 24rpx;margin-right: 24rpx;">
          </image>
          <view class="text" style="margin-right: 384rpx;">胎压报警消息</view>
          <image src="https://tpms.5i84.cn/img/fenzu7.png" style="width: 32rpx;height: 34rpx;"></image>
        </view>
      </view>
      <!--      <view class="list-cell list-cell-arrow" @click="handleHelp">
        <view class="menu-item-box">
          <image src="https://tpms.5i84.cn/img/fenzu1.png"
            style="width: 54rpx;height: 54rpx;margin-left: 24rpx;margin-right: 24rpx;">
          </image>
          <view class="text" style="margin-right: 440rpx;">司机管理</view>
          <image src="https://tpms.5i84.cn/img/fenzu7.png" style="width: 32rpx;height: 34rpx;"></image>
        </view>
      </view> -->
      <view class="list-cell list-cell-arrow" @click="handleAbout1">
        <view class="menu-item-box">
          <image src="https://tpms.5i84.cn/img/fenzu2.png"
            style="width: 54rpx;height: 54rpx;margin-left: 24rpx;margin-right: 24rpx;">
          </image>
          <view class="text" style="margin-right: 440rpx;">提醒设置</view>
          <image src="https://tpms.5i84.cn/img/fenzu7.png" style="width: 32rpx;height: 34rpx;"></image>
        </view>
      </view>
      <view class="list-cell list-cell-arrow" @click="handleAbout2">
        <view class="menu-item-box">
          <image src="https://tpms.5i84.cn/img/fenzu3.png"
            style="width: 54rpx;height: 54rpx;margin-left: 24rpx;margin-right: 24rpx;">
          </image>
          <view class="text" style="margin-right: 440rpx;">参数设置</view>
          <image src="https://tpms.5i84.cn/img/fenzu7.png" style="width: 32rpx;height: 34rpx;"></image>
        </view>
      </view>
    </view>

    <view class="bottom">
      <view class="list-cell list-cell-arrow" @click="handleAbout3">
        <view class="menu-item-box">
          <image src="https://tpms.5i84.cn/img/fenzu4.png"
            style="width: 54rpx;height: 54rpx;margin-left: 24rpx;margin-right: 24rpx;">
          </image>
          <view class="iconfont icon-aixin menu-icon"></view>
          <view class="text" style="margin-right: 440rpx;">修改密码</view>
          <image src="https://tpms.5i84.cn/img/fenzu7.png" style="width: 32rpx;height: 34rpx;"></image>
        </view>
      </view>
      <view class="list-cell list-cell-arrow" @click="handleAbout4" style="margin-bottom: 40upx;">
        <view class="menu-item-box">
          <image src="https://tpms.5i84.cn/img/fenzu5.png"
            style="width: 54rpx;height: 54rpx;margin-left: 24rpx;margin-right: 24rpx;">
          </image>
          <view class="iconfont icon-aixin menu-icon"></view>
          <view class="text" style="margin-right: 440rpx;">关于我们</view>
          <image src="https://tpms.5i84.cn/img/fenzu7.png" style="width: 32rpx;height: 34rpx;"></image>
        </view>
      </view>
	  <u-button type="error" @click="handleLogout"  text="退出登录"></u-button>
    </view>
  </view>
 
</view></template>

<script>
import config from '@/config'
import storage from '@/utils/storage'
import { user } from "@/api/tirePressure.js"
import store from '@/store'
export default {
  data () {
    return {
      name: this.$store.state.user.name,
      version: getApp().globalData.config.appInfo.version,
      form: {},
	  basurl:'',
	  deptinfo:{}
    }
  },
  computed: {
    avatar () {
      return this.$store.state.user.avatar || '#'
    },
    windowHeight () {
      return uni.getSystemInfoSync().windowHeight - 50
    }
  },
  async onLoad () {
    const data = await user()
    this.form = data.data
	this.deptinfo=data.data.dept
	this.basurl=config.baseUrl
  },
  methods: {
    handleToInfo () {
      uni.navigateTo({
        url: '/pages/mine/info/index'
      })
    },
    handleToEditInfo () {
      uni.navigateTo({
        url: '/pages/mine/alarm'
      })
    },
	handleAbout0() {
      uni.navigateTo({
        url: "/pages/mine/mine/mine"
      })
    },
    handleAbout1 () {
      uni.navigateTo({
        url: "/pages/mine/remind"
      })
    },
    handleAbout2 () {
      uni.navigateTo({
        url: "/pages/mine/settings"
      })
    },
    handleAbout3 () {
      uni.navigateTo({
        url: "/pages/mine/change"
      })
    },
    handleAbout4 () {
      uni.navigateTo({
        url: "/pages/mine/about"
      })
    },
    handleToSetting () {
      uni.navigateTo({
        url: '/pages/mine/setting/index'
      })
    },
    handleToLogin () {
      uni.navigateTo({
        url: '/pages/login'
      })
    },
    handleToAvatar () {
      uni.navigateTo({
        url: '/pages/mine/avatar/index'
      })
    },
    handleLogout () {
		uni.showModal({
			title: "注意",
			content: "确定退出系统吗？",
			success: function (res) {
				if (res.confirm) {
					store.dispatch('LogOut').then(res => {
					  uni.reLaunch({
					    url: '/pages/login'
					  })
					})
				}
			}
		})
		
		
		
  //     this.$modal.confirm('确定注销并退出系统吗？').then(() => {
  //       this.$store.dispatch('LogOut').then(() => {
  //         this.$tab.reLaunch('/pages/login')
  //       })
  //     })
    },
    handleHelp () {
      uni.navigateTo({
        url: '/pages/mine/Driver'
      })
    },
    handleAbout () {
      this.$tab.navigateTo('/pages/mine/about/index')
    },
    handleJiaoLiuQun () {
      this.$modal.showToast('QQ群：①133713780、②146013835')
    },
    handleBuilding () {
      this.$modal.showToast('模块建设中~')
    }
  }
}
</script>

<style lang="scss" scoped>
page {
  background-color: #f5f6f7;
}

.mine-container {
  width: 100%;
  height: 1300rpx;

  .header-section {
    display: flex;
    align-items: center;
    // justify-content: space-between;
    width: 710upx;
    height: 140upx;
    margin: 20upx;
    border-radius: 20upx;
    font-size: 24upx;
    margin-bottom: 40rpx;

    .txt {
      // margin-top: 14upx;
      color: #010914;
      font-size: 36rpx;
    }

    .txt1 {
      margin-top: 14upx;
      color: #5C5F66;
      font-size: 28rpx
    }

    .login-tip {
      font-size: 18px;
      margin-left: 10px;
    }

    .cu-avatar {
      border: 2px solid #eaeaea;

      .icon {
        font-size: 40px;
      }
    }

    .user-info {
      margin-left: 15px;

      .u_title {
        font-size: 18px;
        line-height: 30px;
      }
    }
  }

  .content-section {
    position: relative;
    top: -50px;

    .mine-actions {
      margin: 15px 15px;
      padding: 20px 0px;
      border-radius: 8px;
      background-color: white;

      .action-item {
        .icon {
          font-size: 28px;
        }

        .text {
          display: block;
          font-size: 13px;
          margin: 8px 0px;
        }
      }
    }
  }
}

.menu-list {
  width: 710upx;
  margin-left: 20rpx;
  background-color: #fff;
  border-radius: 20rpx;
}


.menu-item-box {
  width: 710rpx;
  height: 150rpx;
  display: flex;
  align-items: center;
}

.text {
  font-size: 28rpx;
  color: #010914;
}

.bottom {
  margin-top: 20rpx;
  width: 710upx;
  height: 300upx;
  margin-left: 20rpx;
  background-color: #fff;
  border-radius: 20rpx;
}
</style>