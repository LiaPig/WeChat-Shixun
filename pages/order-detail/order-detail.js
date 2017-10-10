// pages/order-detail/order-detail.js
const app = getApp();
const API = getApp().globalData.API;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    const that = this;
    // 第一步，请求获取个人所有订单
    wx.request({
      url: API + "/api/orders/" + option.id,
      header: {
        Authorization: 'Bearer' + app.globalData.token
      },
      success: function (res) {
        console.log(res)
        if (res.data.success) {
          const order = res.data.data;
          that.setData({
            order: order
          })
        }
        console.log(that.data.order)
      }
    })
  },

  //去支付或取消页面
  goToPay: function () {
    const orderId = this.data.order.id;
    wx.redirectTo({
      url: '../pay/pay?orderId=' + orderId
    })
  }
})