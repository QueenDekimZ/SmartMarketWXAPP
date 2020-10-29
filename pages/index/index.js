//index.js
const DB = wx.cloud.database().collection("pay")
const app = getApp()

//添加数据
Page({
data:{
   //tabbar
   tabbar: {},
   money:0,
},
 getData(){
   var that = this
   DB.get({
     success(res){
       console.log(res.data[0].yue)
       that.setData({
         money:res.data[0].yue
       })
     }
   })
 },

 onShow: function () {
  //隐藏系统tabbar
  wx.hideTabBar();
},
//  addData(){
//    DB.add({
//      data:{
//        username:"test",
//        pay:4111
//      },
//      success(res){
//        console.log("添加成功",res)
//      },
//      fail(res){
//        console.log("添加失败",res)
//      }
//    })
//  },
//  //查询数据
//  getData(){
//    DB.get({
//      success(res){
//        console.log("查询数据成功",res)
//      }
//    })
//  },
 //支付金额
//  payMoney(){
//    var that = this
//   //  that.data.money = that.data.money-10
//    DB.doc('c54bd3a25f7dc8950102482e07ae6ff2').get().then(res => {
//     var remainMoney = parseFloat(res.data.yue)
//     DB.doc('c54bd3a25f7dc8950102482e07ae6ff2').update({
//       data:{
//         // yue: remainMoney - parseFloat(that.data.money)
//          yue: remainMoney - 10
//       },
//       success(res){
//       this.setData({
//         money: yue
//       }),
//       console.log("支付成功",res)
    
//     console.log("账户余额:"+remainMoney)
//       }
//    })
//   })
// },

  //  DB.doc('c54bd3a25f7dc8950102482e07ae6ff2').update({
  //    data:{
  //      pay:this.data.money
  //    },
  //    success(res){
  //      that.setData({
  //        money:that.data.money
  //      }),
  //      console.log("支付成功",res)

  //    }
  //  })
 
 Recharge(){
   //先判断是否存在密码
   DB.doc('c54bd3a25f7dc8950102482e07ae6ff2').get({
    success(res){
      if(res.password===""){
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }else{
        wx.navigateTo({
          url: '/pages/Recharge/Recharge',
          })
      }
    }
  })
  
 },

//  充值，打开相机扫码，获取二维码信息
//  Recharge(){
//   var _this = this;
//   wx.scanCode({        //扫描API
//     success: function(res){
//       console.log(res);    //输出回调信息
//       _this.setData({
//         qRCodeMsg: res.result
//       });
//       wx.showToast({
//         title: '成功',
//         duration: 2000
//       })
//     }
//   })
//  },
onLoad: function (options) {
  app.editTabbar();
},

})
