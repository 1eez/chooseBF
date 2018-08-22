Page({

  /**
   * 页面的初始数据
   */
  data: {
  
    Result: '',
    Fqid: '',
    Fqtext:'',
    Faid:'',
    resultObj: {},
    answerList: [],
    openid: '',
    Fsid: '1',
    Nickname: '',

  },

  getQuestion: function () {
    var page = this
    console.log('getQ'+page.data.Fsid),
      console.log(page.data.Nickname),

    wx.request({
      url: 'https://love.nidele.com/getQuestion.php',
      data: {
        Fdsid: page.data.Fsid,
        Fdname: page.data.Nickname,
      },
      success: function (res2) {
        console.log('getQuestion success')
        console.log(res2.data)
        page.setData({
          resultObj: res2.data,
          Result: res2.data.Result,
          Fqid: res2.data.Fqid,
          Fqtext: res2.data.Fqtext,
          answerList: res2.data.answerArr,
        })
      }
    })

  },

  sendAnswer: function (e) {
    var page = this
    this.setData({
      Faid: parseInt(e.currentTarget.dataset.index)
    })
    wx.request({
      url: 'https://love.nidele.com/addAnswer.php',
      data: {
        Fdsid: page.data.Fsid,
        Fdname: page.data.Nickname,
        Fdqid: page.data.Fqid,
        Fdaid: page.data.Faid,
      },
      success: function (res2) {
        console.log(res2.data)
        if (res2.data.Result == 'ADD') {
          console.log('SendA'+page.data.Fsid),
          console.log(page.data.Nickname),

            wx.request({
              url: 'https://love.nidele.com/getQuestion.php',
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
                    Fqtext: res2.data.Fqtext,
                    answerList: res2.data.answerArr,
                  })
                }
                if (res2.data.Result == 'EMPTY') {
                  console.log('getQ = EMPTY' + page.data.openid)
                  wx.redirectTo({
                    url: '../name/name2?openid=' + page.data.openid + '&Fsid=' + page.data.Fsid + '&name=' + page.data.Nickname
                  })
                }

              }
            })

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