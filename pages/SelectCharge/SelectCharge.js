// pages/SelectCharge/SelectCharge.js

const DB = wx.cloud.database().collection("pay")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex:0,//默认选中第一个
    activeDefine:false,
    numArray:[5, 10, 15, 20, 30, 50, 100],
    isFocus: false,//控制input 聚焦
    balance:100,//余额
    actual_fee:20,//待支付
    wallets_password_flag:false,//密码输入遮罩
    money:5,
    wallets_password:0,
  },
  getInputValue(e){
    this.setData({
      money:e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  set_wallets_password(e) {//获取钱包密码

    this.setData({
  
     wallets_password: e.detail.value
  
    });
  
    if (this.data.wallets_password.length == 6) {//密码长度6位时，自动验证钱包支付结果
  
     wallet_pay(this)
  
    }
  
   },
  
   set_Focus() {//聚焦input
  
    console.log('isFocus', this.data.isFocus)
  
    this.setData({
  
     isFocus: true
  
    })
  
   },
  
   set_notFocus() {//失去焦点
  
    this.setData({
  
     isFocus: false
  
    })
  
   },
  
   close_wallets_password () {//关闭钱包输入密码遮罩
  
    this.setData({
  
     isFocus: false,//失去焦点
  
     wallets_password_flag: false,
  
    })
  
   },
   pay() {//去支付

    pay(this)
  
   },
  
  
  activethis:function(event){//点击选中事件
      var thisindex = event.currentTarget.dataset.thisindex;//当前index
      // console.log(thisindex)
      console.log(this.data.numArray[thisindex])
      this.setData({
        activeIndex:thisindex,
        activeDefine: false,
        money:String(this.data.numArray[thisindex])
      })
  },
  activethat:function(event){
    var that = this;
    var thatindex = event.currentTarget.dataset.thatindex;
    this.setData({
      activeDefine: true,
      activeIndex: -1,
      money: 0
    })
  } 

})
function pay(_this) {
  _this.setData({
 
    wallets_password_flag: true,
 
    isFocus: true
 
   })
 
 }
 // 钱包支付

function wallet_pay(_this) {

  console.log('钱包支付请求函数')
 
  /*
 
  1.支付成功
 
  2.支付失败：提示；清空密码；自动聚焦isFocus:true，拉起键盘再次输入
 
  */
 
 var that = _this.data.wallets_password
 var money = _this.data.money
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

 
 }