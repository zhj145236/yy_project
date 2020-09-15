// teacherVersion/teaTags/teaTags.js
const datas = require('../../utils/data.js');
const app = getApp(), o = app.requirejs('core');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    useTagInfo:[], // 存储数据使用
    maxValue:200,
    currentWordNumber:0,
  },

  /**
   * 获取用户填写的数据
   * @param {*} options 
   */
  formSubmit:function(e){
    let that = this;
    if(e.detail.value.addTag !== ""){
      let useTagInfo = that.data.useTagInfo;
      if(useTagInfo.length === 7){
        o.funShowToast('添加失败，您已添加了7个标签');
      }else{
        o.funShowToast('添加成功');
        setTimeout(function(){
          that.setData({addTag:''});
        },1500);
        useTagInfo.push(e.detail.value.addTag);
        that.setData({useTagInfo:useTagInfo});
      }
    }
  },

  /**
   * 删除标签
   * @param {*} options 
   */
  dealTag:function(e){
    let that = this,
    useTagInfo = that.data.useTagInfo,
    index = e.currentTarget.dataset.dealindex;
    useTagInfo.splice(index,1);
    that.setData({useTagInfo:useTagInfo});
  },

  /**
   * 评价
   * @param {*} options 
   */
  evaluateFormSubmit:function(e){
    let that = this,
    textareaValue = e.detail.value.textarea;
    let pages = getCurrentPages(), //页面栈
    prevPage = pages[pages.length - 2]; //上一个页面
    prevPage.setData({ //直接给上一个页面赋值
      textareaValue: textareaValue,
    });
    o.funShowToast('提交成功')
    setTimeout(function(){
      wx.navigateBack({
        delta: 1
      })
    },1500);
  },

  /**
   * 工作经历描述
   * @param {*} e 
   */
  jobExperienceFormSubmit:function(e){
    let that = this,
    dexcTextarea = e.detail.value.dexcTextarea;
    let pages = getCurrentPages(), //页面栈
    prevPage = pages[pages.length - 2]; //上一个页面
    prevPage.setData({ //直接给上一个页面赋值
      dexcTextarea: dexcTextarea,
    });
    o.funShowToast('提交成功')
    setTimeout(function(){
      wx.navigateBack({
        delta: 1
      })
    },1500);
  },

  /**
   * 评价计算字数
   * @param {*} options 
   */
  evaluateBindinput:function(e){
    let that = this,
    value = e.detail.value,
    len = parseInt(value.length);
    if(len<=that.data.maxValue){
      that.setData({currentWordNumber:len});
    }else{
      that.setData({currentWordNumber:that.data.maxValue});
    }
  },

  /**
   * 经历计算字数
   * @param {*} options 
   */
  experienceBindinput:function(e){
    let that = this,
    value = e.detail.value,
    len = parseInt(value.length);
    if(len<=that.data.maxValue){
      that.setData({descNums:len});
    }else{
      that.setData({descNums:that.data.maxValue});
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options,'返回数据');
    let that = this;
    if(options.label === '1'){
      that.setData({label:options.label});
      wx.setNavigationBarTitle({
        title: '个人标签'
      })
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor:'#74cdce',
      });
      if(options.useTagInfo !== ""){
        if(options.useTagInfo.indexOf(',') === -1){
          let useTagInfo = [options.useTagInfo];
          that.setData({useTagInfo:useTagInfo});
        }else{
          let useTagInfo = options.useTagInfo.split(',');
          that.setData({useTagInfo:useTagInfo});
        }
      }
    }else if(options.label === '2'){
      that.setData({label:options.label});
      wx.setNavigationBarTitle({
        title: '自我评价'
      })
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor:'#74cdce',
      });
      if(options.textareaValue !== ""){
        that.setData({textareaValue:options.textareaValue,currentWordNumber:options.textareaValue.length});
      }
    }else{
      that.setData({label:options.label});
      wx.setNavigationBarTitle({
        title: '工作经历描述'
      })
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor:'#74cdce',
      });
      if(options.dexcTextarea !== ""){
        that.setData({dexcTextarea:options.dexcTextarea,descNums:options.dexcTextarea.length});
      }
    }
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
    let that = this,
    pages = getCurrentPages(), //页面栈
    prevPage = pages[pages.length - 2], //上一个页面
    label = that.data.label;
    if(label === '1'){
      let useTagInfo = that.data.useTagInfo;
      prevPage.setData({ //直接给上一个页面赋值
        useTagInfo: useTagInfo
      });
    }
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