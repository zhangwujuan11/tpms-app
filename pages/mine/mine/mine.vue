<template>
	<view>
		<view class="menu-list">
			<view class="list-cell list-cell-arrow" >
			   <view class="menu-item-box">
			     <view class="text">头像</view>
					<image @click="changeimg" v-if="form.avatar && basurl" :src="basurl+form.avatar" style="width: 140rpx;height: 140rpx;margin-left:20rpx;color: #CCCCCC;"></image>
					<image @click="changeimg" v-else src="@/static/user.png" style="width: 140rpx;height: 140rpx;margin-left:20rpx;color: #CCCCCC;"></image>
			   </view>
			 </view>
			<view class="list-cell list-cell-arrow" >
			  <view class="menu-item-box">
			    <view class="text">登录名</view>
				{{form.userName}}
			  </view>
			</view>
		  <view v-if="form.dept" class="list-cell list-cell-arrow">
		    <view class="menu-item-box">
		      <view class="text">所属组织</view>
			  {{ form.dept.deptName }}
		    </view>
		  </view>
		  <view class="list-cell list-cell-arrow">
		    <view class="menu-item-box">
		      <view class="text">手机号</view>
			  {{form.phonenumber}}
		    </view>
		  </view>
		</view>
		
		
		<u-popup 
		:show="show" 
		@close="close" 
		@open="open" 
		mode="center" 
		:customStyle="{
			'width':'80%',
			'height':'500rpx'
		}"
		:round="10">
			<view class="uplod">
				<view class="spann">
					上传新头像
				</view>
			</view>
		</u-popup>

	</view>
</template>

<script>
	import config from '@/config'
	import { user, uplodatav } from "@/api/tirePressure.js"
	import { option } from '@/api/tirePressure'
	import Mineacver from '@/components/avatar/index.vue'
	export default {
		data() {
			return {
				 form: {},
				 optionlist:[],
				 basurl:'',
				 fileList1:[],
				  show: false,
			}
		},
		mounted() {
			this.basurl=config.baseUrl
			user().then(res=>{
				this.form = res.data
			})
			option().then(res=>{
				let assay=[]
				res.data.map(item=>{
					assay.push({"deptName":item.deptName,"deptId":item.deptId})
				})
				this.optionlist=assay
			})
		},
		onBackPress(e) {
				uni.reLaunch({
					url: '/pages/mine/index'
				});
				return true;
			},
		onUnload() {
		    //#ifdef MP-WEIXIN
		    wx.reLaunch({
		      url: '/pages/mine/index'
		    })
		    //#endif
		  },
		methods: {
			close() {
			  this.show = false
			},
			depfun(row){
				 var typelable = '';
				for (var i = 0; i < this.optionlist.length; i++) {
					if (row === this.optionlist[i].deptId) {
						typelable =  this.optionlist[i].deptName;
					}
				}
				return typelable;
			},
			// 新增图片
			async afterRead(event) {
				console.log(event)
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
			      url: `${config.baseUrl}/common/upload`, 
			      filePath: url,
			      name: "file",
			      formData: {
			        user: "test",
			      },
			      header: {
			        Authorization: "Bearer " + uni.getStorageSync("App-Token"),
			      },
			      success: (res) => {
					  console.log(res)
			        if (JSON.parse(res.data).code == 200) {
			          setTimeout(() => {
			            resolve(JSON.parse(res.data).url);
			          }, 1000);
			        }
			      },
			    });
			  });
			},
			// 删除图片
			deletePic(event) {
			  this[`fileList${event.name}`].splice(event.index, 1);
			},
			changeimg(){
				uni.navigateTo({
				  url: '/pages/mine/avatar/index'
				})
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
  height: 100%;


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
  margin-top: 26rpx;
}


.menu-item-box {
  width: 100%;
  height: 150rpx;
  display: flex;
  align-items: center;
  padding: 0 30rpx;
  justify-content: space-between;
  box-sizing: border-box;
}

.text {
  font-size: 32rpx;
  font-family: AppleSystemUIFont;
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
.uplod{
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	height: 100%;
}
.uplod .spann{
	margin: 50rpx 0;
}
</style>
