// pages/pay/pay.js
const app = getApp();
const API = getApp().globalData.API;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    that.setData({
      id: options.orderId
    })
    

  },

 //支付
 payOrder: function() {
   const that = this;
   const id = that.data.id;
   wx.showLoading({
     title: '正在支付',
   })
   //第一步 根据id获取到整个订单对象
   wx.request({
     url: API + "/api/orders/" + id,
     header: {
       Authorization: 'Bearer' + app.globalData.token
     },
     method: 'GET',
     success: function (res) {
       let order_data = res.data.data;
       //第二步 将订单对象的订单状态修改为20（待确认)
       order_data.state = 20;
       //第三步 把修改订单状态后的订单对象传会给后台，更新数据
       wx.request({
         url: API + "/api/orders/",
         header: {
           Authorization: 'Bearer' + app.globalData.token
         },
         method: 'POST',
         data: order_data,
         success: function (res) {
           wx.hideLoading();
           wx.showModal({
             title: '成功提示',
             content: '支付成功！',
             showCancel: false,
             success: function (res) {
               if (res.confirm) {
                 //跳转到订单页面
                 wx.switchTab({
                   url: '../orders/orders'
                 })
               }
             }
           })
         }
       })
     }
   })
 },

 //取消订单
 cancelOrder: function () {
   const that = this;
   const id = that.data.id;
   wx.showLoading({
     title: '正在取消订单',
   })
   //第一步 根据id获取到整个订单对象
   wx.request({
     url: API + "/api/orders/" + id,
     header: {
       Authorization: 'Bearer' + app.globalData.token
     },
     method: 'GET',
     success: function (res) {
       let order_data = res.data.data;
       //第二步 将订单对象的订单状态修改为1（已关闭),处理人改成用户名称
       order_data.state = 1;
       const userId = order_data.owner.id;
       order_data.processor = { id: userId}; 
       //第三步 把修改订单状态后的订单对象传会给后台，更新数据
       wx.request({
         url: API + "/api/orders",
         header: {
           Authorization: 'Bearer' + app.globalData.token
         },
         method: 'POST',
         data: order_data,
         success: function (res) {
           wx.hideLoading();
           wx.showModal({
             title: '成功提示',
             content: '取消订单成功！',
             showCancel: false,
             success: function (res) {
               if (res.confirm) {
                 //跳转到订单页面
                 wx.switchTab({
                   url: '../orders/orders'
                 })
               }
             }
           })
         }
       })
     }
   })
 }
})