//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  route: function (openid) {
    var page = this
    wx.request({
      url: page.globalData.domain + 'route.php',
      data: {
        openid: openid,
      },
      success: function (res3) {
        console.log('route over, Result: ' + res3.data.Result)
        console.log('route over, openid: ' + openid)

        if (res3.data.Result == 'NAME1') {
          wx.redirectTo({
            url: '../name/name1?openid=' + openid
          })
        }

        if (res3.data.Result == 'QUESTION1') {
          wx.redirectTo({
            url: '../question/question?openid=' + openid + '&Fsid=' + res3.data.Fsid + '&name=' + res3.data.Fsname
          })
        }

        if (res3.data.Result == 'NAME2') {
          wx.redirectTo({
            url: '../name/name2?openid=' + openid + '&Fsid=' + res3.data.Fsid
          })
        }

        if (res3.data.Result == 'QUESTION2') {
          wx.redirectTo({
            url: '../question/question?openid=' + openid + '&Fsid=' + res3.data.Fsid + '&name=' + res3.data.Fsname
          })
        }

        if (res3.data.Result == 'ANALYSIS') {
          wx.redirectTo({
            url: '../result/analysis?openid=' + openid + '&Fsid=' + res3.data.Fsid
          })
        }

        if (res3.data.Result == 'RESULT') {
          wx.redirectTo({
            url: '../mylist/mylist?openid=' + openid
          })
        }

      }

    })
  },

  globalData: {
    userInfo: null,
    domain:'https://localhost/',
  }
})