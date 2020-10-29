//index.js
const DB = wx.cloud.database().collection("pay")
const app = getApp()

Page({
  data:{
     //tabbar
     money: ''

  
  },


onLoad: function (options) {
  app.editTabbar();
  DB.doc('c54bd3a25f7dc8950102482e07ae6ff2').get({
    success: res => {
      console.log(res.data.yue)
      // app.globalData.money.push(res.data.yue)
      this.setData({
        money:res.data.yue
      })
    }
  })
},

})
