// teacherVersion/teacherReview/teacherReview.js
const datas = require('../../utils/data.js');
const app = getApp(), o = app.requirejs('core');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dynamicInfo:datas.dynamicInfo, // 动态信息
    bottomInfo:datas.bottomInfo, // 动态信息底部
    
    title:'恐低的鸟：',
    con:'看了你的资料我感觉你特别有能力，我孩子数学有些偏科不知道你是否有兴趣帮我做一下一对一辅导。',
    teacherCon:'非常感谢您的留言，我近期有很多业余时间，不知道您是否方便，您孩子现在是上几年级呢！？。'
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