// pages/test/test.js

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    count: 1,
    sum: 99.99,
    showCartModalStatus: false,
    animationData:"", 
    cartObjects: [
      {
        title: "测试猪崽1",
        size: "大杯、去冰、去皮、去毛",
        price: 0.01,
        quantity: 2
      },
      {
        title: "测试猪崽2",
        size: "大杯、去冰、去皮、去毛",
        price: 0.01,
        quantity: 2
      },
      {
        title: "测试猪崽3",
        size: "大杯、去冰、去皮、去毛",
        price: 0.01,
        quantity: 2
      },
      
    ]
  },
  showCartModal: function(){
    // 显示遮罩层  
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(animationShowHeight).step()
    this.setData({
      animationData: animation.export(),
      showModalCartStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)  
  },
  hideModal: function () {  
        // 隐藏遮罩层  
        var animation = wx.createAnimation({  
            duration: 200,  
            timingFunction: "linear",  
            delay: 0  
        })  
        this.animation = animation;  
        animation.translateY(animationShowHeight).step()  
        this.setData({  
            animationData: animation.export(),  
        })  
        setTimeout(function () {  
        animation.translateY(0).step()  
        this.setData({  
            animationData: animation.export(),  
            showModalStatus: false  
        })  
        }.bind(this), 200)  
    },  
     onShow:function(){  
         let that = this;  
         wx.getSystemInfo({  
            success: function(res) {  
                animationShowHeight = res.windowHeight;  
            }  
        })  
     },
    // 点击了遮蔽层，隐藏Modal
    CartHideModal: function(){
      this.setData({
        count: 0
      })  
    } 
})