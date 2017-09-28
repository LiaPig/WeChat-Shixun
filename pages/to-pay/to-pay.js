// pages/to-pay/to-pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartObjects: null,
    order: {
      id: null,
      status: "等待卖家制作",
      products: null,
      count: null,
      time: null,
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    const cartObjects = JSON.parse(options.cartObjects);
    let order = that.data.order;
    order.products = cartObjects;
    //第二步，计算总价
    let count = 0;
    for(let i = 0; i < cartObjects.length; i++){
      count += cartObjects[i].price * cartObjects[i].quantity;
    }
    order.count = count.toFixed(2);
    that.setData({
      cartObjects: cartObjects,
      order: order,
    })
    console.log(cartObjects)
  },

  bindTextBlur: function(e){
    console.log(e.detail.value);
  }
})