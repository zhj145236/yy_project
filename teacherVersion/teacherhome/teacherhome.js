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
    useClick:0,

    // count
    teacherNearParents: datas.teacherNearParents, // 附近教师
    institutionDetails:datas.institutionDetails, // 附近机构
    recruitInfo:datas.recruitInfo, // 机构招聘
    dynamicInfo:datas.dynamicInfo, // 动态信息
    bottomInfo:datas.bottomInfo, // 动态信息底部
    teacherFun:datas.teacherFun, // 个人中心信息
    chooseCategory:['看家长','看机构'],


    blockid:0,
    bgcolor:'#ffffff',
    color:"#707070",
    selectedColor:'#74cdce',
    showborder:true,
    bordercolor:"#cccccc",
    tabbar:[
      {
        pagePath: "page/home0/index",
        selectedIconPath: '/tabBarImg/jshome.png',
        iconPath: '/tabBarImg/jshomeother.png',
        text: '首页',
        isdot: false,
        number: 0
      }, {
        pagePath: "page/home1/index",
        selectedIconPath: '/tabBarImg/jsdt.png',
        iconPath: '/tabBarImg/jsdtother.png',
        text: '附近动态',
        isdot: false,
        number: 0
      }, {
        pagePath: "page/home2/index",
        selectedIconPath: '/tabBarImg/jszp.png',
        iconPath: '/tabBarImg/jszpother.png',
        text: '机构招聘',
        isdot: false,
        number: 0
      }, {
        pagePath: "page/home3/index",
        selectedIconPath: '/tabBarImg/jszx.png',
        iconPath: '/tabBarImg/jszxother.png',
        text: '教师中心',
        isdot: true,
        number: 0
      }
    ]
  },

  /**
   * 
   * @param {*} e
   * 查看附近家长
   */
  viewNearParents:function(){
    console.log('ceshi');
    app.FunGetSeting(data=>{
      console.log(data.authSetting['scope.userLocation'],'授权数据');
      // 用户授权的时候监听用户曾经是否有授权行为，如果授权则走true，否则走false
      if(data.authSetting['scope.userLocation']){
        console.log('111');
        o.FunGetLocation('gcj02',callback=>{
          let latitude = callback.latitude,longitude = callback.longitude;
          wx.navigateTo({
            url:'../TeacherNearParentsMap/TeacherNearParentsMap?latitude=' + latitude + '&longitude=' + longitude,
          });
        });
      }else{
        console.log('222');
        o.FunGetLocation('wgs84',callback=>{
          let errMsg = callback.errMsg;
          if(errMsg === "getLocation:ok"){
            const latitude = callback.latitude,longitude = callback.longitude;
            wx.navigateTo({
              url:'../TeacherNearParentsMap/TeacherNearParentsMap?latitude=' + latitude + '&longitude=' + longitude,
            });
          }else{
            wx.navigateTo({
              url:'../TeacherNearParentsMap/TeacherNearParentsMap?latitude=' + '23.02067' + '&longitude=' + '113.75179',
            });
          }
        });
      }
    });
  },

  /**
   * 
   * @param {*} e
   * 教师中心，点击发布课程产品，跳转发布页面 
   */
  jumpRelease:function(){
    wx.navigateTo({
      url:'../teacherPeleaseProduct/teacherPeleaseProduct',
    });
  },

  /**
   * 
   * @param {*} e
   * 用户点击功能事件 
   */
  funClick:function(e){
    let that = this,num = e.currentTarget.dataset.index,teacherFuns = that.data.teacherFun,needId = e.currentTarget.dataset.id;
    if(needId !== 9){
      wx.navigateTo({
        url:'/teacherVersion' + teacherFuns[num].url,
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
   * 
   * @param {*} e
   * 完善资料 
   */
  perfectData:function(){
    wx.navigateTo({
      url:'/teacherVersion/teacherPerfectInfo/teacherPerfectInfo',
    });
  },
  
  /**
  * 用户选择类目
  */
 categoryClick:function(e){
   let that = this,useClick = e.currentTarget.dataset.index;
   that.setData({
     useClick:useClick,
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
   * @param {*} options
   * 返回悦优中心 
   */
  backyy:function(){
    wx.reLaunch({
      url: '/pages/aboutus/aboutus',
    });
  },
  
  /**
   * 
   * @param {*} e 
   * 发布动态
   */
  releaseDynamic:function(){
    wx.navigateTo({
      url:'/teacherVersion/teacherReleaseDynamic/teacherReleaseDynamic',
    });
  },

  /**
   * 评论/点赞等点击事件
   */
  smallIcon:function(e){
    let that = this,needIndex = e.currentTarget.dataset.index;
    if(needIndex === 1){
      wx.navigateTo({
        url:'/teacherVersion/teacherReview/teacherReview',
      });
    }
  },

  /**
   * 
   * @param {*} options
   * 教师点击查看更多招聘信息 
   */
  moreRecruit:function(){
    wx.navigateTo({
      url:'/teacherVersion/teacherRecruitList/teacherRecruitList',
    });
  },

  /**
   * 
   * @param {*} options 
   * 招聘详情页
   */
  recruitInfo:function(){
    wx.navigateTo({
      url:'/teacherVersion/teacherRecruit/teacherRecruit',
    });
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