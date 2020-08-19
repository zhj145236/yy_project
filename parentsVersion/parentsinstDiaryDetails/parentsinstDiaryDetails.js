// parentsVersion/parentsinstDiaryDetails/parentsinstDiaryDetails.js
const datas = require('../../utils/data.js');
const app = getApp(), o = app.requirejs('core'),u = o.urlCon();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 删除图片
   * @param {*} e 
   */
  dealImg:function(e){
    o.alert('提示','请确定您是否要删除该图片',callback=>{
      if(callback.confirm){
        let that = this,
        nums = e.currentTarget.dataset.nums,
        needImg = that.data.needImg,
        picture = that.data.picture,
        data = [needImg[nums]];
        o.FunDealImg(that,data,picture,'',nums,'picture','');
      }
    });
  },

  /**
   * 
   * @param {*} e 
   * 图片预览
   */
  previewImg:function(e){
    let that = this,
    index = e.currentTarget.dataset.index,
    picture = that.data.picture;
    wx.previewImage({
      current: picture[index], //当前显示图片
      urls: picture //所有图片
    });
  },

  /**
   * 删除视频
   */
  // dealVideo:function(){
    
  // },

  /**
   * 删除日记
   * @param {*} e 
   */
  dealDiary:function(e){
    let id = e.currentTarget.dataset.id;
    o.FunContent(id);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this,
    needArr = [],
    needImg = options.picture === ''?'':options.picture.split(',');
    console.log(options,'来到日记详情页面');
    if(needImg !== ''){
      for(let i in needImg){
        needArr.push(o.down(u,needImg[i]));
      }
    }
    console.log(needArr,'需要展示的图片');
    that.setData({
      time:options.time,
      content:options.content,
      feeling:options.feeling,
      weather:options.weather,
      video:options.video,
      picture:needArr,
      needImg:needImg,
      id:options.id
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