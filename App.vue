<script>
  import config from './config'
  import store from '@/store'
  import { getToken } from '@/utils/auth'
  export default {
    onLaunch: function() {
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
