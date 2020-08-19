// teacherVersion/teacherProduct/teacherProduct.js
const datas = require('../../utils/data.js');
const app = getApp(), o = app.requirejs('core'),u = o.urlCon();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 
   * @param {*} options
   * 长按事件 
   */
  longPress:function(e){
    o.alert('移除课程','请确定是否移除收藏的课程',callback=>{
      if(callback.confirm){
        console.log('用户确认取消收藏该课程');
      }
    });
  },

  /**
   * 
   * @param {*} options
   * 进入产品详情 
   */
  detailsClick:function(){
    wx.navigateTo({
      url:'/teacherVersion/teacherProductDetails/teacherProductDetails',
    });
  },

  /**
   * 进入课程详情
   * @param {*} options 
   */
  classDetail:function(e){
    console.log(e,'课程详情入口');
    wx.navigateTo({
      url:'/teacherVersion/teacherProductDetails/teacherProductDetails?id=' + e.currentTarget.dataset.id + '&tid=' + e.currentTarget.dataset.tid,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    o.FunCourseList(that,'collectList');
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