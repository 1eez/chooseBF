
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
    Result: '',
    Fqid: '',
    Fqmax:'',
    Fqtext:'',
    Faid:'',
    resultObj: {},
    answerList: [],
    openid: '',
    Fsid: '1',
    Nickname: '',
    Fpercent: 0,

  },

  getQuestion: function () {
    var page = this
    console.log('getQ'+page.data.Fsid),
      console.log(page.data.Nickname),

    wx.request({
      url: app.globalData.domain + 'getQuestion.php',
      data: {
        Fdsid: page.data.Fsid,
        Fdname: page.data.Nickname,
      },
      success: function (res2) {
        console.log(res2.data)
        if (res2.data.Result == 'SUCCESS') {
          page.setData({
            resultObj: res2.data,
            Result: res2.data.Result,
            Fqid: res2.data.Fqid,
            Fqmax: res2.data.Fqmax,
            Fpercent: (res2.data.Fqid / res2.data.Fqmax * 100),
            Fqtext: res2.data.Fqtext,
            answerList: res2.data.answerArr,
          })
        }
        if (res2.data.Result == 'EMPTY') {
          console.log('getQ = EMPTY' + page.data.openid)

          //根据路由规则跳转到对应页面
          app.route(page.data.openid)
        }

      }
    })

  },

  sendAnswer: function (e) {
    var page = this
    this.setData({
      Faid: parseInt(e.currentTarget.dataset.index)
    })
    wx.request({
      url: app.globalData.domain + 'addAnswer.php',
      data: {
        Fdsid: page.data.Fsid,
        Fdname: page.data.Nickname,
        Fdqid: page.data.Fqid,
        Fdaid: page.data.Faid,
      },
      success: function (res2) {
        console.log(res2.data)
        if (res2.data.Result == 'ADD') {
          console.log('SendA' + page.data.Fsid),
          console.log(page.data.Nickname),
          page.getQuestion()
        }
      }
    })

  },

  noAnswer: function () {
    var page = this

    wx.request({
      url: app.globalData.domain + 'noAnswer.php',
      data: {
        Fdsid: page.data.Fsid,
        Fdname: page.data.Nickname,
        Fdqid: page.data.Fqid,
      },
      success: function (res2) {
        console.log(res2.data)
        if (res2.data.Result == 'ADD') {
          console.log('SendNo' + page.data.Fsid),
            console.log(page.data.Nickname),
            page.getQuestion()
        }
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
      Nickname: options.name,
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
    this.getQuestion()
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