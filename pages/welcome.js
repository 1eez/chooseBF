// pages/welcome.js
//微信小程序通过background - image设置背景：只支持线上图片和base64图片，不支持本地图片；base64图片设置步骤如下：
//在网站http://imgbase64.duoshitong.com/上将图片转成base64格式的文本

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    openid: '',
    Funickname: '',
    Fugender: '',
    Fucountry: '',
    Fuprovince: '',
    Fucity: '',
    Fulang: '',
    Fubrand: '',
    Fumodel: '',
    Fuwxlang: '',
    Fuwxver: '',
    Fuwxplatform: '',
    FuwxfontSize: '',
    FunetworkType: '',
  },

  onLoad: function () {
    var page = this
    wx.login({
      success: function (res1) {
        if (res1.code) {
          wx.request({
          url: 'https://love.nidele.com/getOpenid.php',
          data: {
            code: res1.code
          },
            success: function (res2) {
              page.data.openid = res2.data.Fopenid
            }
        })
        } else {
          console.log('登录失败！' + res1.errMsg)
        }
      }
    });


    wx.getSystemInfo({
      success: function (res) {
        page.data.Fubrand = res.brand
        page.data.Fumodel = res.model
        page.data.Fuwxlang = res.language
        page.data.Fuwxver = res.version
        page.data.Fuwxplatform = res.platform
        page.data.FuwxfontSize = res.fontSizeSetting
      }
    });

    wx.getNetworkType({
      success: function (res) {
        page.data.FunetworkType = res.networkType
      }
    });

  },

  bindGetUserInfo: function (e) {
    var page = this
    this.setData({
      Funickname: e.detail.userInfo.nickName,
      Fugender: e.detail.userInfo.gender,
      Fucountry: e.detail.userInfo.country,
      Fuprovince: e.detail.userInfo.province,
      Fucity: e.detail.userInfo.city,
      Fulang: e.detail.userInfo.language,
    })
    wx.redirectTo({
      url: '../../name/name1?openid=' + page.data.openid
    })
    wx.request({
      url: 'https://love.nidele.com/addUser.php',
      data: {
        openid: page.data.openid,
        Funickname: page.data.Funickname,
        Fugender: page.data.Fugender,
        Fucountry: page.data.Fucountry,
        Fuprovince: page.data.Fuprovince,
        Fucity: page.data.Fucity,
        Fulang: page.data.Fulang,
        Fubrand: page.data.Fubrand,
        Fumodel: page.data.Fumodel,
        Fuwxlang: page.data.Fuwxlang,
        Fuwxver: page.data.Fuwxver,
        Fuwxplatform: page.data.Fuwxplatform,
        FuwxfontSize: page.data.FuwxfontSize,
        FunetworkType: page.data.FunetworkType,
      },
      success: function (res2) {
        console.log(res2.data.Result) 
      }
    })
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