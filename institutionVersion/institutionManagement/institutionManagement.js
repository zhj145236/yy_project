// institutionVersion/institutionManagement/institutionManagement.js
const datas = require('../../utils/data.js');
const app = getApp(), o = app.requirejs('core');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseCoupons:[
      {type:'stay',name:'全场通用',num:'1'},
      {type:'has',name:'单课使用',num:'3'},
      {type:'overdue',name:'已过期',num:'0'}
    ],
    couponsDetails:datas.couponsDetails,
    nums:0,
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
   * 
   * @param {*} options
   * 选择优惠券使用情况 
   */
  chooseCoupons:function(e){
    console.log(e);
    let that = this,index = e.currentTarget.dataset.index,type = e.currentTarget.dataset.type;
    that.setData({
      nums:index
    });
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