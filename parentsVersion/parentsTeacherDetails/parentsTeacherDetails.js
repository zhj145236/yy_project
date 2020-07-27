// pages/teacherProductCenter/teacherProductCenter.js
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
    indicatorDots: false,
    autoplay: true,
    circular: true,
    interval: 3000,
    duration: 1000,
    couponsInfo:datas.couponsInfo, // 优惠券信息

    platformInspect:datas.platformInspect, // 平台核查数据
    // teacherInfo:datas.teacherInfo, // 教师信息
    productCenterData:datas.productCenterData, // 产品中心
    approveInfo:datas.approveInfo, // 认证数据
    myInfo:'每个人都有潜在的能量，只是很容易被习惯掩盖，被时间迷离，被惰性所消磨', // 人生格言
    title:'恐低的鸟：',
    con:'看了你的资料我感觉你特别有能力，我孩子数学有些偏科不知道你是否有兴趣帮我做一下一对一辅导。',
    teacherCon:'非常感谢您的留言，我近期有很多业余时间，不知道您是否方便，您孩子现在是上几年级呢！？。'
  },

  // 点击更多课程进入课程列表
  classMore:function(){
    wx.navigateTo({
      url:'../teacherProductList/teacherProductList',
    });
  },

  detailInfo:function(e){
    wx.navigateTo({
      url:'../teacherProductCenter/teacherProductCenter?id=' + e.currentTarget.dataset.id,
    });
  },

  // 提交留言
  bindFormSubmit:function(e){
    console.log(e,'这是返回的数据');
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id,'数据');
    let that = this,id = options.id;
    o.funTeacherDetails(that,id,'app/tea/center/home','needData','1');
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