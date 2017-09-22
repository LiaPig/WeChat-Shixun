// pages/order-detail/order-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {
      id: 1234,
      status: "已完成",
      products: [
        {
          id: 1,
          title: "卖萌猪崽",
          size: [
            {
              id: 1,
              name: "1kg",
              value: "1"
            },
            {
              id: 2,
              name: "A类",
              value: "A"
            }
          ],
          quantity: 2,
          price: 10.11
        },
        {
          id: 2,
          title: "大头猪崽",
          size: [
            {
              id: 1,
              name: "5kg",
              value: "5"
            },
            {
              id: 2,
              name: "B类",
              value: "B"
            }
          ],
          quantity: 1,
          price: 12.13
        },
        {
          id: 2,
          title: "大头猪崽",
          size: [
            {
              id: 1,
              name: "5kg",
              value: "5"
            },
            {
              id: 2,
              name: "B类",
              value: "B"
            }
          ],
          quantity: 1,
          price: 12.13
        },
      ],
      count: 99.99,
      time: "2017-9-21 16:18"
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    console.log(option.id)
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