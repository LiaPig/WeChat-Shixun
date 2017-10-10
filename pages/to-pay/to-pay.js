// pages/to-pay/to-pay.js
const app = getApp();
const API = getApp().globalData.API;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 购物车对象
    cartObjects: null,
    // 用来显示的订单详情对象
    orderItem: {
      products: null,
      price: null
    },
    // 用来交互的进一步封装的订单对象
    order: {
      orderItems: [],
      price: null,
      description: null,
      owner: {
        id: null
      },
      processor: null,
      finishedTime: null,
      status: 1,
      state: 10
    },

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    let order = that.data.order;
    const cartObjects = JSON.parse(options.cartObjects);
    let orderItem = that.data.orderItem;
    orderItem.products = cartObjects;

    //第二步，计算总价
    let price = 0;
    for (let i = 0; i < cartObjects.length; i++) {
      price += cartObjects[i].price * cartObjects[i].quantity;
    }
    order.price = price.toFixed(2);
    orderItem.price = order.price;

    that.setData({
      cartObjects: cartObjects,
      order: order,
      orderItem: orderItem
    })
    console.log(that.data.cartObjects)
  },

  // 获取备注description的值
  getDescription: function (e) {
    const that = this;
    // 获取值
    const description = e.detail.value;
    // 将值设置在order对象中
    let order = that.data.order;
    order.description = description;
    that.setData({
      description: description
    })
  },

  // 确认订单按钮
  confirmOrder: function () {
    const that = this;
    let order = that.data.order;
    const cartObjects = that.data.cartObjects;
    // 第一步 set order.orderItems
    for (let i = 0; i < cartObjects.length; i++) {
      let item = {
        product: {
          id: null
        },
        tagOptions: [],
        price: null,
        count: null
      };
      // id
      item.product.id = cartObjects[i].id;
      console.log(cartObjects[0].productTags)
      // tagOptions
      for (let j = 0; j < cartObjects[i].productTags.length; j++) {
        let tagOption = { 
          id: null,
          value:null,
          optionName:null,
          type:null };
        tagOption = cartObjects[i].productTags[j];
        item.tagOptions.push(tagOption);
        console.log(item.tagOptions)
      }
      // price
      item.price = cartObjects[i].price;
      // count
      item.count = cartObjects[i].quantity;

      order.orderItems.push(item);
    }
    // 第二步 set order.owner
    wx.request({
      url: API + "/api/users/me",
      header: {
        Authorization: 'Bearer' + app.globalData.token
      },
      method: 'GET',
      success: function (res) {
        order.owner = res.data.data;
        // 开始交互
        wx.showLoading({
          title: '正在提交订单',
        })
        wx.request({
          url: API + "/api/orders",
          header: {
            Authorization: 'Bearer' + app.globalData.token
          },
          method: 'POST',
          data: order,
          success: function (res) {
            const orderId = res.data.data.id;
            if (res.data.success) {
              wx.hideLoading();
              wx.showModal({
                title: '成功提示',
                content: '下单成功！',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    wx.redirectTo({
                      url: '../pay/pay?orderId=' + orderId
                    })
                  }
                }
              })
            } else {
              wx.hideLoading();
              wx.showModal({
                title: '失败提示',
                content: res.data.message,
                showCancel: false
              })
            }
          }
        })
      }
    })
  }
})