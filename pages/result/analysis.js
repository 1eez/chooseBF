// pages/result/analysis.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    Fsid: '',
    name1: '',
    name2: '',
    age1: '',
    age2: '',
    score1: '',
    score2: '',
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      openid: options.openid,
      Fsid: options.Fsid,
    })
    console.log('analysis onload over: ' + options.openid)
    console.log('analysis onload over: ' + options.Fsid)
    var page = this
    wx.request({
      url: 'https://love.nidele.com/get2Name.php',
      data: {
        openid: page.data.openid,
        Fsid: page.data.Fsid,
      },
      success: function (res1) {
        page.setData({
          name1: res1.data.name1,
          name2: res1.data.name2,
          age1: res1.data.age1,
          age2: res1.data.age2,
        })
      }
    })

  },

  getResult: function () {
    var page = this
    wx.request({
      url: 'https://love.nidele.com/getResult.php',
      data: {
        Fsid: page.data.Fsid,
      },
      success: function (res2) {
        wx.redirectTo({
          url: 'result?Fsid='+ page.data.Fsid
        })
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