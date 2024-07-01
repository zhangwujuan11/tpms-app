<script>
  import config from './config'
  import store from '@/store'
  import { getToken } from '@/utils/auth'
  export default {
    onLaunch: function() {
    // #ifdef MP
		const updateManager = uni.getUpdateManager();
		updateManager.onCheckForUpdate(function(res) {
			// 请求完新版本信息的回调
		});

		updateManager.onUpdateReady(function(res) {
			uni.showModal({
				title: '更新提示',
				content: '新版本已经准备好，是否重启应用？',
				success(res) {
					if (res.confirm) {
						// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
						updateManager.applyUpdate();
					}
				}
			});
		});

		updateManager.onUpdateFailed(function(res) {
			// 新的版本下载失败
		});
		// #endif

      this.initApp()
    },
    methods: {
      // 初始化应用
      initApp() {
        // 初始化应用配置
        this.initConfig()
        // 检查用户登录状态
        //#ifdef H5
        this.checkLogin()
        //#endif
      },
      initConfig() {
        this.globalData.config = config
      },
      checkLogin() {
        if (!getToken()) {
          uni.reLaunch({url:'/pages/login'}) 
        }
      },
    },
  }
</script>
<style>
	/* @import url("~@/static/iconfont/iconfont.css"); */
</style>
<style lang="scss">
	@import './common/uni.css'; 
	@import 'uni_modules/uview-ui/index.scss';
	page{
		background-color: #F5F7FB;
		color: #010914;
		font-size: 32upx;
	}
</style>
