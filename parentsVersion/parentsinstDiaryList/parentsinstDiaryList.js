// parentsVersion/parentsinstDiaryList/parentsinstDiaryList.js
const datas = require('../../utils/data.js');
const app = getApp(), o = app.requirejs('core'),u = o.urlCon();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  diaryClick:function(e){
    console.log(e,'返回数据');
    wx.navigateTo({
      url: '/parentsVersion/parentsinstDiaryDetails/parentsinstDiaryDetails?time=' + e.currentTarget.dataset.time + '&content=' + e.currentTarget.dataset.content + '&weather=' + e.currentTarget.dataset.weather + '&feeling=' + e.currentTarget.dataset.feeling + '&picture=' + e.currentTarget.dataset.picture + '&video=' + e.currentTarget.dataset.video,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this,
    use = app.globalData.userInfo,
    token = use.token,
    page = 0,
    size = 10,
    url = u + 'app/par/center/myDiary?page=' + page + '&size=' + size,
    header = {"content-type":"application/json","Authorization":token},
    data = {};
    o.get(url,data,header,callback=>{
      let data = callback.data.content;
      console.log(callback,'返回的日记信息');
      for(let i in data){
        data[i].createTime = o.FunGetTime(data[i].createTime);
      };
      that.setData({diaryData:data});
      console.log(data,'数据');
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