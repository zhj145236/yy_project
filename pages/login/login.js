// pages/login/login.js
const datas = require('../../utils/data.js');
const app = getApp(), o = app.requirejs('core');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inpLoginWay:datas.inpLoginWay,
    impowerLoginWay:datas.impowerLoginWay,
    isShow:false,
    nums:0,
    isPhone:false,
  },

  /**
   * 
   * @param {*} options
   * 输入登录方式 
   */
  inpLoginWay:function(e){
    let that = this,num = e.currentTarget.dataset.index;
    console.log(num,'999');
    that.setData({
      nums:num,
    });
  },

  /**
   * 
   * @param {*} options
   * 输入授权登录方式 
   */
  impowerLoginWay:function(e){
    let that = this,sub = e.currentTarget.dataset.index,useType = that.data.useType;
    app.globalData.userInfo = "";
    // 用户选择游客身份登录
    switch(sub){
      case 1:
        that.jumpFun(useType);
        break;
    }
  },

  // getPhoneNumber (e) {
  //   console.log(e.detail.errMsg)
  //   console.log(e.detail.iv)
  //   console.log(e.detail.encryptedData)
  // },

  /**
   * 
   * @param {*} e
   * 跳转封装 
   */
  jumpFun:function(n){
    switch(parseInt(n)){
      case 0:
        wx.reLaunch({
          url: '/parentsVersion/parentshome/parentshome'
        });
        break;
      case 1:
        wx.reLaunch({
          url: '/teacherVersion/teacherhome/teacherhome'
        });
        break;
      case 2:
        wx.reLaunch({
          url: '/institutionVersion/institutionshome/institutionshome'
        });
        break;
    }
  },

  /**
   * 
   * @param {*} e
   * 用户选择微信身份登录 
   */
  getUserInfo:function(e){
    let that = this,
    userInfoSucces = e.detail.errMsg,
    useType = that.data.useType;
    if(userInfoSucces == 'getUserInfo:ok'){
      let userInfo = e.detail.userInfo;
      app.globalData.userInfo = userInfo;
      that.jumpFun(useType);
    }
  },

  /**
   * 获取手机验证码倒计时
   */
  countdownClick:function(){
    let that = this,isPhone = that.data.isPhone;
    console.log(isPhone,'222');
    if(isPhone){
      that.setData({
        isShow:true,
      });
      o.timesFun(10,that,'isShow');
    }
  },

  /***
   * 输入手机号验证
   */
  bindblur:function(e){
    let that = this,phoneNum = e.detail.value,validationPhone = /^1[3456789]\d{9}$/;
    o.ridBlankSpace(phoneNum,that,'phoneNum');
    // 当手机号输入框失去焦点时验证
    if(!validationPhone.test(phoneNum)){
      o.showToast('手机号输入有误，请重新输入');
      that.setData({
        phoneNum:'',
        isPhone:false
      });
    }else{
      that.setData({
        phoneNum:phoneNum,
        isPhone:true
      });
    }
    console.log(e,'123');
  },

  /**
   * 
   * @param {*} options
   * 输入账号密码登录 
   */
  formSubmit:function(e){
    let that = this,nums = that.data.nums;
    switch(nums){
      case 1:
        console.log('手机登录');
        break;
      case 2:
        let val = e.detail.value.val,pasd = e.detail.value.pasd;
        break;
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this,useType = options.index,use = {};
    that.setData({
      useType:useType
    });
    // 用户选择的角色类型 0家长 1教师 2机构
    switch(parseInt(useType)){
      case 0:
        use.backImg = '/image/loginbjt1.png';
        use.img = '/image/yyjzlogo.png';
        use.btnColor = '#f2b04a';
        use.useLogin = '家长版 · 登录';
        use.nameColor = '#f2b04a';
        use.iconColor = 'rgba(242,176,74,0.6)';
        that.setData({
          use:use
        });
        wx.setNavigationBarTitle({
          title: '家长版 · 登录'
        })
        wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor:'#f2b04a',
        });
        break;
      case 1:
        use.backImg = '/image/loginbjt2.png';
        use.img = '/image/yyjslogo.png';
        use.btnColor = '#74cdce';
        use.useLogin = '教师版 · 登录';
        use.nameColor = '#74cdce';
        use.iconColor = 'rgba(116,205,206,0.6)';
        that.setData({
          use:use
        });
        wx.setNavigationBarTitle({
          title: '教师版 · 登录'
        })
        wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor:'#74cdce',
        });
        break;
      case 2:
        use.backImg = '/image/loginbjt3.png';
        use.img = '/image/yylogo.png';
        use.btnColor = '#69a5fb';
        use.useLogin = '企业版 · 登录';
        use.nameColor = '#007bd0';
        use.iconColor = 'rgba(105,165,251,0.6)';
        that.setData({
          use:use
        });
        wx.setNavigationBarTitle({
          title: '企业版 · 登录'
        })
        wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor:'#69a5fb',
        });
        break;
    }
    o.getSystemInfo((data)=>{
      that.setData({
        windowHeight:data.windowHeight,
        windowWidth:data.windowWidth,
      });
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