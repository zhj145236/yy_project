// parentsVersion/parentsReview/parentsReview.js
const datas = require('../../utils/data.js');
const app = getApp(), o = app.requirejs('core');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:true,
    isBtmShow:true,
    focus:false,
    placeholder:'回复：',

    title:'恐低的鸟：',
    con:'看了你的资料我感觉你特别有能力，我孩子数学有些偏科不知道你是否有兴趣帮我做一下一对一辅导。',
    teacherCon:'非常感谢您的留言，我近期有很多业余时间，不知道您是否方便，您孩子现在是上几年级呢！？。'
  },

  /**
   * 用户点击关注的点击事件
   */
  focusOnClick:function(e){
    let that = this,
    use = that.data.use,
    // token = use.token,
    token = "yueyou eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNTAxMTExMTExMSIsImF1dGgiOiIiLCJqdGkiOiI3MDYxNmI2NjQ5NmQ0Yzc4ODY1ODBiNWM4ZTBlN2I5MSJ9.nO8ieN2oCucBqdERTKCGMWhjFUJxDX7FdSPiNWdv9S4gY0MpAjR9NRRBbRqiVNW8oNqgDywoFmaeVZXO7FPoww",
    uid = parseInt(that.data.uid),
    fbrole = that.data.fbrole;
    if(that.data.followed === 'true'){
      o.funShowToast('您已经关注了该用户，无需重复关注');
    }else{
      o.FunFocusOn(uid,fbrole,token,callback=>{
        if(callback.statusCode === 200){
          o.funShowToast('关注成功');
          that.setData({followed:'true'});
        }
      });
    }
  },

  /**
   * 
   * @param {*} e 
   * 用户给动态留言
   */
  bindFormSubmit:function(e){
    let that = this,
    use = that.data.use,
    // token = use.token,
    token = "yueyou eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNTAxMTExMTExMSIsImF1dGgiOiIiLCJqdGkiOiI3MDYxNmI2NjQ5NmQ0Yzc4ODY1ODBiNWM4ZTBlN2I5MSJ9.nO8ieN2oCucBqdERTKCGMWhjFUJxDX7FdSPiNWdv9S4gY0MpAjR9NRRBbRqiVNW8oNqgDywoFmaeVZXO7FPoww",
    pid = that.data.pid,
    uid = that.data.uid,
    fbrole = that.data.fbrole,
    message = e.detail.value.textarea;
    o.FunMessage(that,pid,uid,fbrole,message,token,'LeaveMessageList');
    setTimeout(function(){
      that.setData({reviewCon:''});
    },1500);
  },

  /**
   * 
   * @param {*} e 
   * 用户给评论进行回复
   */
  ReplyMessge:function(e){
    console.log(e.currentTarget.dataset.replyid,'产卡');
    let that = this;
    if(e.currentTarget.dataset.replyid === null){
      that.setData({
        sendId:e.currentTarget.dataset.id,
        focus:true,
        placeholder:'回复：~@~' + e.currentTarget.dataset.nickname1,
      });
    }else{
      o.funShowToast('该条评论已回复，无需重复回复');
    }
  },

  bindconfirm:function(e){
    console.log(e.detail.value,'查看返回的是什么');
    let that = this,
    use = that.data.use,
    // token = use.token,
    token = "yueyou eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNTAxMTExMTExMSIsImF1dGgiOiIiLCJqdGkiOiI3MDYxNmI2NjQ5NmQ0Yzc4ODY1ODBiNWM4ZTBlN2I5MSJ9.nO8ieN2oCucBqdERTKCGMWhjFUJxDX7FdSPiNWdv9S4gY0MpAjR9NRRBbRqiVNW8oNqgDywoFmaeVZXO7FPoww",
    message = e.detail.value,
    id = that.data.sendId;
    o.FunReplyMessge(id,message,token,callback=>{
      if(callback.statusCode === 200){
        o.FunLeaveMessageList(that,that.data.pid,that.data.fbrole,token,'LeaveMessageList');
      }
    });
    that.setData({
      replyCon:'',
      placeholder:'回复：'
    });
  },

  bindblur:function(e){
    let that = this;
    that.setData({
      replyCon:'',
      placeholder:'回复：',
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let that = this,
    arr = [],
    use = app.globalData.userInfo,
    // userId = parseInt(use.user.userId),
    userId = 12,
    // token = use.token;
    token = "yueyou eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNTAxMTExMTExMSIsImF1dGgiOiIiLCJqdGkiOiI3MDYxNmI2NjQ5NmQ0Yzc4ODY1ODBiNWM4ZTBlN2I5MSJ9.nO8ieN2oCucBqdERTKCGMWhjFUJxDX7FdSPiNWdv9S4gY0MpAjR9NRRBbRqiVNW8oNqgDywoFmaeVZXO7FPoww";
    // 获取留言列表
    o.FunLeaveMessageList(that,parseInt(options.pid),options.fbrole,token,'LeaveMessageList');
    if(options.picture !== 'null'){
      if(options.picture.indexOf(',') === -1){
        arr.push(o.down(o.urlCon(),options.picture))
      }else{
        let pictureArr = options.picture.split(',');
        for(let i in pictureArr){
          arr.push(o.down(o.urlCon(),pictureArr[i]));   
        }
      }
    }
    // if(parseInt(use.user.userId) === parseInt(options.uid)){
    //   that.setData({isShow:false,isBtmShow:true});
    // }else{
    //   that.setData({isShow:true,isBtmShow:false});
    // }
    // 写死 后期改掉
    if(parseInt(12) === parseInt(options.uid)){
      // 发布动态的用户与当前登录的用户是同一个人
      that.setData({isShow:false,isBtmShow:true});
    }else{
      // 发布动态的用户与当前登录的用户不是同一人
      that.setData({isShow:true,isBtmShow:false});
    }
    that.setData({
      content:options.content,
      headimg:options.headimg,
      nickname:options.nickname,
      uid:parseInt(options.uid), 
      pid:parseInt(options.pid),
      fbrole:options.fbrole,
      dynamicImg:arr,
      use:use,
      followed:options.followed,
      userId:userId,
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