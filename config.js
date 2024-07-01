// 应用全局配置
module.exports = {
   baseUrl: 'http://27.155.120.108/tireapi',
  // baseUrl: 'https://tpms.5i84.cn/tireapi',
  // baseUrl: 'http://192.168.110.77:38087',
  // baseUrl: 'https://tpms.5i84.cn/tireapi',
  
  
  
  // gps嵌入域名
  gpsDomain: 'http://27.155.120.108/tire/',
  // gpsDomain: 'https://tpms.5i84.cn/tire/',
  // gpsDomain: 'http://192.168.110.39:80/tire/',
  
  
  
  // 图片域名
  imgDomain: 'https://tpms.5i84.cn',
  // 应用信息
  appInfo: {
    // 应用名称
    name: "ruoyi-app",
    // 应用版本
    version: "1.1.0",
    // 应用logo
    logo: "/static/logo.png",
    // 官方网站
    site_url: "http://ruoyi.vip",
    // 政策协议
    agreements: [{
        title: "隐私政策",
        url: "https://tpms.5i84.cn/tire/xy/ysxy.htm"
      },
      {
        title: "用户服务协议",
        url: "https://tpms.5i84.cn/tire/xy/fwxy.htm"
      }
    ]
  }
}