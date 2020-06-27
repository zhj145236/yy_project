// pages/goodTeacher/goodTeacher.js
const datas = require('../../utils/data.js');
const app = getApp(), o = app.requirejs('core');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teacherSituation:datas.teacherSituation,
    userChoose:datas.userChoose,
    nearTeacherDatas: datas.nearTeacherData, // 附近教师
    productCenterData:datas.productCenterData, // 教师产品
    chooseCategory:['授课教师','课程产品'],
    useClick:0,
    region: ['', '', ''],
    multiArrayData:datas.multiArrayData,
    multiIndex: [0, 0],
    courseIndex:[0,0],
    genderArray:['男','女'],
    chooseData:'',
  },

  /**
   * 
   * @param {*} e
   * 查看附近教师 
   */
  viewNearTeacher:function(){
    app.FunGetSeting(data=>{
      console.log(data.authSetting['scope.userLocation'],'授权数据');
      // 用户授权的时候监听用户曾经是否有授权行为，如果授权则走true，否则走false
      if(data.authSetting['scope.userLocation']){
        console.log('111');
        o.FunGetLocation('gcj02',callback=>{
          let latitude = callback.latitude,longitude = callback.longitude;
          wx.navigateTo({
            url:'../nearTeacherMap/nearTeacherMap?latitude=' + latitude + '&longitude=' + longitude,
          });
        });
      }else{
        console.log('222');
        o.FunGetLocation('wgs84',callback=>{
          let errMsg = callback.errMsg;
          if(errMsg === "getLocation:ok"){
            const latitude = callback.latitude,longitude = callback.longitude;
            wx.navigateTo({
              url:'../nearTeacherMap/nearTeacherMap?latitude=' + latitude + '&longitude=' + longitude,
            });
          }else{
            wx.navigateTo({
              url:'../nearTeacherMap/nearTeacherMap?latitude=' + '23.02067' + '&longitude=' + '113.75179',
            });
          }
        });
      }
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
   * 授课教师 课类组件弹出数据 
   * || ========================== 6/18 张 end
   */


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
   * 授课教师 级段组件弹出数据 
   * || ========================== 6/18 张 end
   */



  /**
   * 
   * @param {*} e
   * 课程产品选择课类 
   */
  coursePresentClick:function(e){
    let that = this,type = e.currentTarget.dataset.type,chooseData = that.data.chooseData;
    o.FunPresentClick(that,type,'courseSetType',chooseData);
  },

  // 点击教师简介进入教师详情
  teacherInfo:function(e){
    wx.navigateTo({
      url:'../teacherDetails/teacherDetails',
    });
  },
  
   // 点击更多教师进入教师列表页面
   moreTeacher:function(){
    wx.navigateTo({
      url:'../teacherList/teacherList',
    }); 
  },

  regionBindchange:function(e){
    console.log(e,'数据');
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this,
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