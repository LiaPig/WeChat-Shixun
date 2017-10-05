//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台判断用户是否已经登录
      
        wx.request({
          url: this.globalData.API + '/api/wechat/login?code=' + res.code,
          success: res => {
            // 如果已经注册登录
            if (res.data.success) {
              this.globalData.token = res.data.data.access_token;
            }
            // 如果没有注册
            else {         
              wx.showModal({
                title: '提示',
                content: '请先注册哦',
                showCancel: false,
                succes: res => {
                  if(res.confirm) {
                    wx.redirectTo({
                      url: '../register/register',
                    })
                  }
                }
              })
            }
          }
        })
        //换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onError: function (msg) {
    console.log(msg)
  },
  globalData: {
    userInfo: null,
    token: null,
    API: "https://api.leewaiho.com"
    
  }
})