// pages/my/my.js
const DB = wx.cloud.database().collection("pay")
const app = getApp()
var openid = wx.getStorageSync("openid")
Page({

  /**
   * 页面的初始数据
   */
  data:{
    showButton: true,
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    hasUserInfo: openid == "",
    takeSession: false,
    requestResult: '',
   money:"",
 },
 doAuthorization: function(e) {
  var that = this;
  console.log("调用了 doAuthorization 授权");
  // console.log(e);
  if (e.detail.userInfo == null) { //为null  用户拒绝了授权
    //coding。。。。
    console.log("用户拒绝授权");
  } else {
    //授权
    wx.login({
      success: function(res) {
        console.log('login:code', res.code)
        //发送请求
        wx.request({
          url: app.globalData.userInterfaceUrl + 'record/' + res.code, //接口地址
          method: 'GET',
          header: {
            'content-type': 'application/json' //默认值
          },
          success: function(res) {
            console.log("record  成功", res.data)
            var res = res.data;
            if (res.error) { //发生错误
              console.log("错误：", res.msg);
            } else { //返回成功
              try {
                wx.setStorageSync('openid', res.data.openid)
                openid = wx.getStorageSync("openid");
              } catch (e) {
                console.log("wx.login 错误", e);
              }
              //加载用户信息
              that.loadUserInfo();
              that.setData({ //设置变量
                hasUserInfo: false
              });
            }
          },
        })
      }
    })
  }

},
loadUserInfo: function() {
  var that = this;
  if (openid != "") {
    wx.getUserInfo({
      success: res => {
        console.log("wx获得用户信息:", res);
        var data = {
          "openid": openid,
          "user": res.userInfo
        }
        //发送信息给服务器获得用户信息
        wx.request({
          url: app.globalData.userInterfaceUrl + 'login',
          dataType: "json",
          method: "POST",
          data: data,
          success: function(res) {
            console.log("loadUserInfo（服務器返回） success", res.data);
            if (!res.data.error) {
              app.globalData.userInfo = res.data.data;
              that.setData({
                userInfo: app.globalData.userInfo
              })
            } else {
              console.log("服务器获取用戶信息失敗");
              //TODO：用户信息获取错误
            }
          },
          fail: function(e) {
            console.log("loadUserInfo（服务器返回）error", e);
            //TODO:错误
          },
          complete: function(e) {
            //完成
          }
        })
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res)
        }
      }
    })
  }
},

// 事件处理函数
bindViewTap: function() {
  wx.navigateTo({
    url: '../logs/logs'
  })
},
onShow: function() {
  var that = this;
  console.log("openid:", openid);
  that.loadUserInfo();
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    showView: (options.showButton == "true" ? true : false)
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
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo,
                showButton: false,
              })
              // console.log(res.)
            }
          })
        }
      }
    })
  },
  change: function(){
    var that = this;
    that.setData({
      showButton : (!that.data.showButton)
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