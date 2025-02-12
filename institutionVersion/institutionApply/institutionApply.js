// institutionVersion/institutionApply/institutionApply.js
const datas = require('../../utils/data.js');
const app = getApp(), o = app.requirejs('core');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    VIPdata:datas.VIPdata,
  },

  /**
   * 
   * @param {*} e 
   * 用户点击查看功能详情进入功能详情页面
   */
  viewDetails:function(e){
    let that = this,id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url:'/institutionVersion/institutionFunDetails/institutionFunDetails?id=' + id,
    });
  },

  /**
   * 
   * @param {*} e
   * 展示基本信息 
   */
  basicContent:function(e){
    console.log(e,'基本信息');
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