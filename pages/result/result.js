// pages/result/result.js

const app = getApp()

var dimen = require("../../utils/dimen.js");
var data = [];
const context_striptype = wx.createCanvasContext('striptype-canvas');

// y轴放大倍数
var ratioY = 0;

var maxStringLenth = 5;

var Timing = {
  easeIn: function easeIn(pos) {
    return Math.pow(pos, 3);
  },

  easeOut: function easeOut(pos) {
    return Math.pow(pos - 1, 3) + 1;
  },

  easeInOut: function easeInOut(pos) {
    if ((pos /= 0.5) < 1) {
      return 0.5 * Math.pow(pos, 3);
    } else {
      return 0.5 * (Math.pow(pos - 2, 3) + 2);
    }
  },

  linear: function linear(pos) {
    return pos;
  }
};

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

    canvasHeight_striptype: 200, // 条形图的画布高度
    scoreArr: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page = this
    page.setData({
      Fsid: options.Fsid,
      openid: options.openid,
    })
    wx.request({
      url: app.globalData.domain + 'getScore.php',
      data: {
        Fsid: options.Fsid,
      },
      success: function (res1) {
        page.setData({
          name1: res1.data.name1,
          name2: res1.data.name2,
          age1: res1.data.age1,
          age2: res1.data.age2,
          score1: res1.data.score1,
          score2: res1.data.score2,
          scoreArr: res1.data.scoreArr,
        })
        wx.getSystemInfo({
          success: function (res) {
            dimen.init(res.windowWidth);
            console.log('Width=' + res.windowWidth)
            var height = dimen.rpx2px(8000);          // 条形图的画布高度
            page.setData({
              canvasHeight_striptype: height
            });
            page.loadForVisitDistribution();
          }
        });
      }
    })

  },

  backMyList: function () {
    wx.redirectTo({
      url: '../mylist/mylist?openid=' + this.data.openid
    })
  },

  loadForVisitDistribution: function () {
    var page = this
    console.log(page.data.scoreArr)
    console.log(data.visitDistribution)
    this.drawScricptype(page.data.scoreArr);
  },
  drawScricptype: function (list) {
    var that = this;
    var canvasHeight = this.data.canvasHeight_striptype;
    console.log(list.length)
    if (list.length > 10) {
      canvasHeight = list.length * 35; //这里的30能更改疏密程度。导致canvasHeight_striptype就没用了
      this.setData({
        canvasHeight_striptype: canvasHeight
      });
      ratioY = (canvasHeight) / list.length;
    } else {
      ratioY = (canvasHeight) / list.length;
    }

    //this.drawLine(canvasHeight);
    this.drawText(list);

    this.Animation({
      timing: 'easeIn',
      duration: 1000,
      onProcess: function onProcess(process) {
        that.drawStricptype(list, process);
        that.draw();
      },
      onAnimationFinish: function onAnimationFinish() {
        that.drawText(list);
        that.drawStricptypeNum(list);
        that.draw();

      }
    });
  },

  // 画中间文字
  drawText: function (list) {
    var source = '';
    context_striptype.setFillStyle('#555555');
    context_striptype.setFontSize(dimen.rpx2px(24));
    context_striptype.setTextAlign('center');
    list.forEach(function (data, i, array) {

      context_striptype.fillText(data.Fdtag, 180, i * ratioY + dimen.rpx2px(58));
      if (data.Fdtag.toString().length > maxStringLenth) {
        maxStringLenth = data.Fdtag.toString().length;
      }
      console.log('maxStringLenth:' + maxStringLenth)
    });
  },

  // 画竖线
  drawLine: function (canvasHeight) {
    context_striptype.beginPath();
    context_striptype.setStrokeStyle('#555555');
    context_striptype.setLineWidth(dimen.rpx2px(2));
    console.log('maxStringLenth in line:' + maxStringLenth)
    context_striptype.moveTo(maxStringLenth * dimen.rpx2px(79), canvasHeight);
    context_striptype.lineTo(maxStringLenth * dimen.rpx2px(79), dimen.rpx2px(10));
    context_striptype.stroke();
  },

  // 画条形图
  drawStricptype: function (list, process) {
    context_striptype.setFillStyle('#ff634b');
    list.forEach(function (data, i, array) {
      var width = data.score1 < 6 ? data.score1 * dimen.rpx2px(40) : dimen.rpx2px(400);
      width *= process;
      context_striptype.fillRect(
        maxStringLenth * dimen.rpx2px(95) + dimen.rpx2px(2), //这里是起点
        i * ratioY + dimen.rpx2px(32),
        width,
        dimen.rpx2px(32));  //这里的20是条形图的高度
    });
    list.forEach(function (data, i, array) {
      var width = data.score2 < 6 ? data.score2 * dimen.rpx2px(40) : dimen.rpx2px(400);
      width *= process;
      context_striptype.fillRect(
        maxStringLenth * dimen.rpx2px(50) + dimen.rpx2px(2), //这里是起点
        i * ratioY + dimen.rpx2px(32),
        -width,
        dimen.rpx2px(32));  //这里的20是条形图的高度
    });
  },

  // 画条形图数值
  drawStricptypeNum: function (list) {
    context_striptype.setFillStyle('#FFF');
    context_striptype.setFontSize(dimen.rpx2px(24));
    list.forEach(function (data, i, array) {
      context_striptype.fillText(data.score1,
        maxStringLenth * dimen.rpx2px(96) + dimen.rpx2px(10) + (data.score1 < 6 ? data.score1 : dimen.rpx2px(400)),
        i * ratioY + dimen.rpx2px(56));
    });
    list.forEach(function (data, i, array) {
      context_striptype.fillText(data.score2,
        maxStringLenth * dimen.rpx2px(50) - dimen.rpx2px(10) - (data.score2 < 6 ? data.score2 : dimen.rpx2px(400)),
        i * ratioY + dimen.rpx2px(56));
    });
  },

  // 画
  draw: function () {
    context_striptype.draw(true);
  },

  Animation: function (opts) {
    this.isStop = false;
    opts.duration = typeof opts.duration === 'undefined' ? 1000 : opts.duration;
    opts.timing = opts.timing || 'linear';

    var delay = 17;

    var createAnimationFrame = function createAnimationFrame() {
      if (typeof requestAnimationFrame !== 'undefined') {
        return requestAnimationFrame;
      } else if (typeof setTimeout !== 'undefined') {
        return function (step, delay) {
          setTimeout(function () {
            var timeStamp = +new Date();
            step(timeStamp);
          }, delay);
        };
      } else {
        return function (step) {
          step(null);
        };
      }
    };
    var animationFrame = createAnimationFrame();
    var startTimeStamp = null;
    var _step = function step(timestamp) {
      if (timestamp === null || this.isStop === true) {
        opts.onProcess && opts.onProcess(1);
        opts.onAnimationFinish && opts.onAnimationFinish();
        return;
      }
      if (startTimeStamp === null) {
        startTimeStamp = timestamp;
      }
      if (timestamp - startTimeStamp < opts.duration) {
        var process = (timestamp - startTimeStamp) / opts.duration;
        var timingFunction = Timing[opts.timing];
        process = timingFunction(process);
        opts.onProcess && opts.onProcess(process);
        animationFrame(_step, delay);
      } else {
        opts.onProcess && opts.onProcess(1);
        opts.onAnimationFinish && opts.onAnimationFinish();
      }
    };
    _step = _step.bind(this);

    animationFrame(_step, delay);
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