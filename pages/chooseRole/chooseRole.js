// pages/chooseRole/chooseRole.js
const datas = require('../../utils/data.js');
const app = getApp(), o = app.requirejs('core'),u = o.urlCon();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  // 选择家长/教师/培训机构
  roleClick:function(e){
    let chooseRole = e.currentTarget.dataset.index,
    role = e.currentTarget.dataset.role;
    console.log(chooseRole,'123');
    wx.reLaunch({
      url: '/pages/login/login?index=' + chooseRole + '&role=' + role,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this,
    url = u + 'app/plat/role/role_res',
    data = {},
    header = {"content-type":"application/json"};
    o.get(url,data,header,callback=>{
      let needData = callback.data,chooseRoleInfo = [
        {
          placeholderImg:'/image/zwt.png',
          mainTitle:'成为家长',
          viceTitle:'Parents',
          roleImg:needData.parBanner,
          conText:needData.parDesc,
          roleBtn:'成为家长 ',
          role:'par',
        },{
          placeholderImg:'/image/zwt.png',
          mainTitle:'成为教师',
          viceTitle:'Teacher',
          roleImg:needData.teaBanner,
          conText:needData.teaDesc,
          roleBtn:'成为教师 ',
          role:'tea',
        },{
          placeholderImg:'/image/zwt.png',
          mainTitle:'成为企业',
          viceTitle:'Institutions',
          roleImg:needData.orgBanner,
          conText:needData.orgDesc,
          roleBtn:'成为企业 ',
          role:'org',
        },
      ];
      that.setData({chooseRoleInfo:chooseRoleInfo});
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