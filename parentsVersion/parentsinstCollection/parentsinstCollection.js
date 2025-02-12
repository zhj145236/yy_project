// parentsVersion/parentsinstCollection/parentsinstCollection.js
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
    let that = this,
    id = e.currentTarget.dataset.id,
    collectList = that.data.collectList,
    dealindex = e.currentTarget.dataset.dealindex;
    console.log(e.currentTarget.dataset.id,'取消收藏的id');
    o.alert('移除课程','请确定是否移除收藏的课程',callback=>{
      if(callback.confirm){
        console.log('用户确认取消收藏该课程');
        o.FunUnCollect(that,id,dealindex,collectList,'collectList');
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this,
    page = 0;
    o.FunMyCollect(that,page,"collectList");
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