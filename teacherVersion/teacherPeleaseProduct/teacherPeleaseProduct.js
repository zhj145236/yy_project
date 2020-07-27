// teacherVersion/teacherPeleaseProduct/teacherPeleaseProduct.js
const datas = require('../../utils/data.js');
const app = getApp(), o = app.requirejs('core');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newArr:[],
    isUpload:true,
    array: ['一对一', '一对多'],
    objectArray: [{id: 0,name: '一对一'},{id: 1,name: '一对多'}],
    placeArray:['教师家','教师','家长家','悦优场地','其他'],
    objectPlaceArray:[{id: 0,name: '教师家'},{id: 1,name: '教师'},{id: 1,name: '家长家'},{id: 1,name: '悦优场地'},{id: 1,name: '其他'}],
    multiArray: [['小学', '初中','高中'], ['小学一年级', '小学二年级', '小学三年级', '小学四年级', '小学五年级', '小学六年级', '初中一年级', '初中二年级', '初中三年级','高中一年级','高中二年级','高中三年级']],
    objectMultiArray: [[{id: 0,name: '小学一年级'},{id: 1,name: '小学二年级'},{id: 2,name: '小学三年级'},{id: 3,name: '小学四年级'},{id: 4,name: '小学五年级'},{id: 5,name: '小学六年级'},], [{id: 0,name: '初中一年级'},{id: 1,name: '初中二年级'},{id:2,name: '初中三年级'}],[{id: 0,name: '高中一年级'},{id: 1,name: '高中二年级'},{id: 2,name: '高中三年级'}]],
    multiIndex: [0, 0],
    typeIndex:0,
    siteIndex:0,
    needUrl:[],
  },

  /**
   * 
   * @param {*} options
   * 产品详情图上传 
   */
  uploadImg:function(){
    let that = this,needUrl = that.data.needUrl;
    o.FunchooseImage(that,that.data.newArr,9,['compressed'],['album', 'camera'],'tempFilePathsArr',callback=>{
      let tempFilePaths = callback.tempFilePaths,
      len = tempFilePaths.length,
      use = that.data.use,
      // token = use.token;
      token = "yueyou eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMzUxMTExMTExMSIsImF1dGgiOiIiLCJqdGkiOiIzYzY3ZjRhNzg4ZmU0YzIzODgzZGFjYmE1MjAxN2EzMyJ9.b73Xpev8Ve9OOK6jpmy8xPePn1OZXRouESLu2GEDZhfOHZLSYfUpNzMXAyT2anL7BjO8u-u-VREeB3HtO-lV8g";
      for(let z=0;z<len;z++){
        o.FunUploadImg(z,'file',token,tempFilePaths,callback=>{
          if(Number(z+1) == len){
            wx.hideLoading();
            o.funShowToast('已经完成上传了');
          }else{
            wx.showLoading({
              title:'正在上传第' + Number(z+1) + '张',
            });
          }
          needUrl.push(JSON.parse(decodeURIComponent(callback.data)).url);
        });
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
    tempFilePathsArr = that.data.tempFilePathsArr;
    wx.previewImage({
      current: tempFilePathsArr[index], //当前显示图片
      urls: tempFilePathsArr //所有图片
    });
  },



  /**
   * 
   * @param {*} options
   * 产品封面图上传 
   */
  coverImg:function(){
    const that = this;
  },

  // 授课方式
  bindPickerChange: function(e) {
    console.log(e)
    this.setData({
      typeIndex: e.detail.value
    })
  },

  // 报名开始时间
  startBindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startDate: e.detail.value
    })
  },

  // 报名结束时间
  endBindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endDate: e.detail.value
    })
  },

  // 优惠券有效日期开始
  startCouponsBindDateChange:function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startCouponsDate: e.detail.value
    })
  },

   // 优惠券有效日期结束
   endCouponsBindDateChange:function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endCouponsDate: e.detail.value
    })
  },

  // 上课开始时间
  startBindTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startTime: e.detail.value
    })
  },

  // 上课开始时间
  endBindTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endTime: e.detail.value
    })
  },

  // 开课日期
  classesDateChange:function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      classesDate: e.detail.value
    })
  },

  /**
   * 
   * @param {*} options
   * 授课地点 
   */
  placeBindPickerChange:function(e){
    console.log(e)
    this.setData({
      siteIndex: e.detail.value
    })
  },

  /**
   * 选择级段
   */
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },

  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['小学一年级', '小学二年级', '小学三年级', '小学四年级', '小学五年级', '小学六年级'];
            break;
          case 1:
            data.multiArray[1] = ['初中一年级', '初中二年级', '初中三年级'];
            break;
          case 2:
            data.multiArray[1] = ['高中一年级', '高中二年级', '高中三年级'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
    }
    console.log(data.multiIndex);
    this.setData(data);
  },

  /**
   * 
   * @param {*} options
   * 提交数据 
   */
  formSubmit:function(e){
    let that = this;
    console.log(that.data.needUrl,'需要的url');
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this,use = app.globalData.userInfo;
    that.setData({use:use});
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