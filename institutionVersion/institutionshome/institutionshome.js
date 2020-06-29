// parentsVersion/parentshome/parentshome.js
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
    teacherNearParents: datas.teacherNearParents, // 附近家长
    nearTeacherDatas: datas.nearTeacherData, // 附近教师
    institutionsProductCenterData:datas.institutionsProductCenterData, // 机构产品
    recruitInfo:datas.recruitInfo, // 机构招聘
    institutionFun:datas.institutionFun, // 企业中心


    blockid:0,
    bgcolor:'#ffffff',
    color:"#707070",
    selectedColor:'#69a5fb',
    showborder:true,
    bordercolor:"#cccccc",
    tabbar:[
      {
        pagePath: "page/home0/index",
        selectedIconPath: '/tabBarImg/qihome.png',
        iconPath: '/tabBarImg/qihomeother.png',
        text: '首页',
        isdot: false,
        number: 0
      }, {
        pagePath: "page/home1/index",
        selectedIconPath: '/tabBarImg/qicp.png',
        iconPath: '/tabBarImg/qicpother.png',
        text: '产品中心',
        isdot: false,
        number: 0
      }, {
        pagePath: "page/home2/index",
        selectedIconPath: '/tabBarImg/qizp.png',
        iconPath: '/tabBarImg/qizpother.png',
        text: '招聘专题',
        isdot: false,
        number: 0
      }, {
        pagePath: "page/home3/index",
        selectedIconPath: '/tabBarImg/qizx.png',
        iconPath: '/tabBarImg/qizxother.png',
        text: '企业中心',
        isdot: false,
        number: 0
      }
    ]
  },

  /**
   * 
   * @param {*} options
   * 返回悦优中心 
   */
  backyy:function(){
    wx.reLaunch({
      url: '/pages/aboutus/aboutus',
    });
  },

  // event.detail 的值为当前选中项的索引
  tabbarChange(e) {
    var index = parseInt(e.detail),that = this;
    this.setData({
      blockid:index
    });
    that.onLoad();
  },

  /**
   * 
   * @param {*} e
   * 用户点击功能事件 
   */
  funClick:function(e){
    let that = this,num = e.currentTarget.dataset.index,institutionFun = that.data.institutionFun,needId = e.currentTarget.dataset.id;
    if(needId !== 6){
      wx.navigateTo({
        url:'/institutionVersion' + institutionFun[num].url,
      });
    }else{
      wx.openSetting({
        success (res) {
          console.log(res.authSetting);
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log(that.data.blockid);
    if(that.data.blockid === 0){
      console.log('加载首页的数据');
    }else if(that.data.blockid === 1){
      console.log('加载搜索页的数据');
    }else if(that.data.blockid === 2){
      console.log('加载我的数据');
    }else{
      // 个人中心数据加载
      /**
       * 判断用户是否授权
       * 如果授权获取全局变量中的数据
       * 否则加载默认数据
       * 2020/6/5增 --- 张 showVendor用户授权判断
       */
      if(app.globalData.userInfo !== ''){
        let userInfo = app.globalData.userInfo;
        that.setData({
          userInfo:userInfo
        });
      }else{
        let userInfo = {};
        userInfo.avatarUrl = '/image/dtimg.jpg';
        userInfo.nickName = '游客登录';
        that.setData({
          userInfo:userInfo
        });
      }
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