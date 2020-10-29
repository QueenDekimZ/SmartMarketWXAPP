const DB = wx.cloud.database().collection("pay")

Page({
  data:{
    NewChanges: '',
    NewChangesAgain: '',
    success: false,
    state: ''
  },
  handleNewChanges: function (e) {
    this.setData({
      NewChanges: e.detail.value
    })
  },
  handleNewChangesAgain: function (e) {
    this.setData({
      NewChangesAgain: e.detail.value
    })
  },
  submit: function (e) {
    var that = this
    if (this.data.NewChangesAgain != this.data.NewChanges) {
      wx.showToast({
        title: '两次密码不一致',
        icon:'none',
        duration: 2000
      })
      return
    } else {
      wx.showToast({
        title: '设置密码成功',
        icon:'success',
        duration: 2000
      })
      //数据库修改密码
      DB.doc('c54bd3a25f7dc8950102482e07ae6ff2').update({
        data:{
          password:this.data.NewChanges,
        },
      })

      setTimeout(function(){
        wx.reLaunch({
          url: '/pages/index/index',
          })
      },1000
      )
      
       
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})