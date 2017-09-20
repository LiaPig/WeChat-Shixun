Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenSelectModal: false
  },
  gogogo: function(){
    // wx.navigateTo({
    //   url: '../test/test',
    // })
    this.setData({
      hiddenSelectModal: false
    })
  },
  hideSelectModal: function(){
    this.setData({
      hiddenSelectModal: true
    })
  }
})