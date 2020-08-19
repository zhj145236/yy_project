// pages/remind/remind.js
const datas = require('../../utils/data.js');
const app = getApp(), o = app.requirejs('core'),u = o.urlCon();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this,type = options.type;
    wx.setNavigationBarTitle({
      title: '消息列表'
    })
    // 用户选择的角色类型 0家长 1教师 2机构
    switch(type){
      case 'par':
        wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor:'#f2b04a',
        });
        break;
      case 'tea':
        wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor:'#74cdce',
        });
        break;
      case 'org':
        wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor:'#69a5fb',
        });
        break;
    }
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
    // 用户的全部消息列表(已读 + 未读)
    let that = this;
    o.FunNoticeList(that,'infoData');
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