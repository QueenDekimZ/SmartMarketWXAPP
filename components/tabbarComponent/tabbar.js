// tabBarComponent/tabBar.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabbar: {
      type: Object,
      value: {
        "backgroundColor": "#ffffff",
        "color": "#979795",
        "selectedColor": "#1c1c1b",
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
            "iconPath": "icon/tab4.png",
            "selectedIconPath": "icon/tab4-active.png",
            "text": "我的"
          },
    
        ]
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isIphoneX: app.globalData.systemInfo.model.search('iPhone X') != -1 ? true : false
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
