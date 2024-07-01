<template>
  <view>
    <view>
      <view class="top"
        style="margin-top:20rpx;background-color: #fff;width: 100%;width: 710rpx;height: 76rpx;border-radius: 180rpx;margin-left: 20rpx;">
        <u-input placeholder="请输入仓库名称" prefixIcon="search" v-model="searchtext" prefixIconStyle="font-size: 50rpx"
          @blur="search" />
      </view>
    </view>
    <view style="padding-bottom: 150rpx;"  v-if="list && list.length > 0">
      <view class="card" v-for="(item,i) in list" :key="i">
        <image src="https://tpms.5i84.cn/img/images/warehouse/house.png"
          style="width: 140upx;height: 140upx;margin-left:20upx;" @click="detail(item.id)"></image>
        <view style="margin-left:24upx;width: 440rpx;" @click="detail(item.id)">
          <view class="bigtxt">{{item.warehouseName}}</view>
        </view>
        <u-icon name="trash" color="#FF623A" size="28" @click="del(item)"></u-icon>
      </view>
        <view v-show="is_show" style="text-align: center; width: 100%;margin:50rpx 0;">没有更多数据了</view>
    </view>
    <view
      v-else
      style="
        width: 100%;
        padding: 50rpx 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #666666;
      "
    >
      <image src="@/static/images/nodata.png"></image>
      暂无数据
    </view>

    <view style="position: fixed;bottom: 0;width: 100%;height: 148rpx;background-color: #fff;line-height: 148rpx;">
      <view class="btn" @click="open">新增仓库</view>
    </view>

    <u-popup :show="show" background-color="#fff" mode="center" round="10">
      <view class="add" style="width: 640rpx;height: 460rpx;padding-left: 40rpx;position: relative;">
		  <image src="https://tpms.5i84.cn/img/images/warehouse/close.png" @click="close"
		    style="position: absolute;right: 0upx;top:-65rpx;width: 60upx;height: 62upx;"></image>
        <view style="text-align: center;font-size: 36upx; height: 134rpx;width: 640rpx;line-height: 134rpx;">
          新增仓库
        </view>
        <view>
          <text style="color:red">*</text>仓库名称
          <u--input placeholder="请输入仓库名称" v-model="form.warehouseName"></u--input>
        </view>
        <view class="button" @click="submit">确定</view>
      </view>
    </u-popup>
  </view>
</template>

<script>
  import {
    getWarehouseList,
    addWarehouse,
    Detail,
    update,
    delwarehouse
  } from '@/api/warehouse.js'
  import {
    toast,
  } from '@/utils/common'
  export default {
    data() {
      return {
        list: [],
        queryForm: {
          companyName: "",
          pageNum: 1,
          pageSize: 10,
          warehouseName: ""
        },
        total: 0,
        searchtext: '',
        form: {
          warehouseName: '',
          warehouseType: '1',
          sysUserid: "1"
        },
        show: false,
        is_show: false,
      }
    },
    onLoad() {
      this.getWarehouse()
    },
    onReachBottom() { //触底事件
      if (this.queryForm.pageNum * this.queryForm.pageSize >= this.total) {
        this.is_show = true;
      } else {
        if (this.queryForm.pageNum <= this.queryForm.pageNum - 1) {
          setTimeout(() => {
            uni.hideLoading()
          }, 500)
        } else {
          uni.showLoading({
            title: '加载中'
          });
          this.queryForm.pageNum++
          this.is_show = false;
          getWarehouseList(this.queryForm).then(res => {
            if (res.code == 200) {
              this.total = res.data.total
              this.list = [...this.list, ...res.data.items]
            }
          })
        }
        setTimeout(() => {
          uni.hideLoading()
        }, 500)
      }
    },
    methods: {
      getWarehouse() {
        getWarehouseList(this.queryForm).then(res => {
          this.list = res.data.items
          this.total = res.data.total
        })
      },
      search() {
        if (this.searchtext == '') {
          this.getWarehouse()
          return
        } else {
          const newList = this.list.filter((item) => {
            return item.warehouseName.includes(this.searchtext)
          })
          this.list = newList
        }
      },
      async detail(id) {
        const data11 = await Detail(id)
        this.form = data11.data
        this.show = true
      },
      //打开弹出层
      open() {
        this.form = {
          warehouseName: '',
          warehouseType: '1',
          sysUserid: "1"
        }
        this.show = true
      },
      close() {
        this.show = false
      },
      submit() {
        if(!this.form.warehouseName){
          uni.showToast({
            title: '仓库名称不能为空',
            icon: "none",
            duration: 2000,
          });
          return;
        }
        if (this.form.id) {
          update(this.form).then(res => {
            uni.showToast({
              title: '修改成功'
            })
            this.getWarehouse()
            this.close()
          })
        } else {
          if(this.form.maxCount == ''){
            this.form.maxCount = 0;
          }
          if(this.form.minCount == ''){
            this.form.minCount = 0;
          }
          addWarehouse(this.form).then(res => {
            uni.showToast({
              title: '新增成功'
            })
            this.getWarehouse()
            this.close()
          })
        }
      },
      async del(e) {
		  uni.showModal({
		    title: '提示',
		    content: '是否确认删除"' + e.warehouseName + '"仓库？',
		    cancelText: '取消',
		    confirmText: '确定',
			success: (res) => {
				if(res.confirm) {  
					delwarehouse(e.id).then(ress => {
					  if (ress.code == 200) {
						uni.showToast({
						  title: '删除成功'
						})
					  }
					  this.getWarehouse()
					}).catch(err => {
					   toast('仓库有商品,不能删除')
					})
				} else {  
					console.log('cancel') //点击取消之后执行的代码
					}  
				} 
		  })
       
      }
    }
  }
</script>

<style lang="scss" scoped>
  .card {
    display: flex;
    align-items: center;
    width: 710upx;
    height: 184upx;
    margin: 20upx;
    background: #FFFFFF;
    border-radius: 20upx;
    font-size: 24upx;
    color: gray;
  }

  .bigtxt {
    font-size: 32upx;
    color: black;
  }

  .txt {
    margin-top: 14upx;
  }

  .btn {
    width: 690.2rpx;
    height: 88rpx;
    background-color: #1862F5;
    color: white;
    text-align: center;
    line-height: 88rpx;
    margin-top: 30rpx;
    margin-left: 30rpx;
    border-radius: 12rpx;
  }

  /deep/ .u-popup__content {
    border-radius: 0 !important;
    background: #F5F7FB;
  }

  .add /deep/.u-input {
    width: 560rpx;
    height: 60rpx;
    background: #FFFFFF;
    border-radius: 20upx;
    margin-top: 12upx;
    margin-bottom: 28rpx;
  }

  .top /deep/ .u-input {
    border: 0;
  }

  .button {
    width: 600rpx;
    height: 88rpx;
    background-color: #1862F5;
    color: white;
    text-align: center;
    line-height: 88rpx;
    margin-top: 30rpx;
    border-radius: 12rpx;
  }
</style>