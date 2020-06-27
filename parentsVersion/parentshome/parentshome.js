// parentsVersion/parentshome/parentshome.js
const datas = require('../../utils/data.js');
const app = getApp(), o = app.requirejs('core');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 首页数据
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
    nearTeacherDatas: datas.nearTeacherData, // 附近教师
    institutionDetails:datas.institutionDetails, // 附近机构
    productCenterData:datas.productCenterData, // 教师产品
    institutionsProductCenterData:datas.institutionsProductCenterData, // 机构产品
    dynamicInfo:datas.dynamicInfo, // 动态信息
    bottomInfo:datas.bottomInfo, // 动态信息底部
    personalFun:datas.personalFun, // 个人中心信息
    
    teacherSituation:datas.teacherSituation,
    chooseCategory:['找教师','找机构'],
    useClick:0,
    region: ['', '', ''],
    multiArrayData:datas.multiArrayData,
    multiIndex: [0, 0],
    courseIndex:[0,0],
    genderArray:['男','女'],


    blockid:0,
    bgcolor:'#ffffff',
    color:"#707070",
    selectedColor:'#f2b04a',
    showborder:true,
    bordercolor:"#cccccc",
    tabbar:[
      {
        pagePath: "page/home0/index",
        selectedIconPath: '/tabBarImg/homeh.png',
        iconPath: '/tabBarImg/home.png',
        text: '首页',
        isdot: false,
        number: 0
      }, {
        pagePath: "page/home1/index",
        selectedIconPath: '/tabBarImg/kindh.png',
        iconPath: '/tabBarImg/kind.png',
        text: '附近教育',
        isdot: false,
        number: 0
      }, {
        pagePath: "page/home2/index",
        selectedIconPath: '/tabBarImg/myh.png',
        iconPath: '/tabBarImg/my.png',
        text: '附近动态',
        isdot: false,
        number: 0
      }, {
        pagePath: "page/home3/index",
        selectedIconPath: '/tabBarImg/shopcarth.png',
        iconPath: '/tabBarImg/shopcart.png',
        text: '个人中心',
        isdot: true,
        number: 0
      }
    ]
  },

  /**
   * 
   * @param {*} e
   * 查看更多教师 
   */
  moreTeacher:function(){
    wx.navigateTo({
      url:'/parentsVersion/parentsTeacherList/parentsTeacherList',
    });
  },

  /**
   * 
   * @param {*} e
   * 首页 教师课程产品点击事件 
   */
  teacherInfo:function(e){
    wx.navigateTo({
      url:'/parentsVersion/parentsTeacherDetails/parentsTeacherDetails',
    });
  },

  /**
   * 
   * @param {*} e
   * 更多教师课程 
   */
  classMore:function(e){
    wx.navigateTo({
      url:'/parentsVersion/parentsTeacherProductList/parentsTeacherProductList',
    });
  },

  /**
   * 首页 点击机构课程点击事件
   */
  institutionInfo:function(e){
    wx.navigateTo({
      url:'/parentsVersion/parentsInstitutionDetails/parentsInstitutionDetails',
    });
  },

  /**
   * 
   * @param {*} e
   * 查看附近教师 
   */
  viewNearTeacher:function(){
    app.MapEvent('/parentsVersion/parentsNearTeacherMap/parentsNearTeacherMap');
  },

  /**
   * 
   * @param {*} e
   * 查看附近机构
   */
  viewNearInstitution:function(){
    app.MapEvent('/parentsVersion/parentsNearInstitutionMap/parentsNearInstitutionMap');
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

  /**
   * 
   * @param {*} e
   * 性别选择器 
   */
  bindSelectorPickerChange:function(e){
    console.log(e);
  },

  /**
   * 
   * @param {*} e
   * 授课教师选择课类 
   */
  teacherPresentClick:function(e){
    let that = this,type = e.currentTarget.dataset.type;
    o.FunPresentClick(that,type,'teacherSetType');
  },

  /**
   * 
   * @param {*} e
   * 授课教师 课类组件弹出数据 
   * || ========================== 6/18 张 start
   */
  bindMultiPickerChange:function(e){
    let that = this,teacherData = e.detail.value;
    o.FunBindMultiPickerChange(that,teacherData,'multiIndex');
  },
  bindMultiPickerColumnChange:function(e){
    let that = this,
    stairType = that.data.teacherMultiArray[0],
    multiIndex = that.data.multiIndex,
    secondaryType = that.data.secondaryData;
    o.FunBindMultiPickerColumnChange(that,e,stairType,multiIndex,secondaryType,'teacherMultiArray');
  },

  /**
   * 
   * @param {*} e
   * 附近教育 教师点击事件
   */
  nearTeacher:function(e){
    wx.navigateTo({
      url:'/parentsVersion/parentsNearTeacher/parentsNearTeacher',
    });
  },

  /**
   * 
   * @param {*} e
   * 课程产品选择课类 
   */
  coursePresentClick:function(e){
    let that = this,type = e.currentTarget.dataset.type,chooseData = that.data.chooseData;
    o.FunPresentClick(that,type,'courseSetType',chooseData);
  },

  /**
   * 
   * @param {*} e
   * 授课教师 级段组件弹出数据 
   * || ========================== 6/18 张 start
   */
  courseBindChange:function(e){
    let that = this,courseData = e.detail.value;
    o.FunBindMultiPickerChange(that,courseData,'courseIndex');
  },
  bindMultiCourseColumnChange:function(e){
    let that = this,
    stairCourseType = that.data.courseMultiArray[0],
    courseIndex = that.data.courseIndex,
    secondaryCourseType = that.data.secondaryCourseData;
    o.FunBindMultiPickerColumnChange(that,e,stairCourseType,courseIndex,secondaryCourseType,'courseMultiArray');
  },

  /**
   * 
   * @param {*} e
   * 用户点击功能事件 
   */
  funClick:function(e){
    let that = this,num = e.currentTarget.dataset.index,personalFuns = that.data.personalFun,len = personalFuns.length,needId = e.currentTarget.dataset.id;
    if(needId !== 4){
      wx.navigateTo({
        url:'/parentsVersion' + personalFuns[num].url,
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
   * 进入日记中心 
   */
  DiaryCenterClick:function(){
    wx.navigateTo({
      url:'/parentsVersion/parentsDiaryCenter/parentsDiaryCenter',
    });
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    if(that.data.blockid === 0){
      // 首页数据加载
    }else if(that.data.blockid === 1){
      // 附近教育 数据加载
      // 课类数据
      teacherChooseData =  that.data.multiArrayData[0],
      teacherMultiArray = teacherChooseData.multiArray,
      secondaryData = teacherChooseData.secondaryData;
      // 级段数据
      courseChooseData =  that.data.multiArrayData[1],
      courseMultiArray = courseChooseData.courseTypeData,
      secondaryCourseData = courseChooseData.secondaryCourseData;

      console.log(secondaryData,'123');
      that.setData({
        // 课类数据
        teacherMultiArray:teacherMultiArray,
        secondaryData:secondaryData,
        // 级段数据
        courseMultiArray:courseMultiArray,
        secondaryCourseData:secondaryCourseData,
      });
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