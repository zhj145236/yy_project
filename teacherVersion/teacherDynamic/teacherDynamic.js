// teacherVersion/teacherDynamic/teacherDynamic.js
const datas = require('../../utils/data.js');
const app = getApp(), o = app.requirejs('core');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dynamicInfo:datas.dynamicInfo, // 动态信息
    bottomInfo:datas.bottomInfo, // 动态信息底部
    nums:0,
    chooseCoupons:[
      {type:'stay',name:'好友动态',num:'3'},
      {type:'has',name:'我的动态',num:'1'},
      {type:'overdue',name:'我的关注',num:'0'},
      {type:'overdue',name:'谁关注了我',num:'0'}
    ], // 状态选择
  },

  /**
   * 评论/点赞等点击事件
   */
  smallIcon:function(e){
    let that = this,needIndex = e.currentTarget.dataset.index;
    if(needIndex === 1){
      wx.navigateTo({
        url:'/parentsVersion/parentsReview/parentsReview',
      });
    }
  },

  /**
   * 
   * @param {*} options
   * 选择状态
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