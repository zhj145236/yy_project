// pages/teacherDetails/teacherDetails.js
const datas = require('../../utils/data.js');
const app = getApp(), o = app.requirejs('core');
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
    couponsInfo:datas.couponsInfo, // 优惠券信息

    platformInspect:datas.platformInspect, // 平台核查数据
    institutionsInfo:datas.institutionsInfo, // 机构信息
    institutionsProductCenterData:datas.institutionsProductCenterData, // 产品中心
    institutionsApproveInfo:datas.institutionsApproveInfo, // 认证数据
    myInfo:'无锡红光标牌有限公司是一家集研发、生产、销售和服务于一体的专业标牌生产厂家。注册资金500万人民币。主要生产塑料基材、软塑透明树脂、金属、模内复合等标牌产品，洗衣机顶盖板总成，平衡板，以及塑印、彩印、顶盖板、吸音垫等产品。公司位于长江三角洲经济快速增长、风景秀丽的太湖之畔——无锡。 公司自1984年成立至今，已经过了3次跨越式的发展。2004年至今公司投入5000多万元资金建设新的生产基地，目前已竣工并投入生产，占地面积达40000m2，厂房面积近15000m2。公司2004年的年产值达4350多万元，并且每年以平均30%的速度快速增长。目前，本公司的产品已具备国际及国内多项质量认证证书，并为知名家用电器企业：小天鹅电器有限公司、三星电子有限公司、海尔集团、惠尔普等配套生产各类标牌。可以说客户是我们的老师，和他们合作使我们得到很多的学习机会来提高自身的技术水平和管理水平，是我们生产和发展的动力。 公司本着“千方百计生产出满足顾客期望和要求的产品”的宗旨，坚持“工厂出产的不仅仅是产品，更重要的是信誉和质量”的经营理念，不断吸收新技术、引进新设备，使公司的经济效益蒸蒸日上。相信公司将会永不停止探索和发展的脚步，和中国国内以及世界国际性大公司同步发展。', // 人生格言
    title:'恐低的鸟：',
    con:'看了你的资料我感觉你特别有能力，我孩子数学有些偏科不知道你是否有兴趣帮我做一下一对一辅导。',
    teacherCon:'非常感谢您的留言，我近期有很多业余时间，不知道您是否方便，您孩子现在是上几年级呢！？。'
  },

  // 点击更多产品进入产品列表页
  institutionsMoreProduct:function(){
    wx.navigateTo({
      url:'../institutionsProductList/institutionsProductList',
    });
  },

  // 点击产品进入产品详情页面
  institutionsProductClick:function(){
    wx.navigateTo({
      url:'../institutionsProductCenter/institutionsProductCenter',
    });
  },

  // 提交留言
  bindFormSubmit:function(e){
    console.log(e,'这是返回的数据');
  },

  bindVideoEnterPictureInPicture:function(){
    let that = this,createStyle = '';
    createStyle = 'position:fixed;width:60%;height:200rpx;right:20rpx;bottom:200rpx';
    that.setData({setStyle:createStyle});
  },
  bindVideoLeavePictureInPicture:function(){
    let that = this,createStyle = '';
    that.setData({setStyle:createStyle});
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options,'数据');
    let that = this,id = options.id;
    o.funTeacherDetails(that,id,'app/org/center/home','needData','2');
    console.log(that.data.orgName);
    // bindenterpictureinpicture.eventhandler
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

  onPageScroll:function(e){
    let that = this;
    if(e.scrollTop === 200){
      console.log('111');
      that.bindVideoEnterPictureInPicture();
    }
    if(e.scrollTop === 0){
      that.bindVideoLeavePictureInPicture();
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function (e) {
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