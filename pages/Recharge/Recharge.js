
const DB = wx.cloud.database().collection("pay")
Page({
  data: {
    money:0,
    password:0,
  },
  //获取充值的金额
  getInputValue(e){
    this.setData({
      money:e.detail.value
    })
  },

  getPassword(e){
    this.setData({
      password:e.detail.value
    })
  },
  payOk(){
    var that = this.data.password
    var money = this.data.money
    DB.get({
      success(res){
        if(res.data[0].password==that){

          DB.doc('c54bd3a25f7dc8950102482e07ae6ff2').get().then(res => {
            var remainMoney = parseFloat(res.data.yue)
            DB.doc('c54bd3a25f7dc8950102482e07ae6ff2').update({
              data:{
                yue:parseFloat(money) + remainMoney
              },
            })
            console.log("账户余额:"+remainMoney)})
          wx.reLaunch({
            url: '/pages/index/index',
            })
        }
        else{
          console.log("失败")
          wx.showToast({
            title: '支付密码错误',
            icon:'loading',
            duration: 2000
          })
        }
      }
    })
   
    // DB.doc('oTRJo5BWfD7P9xnLuB9_7U1tIbx0').update({
    //   data:{
    //     pay:this.data.money
    //   },
    //   success(res){
    //     console.log("支付成功",res)
    //   }
    // })
  },
  
})