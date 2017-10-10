// pages/order/order.js
const app = getApp();
const API = getApp().globalData.API;


Page({

  /**
   * 页面的初始数据
   */
  data: {
   orders: []
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    // 第一步，请求获取个人所有订单
    wx.request({
      url: API + "/api/my/orders",
      header: {
        Authorization: 'Bearer' + app.globalData.token
      },
      success: function (res) {
        if(res.data.success){
          const orders = res.data.data.content;
          that.setData({
            orders: orders
          })
        }
      }
    })
  },

  goToDetail: function(e){
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../order-detail/order-detail?id=' + id,
    })
  },

})