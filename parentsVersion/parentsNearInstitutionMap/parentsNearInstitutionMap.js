// pages/map/map.js
const datas = require('../../utils/data.js');
const app = getApp(), o = app.requirejs('core');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [
      {
      title:'莞亿云谷',
      iconPath: "/image/ghbjt.png",
      id: 0,
      latitude: 22.934935574931625, // 纬度
      longitude: 113.66992540475465, // 经度
      width: 30,
      height: 30,
    },{
      title:'富商大厦',
      iconPath: "/image/ghbjt.png",
      id: 0,
      latitude: 22.932581477745725, // 纬度
      longitude: 113.66792179462053, // 经度
      width: 30,
      height: 30,
    },{
      title:'厚街医院',
      iconPath: "/image/ghbjt.png",
      id: 0,
      latitude: 22.93248266899411, // 纬度
      longitude: 113.66997636672593, // 经度
      width: 30,
      height: 30,
    },{
      title:'中国邮政',
      iconPath: "/image/ghbjt.png",
      id: 0,
      latitude: 22.93334230271837, // 纬度
      longitude: 113.66743899699784, // 经度
      width: 30,
      height: 30,
    },{
      title:'都市丽人',
      iconPath: "/image/ghbjt.png",
      id: 0,
      latitude: 22.93335712394165, // 纬度
      longitude: 113.66579748508073, // 经度
      width: 30,
      height: 30,
    },{
      title:'中国银行',
      iconPath: "/image/ghbjt.png",
      id: 0,
      latitude: 22.934330380718126, // 纬度
      longitude: 113.66795934554673, // 经度
      width: 30,
      height: 30,
    }
  ],
  },
  /**
   * 
   * @param {*} options
   * 拨打电话 
   */
  callTel:function(){
    wx.makePhoneCall({
      phoneNumber: '13310829325'
    });
  },

  csClick:function(e){
    console.log(e,'12333333333333333333');
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    that.setData({
      lat:Number(options.latitude),
      lon:Number(options.longitude)
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