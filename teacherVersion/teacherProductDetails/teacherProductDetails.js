// teacherVersion/teacherProductDetails/teacherProductDetails.js
const datas = require('../../utils/data.js');
const app = getApp(), o = app.requirejs('core');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // banner
    imgUrls: [
      '../../image/banner2.png',
      '../../image/banner2.png',
    ],
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 3000,
    duration: 1000,
    isOrder: false,

    platformInspect:datas.platformInspect, // 平台核查数据
    teacherClassInfo:datas.teacherClassInfo, // 课程信息
    productCenterData:datas.productCenterData, // 产品中心
    couponsInfo:datas.couponsInfo, // 优惠券信息
    classDetailsImg:datas.classDetailsImg, // 认证数据
  },

  /**
   * 
   * @param {*} options
   * 点击收藏课程 
   */
  collectionClick:function(){
    wx.showToast({
      title: '收藏成功',
      icon: 'success',
      duration: 2000
    })
  },
  /**
   * 
   * @param {*} options
   * 用户预约课程 
   */
  orderClick:function(){
    wx.showToast({
      title: '申请已发送',
      icon: 'success',
      duration: 2000
    })  
  },

  /**
   * 
   * @param {*} options
   * 查看该教师的全部课程 
   */
  // 点击更多课程进入课程列表
  classMore:function(){
    wx.navigateTo({
      url:'../teacherProductList/teacherProductList',
    });
  },

  /**
   * 
   * @param {*} options
   * 家长拨打电话 
   */
  callTel:function(){
    wx.makePhoneCall({
      phoneNumber: '13310829325' //为昱升公司电话
    })
  },

  receiveCoupons:function(){
    wx.showModal({
      title: '温馨提示',
      content: '请点击“确定”向教师发出预约申请，教师通过后方可领取优惠券。',
      success (res) {
        if (res.confirm) {
          wx.showToast({
            title: '申请已发送',
            icon: 'success',
            mask:true,
            duration: 1500
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })    
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