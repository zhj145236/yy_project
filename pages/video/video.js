// pages/video/video.js
const datas = require('../../utils/data.js');
const app = getApp(), o = app.requirejs('core'),u = o.urlCon();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    controls:true, // 是否显示视频控件
    fullscreen:false, // 是否显示全屏按钮
    playBtn:true, // 是否显示底部控制栏的播放按钮
    centerPlay:false, // 是否显示视频中间的播放按钮
    gestureFullscreen:false, // 在全屏模式下，是否开启高亮与音量调节
    progressGesture: false, // 是否开启控制进度的手势
    autoplay:true, // 是否自动播放 (注意自动播放跟视频中间的播放按钮是不能同时为true的，正常情况下视频在播放的时候中间就不会在有播放的按钮)
    muted: true, // 是否静音播放
    playGesture:false, // 是否双击切换播放/暂停
    btnPosition:'bottom', // 播放按钮的位置

    isPlay:true, // 音频是否播放
    isPause:false, // 音频是否暂停
    isStop:false, // 音频是否停止
    isDestroy:false, // 音频是否退出
  },

  /**
   * 
   * @param {*} e 
   * 视频开始
   */
  bindplay:function(e){
    console.log(e,'当视频继续的时候触发');
    let that = this,InnerAudioContext = that.data.InnerAudioContext;
    InnerAudioContext.play();
  },

  /**
   * 
   * @param {*} e 
   * 视频暂停
   */
  bindpause:function(e){
    let that = this,InnerAudioContext = that.data.InnerAudioContext;
    InnerAudioContext.pause();
  },

  /**
   * 视频播放结束
   */
  bindended:function(even){
    let that = this,InnerAudioContext = that.data.InnerAudioContext;
    InnerAudioContext.stop();
  },

  shareClick:function(e){
    console.log(e,'分享');
  },

  outClick:function(){
    let that = this,InnerAudioContext = that.data.InnerAudioContext;
    InnerAudioContext.destroy();
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('查看');
    let that = this,
    InnerAudioContext = wx.createInnerAudioContext();
    InnerAudioContext.autoplay = false // 是否自动播放音频
    InnerAudioContext.loop = true // 是否循环播音频
    InnerAudioContext.src = encodeURI('/image/music.mp3') // 音频地址
    wx.setInnerAudioOption({
      mixWithOther:false, // 是否与其他音频混放
      obeyMuteSwitch:false // 是否在用户手机调整为静音下依然播放音频，为false时当用户设置为静音依然播放声音
    });
    src = options.src;
    that.setData({
      tempFilePathVideo:src,
      height: wx.getSystemInfoSync().windowHeight + 'px',
      width: wx.getSystemInfoSync().windowWidth + 'px',
      InnerAudioContext:InnerAudioContext
    });

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