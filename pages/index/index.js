//index.js
const datou = getApp().globalData.datou;
//获取应用实例
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    // 是否显示面板指示点
    indicatorDots: true,
    // 是否自动切换
    autoplay: true,
    // 自动切换时间间隔
    interval: 5000,
    // 滑动动画时长
    duration: 1000
  },

  onLoad: function(){
    const that = this;
    //第一步，显示loading
    wx.showLoading({
      title: '加载中',
    })
    //第二步，获取轮播图
    wx.request({
      url: datou + "/api/images?type=swiper&sort=sort,desc",
      success: function (res) {
        const pics = res.data.data.content;
        const imgUrls = [];
        for (let i = 0; i < pics.length; i++) {
          imgUrls.push(pics[i].url)
        }
        that.setData({
          imgUrls: imgUrls
        })
        wx.hideLoading()
      }
    })
  },

  //跳转到商品页面
  goToShop: function(){
    wx.navigateTo({
      url: '../products/products',
    })
  },
  //跳转到领券页面
  goToTickets: function(){
    wx.navigateTo({
      url: '../tickets/tickets',
    })
  }
})