<template>
  <view class="content">
    <view class="box">
      <view class="title">轮胎管理</view>
      <view class="ul">
        <view class="li"  @click="Jump('/pageA/carlive/tirelist/tirelist')">
          <image src="https://tpms.5i84.cn/img/index/ruku.png"></image>
          <text>轮胎入库</text>
        </view>
        <view class="li" @click="Jump('/pageA/carlive/tiretable/tiretable')">
          <image src="https://tpms.5i84.cn/img/index/liebiao.png"></image>
          <text>轮胎列表</text>
        </view>
       <!-- <view class="li">
          <image src="https://tpms.5i84.cn/img/index/chuanganqi.png"></image>
          <text>绑定传感器</text>
        </view> -->
      </view>
    </view>

    <view class="box">
      <view class="title">安装拆卸</view>
      <view class="ul">
        <view class="li" @click="Jump('/pageA/carlive/tireinstall/tireinstall')">
          <image src="https://tpms.5i84.cn/img/index/anzhuang.png"></image>
          <text>轮胎装卸</text>
        </view>
      <!--  <view class="li">
          <image src="https://tpms.5i84.cn/img/index/chaixie.png"></image>
          <text>轮胎卸载</text>
        </view> -->
        <view class="li"  @click="Jump('/pageA/carlive/tirechange/tirechange')">
          <image src="https://tpms.5i84.cn/img/index/huangwei.png"></image>
          <text>轮胎换位</text>
        </view>
      </view>
    </view>

    <view class="box">
      <view class="title">日常维护</view>
      <view class="ul">
        <view class="li" @click="Jump('/pageA/daily/inspect')">
          <image src="https://tpms.5i84.cn/img/index/jiancha.png"></image>
          <text>轮胎检查</text>
        </view>
        <view class="li" @click="Jump('/pageA/daily/maintenance')">
          <image src="https://tpms.5i84.cn/img/hub/xiubu.png"></image>
          <text>轮胎修补</text>
        </view>
        <view class="li" @click="Jump('/pageA/daily/renovate')">
          <image src="https://tpms.5i84.cn/img/hub/fanxin.png"></image>
          <text>轮胎翻新</text>
        </view>
        <view class="li" @click="Jump('/pageA/daily/mileageRegistration')">
          <image style="height: 58rpx" src="https://tpms.5i84.cn/img/hub/rengong.png"></image>
          <text>人工里程登记</text>
        </view>
      <!--  <view class="li">
        <!-- <view class="li">
          <image src="https://tpms.5i84.cn/img/hub/rfid.png"></image>
          <text>RFID管理</text>
        </view> -->
        <view class="li" @click="Jump('/pages/warehouse/Pending')">
          <image src="https://tpms.5i84.cn/img/hub/luntaidaichuli.png"></image>
          <text>轮胎待处理</text>
        </view>
      </view>
    </view>

    <view class="box">
      <view class="title">轮毂管理</view>
      <view class="ul">
        <view class="li" @click="Jump('/pages/warehouse/storage')">
          <image src="https://tpms.5i84.cn/img/hub/lunguruku.png"></image>
          <text>轮毂入库</text>
        </view>
        <view class="li"  @click="Jump('/pages/warehouse/hub')">
          <image src="https://tpms.5i84.cn/img/hub/lungu.png"></image>
          <text>轮毂列表</text>
        </view>
        <view class="li" @click="Jump('/pages/warehouse/hubpicture')">
          <image src="https://tpms.5i84.cn/img/hub/lunguzhuangxie.png"></image>
          <text>轮毂装卸</text>
        </view>
      </view>
    </view>

    <view class="box">
      <view class="title">仓库管理</view>
      <view class="ul">
        <!-- <view class="li" @click="Jump('/pages/mine/inventory')">
          <image src="https://tpms.5i84.cn/img/hub/kucunchaxun.png"></image>
          <text>库存查询</text>
        </view> -->
        <view class="li" @click="Jump('/pages/warehouse/Allocate')">
          <image src="https://tpms.5i84.cn/img/hub/luntaidiaobo.png"></image>
          <text>轮胎调拨</text>
        </view>
        <view class="li" @click="Jump('/pages/warehouse/warehouse')">
          <image src="https://tpms.5i84.cn/img/hub/cnagkushezhi.png"></image>
          <text>仓库设置</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      Jump(e) {
        uni.navigateTo({
          url: e
        })
      }
    }
  }
</script>

<style>
  .content {
    background: linear-gradient(180deg, #DBEAFF 0%, #F5F7FB 100%);
    height: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .box {
    width: 710upx;
    background-color: white;
    border-radius: 20upx;
    margin-top: 20upx;
    padding: 24upx 30upx 32upx 30upx;
    box-sizing: border-box;
  }

  .title {
    font-size: 32upx;
    margin-bottom: 42upx;
  }

  .ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
  }

  .li {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    width: calc(100% / 4);
    font-size: 24upx;
    margin-bottom: 22upx;
    margin-top: 14rpx;
  }

  .li image {
    width: 66upx;
    height: 66upx;
    margin-bottom: 20rpx;
  }
</style>