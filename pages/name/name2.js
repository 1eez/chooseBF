// pages/name/name.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    NickName: '',
    Age: '',
    Fsid: '',
    name1: '',

  },

  GetRndName: function () { //获得随机的男性代号
    var page = this
    wx.request({
      url: app.globalData.domain + 'getNick.php',
      data: {
        sex: 'male'
      },
      success: function (res1) {
        page.setData({
          NickName: ' ' + res1.data.Fnick
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

  sendName1: function () { //获得男二号的姓名年龄后，更新库表
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

    if (page.data.NickName == page.data.name1) {
      wx.showToast({
        title: '姓名与1号重复',
        icon: 'loading',
        duration: 2000
      })
      return
    }

    page.setData({
      NickName: page.data.NickName.replace(/(^\s*)|(\s*$)/g, ''),
      Age: page.data.Age.replace(/(^\s*)|(\s*$)/g, ''),
    })

    wx.request({
      url: app.globalData.domain + 'updateSummary.php',
      data: {
        Fsid: page.data.Fsid,
        openid: page.data.openid,
        Fsname2: page.data.NickName,
        Fsage2: page.data.Age,
      },
      success: function (res2) {
        console.log('updateSummary over')
        page.setData({
          Fsid: res2.data.Fsid,
        })
        console.log(res2.data)
        
        //根据路由规则跳转到对应页面
        app.route(page.data.openid)

      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      openid: options.openid,
      Fsid: options.Fsid,
    })
    console.log('name2 onload over: ' + options.openid)
    console.log('name2 onload over: ' + options.Fsid)

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