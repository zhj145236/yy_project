// parentsVersion/parentsFocus/parentsFocus.js
const datas = require('../../utils/data.js');
const app = getApp(), o = app.requirejs('core');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dynamicInfo:datas.dynamicInfo, // 动态信息
    bottomInfo:datas.bottomInfo, // 动态信息底部
    nums:0,
    chooseCoupons:[
      {name:'好友动态',num:'3'},
      {name:'我的动态',num:'1'},
      {name:'我的关注',num:'0'},
      {name:'谁关注了我',num:'0'}
    ], // 状态选择
    isShowTitle:false, // 我关注了谁
    isWhoFocus:false, // 谁关注了我
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

  /**
   * 
   * @param {*} options
   * 选择状态
   */
  chooseCoupons:function(e){
    console.log(e);
    let that = this,index = e.currentTarget.dataset.index;
    that.setData({
      nums:index
    });
  },

  /**
   * 取消关注
   * @param {*} options 
   */
  unFollow:function(e){
    let that = this,
    page = 0,
    size = 10;
    o.alert('提示','请确定是否要取消对' + e.currentTarget.dataset.nickname + '的关注',callback=>{
      if(callback.confirm){
        o.FunUnFollow(that,e.currentTarget.dataset.followedid,e.currentTarget.dataset.delimdex,that.data.focusData,'focusData');
        // 重新获取好友动态
        o.FunFollowerDynamic(that,page,size,'dynamicInfo');
        // 获取谁关注了我的信息数据接口
        o.FunWhoFocus(that,'whoFocusData','isWhoFocus');
      }
    });
  },

  /**
   * 用户点击关注的点击事件
   */
  focusOnClick:function(e){
    let that = this,
    use = that.data.use,
    token = use.token,
    uid = parseInt(e.currentTarget.dataset.uid),
    fbrole = e.currentTarget.dataset.fbrole,
    sendRole = '',
    page = 0,
    size = 10;
    if(fbrole === '家长'){
      sendRole = 'par';
    }else if(fbrole === '教师'){
      sendRole = 'tea';
    }else{
      sendRole = 'org';
    }
    if(e.currentTarget.dataset.followed){
      o.funShowToast('您已经关注了该用户，无需重复关注');
    }else{
      o.FunFocusOn(uid,sendRole,token,callback=>{
        console.log(callback,'关注成功');
        if(callback.statusCode === 200){
          let whoFocusData = that.data.whoFocusData,focusOnNum = e.currentTarget.dataset.gzindex;
          whoFocusData[focusOnNum].followed = true;
          o.funShowToast('关注成功');
          // 获取我的关注信息接口
          o.FunMyFocus(that,'focusData','isShowTitle');
          // 获取我的好友动态
          o.FunFollowerDynamic(that,page,size,'dynamicInfo');
          that.setData({whoFocusData:whoFocusData});
        }
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this,
    use = app.globalData.userInfo,
    userId = parseInt(use.user.userId),
    page = 0,
    size = 10;
    that.setData({userId:userId,use:use});
    // 获取设备的信息
    o.getSystemInfo(callback=>{
      that.setData({windowHeight:callback.windowHeight - 310 + 'px'});
    })
    // 获取我的好友动态
    o.FunFollowerDynamic(that,page,size,'dynamicInfo');
    // 获取动态信息接口
    o.FunDynamicOrDiaryList(that,page,size,0,'dynamic','myDynamic');

    // 获取我的关注信息接口
    o.FunMyFocus(that,'focusData','isShowTitle');

    // 获取谁关注了我的信息数据接口
    o.FunWhoFocus(that,'whoFocusData','isWhoFocus');
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