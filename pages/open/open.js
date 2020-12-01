// pages/open.js

const DB = wx.cloud.database().collection("pay")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money: 100,
    money1: 0,
    money2: 0,
    money_last:0,
    thisbottle: 0,
    api_url: "http://192.168.0.108:8000",
    // file1Path: '/open.wxml' 
  },

  //支付金额
  payMoney() {
    var that = this
    wx.request({
      name: 'content',
      url: 'http://192.168.0.108:8000/remainBottle',
      success: function (res) {
        console.log("关门时有" + res.data + "瓶饮料")
        that.setData({
          money2: 2 * parseFloat(res.data),
        })

        that.data.money_last = that.data.money1 - that.data.money2
        that.setData({
          thisbottle: that.data.money_last / 2
        })
        console.log("本次消费" + that.data.money_last / 2 + "瓶饮料")
        console.log("本次消费" + that.data.money_last + "元")
        DB.doc('c54bd3a25f7dc8950102482e07ae6ff2').get().then(res => {
          var remainMoney = parseFloat(res.data.yue)
          DB.doc('c54bd3a25f7dc8950102482e07ae6ff2').update({
            data: {
              // yue: remainMoney - parseFloat(that.data.money)
              yue: remainMoney - parseFloat(that.data.money_last),
              thisbottle: String(that.data.thisbottle)

            },

          })
        })
        if (res) {

          wx.reLaunch({
            url: '/pages/my/my',
          })
          wx.showModal({
            cancelColor: 'cancelColor',
            title:"购买成功",
            content: '本次消费' + that.data.thisbottle + '瓶水，共计'+that.data.money_last+'元~~',
          })
        }
      },
      fail: function () {
        console.log("购物失败")
      }

    })



  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    DB.doc('c54bd3a25f7dc8950102482e07ae6ff2').get({
      success: res => {
        // console.log(res.data.yue+"")
        //如果余额不足以支付一瓶水，开门失败
        if (res.data.yue < 2) {
          wx.reLaunch({
            url: '/pages/my/my',
          })
          wx.showModal({
            cancelColor: 'cancelColor',
            title: "开门失败",
            content: '余额不足，请充值后再尝试开门~~',
          })
        }

      }
    })

    console.log('***************sss')
    var that = this
    wx.request({
      name: 'content',
      url: 'http://192.168.0.108:8000/remainBottle',
      success: function (res) {
        console.log("开门时有" + res.data + "瓶饮料")
        that.setData({
          money1: 2 * parseFloat(res.data)
        })
      },
      fail: function () {
        console.log("购物失败")
      }

    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})