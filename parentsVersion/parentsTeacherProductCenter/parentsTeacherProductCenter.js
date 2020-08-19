// pages/teacherProductCenter/teacherProductCenter.js
const datas = require('../../utils/data.js');
const app = getApp(), o = app.requirejs('core'),u = o.urlCon();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // banner
    imgUrls: [
      '../../image/banner2.png',
      '../../image/banner2.png',
    ],
    indicatorDots: false,
    autoplay: true,
    circular: true,
    interval: 3000,
    duration: 1000,
    isOrder: false,
    isShowIcon:true,

    platformInspect:datas.platformInspect, // 平台核查数据
    teacherClassInfo:datas.teacherClassInfo, // 课程信息
    productCenterData:datas.productCenterData, // 产品中心
    couponsInfo:datas.couponsInfo, // 优惠券信息
    classDetailsImg:datas.classDetailsImg, // 认证数据
  },

  /**
   * 
   * @param {*} options
   * 点击收藏课程 
   */
  collectionClick:function(){
    let that = this,
    use = that.data.use,
    type = 1; // 收藏类型（1教师课程）
    console.log(app.globalData.userInfo,'全局变量数据');
    console.log(that.data.id,'课程的组件id');
    if(Object.keys(use).length !== 0){
      if(that.data.isShowIcon){
        o.FunCollect(that,that.data.id,type);
      }else{
        o.funShowToast('该课程您已收藏');
      }
    }else{
      o.alert('提示','您尚未登录，请点击“ 确定 ”选择角色进行登录',res=>{
        if(res.confirm){
          wx.reLaunch({
            url: '/pages/chooseRole/chooseRole'
          })
        }
      });
    }
  },
  /**
   * 
   * @param {*} options
   * 用户预约课程 
   */
  orderClick:function(){
    wx.showToast({
      title: '申请已发送',
      icon: 'success',
      duration: 2000
    })  
  },

  /**
   * 
   * @param {*} options
   * 查看该教师的全部课程 
   */
  // 点击更多课程进入课程列表
  classMore:function(){
    wx.navigateTo({
      url:'../teacherProductList/teacherProductList',
    });
  },

  /**
   * 点击课程 跳转至课程详情
   */
  teacherProductClick:function(e){
    wx.navigateTo({
      url:'../teacherProductCenter/teacherProductCenter?id=' + e.currentTarget.dataset.id,
    });
  },

  /**
   * 
   * @param {*} options
   * 家长拨打电话 
   */
  callTel:function(){
    let that = this,
    use = that.data.use;
    if(Object.keys(use).length !== 0){
      wx.makePhoneCall({
        phoneNumber: this.data.tel //为昱升公司电话
      })
    }else{
      o.alert('提示','您尚未登录，请点击“ 确定 ”选择角色进行登录',res=>{
        if(res.confirm){
          wx.reLaunch({
            url: '/pages/chooseRole/chooseRole'
          })
        }
      });
    }
    
  },

  receiveCoupons:function(){
    wx.showModal({
      title: '温馨提示',
      content: '请点击“确定”向教师发出预约申请，教师通过后方可领取优惠券。',
      success (res) {
        if (res.confirm) {
          wx.showToast({
            title: '申请已发送',
            icon: 'success',
            mask:true,
            duration: 1500
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this,
    id = parseInt(options.id), // 课程id
    url = u + 'app/plat/tea/getTel?courseId=' + id, // 联系电话
    data = {},
    header = {"content-type":"application/json"};
    o.funClassDetail(that,id,'app/plat/tea/courseDetail','needData','1');
    o.get(url,data,header,callback=>{
      that.setData({tel:callback.data.tel});
    });
    that.setData({id:id});
    console.log(id);
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
    let that = this,
    id = that.data.id,
    use = app.globalData.userInfo;
    if(Object.keys(use).length !== 0){
      let token = use.token;
      o.FunCollectStatus(that,id,'1',token,'isShowIcon');
    }
    that.setData({use:use});
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