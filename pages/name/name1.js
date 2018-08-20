// pages/name/name.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      openid: '',
      NickName:'',
      Age:'',
  },

  GetRndName: function() { //获得随机的男性代号
    var page = this
    wx.request({
      url: 'https://love.nidele.com/getNick.php',
      data: {
        sex: 'male'
      },
      success: function (res2) {
        page.setData({
          NickName: ' ' + res2.data.Fnick
        })
      }
    })
  },
  
  bindNameInput: function (e) {
    this.setData({
      NickName: e.detail.value
    })
  },

  bindAgeInput: function (e) {
    this.setData({
      Age: e.detail.value
    })
  },

  sendName1: function () { //获得男一号的姓名年龄后，写库表
    var page = this

    if (page.data.NickName == '') {
      wx.showToast({
        title: '请输入姓名',
        icon: 'loading',
        duration: 2000
      })
      return
    }

    if (page.data.Age == '') {
      wx.showToast({
        title: '请输入年龄',
        icon: 'loading',
        duration: 2000
      })
      return
    }

    wx.request({
      url: 'https://love.nidele.com/addSummary.php',
      data: {
        openid: page.data.openid,
        Fsname1: page.data.NickName.replace(/(^\s*)|(\s*$)/g, ''),
        Fsage1: page.data.Age.replace(/(^\s*)|(\s*$)/g, ''),
      },
      success: function (res2) {
        wx.redirectTo({
          url: '../index/index?openid=' + page.data.openid
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      openid: options.openid
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