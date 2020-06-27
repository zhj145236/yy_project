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
  },

  /**
   * 
   * @param {*} options
   * 产品详情图上传 
   */
  uploadImg:function(){
    const that = this,newsArr = that.data.newArr,uploadNum = 8 - newsArr.length;
    console.log(uploadNum);
    if(uploadNum == 0){
      o.showToast('已经上传了8张，无法继续上传');
    }else{
      wx.chooseImage({
        count: uploadNum,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success (res) {
          // tempFilePath可以作为img标签的src属性显示图片
          let tempFilePathsArr = that.data.newArr,tempFilePaths = res.tempFilePaths;
          // 返回base64
          // wx.getFileSystemManager().readFile({
          //   filePath: res.tempFilePaths[0], //选择图片返回的相对路径
          //   encoding: '', //编码格式
          //   success: res => { //成功的回调
          //     console.log(res)
          //     that.setData({
          //       img: + res.data
          //     });
          //   }
          // })

          // 上传文件
          // wx.uploadFile({
          //   url: o.urlCon() + 'api/pictures', //仅为示例，非真实的接口地址
          //   filePath: tempFilePaths[0],
          //   name: 'file',
          //   header: {
          //     'content-type': 'multipart/form-data',
          //   },
          //   formData: {
          //   },
          //   success (res){
          //     const data = res.data;
          //     console.log(data,'11');
          //     //do something
          //   },
          //   fail(res){
          //     console.log(res,'22');
          //   }
          // })
          for(let i in tempFilePaths){
            tempFilePathsArr.push(tempFilePaths[i]);
          }
          that.setData({
            tempFilePathsArr:tempFilePathsArr
          });
        }
      })
    }
  },

  /**
   * 
   * @param {*} options
   * 产品封面图上传 
   */
  coverImg:function(){
    const that = this;
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success (res) {
          // tempFilePath可以作为img标签的src属性显示图片
          let tempFilePaths = res.tempFilePaths;
          // 返回base64
          // wx.getFileSystemManager().readFile({
          //   filePath: res.tempFilePaths[0], //选择图片返回的相对路径
          //   encoding: '', //编码格式
          //   success: res => { //成功的回调
          //     console.log(res)
          //     that.setData({
          //       img: + res.data
          //     });
          //   }
          // })

          // 上传文件
          // wx.uploadFile({
          //   url: o.urlCon() + 'api/pictures', //仅为示例，非真实的接口地址
          //   filePath: tempFilePaths[0],
          //   name: 'file',
          //   header: {
          //     'content-type': 'multipart/form-data',
          //   },
          //   formData: {
          //   },
          //   success (res){
          //     const data = res.data;
          //     console.log(data,'11');
          //     //do something
          //   },
          //   fail(res){
          //     console.log(res,'22');
          //   }
          // })
          that.setData({
            productCover:tempFilePaths
          });
        }
      })
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
    console.log(e);
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