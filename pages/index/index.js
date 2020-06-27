// pages/index/index.js
const datas = require('../../utils/data.js');
const app = getApp(), o = app.requirejs('core');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // banner
    imgUrls: [
      '../../image/banner1.png',
      '../../image/banner1.png',
    ],
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 3000,
    duration: 1000,

    // count
    nearTeacherDatas: datas.nearTeacherData, // 附近教师
    institutionDetails:datas.institutionDetails, // 附近机构
  },

  // 点击机构简介进入机构详情
  institutionInfo:function(e){
    wx.navigateTo({
      url:'../institutionsDetails/institutionsDetails',
    });
  },

  // 点击教师简介进入教师详情
  teacherInfo:function(e){
    wx.navigateTo({
      url:'../teacherDetails/teacherDetails',
    });
  },

  // 点击更多教师进入教师列表页面
  moreTeacher:function(){
    wx.navigateTo({
      url:'../teacherList/teacherList',
    }); 
  },

  // 点击查看更多培训机构进入机构列表页
  moreInstitution:function(){
    wx.navigateTo({
      url:'../institutionsList/institutionsList',
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
    setTimeout(()=>{
      // 再此调取接口，如果接口回调速度太快，为了展示loading效果，可以使用setTimeout
      wx.stopPullDownRefresh();
    }, 1000)
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