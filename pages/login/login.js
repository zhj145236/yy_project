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
    isPhone:false, // 验证手机号是否正确
    isCode:false, // 验证码是否输入正确
  },

  /**
   * 
   * @param {*} e
   * 用户点击使用协议 
   */
  useDealClick:function(){
    wx.navigateTo({
      // url:'../serviceDeal/serviceDeal',
      url:'/pages/serviceDeal/serviceDeal',
    });
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
    console.log(e,'授权数据');
    let that = this,
    userInfoSucces = e.detail.errMsg,
    useType = that.data.useType,
    role = that.data.role;
    if(userInfoSucces == 'getUserInfo:ok'){
      o.FunWxLogin(e.detail.encryptedData,useType,e.detail.iv,role);
    }
  },

  /***
   * 输入手机号验证
   */
  bindblur:function(e){
    let that = this,validationPhone = /^1[3456789]\d{9}$/;
    o.ridBlankSpace('phoneNum',that,e.detail.value); // 去除空格
    if(that.data.phoneNum !== ''){
    // 当手机号输入框失去焦点时验证
    if(!validationPhone.test(that.data.phoneNum)){
      o.funShowToast('手机号输入有误，请重新输入');
      that.setData({
        phoneNum:'',
        isPhone:false
      });
      }else{
        that.setData({
          phoneNum:that.data.phoneNum,
          isPhone:true
        });
      }
    }else{
      o.funShowToast('手机号不能为空');
    }
  },

  /**
   * 获取手机验证码倒计时
   */
  countdownClick:function(){
    let that = this,isPhone = that.data.isPhone,phoneNum = that.data.phoneNum;
    console.log(phoneNum,'111');
    if(phoneNum === undefined){
      o.funShowToast('请输入手机号');
      return;
    }
    
    if(isPhone){
      console.log('123');
      that.setData({
        isShow:true,
      });
      o.timesFun(60,that,'isShow');
      o.FunGetCode(phoneNum,"log");
    }
  },

  /**
   * 
   * @param {*} e 
   * 验证码 输入验证 去除空格
   */
  bindblurCode:function(e){
    let that = this;
    o.ridBlankSpace('verification',that,e.detail.value);
    console.log(that.data.verification.length,'返回正常数据');
    if(that.data.verification !== ''){
      if(that.data.verification.length === 6){
        that.setData({
          verification:that.data.verification,
          isCode:true,
        });
      }else{
        o.funShowToast('请输入正确的6位验证码');
        that.setData({
          verification:'',
          isCode:false,
        });
      }
    }else{
      o.funShowToast('验证码不能为空');
    }
  },

  /**
   * 手机号验证
   * @param {*} e 
   */
  bindblurSjh:function(e){
    let that = this,validationPhone = /^1[3456789]\d{9}$/;
    o.ridBlankSpace('val',that,e.detail.value); // 去除空格
    if(that.data.val !== ''){
      // 当手机号输入框失去焦点时验证
      if(!validationPhone.test(that.data.val)){
        o.funShowToast('手机号输入有误，请重新输入');
        that.setData({
          val:'',
          isPhoneNum:false
        });
      }else{
        that.setData({
          val:that.data.val,
          isPhoneNum:true
        });
      }
    }else{
      o.funShowToast('手机号不能为空');
    }
  },

  /**
   * 密码验证
   * @param {*} e 
   */
  bindblurPwd:function(e){
    let that = this;
    o.ridBlankSpace('pasd',that,e.detail.value); // 去除空格
  },

  /**
   * 
   * @param {*} options
   * 输入账号密码登录 
   */
  formSubmit:function(e){
    let that = this,
    nums = that.data.nums,
    isPhone = that.data.isPhone,
    isCode = that.data.isCode,
    useType = that.data.useType,
    checkboxEx = e.detail.value.checkbox[0],
    isPhoneNum = that.data.isPhoneNum,
    role = that.data.role;
    console.log(nums,'点击登陆');
    switch(nums){
      case 0:
        console.log(e,'手机登录');
        let val = e.detail.value.val,pasd = e.detail.value.pasd;
        if(val === ""){
          o.funShowToast('手机号不能为空');
          return;
        }else{
          o.ridBlankSpace('val',that,val); // 去除空格
        }
        if(isPhoneNum){
          if(pasd === ""){
            o.funShowToast('密码不能为空');
            return;
          }else{
            o.ridBlankSpace('pasd',that,pasd); // 去除空格
          }
        }
        o.FunPhoneWorldLogin(val,pasd,role,useType);
        break;
      case 1:
        console.log(e,'验证码登录');
        let phoneNum = e.detail.value.phoneNum,verification = e.detail.value.verification;
        if(phoneNum === ""){
          o.funShowToast('手机号不能为空');
          return;
        }
        if(isPhone){
          if(verification === ""){
            o.funShowToast('验证码不能为空');
            return;
          }
        }
        // 是否同意用户协议
        if(checkboxEx === undefined){
          o.funShowToast('使用悦优前，请务必认证阅读并同意《用户使用协议》');
          return;
        }

        if(isPhone && isCode){
          o.FunCodeLogin(phoneNum,verification,useType,role);
        }
        break;
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options,'返回数据');
    let that = this,useType = options.index,role = options.role,use = {};
    that.setData({
      useType:useType,
      role:role,
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