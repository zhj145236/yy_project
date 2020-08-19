// parentsVersion/parentsRegistered/parentsRegistered.js
const datas = require('../../utils/data.js');
const app = getApp(), o = app.requirejs('core');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    registeredInfo:datas.registeredInfo,
    isShow:true,
    isCountdown:false,
  }, 

  /**
   * 
   * @param {*} e
   * 用户点击显示或关闭密码的显示 
   * isShow为false则用户选择的是隐藏密码
   * isShow为true则用户选择的是显示密码
   */
  mimaClick:function(e){
    let that = this,nums = e.currentTarget.dataset.index;
    switch(parseInt(nums)){
      case 0:
        // wx.login({
        //   success:function(e){
        //     console.log(e,'数据');
        //     let code = e.code;
        //     wx.request({
        //       url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxd5ec71e89a8e58e5&secret=d2142decc0708192a2116b67d4c340c2&js_code='+ code +'&grant_type=authorization_code',
        //       method:'GET',
        //       data:{},
        //       success:function(res){
        //         console.log(res,'返回数据');
        //       }
        //     })
        //   }
        // });
        break;
      case 1:
        if(that.data.isShow){
          that.setData({
            isShow:false
          });
        }else{
          that.setData({
            isShow:true
          });
        }
        break;
      case 2:
        let isPhone = that.data.isPhone,
        isPassword = that.data.isPassword,
        phoneNum = that.data.phoneNum;
        if(isPhone && isPassword){
          o.FunGetCode(phoneNum,"psd"); // 获取手机验证码
          that.setData({
            isCountdown:true,
          });
          o.timesFun(10,that,'isCountdown');
        }else{
          if(!isPhone){
            o.funShowToast('请输入注册手机号');
            return;
          }
          if(!isPassword){
            o.funShowToast('请设置符合要求的密码');
            return;
          }
        }
        break;
    }
  },

  /**
   * 
   * @param {*} e
   * 用户点击使用协议 
   */
  useDealClick:function(){
    wx.navigateTo({
      url:'/pages/serviceDeal/serviceDeal',
    });
  },

  /***
   * 输入手机号验证
   */
  bindblurSjh:function(e){
    let that = this,dataE = e,phoneNum = e.detail.value,validationPhone = /^1[3456789]\d{9}$/;
    o.ridBlankSpace('phoneNum',that,e.detail.value); // 去除空格
    // 当手机号输入框失去焦点时验证
    if(!validationPhone.test(phoneNum)){
      o.funShowToast('手机号输入有误，请重新输入');
      that.setData({
        phoneNum:'',
        isPhone:false
      });
      return;
    }else{
      that.setData({
        phoneNum:phoneNum,
        isPhone:true,
      });
    }
  },

  /**
   * 
   * @param {*} options
   * 密码验证 
   */
  bindblurMm:function(e){
    let that = this,dataE = e,passwordEx = e.detail.value,validationPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,10}$/;
    o.ridBlankSpace('passwordEx',that,e.detail.value); // 去除空格
    // 当手机号输入框失去焦点时验证
    if(!validationPassword.test(passwordEx)){
      o.funShowToast('密码格式有误');
      that.setData({
        passwordEx:'',
        isPassword:false,
      });
      return;
    }else{
      that.setData({
        passwordEx:passwordEx,
        isPassword:true,
      });
    }
  },

  /**
   * 验证码去空格
   * @param {*} e 
   */
  bindblurYzm:function(e){
    let that = this;
    o.ridBlankSpace('verificationCode',that,e.detail.value); // 去除空格
  },

  /**
   * 
   * @param {*} e
   * 用户信息提交 
   */
  formSubmit:function(e){
    let that = this,
    dataE = e.detail.value,
    passwordEx = dataE.password,
    validationPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,10}$/,
    validationPhone = /^1[3456789]\d{9}$/,
    verificationCodeEx = dataE.verificationCode,
    // checkboxEx = dataE.checkbox[0],
    phoneNum = dataE.phoneNum;
    phoneNum = phoneNum.replace(/(^\s*)|(\s*$)/g,"");
    passwordEx = passwordEx.replace(/(^\s*)|(\s*$)/g,"");
    verificationCodeEx = verificationCodeEx.replace(/(^\s*)|(\s*$)/g,"");
    console.log(e,'提交的信息');
    // 手机号码验证
    if(phoneNum == ''){
      o.funShowToast('请输入注册手机号');
      return;
    }else{
      // 当手机号输入框失去焦点时验证
      if(!validationPhone.test(phoneNum)){
        o.funShowToast('手机号输入有误，请重新输入');
        that.setData({
          phoneNum:''
        });
        return;
      }else{
        that.setData({
          phoneNum:phoneNum
        });
      }
    }
    
    // 密码验证
    if(passwordEx == ''){
      o.funShowToast('请设置密码');
      return;
    }else{
      // 当密码输入框失去焦点时验证
      if(!validationPassword.test(passwordEx)){
        o.funShowToast('密码格式错误，请重新输入');
        that.setData({
          passwordEx:''
        });
        return;
      }else{
        that.setData({
          passwordEx:passwordEx
        });
      }
    }
    
    // 验证码验证
    if(verificationCodeEx !== ""){
      o.ridBlankSpace('verificationCode',that,verificationCodeEx); // 去除空格
      console.log(verificationCodeEx.length,'数据');
      that.setData({
        verificationCode:verificationCodeEx
      });
    }else{
      o.funShowToast('请输入验证码');
      return;
    }
    o.FunSetInfo(that.data.phoneNum,that.data.verificationCode,that.data.passwordEx);
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this,
    use = app.globalData.userInfo;
    if(use.user.telephone !== '' && use.user.telephone !== null){
      that.setData({phoneNum:use.user.telephone,isShowPhone:true,isPhone:true});
    }else{
      that.setData({isShowPhone:false});
    }
    console.log(use);
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