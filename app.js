//app.js
App({
  onLaunch: function () {
    //云环境初始化
    wx.cloud.init({
      env:"admin-4gpl7qvb353d8d23",
    })
    // 隐藏系统tabbar
    wx.hideTabBar();

    // 获取设备信息
    this.getSystemInfo();
  },
  onShow: function () {
    //隐藏系统tabbar
    wx.hideTabBar();
  },

  getSystemInfo: function () {
    let t = this;
    wx.getSystemInfo({
      success: function (res) {
        t.globalData.systemInfo = res;
      }
    });
  },

  editTabbar: function () {
    let tabbar = this.globalData.tabBar;
    let currentPages = getCurrentPages();
    let _this = currentPages[currentPages.length - 1];
    let pagePath = _this.route;
    (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
    for (let i in tabbar.list) {
      tabbar.list[i].selected = false;
      (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
    }
    _this.setData({
      tabbar: tabbar
    });
  },

  globalData: {
    userInfo: null,
    
    tabBar:{
      "backgroundColor": "#ffffff",
      "color": "#CCCCCC",
      "selectedColor": "#CC0000",
    "list": [
      {
        "pagePath": "/pages/index/index",
        "iconPath": "icon/index.png",
        "selectedIconPath": "icon/index.png",
        "text": "首页"
      },
      {
        "pagePath": "/pages/open/open",
        "iconPath": "icon/icon_release.png",
        "isSpecial": true,
        "text": "扫码/开门"
      },
      {
        "pagePath": "/pages/my/my",
        "iconPath": "icon/me.png",
        "selectedIconPath": "icon/me.png",
        "text": "我的"
      },
    ]
  }
  }
})