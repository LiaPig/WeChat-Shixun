// pages/tickets/tickets.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tickets: [
      {
        id: 1,
        price: 0.01,
        description: "便宜你一分钱哦,开心吗",
      },
      {
        id: 2,
        price: 0.02,
        description: "便宜你两分钱哦",
      },
    ],
    aaa:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  //领取优惠券
  addTicket: function(e){
    //判断是否有这张优惠券
    //1.如果有，提示已经有了这张优惠券啦，改变样式
    //2.如果没，把这张优惠券加入到用户的卡包中，改变样式
    const id = e.currentTarget.dataset;
    console.log(id);
  }
})