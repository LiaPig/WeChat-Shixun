// pages/register/register.js
const app = getApp();
const API = getApp().globalData.API;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    backgroundImage: '../../images/register/1.jpg',
    buttonText: '发送验证码',
    form: {
      phone: null,
      password: 'bigheadpigza',
      checkCode: null
    },
    code: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //  获取input框中电话号码的值
  getPhone: function (event) {
    const that = this;
    let form = that.data.form;
    form.phone = event.detail.value;
    that.setData({
      form: form
    })
  },

  //  发送验证码按钮
  sendCheckCode: function() {
    const that = this;
    const form = that.data.form;
    // 判断手机号码是否为空，如果是，弹窗告诉要输入
    if(!form.phone) {
      wx.showModal({
        title: '提示',
        content: '请先输入手机号码',
        showCancel: false
      })
    }
    else {
      wx.request({
        url: API + '/api/wechat/register?phone=' + form.phone,
        success: function (res) {
          // 判断手机是否符合
          if(!res.data.success){
            wx.showModal({
              title: '错误提示',
              content: res.data.message,
              showCancel: false
            })
          }
          else {
            wx.showModal({
              title: '成功提示',
              content: '发送成功，请注意查收信息',
              showCancel: false
            })
          }
        }
      })
    }
  },

  //  获取input框中验证码的值
  getCheckCode: function (event) {
    const that = this;
    let form = that.data.form;
    form.checkCode = event.detail.value;
    that.setData({
      form: form
    })
  },

  //  立即验证按钮
  register: function(){
    const that = this;
    const form = that.data.form;
    //先判断有没漏填的
    if(!form.phone){
      wx.showModal({
        title: '提示',
        content: '请先输入手机号码',
        showCancel: false
      })
    } else if (!form.checkCode){
      wx.showModal({
        title: '提示',
        content: '请输入验证码',
        showCancel: false
      })
    } else {
      that.my_getUserInfo();
      // 再次发送获得code
      wx.login({
        success: res => {
          console.log(res)
          that.data.code = res.code;
          setTimeout(function () {
            that.registerAjax();
          }, 1000)
        }
      })
    }
  },

  // 获取用户信息
  my_getUserInfo: function(){
    const that = this;
    if (app.globalData.userInfo) {
      that.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (that.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        that.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          that.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  // 与后台交互
  registerAjax: function(){
    const that = this;
    // 用来传给后台的数据
    let form_data = {
      mobilePhone: that.data.form.phone,
      username: that.data.userInfo.nickName,
      password: that.data.form.password,
      gender: that.data.userInfo.gender,
      avatarUrl: that.data.userInfo.avatarUrl,
      validCode: that.data.form.checkCode,
      wxCode: that.data.code
    }
    wx.request({
      url: API + '/api/wechat/register',
      method: 'POST',
      data: form_data,
      success: function (res) {
        if (res.data.success) {
          wx.showModal({
            title: '成功提示',
            content: '注册成功！',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.switchTab({
                  url: '../index/index',
                })
              }
            }
          })
        } else {
          wx.showModal({
            title: '错误提示',
            content: res.data.message,
            showCancel: false
          })
        }
      }
    })
  }
})