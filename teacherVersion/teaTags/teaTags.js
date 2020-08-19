// teacherVersion/teaTags/teaTags.js
const datas = require('../../utils/data.js');
const app = getApp(), o = app.requirejs('core');
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
    console.log(options.label,'返回数据');
    let that = this;
    if(options.label === '1'){
      that.setData({isChoole:true});
      wx.setNavigationBarTitle({
        title: '个人标签'
      })
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor:'#74cdce',
      });
    }else{
      that.setData({isChoole:false});
      wx.setNavigationBarTitle({
        title: '自我评价'
      })
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor:'#74cdce',
      });
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