//index.js
//获取应用实例
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      "/images/swiper/1.jpg",
      "/images/swiper/2.jpg",
      "/images/swiper/3.jpg"
    ],
    // 是否显示面板指示点
    indicatorDots: true,
    // 是否自动切换
    autoplay: true,
    // 自动切换时间间隔
    interval: 5000,
    // 滑动动画时长
    duration: 1000
  },
  goToShop: function(){
    wx.navigateTo({
      url: '../goods/goods',
    })
  }
})