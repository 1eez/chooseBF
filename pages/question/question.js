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

  },

  getQuestion: function () {
    var page = this
    wx.request({
      url: 'https://love.nidele.com/getQuestion.php',
      data: {
        Fdsid: '1'
      },
      success: function (res2) {
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
    console.log(page.data.Faid)
    console.log(page.data.Fqid)
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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