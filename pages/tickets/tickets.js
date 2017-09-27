// pages/tickets/tickets.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: true,
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
    cardPack: [
      {
        id: 1,
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    //第一步： 决定优惠券的样式
    const tickets = that.data.tickets;
    const cardPack = that.data.cardPack;
    for (let i = 0; i < cardPack.length; i++) {
      let ticket = tickets.find(o => o.id === cardPack[i].id);
      let index = tickets.findIndex(o => o.id === cardPack[i].id);
      if(ticket){
        ticket.has = true;
        tickets[index] = ticket;
      }
    }
    that.setData({
      tickets: tickets
    })
  },

  //领取优惠券
  addTicket: function(e){
    const that = this;
    const ticket = e.currentTarget.dataset;
    const cardPack = that.data.cardPack;
    let tickets = that.data.tickets;
    let index = tickets.findIndex(o => o.id === ticket.id);
    let flag = false;
    //1.判断是否有这张优惠券
    if(cardPack.length) {
      for (let i = 0; i < cardPack.length; i++){
        //1-1.如果有，提示已经有了这张优惠券啦，改变样式
        if (cardPack[i].id === ticket.id) {
          flag = true;
          break;
        }
      }
    }
    //1-2.如果没，把这张优惠券加入到用户的卡包中，改变样式，弹窗提示
    if (!flag) {
      cardPack.push(ticket);
      tickets[index].has = true;
      wx.showModal({
        title: '领取成功',
        content: '是否立刻去挑选商品？',
        confirmText: '去购物',
        success: function (res) {
          if (res.confirm) {
            wx.redirectTo({
              url: '../products/products'
            })
          }
        }
      })
    }
    that.setData({
      tickets: tickets,
      cardPack: cardPack
    })
  },




})