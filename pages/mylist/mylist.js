// pages/mylist/mylist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    myList: [],
    Fsid:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      openid: options.openid
    })
    console.log('mylist load over: ' + options.openid)
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
    var page = this

      wx.request({
        url: 'https://love.nidele.com/getMylist.php',
        data: {
          openid: page.data.openid,
        },
        success: function (res2) {
          page.setData({
            myList: res2.data.listArr,
          })
        }
      })
  },

  viewTest: function(e) {
    var page = this
    page.setData({
      Fsid: parseInt(e.currentTarget.dataset.index)
    })
    wx.redirectTo({
      url: '../result/result?Fsid=' + page.data.Fsid + '&openid=' + page.data.openid
    })
  },

  delTest: function(e) {
    var page = this
    page.setData({
      Fsid: parseInt(e.currentTarget.dataset.index)
    })
    wx.showModal({
      title: '确定删除',
      content: '你确定要删除这条测试吗？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'https://love.nidele.com/delTest.php',
            data: {
              openid: page.data.openid,
              Fsid: page.data.Fsid,
            },
            success: function (res2) {
              page.setData({
                myList: res2.data.listArr,
              })
            }
          })
        } else if (res.cancel) {
          
        }
      }
    })

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